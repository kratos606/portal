import * as THREE from 'three'
import {
  PORTAL_STENCIL_DEPTH,
  PORTAL_HALF_HEIGHT,
  LAYER_WORLD,
  LAYER_PORTALS,
  CLIP_PLANE_BIAS,
  RENDERFIX_BOUND_PLANES,
} from './constants.js'
import {
  calcFrustumThroughPortal,
  getCameraFrustumPlanes,
  buildRenderFixCone,
  clipPolyToPlane,
  clipPolygonByPlanes,
} from './geometry.js'

/**
 * Valve's stencil portal renderer, ported to three.js.
 *
 * Mirrors CPortalRender::DrawPortalsUsingStencils() from
 * sp/src/game/client/portal/PortalRender.cpp:453.
 *
 * THE INVARIANT: the stencil value equals the recursion depth of the view that
 * owns that pixel. Cutting a hole at level L increments L -> L+1; the recursive
 * scene render runs with the stencil test set to EQUAL L+1, so it can only paint
 * inside the hole; unwinding decrements back to L. That is also why the maximum
 * depth is bounded by the stencil bit count.
 *
 * All stencil state is driven through three.js's public Material.stencil* API
 * rather than raw gl calls, because WebGLState.setMaterial() re-applies stencil
 * state from the material on every draw (WebGLState.js:729) and would clobber
 * anything set directly on the context.
 */

const FAR_PLANE = 1e6

function makeScreenMaterial(ndcZ, { depthWrite, depthTest, stencilZPass }) {
  return new THREE.ShaderMaterial({
    vertexShader: `void main() { gl_Position = vec4(position.xy, ${ndcZ.toFixed(5)}, 1.0); }`,
    fragmentShader: 'void main() { gl_FragColor = vec4(0.0); }',
    depthWrite,
    depthTest,
    colorWrite: false,
    transparent: false,
    side: THREE.DoubleSide,
    stencilWrite: true,
    stencilFunc: THREE.EqualStencilFunc,
    stencilRef: 0,
    stencilFuncMask: 0xff,
    stencilWriteMask: 0xff,
    stencilFail: THREE.KeepStencilOp,
    stencilZFail: THREE.KeepStencilOp,
    stencilZPass,
  })
}

/**
 * Full-screen passes that touch only stencil and/or depth.
 *
 * `depthClear` writes window depth 1.0 (the far plane) wherever the stencil test
 * passes — the three.js equivalent of ClearBuffersObeyStencil(false, true).
 * `decrement` is PerformFullScreenStencilOperation() with DECR on pass.
 */
class ScreenPass {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.Camera()
    this.camera.matrixAutoUpdate = false

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute([-1, -1, 0, 3, -1, 0, -1, 3, 0], 3))
    this.geometry = geo

    this.depthClearMaterial = makeScreenMaterial(1.0, {
      depthWrite: true,
      depthTest: false,
      stencilZPass: THREE.KeepStencilOp,
    })
    this.decrementMaterial = makeScreenMaterial(0.0, {
      depthWrite: false,
      depthTest: false,
      stencilZPass: THREE.DecrementStencilOp,
    })

    this.mesh = new THREE.Mesh(geo, this.depthClearMaterial)
    this.mesh.frustumCulled = false
    this.scene.add(this.mesh)
  }

  run(renderer, material, stencilRef) {
    material.stencilRef = stencilRef
    this.mesh.material = material
    renderer.render(this.scene, this.camera)
  }

  dispose() {
    this.geometry.dispose()
    this.depthClearMaterial.dispose()
    this.decrementMaterial.dispose()
  }
}

