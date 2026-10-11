import * as THREE from 'three'
import {
  PORTAL_HALF_WIDTH,
  PORTAL_HALF_HEIGHT,
  LAYER_PORTALS,
  LAYER_WORLD,
  LAYER_PORTAL_BLUE,
  LAYER_PORTAL_ORANGE,
  PORTAL_COLORS,
} from './constants.js'
import { getPortalCorners } from './geometry.js'

/**
 * One portal. Holds the placement, the portal->portal transform, and the meshes
 * used by the stencil pass.
 *
 * Transform math is UpdatePortalTransformationMatrix() from
 * sp/src/game/shared/portal/prop_portal_shared.cpp:21, expressed in three.js
 * conventions (Y up, portal normal = local +Z):
 *
 *     thisToLinked = remote.matrixWorld * RotY(pi) * inverse(this.matrixWorld)
 *
 * Source builds its basis as (forward, -right, up) with a diag(-1,-1,1)
 * rotation. three.js portals face +Z with +Y up, so a 180 degree turn about the
 * portal's up axis is the identical operation: it maps local +Z to remote -Z
 * and local +X to remote -X, and it is a proper rotation (det +1), so nothing
 * gets mirrored.
 */

const _rot180 = new THREE.Matrix4().makeRotationY(Math.PI)
const _inv = new THREE.Matrix4()

let _sharedGeoms = null
function sharedGeometries() {
  if (_sharedGeoms) return _sharedGeoms

  const w = PORTAL_HALF_WIDTH
  const h = PORTAL_HALF_HEIGHT

  // aperture fill (the stencil hole / portal surface)
  const shape = new THREE.Shape()
  shape.absellipse(0, 0, w, h, 0, Math.PI * 2, false, 0)
  const fill = new THREE.ShapeGeometry(shape, 64)

  // rim tube
  const rim = new THREE.TubeGeometry(new EllipseCurve3(w, h), 96, 0.055, 12, true)

  // inner glow ring, slightly inset
  const glow = new THREE.TubeGeometry(new EllipseCurve3(w * 0.965, h * 0.975), 96, 0.028, 8, true)

  _sharedGeoms = { fill, rim, glow }
  return _sharedGeoms
}

class EllipseCurve3 extends THREE.Curve {
  constructor(a, b) {
    super()
    this.a = a
    this.b = b
  }
  getPoint(t, target = new THREE.Vector3()) {
    const angle = t * Math.PI * 2
    return target.set(Math.cos(angle) * this.a, Math.sin(angle) * this.b, 0)
  }
}