export default class PortalSystem {
  constructor({ renderer, scene, camera, virtualCamera, maxDepth = PORTAL_STENCIL_DEPTH }) {
    this.renderer = renderer
    this.scene = scene
    this.camera = camera
    this.virtualCamera = virtualCamera

    // Valve: MIN(r_portal_stencil_depth, MIN(MAX_PORTAL_RECURSIVE_VIEWS, 2^bits) - 1)
    const gl = renderer.getContext()
    const bits = gl.getParameter(gl.STENCIL_BITS) || 8
    this.maxDepth = Math.min(maxDepth, Math.min(11, 1 << bits) - 1)

    this.screen = new ScreenPass()
    this.clipStack = []

    // Constant-length clip plane array: numClippingPlanes is part of three.js's
    // shader program cache key (WebGLPrograms.js:331,461) so changing the array
    // LENGTH forces a recompile. Mutating the Plane objects is free.
    this.clipPlanes = [
      new THREE.Plane(new THREE.Vector3(0, 1, 0), FAR_PLANE),
      new THREE.Plane(new THREE.Vector3(0, 1, 0), FAR_PLANE),
    ]
    renderer.clippingPlanes = this.clipPlanes
    renderer.localClippingEnabled = true

    /** @type {THREE.Material[]} */
    this.worldMaterials = []
    this._worldMaterialSet = new Set()

    /** @type {THREE.Object3D[]} considered for cone culling */
    this.cullables = []
    this._savedVisibility = new Map()

    this.coneCulling = true
    this.renderFixEnabled = true

    this._conePlanes = Array.from({ length: 16 }, () => new THREE.Plane())
    this._inputPlanes = Array.from({ length: 6 }, () => new THREE.Plane())
    this._renderFixPlanes = Array.from({ length: RENDERFIX_BOUND_PLANES + 2 }, () => new THREE.Plane())
    this._fixA = Array.from({ length: 20 }, () => new THREE.Vector3())
    this._fixB = Array.from({ length: 20 }, () => new THREE.Vector3())
    this._visA = Array.from({ length: 12 }, () => new THREE.Vector3())
    this._visB = Array.from({ length: 12 }, () => new THREE.Vector3())

    this.renderFixMeshes = new Map()
    this.stats = { portalViews: 0, holesCut: 0, depth: 0 }
    this._remainingDepth = 0
  }

  // ---------------------------------------------------------------------------
  // Registration
  // ---------------------------------------------------------------------------
  registerWorldMaterial(material) {
    if (!material || this._worldMaterialSet.has(material)) return
    // The portal's own materials carry their stencil state themselves; letting
    // exitStencilScope() flip stencilWrite off would silently disable the mask
    // pass for every portal after the first far-side render.
    if (material.userData?.portalPass) return
    this._worldMaterialSet.add(material)
    this.worldMaterials.push(material)
    material.stencilWriteMask = 0xff
    material.stencilFuncMask = 0xff
    material.stencilFail = THREE.KeepStencilOp
    material.stencilZFail = THREE.KeepStencilOp
    material.stencilZPass = THREE.KeepStencilOp
    material.stencilFunc = THREE.EqualStencilFunc
    material.stencilWrite = false
  }

  collectWorldMaterials(root = this.scene) {
    root.traverse((o) => {
      if (!o.material) return
      if (Array.isArray(o.material)) o.material.forEach((m) => this.registerWorldMaterial(m))
      else this.registerWorldMaterial(o.material)
    })
  }

  registerCullable(object) {
    if (!this.cullables.includes(object)) this.cullables.push(object)
  }

  enterStencilScope(ref) {
    for (const m of this.worldMaterials) {
      m.stencilWrite = true
      m.stencilFunc = THREE.EqualStencilFunc
      m.stencilRef = ref
    }
  }
  exitStencilScope() {
    for (const m of this.worldMaterials) m.stencilWrite = false
  }

  // ---------------------------------------------------------------------------
  // Frame entry point. Call after the opaque world has been drawn.
  // ---------------------------------------------------------------------------
  render(portals, dt) {
    this.stats.portalViews = 0
    this.stats.holesCut = 0
    this.stats.depth = 0

    for (const p of portals) if (p.active) p.updateDerived()
    for (const p of portals) p.update(dt, this.maxDepth)

    this.camera.layers.set(LAYER_WORLD)
    this.drawPortalsUsingStencils(this.camera, portals, 0, null)
    this.camera.layers.set(LAYER_WORLD)
  }

  /** Port of DrawPortalsUsingStencils(). */
  drawPortalsUsingStencils(camera, portals, level, exitPortal) {
    const parentRef = level
    const childRef = level + 1
    this.stats.depth = Math.max(this.stats.depth, level)

    const visible = []
    for (const p of portals) {
      if (!p.active || !p.pair) continue
      if (p === exitPortal) continue // never render the portal this view exits from
      if (p.openAmount < 0.02) continue
      if (level >= this.maxDepth) continue // end of the chain: static only
      if (!this.shouldUpdatePortalView(p, camera)) continue
      visible.push(p)
    }

    for (const portal of visible) {
      // ---- STEP 1: cut the hole. Depth tested, INCR on pass, so a wall in
      // front of the portal correctly blocks it.
      portal.maskMaterial.stencilRef = parentRef
      camera.layers.set(portal.maskLayer)
      this.renderer.render(this.scene, camera)
      this.stats.holesCut++

      // ---- STEP 2: clear DEPTH only, inside the hole
      this.screen.run(this.renderer, this.screen.depthClearMaterial, childRef)

      // ---- STEP 3: render the view beyond the portal, then recurse
      this.renderPortalView(portal, portals, camera, level)

      // ---- STEP 4: the recursion left the far side's depth in our hole.
      // Clear it and re-establish depth at the portal plane.
      this.screen.run(this.renderer, this.screen.depthClearMaterial, childRef)
      this.drawDepthRestore(portal, childRef, camera, level)

      // ---- STEP 5: unwind the stencil back to the parent level
      this.screen.run(this.renderer, this.screen.decrementMaterial, childRef)

      camera.layers.set(LAYER_WORLD)
    }

    this.drawPortalOverlays(portals, camera, parentRef, exitPortal)
  }

  /** Port of RenderPortalViewToBackBuffer(). */
  renderPortalView(portal, portals, parentCamera, level) {
    const childRef = level + 1
    const exit = portal.pair
    const M = portal.matrixThisToLinked

    const vc = this.virtualCamera
    vc.position.copy(parentCamera.position).applyMatrix4(M)
    vc.quaternion.copy(portal.quaternionThisToLinked).multiply(parentCamera.quaternion)
    vc.fov = parentCamera.fov
    vc.aspect = parentCamera.aspect
    // Source floors the portal view's zNear at 1 unit to keep the depth range sane.
    vc.near = Math.max(parentCamera.near, 0.02)
    vc.far = parentCamera.far
    vc.updateProjectionMatrix()
    vc.updateMatrixWorld(true)
    vc.matrixWorldInverse.copy(vc.matrixWorld).invert()
    vc.layers.set(LAYER_WORLD)

    // The clip plane: the EXIT portal's plane, biased 0.5" back so objects
    // halfway through render on both sides.
    this.pushClipPlane(exit)

    const usedCone = this.coneCulling && this.applyConeCulling(portal, exit, parentCamera)

    // everything the far side draws must land inside the stencil hole
    this.enterStencilScope(childRef)
    this.renderer.render(this.scene, vc)
    this.exitStencilScope()
    this.stats.portalViews++

    // nested portals, one level deeper, sharing the stencil buffer
    this.drawPortalsUsingStencils(vc, portals, childRef, exit)

    if (usedCone) this.restoreCulling()
    this.popClipPlane()
  }

  // ---------------------------------------------------------------------------
  // Clip plane stack (PushCustomClipPlane / PopCustomClipPlane)
  // ---------------------------------------------------------------------------
  pushClipPlane(portal) {
    this.clipStack.push(portal)
    this.syncClipPlanes()
  }
  popClipPlane() {
    this.clipStack.pop()
    this.syncClipPlanes()
  }
  syncClipPlanes() {
    for (let i = 0; i < this.clipPlanes.length; i++) {
      const portal = this.clipStack[i]
      const plane = this.clipPlanes[i]
      if (!portal) {
        plane.normal.set(0, 1, 0)
        plane.constant = FAR_PLANE
        continue
      }
      // keep the half space in front of the exit portal, pushed back by the bias
      plane.normal.copy(portal.planeNormal)
      plane.constant = -(portal.planeNormal.dot(portal.planePoint) - CLIP_PLANE_BIAS)
    }
  }

  // ---------------------------------------------------------------------------
  // CalcFrustumThroughPortal culling
  // ---------------------------------------------------------------------------
  applyConeCulling(entryPortal, exitPortal, camera) {
    getCameraFrustumPlanes(camera, this._inputPlanes)
    const count = calcFrustumThroughPortal(
      camera.position,
      entryPortal.corners,
      this._inputPlanes,
      6,
      entryPortal.matrixThisToLinked,
      exitPortal.planeNormal,
      exitPortal.planePoint,
      this._conePlanes
    )
    if (count < 4) return false

    this._savedVisibility.clear()
    for (const o of this.cullables) {
      if (!o.visible || !o.geometry) continue
      if (!o.geometry.boundingSphere) o.geometry.computeBoundingSphere()
      const bs = o.geometry.boundingSphere
      _bsCentre.copy(bs.center).applyMatrix4(o.matrixWorld)
      const r = bs.radius * maxAxisScale(o.matrixWorld)

      let inside = true
      for (let i = 0; i < count; i++) {
        if (this._conePlanes[i].distanceToPoint(_bsCentre) < -r) {
          inside = false
          break
        }
      }
      if (!inside) {
        this._savedVisibility.set(o, true)
        o.visible = false
      }
    }
    return true
  }

  restoreCulling() {
    for (const [o] of this._savedVisibility) o.visible = true
    this._savedVisibility.clear()
  }