export default class Portal {
  /**
   * @param {'blue'|'orange'} side
   */
  constructor(side) {
    this.side = side
    this.isBlue = side === 'blue'
    this.pair = null
    this.active = false
    this.openAmount = 0
    this.staticAmount = 1
    this.wall = null

    this.halfWidth = PORTAL_HALF_WIDTH
    this.halfHeight = PORTAL_HALF_HEIGHT

    const color = new THREE.Color(this.isBlue ? PORTAL_COLORS.blue : PORTAL_COLORS.orange)
    const colorDark = new THREE.Color(this.isBlue ? PORTAL_COLORS.blueDark : PORTAL_COLORS.orangeDark)

    this.group = new THREE.Object3D()
    this.group.name = `portal_${side}`
    this.group.matrixAutoUpdate = true
    // The rim lives on the world layer, so an unopened portal has to be hidden
    // explicitly or its frame floats in the chamber before the first shot.
    this.group.visible = false

    const geoms = sharedGeometries()

    // ---- stencil mask: writes nothing but stencil, depth tested -------------
    this.maskMaterial = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: false,
      depthTest: true,
      transparent: false,
      side: THREE.FrontSide,
    })
    // PortalRender.cpp:453 step 1: stencil EQUAL parentRef, INCR on pass.
    // IncrementStencilOp is the saturating INCR that maps to Source's
    // SHADER_STENCILOP_INCR, which is what caps depth at 2^bits - 1.
    this.maskMaterial.userData.portalPass = true
    this.maskMaterial.stencilWrite = true
    this.maskMaterial.stencilFunc = THREE.EqualStencilFunc
    this.maskMaterial.stencilRef = 0
    this.maskMaterial.stencilFuncMask = 0xff
    this.maskMaterial.stencilWriteMask = 0xff
    this.maskMaterial.stencilFail = THREE.KeepStencilOp
    this.maskMaterial.stencilZFail = THREE.KeepStencilOp
    this.maskMaterial.stencilZPass = THREE.IncrementStencilOp
    this.maskMesh = new THREE.Mesh(geoms.fill, this.maskMaterial)
    this.maskMesh.name = `portal_${side}_mask`
    this.maskMesh.renderOrder = -100
    this.maskMesh.frustumCulled = false
    this.group.add(this.maskMesh)

    // ---- depth restore quad (engine/writez_model equivalent) ----------------
    this.depthMaterial = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: true,
      depthTest: false,
      side: THREE.DoubleSide,
    })
    this.depthMaterial.userData.portalPass = true
    this.depthMaterial.stencilWrite = false
    this.depthMaterial.stencilFuncMask = 0xff
    this.depthMaterial.stencilWriteMask = 0xff
    this.depthMesh = new THREE.Mesh(geoms.fill, this.depthMaterial)
    this.depthMesh.name = `portal_${side}_depth`
    this.depthMesh.renderOrder = -99
    this.depthMesh.frustumCulled = false
    this.depthMesh.visible = false
    this.group.add(this.depthMesh)

    // ---- visual surface ------------------------------------------------------
    this.surfaceMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      depthTest: true,
      side: THREE.FrontSide,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uColor: { value: color },
        uColorDark: { value: colorDark },
        uTime: { value: 0 },
        uOpen: { value: 0 },
        uStatic: { value: 1 },
        uHalf: { value: new THREE.Vector2(this.halfWidth, this.halfHeight) },
      },
      vertexShader: /* glsl */ `
        varying vec2 vPos;
        void main() {
          vPos = position.xy;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */ `
        uniform vec3 uColor;
        uniform vec3 uColorDark;
        uniform float uTime;
        uniform float uOpen;
        uniform float uStatic;
        uniform vec2 uHalf;
        varying vec2 vPos;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        void main() {
          vec2 q = vPos / uHalf;
          float r = length(q);
          if (r > 1.0) discard;

          // animated swirl
          float ang = atan(q.y, q.x);
          float swirl = sin(ang * 6.0 + r * 10.0 - uTime * 1.6) * 0.5 + 0.5;
          float rings = smoothstep(0.45, 1.0, sin(r * 22.0 - uTime * 2.4) * 0.5 + 0.5);

          float edge = smoothstep(1.0, 0.86, r);
          float core = smoothstep(0.95, 0.15, r);

          vec3 col = mix(uColorDark, uColor, swirl * 0.55 + rings * 0.35);
          col += uColor * core * 0.35;

          // "static" fill: shown when the recursion chain runs out (Valve's
          // m_fStaticAmount) so the end of the chain reads as intentional.
          float n = hash(floor(vPos * 260.0) + floor(uTime * 24.0));
          vec3 staticCol = mix(uColorDark * 0.25, uColor * 0.5, n);
          col = mix(col, staticCol, clamp(uStatic, 0.0, 1.0));

          float alpha = (edge * (0.28 + 0.5 * core) + rings * 0.12) * uOpen;
          alpha = mix(alpha, edge * (0.55 + 0.35 * n), clamp(uStatic, 0.0, 1.0) * uOpen);
          if (alpha < 0.004) discard;
          gl_FragColor = vec4(col, alpha);
        }
      `,
    })
    this.surfaceMaterial.userData.portalPass = true
    this.surfaceMaterial.stencilWrite = false
    this.surfaceMaterial.stencilFunc = THREE.EqualStencilFunc
    this.surfaceMaterial.stencilRef = 0
    this.surfaceMaterial.stencilFuncMask = 0xff
    this.surfaceMaterial.stencilWriteMask = 0xff
    this.surfaceMaterial.stencilFail = THREE.KeepStencilOp
    this.surfaceMaterial.stencilZFail = THREE.KeepStencilOp
    this.surfaceMaterial.stencilZPass = THREE.KeepStencilOp
    this.surfaceMesh = new THREE.Mesh(geoms.fill, this.surfaceMaterial)
    this.surfaceMesh.name = `portal_${side}_surface`
    this.surfaceMesh.renderOrder = 20
    this.surfaceMesh.frustumCulled = false
    this.group.add(this.surfaceMesh)

    // ---- rim ----------------------------------------------------------------
    this.rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2f4f7,
      roughness: 0.35,
      metalness: 0.85,
      emissive: color,
      emissiveIntensity: 0.0,
    })
    this.rimMesh = new THREE.Mesh(geoms.rim, this.rimMaterial)
    this.rimMesh.name = `portal_${side}_rim`
    this.group.add(this.rimMesh)

    this.glowMaterial = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    this.glowMaterial.userData.portalPass = true
    this.glowMaterial.stencilWrite = false
    this.glowMaterial.stencilFunc = THREE.EqualStencilFunc
    this.glowMaterial.stencilRef = 0
    this.glowMaterial.stencilFuncMask = 0xff
    this.glowMaterial.stencilWriteMask = 0xff
    this.glowMaterial.stencilFail = THREE.KeepStencilOp
    this.glowMaterial.stencilZFail = THREE.KeepStencilOp
    this.glowMaterial.stencilZPass = THREE.KeepStencilOp
    this.glowMesh = new THREE.Mesh(geoms.glow, this.glowMaterial)
    this.glowMesh.name = `portal_${side}_glow`
    this.glowMesh.renderOrder = 21
    this.group.add(this.glowMesh)

    // ---- layers -------------------------------------------------------------
    const maskLayer = this.isBlue ? LAYER_PORTAL_BLUE : LAYER_PORTAL_ORANGE
    this.maskLayer = maskLayer
    this.maskMesh.layers.set(maskLayer)
    this.depthMesh.layers.set(maskLayer)
    this.surfaceMesh.layers.set(LAYER_PORTALS)
    this.glowMesh.layers.set(LAYER_PORTALS)
    // The rim is an ordinary opaque ring around the aperture. Keeping it on the
    // world layer means it is drawn once by the base pass, is depth-tested by
    // the mask pass, and picks up the stencil scope automatically inside every
    // portal view -- instead of being redrawn by each of those passes itself.
    this.rimMesh.layers.set(LAYER_WORLD)

    // ---- cached math --------------------------------------------------------
    this.matrixThisToLinked = new THREE.Matrix4()
    this.matrixLinkedToThis = new THREE.Matrix4()
    this.quaternionThisToLinked = new THREE.Quaternion()
    this.planeNormal = new THREE.Vector3(0, 0, 1)
    this.planePoint = new THREE.Vector3()
    this.corners = [new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]
    this.holeClipPlane = new THREE.Plane()

    this._position = new THREE.Vector3()
    this._normal = new THREE.Vector3()
  }

  get position() {
    return this.group.position
  }
  get quaternion() {
    return this.group.quaternion
  }
  get matrixWorld() {
    return this.group.matrixWorld
  }

  /** Portal quacks like an Object3D for the geometry helpers. */
  getWorldPosition(target = new THREE.Vector3()) {
    return this.group.getWorldPosition(target)
  }

  /**
   * Places the portal on a surface.
   * @param {THREE.Vector3} point    world position on the wall
   * @param {THREE.Vector3} normal   surface normal (portal faces along it)
   * @param {THREE.Vector3} upHint   desired "up" for the portal, usually world up
   */
  place(point, normal, upHint = new THREE.Vector3(0, 1, 0)) {
    this.group.position.copy(point)

    // build an orthonormal basis: +Z = normal, +Y = upHint projected, +X = Y x Z
    const z = this._normal.copy(normal).normalize()
    let y = new THREE.Vector3().copy(upHint)
    y.addScaledVector(z, -y.dot(z))
    if (y.lengthSq() < 1e-6) {
      // surface is (near) horizontal: fall back to world +X as the portal's right
      y.set(1, 0, 0).addScaledVector(z, -z.x)
    }
    y.normalize()
    const x = new THREE.Vector3().crossVectors(y, z).normalize()

    const m = new THREE.Matrix4().makeBasis(x, y, z)
    this.group.quaternion.setFromRotationMatrix(m)
    this.group.updateMatrixWorld(true)

    this.openAmount = 0
    this.staticAmount = 1
    this.active = true
    this.updateDerived()
  }

  /** Recomputes plane, corners and the link matrix. Call after any move. */
  updateDerived() {
    this.group.updateMatrixWorld(true)

    this.planeNormal.set(0, 0, 1).transformDirection(this.group.matrixWorld)
    this.planePoint.copy(this.group.getWorldPosition(this._position))
    this.holeClipPlane.setFromNormalAndCoplanarPoint(this.planeNormal, this.planePoint)
    getPortalCorners(this.group, this.halfWidth, this.halfHeight, this.corners)

    this.updateLinkMatrix()
  }

  /** PortalMoved()'s link-matrix block. */
  updateLinkMatrix() {
    if (!this.pair) {
      // "don't accidentally teleport objects to zero space"
      this.matrixThisToLinked.identity()
      this.matrixLinkedToThis.identity()
      this.quaternionThisToLinked.identity()
      return
    }
    this.pair.group.updateMatrixWorld(true)

    this.matrixThisToLinked
      .copy(this.pair.group.matrixWorld)
      .multiply(_rot180)
      .multiply(_inv.copy(this.group.matrixWorld).invert())

    this.matrixLinkedToThis.copy(this.matrixThisToLinked).invert()
    this.quaternionThisToLinked.setFromRotationMatrix(this.matrixThisToLinked)
  }

  /** World position a point maps to when it goes through this portal. */
  transformPoint(v, out = new THREE.Vector3()) {
    return out.copy(v).applyMatrix4(this.matrixThisToLinked)
  }

  /** Rotates a direction / quaternion through the portal. */
  transformDirection(v, out = new THREE.Vector3()) {
    return out.copy(v).applyMatrix4(_rotMat.extractRotation(this.matrixThisToLinked))
  }
  transformQuaternion(q, out = new THREE.Quaternion()) {
    return out.copy(this.quaternionThisToLinked).multiply(q)
  }

  /** Signed distance from a world point to the portal plane. */
  planeDistance(point) {
    return (
      this.planeNormal.x * (point.x - this.planePoint.x) +
      this.planeNormal.y * (point.y - this.planePoint.y) +
      this.planeNormal.z * (point.z - this.planePoint.z)
    )
  }

  /** Backface test, as used by every visibility routine in the source. */
  isFrontSide(point) {
    return this.planeDistance(point) > 0
  }

  /**
   * Show/hide the portal.
   *
   * Layer assignment is fixed at construction and must not be touched here:
   * rewriting the group's own layer would stop three.js descending into it at
   * all, and the mask pass would never see the mask mesh again.
   */
  setVisible(v) {
    this.group.visible = v
  }

  update(dt, remainingDepth) {
    const target = this.active ? 1 : 0
    // source ramps open amount at 2x real time
    this.openAmount += (target - this.openAmount) * Math.min(1, dt * 12)

    // Stay visible through the closing animation, then drop out entirely.
    this.group.visible = this.active || this.openAmount > 0.001

    // end of the recursion chain -> show static
    this.staticAmount =
      !this.pair || remainingDepth <= 0 ? 1 : this.openAmount < 1 ? 0 : 0

    const u = this.surfaceMaterial.uniforms
    u.uTime.value += dt
    u.uOpen.value = this.openAmount
    u.uStatic.value = this.staticAmount

    this.glowMaterial.opacity = 0.35 * this.openAmount + 0.35 * this.staticAmount * this.openAmount
    this.rimMaterial.emissiveIntensity = 0.9 * this.openAmount

    this.depthMesh.visible = false
  }

  dispose() {
    this.group.removeFromParent()
    this.surfaceMaterial.dispose()
    this.rimMaterial.dispose()
    this.glowMaterial.dispose()
    this.maskMaterial.dispose()
    this.depthMaterial.dispose()
  }
}
const _rotMat = new THREE.Matrix4()