  // ---------------------------------------------------------------------------
  // ShouldUpdatePortalView_BasedOnView()
  // ---------------------------------------------------------------------------
  shouldUpdatePortalView(portal, camera) {
    if (!portal.pair) return false
    if (!portal.isFrontSide(camera.position)) return false // backface

    getCameraFrustumPlanes(camera, this._inputPlanes)
    const clipped = clipPolygonByPlanes(portal.corners, this._inputPlanes, 6, this._visA, this._visB)
    return clipped.count >= 3
  }

  // ---------------------------------------------------------------------------
  // Post-hole fixes (DrawPostStencilFixes)
  // ---------------------------------------------------------------------------
  drawDepthRestore(portal, childRef, camera, level = 0) {
    const m = portal.depthMaterial
    m.stencilWrite = true
    m.stencilFunc = THREE.EqualStencilFunc
    m.stencilRef = childRef
    m.stencilZPass = THREE.KeepStencilOp

    // This pass must submit the depth quad and nothing else. The mask mesh
    // shares the layer, and although its EQUAL-parentRef test would reject it
    // inside the hole, re-running its INCR pass here is exactly the kind of
    // state leak that is invisible until the recursion depth changes.
    const maskWas = portal.maskMesh.visible
    portal.maskMesh.visible = false
    portal.depthMesh.visible = true

    camera.layers.set(portal.maskLayer)
    this.renderer.render(this.scene, camera)

    portal.depthMesh.visible = false
    portal.maskMesh.visible = maskWas
    m.stencilWrite = false

    this.drawRenderFix(portal, childRef, level)
  }

  /**
   * DrawRenderFixMesh(): when the camera is close to a portal, the near plane
   * slices the portal quad and the wall behind shows through the gap. Cover the
   * gap with a screen-space polygon clipped to the portal's cone, projected on
   * the CPU and forced to the near plane, writing depth only.
   */
  drawRenderFix(portal, ref, level) {
    if (!this.renderFixEnabled) return
    // DrawRenderFixMesh() bails unless GetViewRecursionLevel() == 0: the near
    // plane only ever slices the portal in the primary view.
    if (level !== 0) return

    const camera = this.camera
    // if( vPortalCenterToCamera.Dot( m_vForward ) < -1.0f ) return;
    // (1 unit = 1 inch; further behind the plane than that and there is no gap)
    const along = portal.planeDistance(camera.position)
    if (along < -0.0254) return

    const mesh = this.getRenderFixMesh(portal)
    if (!this.buildRenderFixGeometry(portal, camera, mesh.geometry, along)) {
      mesh.visible = false
      return
    }

    mesh.material.stencilRef = ref
    mesh.visible = true
    this.screen.scene.add(mesh)
    this.renderer.render(this.screen.scene, this.screen.camera)
    this.screen.scene.remove(mesh)
    mesh.visible = false
  }

  getRenderFixMesh(portal) {
    let mesh = this.renderFixMeshes.get(portal)
    if (mesh) return mesh
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.Float32BufferAttribute(new Float32Array(20 * 3), 3))
    geo.setIndex(new THREE.Uint16BufferAttribute(new Uint16Array(18 * 3), 1))
    const mat = new THREE.ShaderMaterial({
      vertexShader: 'void main() { gl_Position = vec4(position.xy, position.z, 1.0); }',
      fragmentShader: 'void main() { gl_FragColor = vec4(0.0); }',
      colorWrite: false,
      depthWrite: true,
      depthTest: false,
      side: THREE.DoubleSide,
      stencilWrite: true,
      stencilFunc: THREE.EqualStencilFunc,
      stencilFail: THREE.KeepStencilOp,
      stencilZFail: THREE.KeepStencilOp,
      stencilZPass: THREE.KeepStencilOp,
    })
    mesh = new THREE.Mesh(geo, mat)
    mesh.frustumCulled = false
    mesh.visible = false
    this.renderFixMeshes.set(portal, mesh)
    return mesh
  }

  buildRenderFixGeometry(portal, camera, geometry, cameraAlongNormal) {
    const cone = this._renderFixPlanes

    // Inside PORTAL_HALF_HEIGHT the front clip plane is pulled in so it never
    // clips past the camera: if( fFrontClipDistance > fCameraDist ) ...
    let frontClip = 5 * 0.0254
    const distSq = camera.position.distanceToSquared(portal.planePoint)
    if (distSq < PORTAL_HALF_HEIGHT * PORTAL_HALF_HEIGHT) {
      frontClip = Math.max(0, Math.min(frontClip, cameraAlongNormal))
    }
    buildRenderFixCone(portal.group, cone, portal.halfWidth, portal.halfHeight, frontClip)

    camera.updateMatrixWorld(true)
    // this projects on the CPU, so it cannot rely on the renderer having filled
    // matrixWorldInverse in for us this frame
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert()

    const e = camera.matrixWorld.elements
    const ox = e[12], oy = e[13], oz = e[14]
    const rx = e[0], ry = e[1], rz = e[2] // camera right
    const ux = e[4], uy = e[5], uz = e[6] // camera up
    // The third basis column is the camera's +Z, which points BACKWARD along the
    // view axis. Source's vForward is the view direction, so negate it -- using
    // it raw places the fix quad behind the camera and it always clips away.
    const fx = -e[8], fy = -e[9], fz = -e[10]
    const push = camera.near + 0.01
    const S = 40 // the source uses a 80x80 unit quad

    const quad = [
      [rx * S - ux * S, ry * S - uy * S, rz * S - uz * S],
      [rx * S + ux * S, ry * S + uy * S, rz * S + uz * S],
      [-rx * S + ux * S, -ry * S + uy * S, -rz * S + uz * S],
      [-rx * S - ux * S, -ry * S - uy * S, -rz * S - uz * S],
    ]
    for (let i = 0; i < 4; i++) {
      this._fixA[i].set(ox + fx * push + quad[i][0], oy + fy * push + quad[i][1], oz + fz * push + quad[i][2])
    }

    let n = 4
    let inV = this._fixA
    let outV = this._fixB
    for (let p = 0; p < RENDERFIX_BOUND_PLANES + 2; p++) {
      if (n < 3) return false
      n = clipPolyToPlane(inV, n, outV, cone[p])
      const t = inV
      inV = outV
      outV = t
    }
    if (n < 3) return false

    // project on the CPU and force the depth to the near plane, exactly as
    // Internal_DrawRenderFixMesh does with z = 0.00001
    _vp.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    const pos = geometry.attributes.position.array
    for (let i = 0; i < n; i++) {
      _v.copy(inV[i]).applyMatrix4(_vp)
      const iw = 1 / _v.w
      pos[i * 3 + 0] = _v.x * iw
      pos[i * 3 + 1] = _v.y * iw
      pos[i * 3 + 2] = -0.99999 // WebGL NDC near plane
    }
    geometry.attributes.position.needsUpdate = true
    geometry.setDrawRange(0, n)

    const triCount = n - 2
    const idx = new Uint16Array(triCount * 3)
    let t = 0
    for (let i = 1; i <= triCount; i++) {
      idx[t++] = 0
      idx[t++] = i
      idx[t++] = i + 1
    }
    geometry.setIndex(new THREE.Uint16BufferAttribute(idx, 1))
    return true
  }

  /** DrawPortal(): the surface / glow overlay, restricted to this level's pixels. */
  drawPortalOverlays(portals, camera, parentRef, exitPortal) {
    let any = false
    for (const p of portals) {
      if (!p.active) continue
      // a view never draws the surface of the portal it exits from
      if (p === exitPortal) {
        p.surfaceMesh.visible = false
        p.glowMesh.visible = false
        continue
      }
      p.surfaceMesh.visible = p.openAmount > 0.01
      p.glowMesh.visible = p.openAmount > 0.01
      if (p.surfaceMesh.visible) any = true
    }
    if (!any) return

    const restricted = parentRef > 0
    for (const p of portals) {
      p.surfaceMaterial.stencilWrite = restricted
      p.glowMaterial.stencilWrite = restricted
      if (restricted) {
        p.surfaceMaterial.stencilRef = parentRef
        p.glowMaterial.stencilRef = parentRef
      }
    }

    camera.layers.set(LAYER_PORTALS)
    this.renderer.render(this.scene, camera)
    camera.layers.set(LAYER_WORLD)

    for (const p of portals) {
      p.surfaceMaterial.stencilWrite = false
      p.glowMaterial.stencilWrite = false
      p.surfaceMesh.visible = true
      p.glowMesh.visible = true
    }
  }

  dispose() {
    this.screen.dispose()
    for (const [, mesh] of this.renderFixMeshes) {
      mesh.geometry.dispose()
      mesh.material.dispose()
    }
    this.renderFixMeshes.clear()
  }
}

const _bsCentre = new THREE.Vector3()
const _v = new THREE.Vector3()
const _vp = new THREE.Matrix4()

function maxAxisScale(matrixWorld) {
  const e = matrixWorld.elements
  return Math.max(
    Math.hypot(e[0], e[1], e[2]),
    Math.hypot(e[4], e[5], e[6]),
    Math.hypot(e[8], e[9], e[10])
  )
}
