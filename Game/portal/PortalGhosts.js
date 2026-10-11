import * as THREE from 'three'
import { GHOST_CLIP_BIAS_SELF, GHOST_CLIP_BIAS_LINKED } from './constants.js'
import { sphereIntersectsPortalHole } from './geometry.js'

/**
 * Visual "slicing" for objects straddling a portal.
 *
 * Port of the ghost-renderable system in
 * sp/src/game/client/portal/c_prop_portal.cpp:254 (Simulate) and
 * sp/src/game/client/portal/C_PortalGhostRenderable.cpp.
 *
 * Valve never cuts geometry. The real entity gets a render clip plane at this
 * portal's plane (-0.3" bias) and a second renderable, the same skeleton
 * transformed through the portal, gets the linked portal's plane (-0.75" bias).
 * Two halves, one model.
 *
 * The clipping plane arrays are allocated at a fixed length of 1 and only
 * mutated, because numClippingPlanes is part of three.js's shader program cache
 * key and changing the array length would recompile shaders every frame.
 */

const FAR = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1e6)

export default class PortalGhosts {
  constructor(scene) {
    this.scene = scene
    /** @type {Array<{object: THREE.Object3D, radius: number, ghost: THREE.Object3D|null, materials: THREE.Material[]}>} */
    this.entries = []
    this._box = new THREE.Box3()
    this._centre = new THREE.Vector3()
    this._size = new THREE.Vector3()
    this._quat = new THREE.Quaternion()
  }

  /**
   * @param {THREE.Object3D} object
   * @param {number} radius  bounding radius used for the straddle test
   */
  register(object, radius) {
    const materials = []
    object.traverse((o) => {
      if (!o.isMesh) return
      const list = Array.isArray(o.material) ? o.material : [o.material]
      for (const m of list) {
        if (!m.clippingPlanes || m.clippingPlanes.length === 0) {
          m.clippingPlanes = [FAR.clone()]
          m.clipShadows = true
        }
        if (!materials.includes(m)) materials.push(m)
      }
    })

    const ghost = object.clone(true)
    ghost.visible = false
    ghost.traverse((o) => {
      if (!o.isMesh) return
      const list = Array.isArray(o.material) ? o.material : [o.material]
      o.material = list.map((m) => {
        const c = m.clone()
        c.clippingPlanes = [FAR.clone()]
        c.clipShadows = true
        return c
      })
      o.castShadow = false
      o.receiveShadow = false
    })
    this.scene.add(ghost)

    this.entries.push({ object, radius, ghost, materials })
  }

  /**
   * @param {Array<import('./Portal.js').default>} portals
   */
  update(portals) {
    for (const entry of this.entries) {
      const obj = entry.object
      if (!obj.visible) {
        entry.ghost.visible = false
        continue
      }

      obj.getWorldPosition(this._centre)
      let straddling = null
      for (const p of portals) {
        if (!p.active || !p.pair) continue
        if (sphereIntersectsPortalHole(p, this._centre, entry.radius, p.halfWidth, p.halfHeight)) {
          straddling = p
          break
        }
      }

      if (!straddling) {
        for (const m of entry.materials) m.clippingPlanes[0].copy(FAR)
        entry.ghost.visible = false
        continue
      }

      const exit = straddling.pair

      // real object: clipped to THIS portal's plane, biased toward the near side
      setPlane(
        entry.materials,
        straddling.planeNormal,
        straddling.planeNormal.dot(straddling.planePoint) - GHOST_CLIP_BIAS_SELF
      )

      // ghost: the same model through the portal, clipped to the LINKED plane
      const ghost = entry.ghost
      ghost.visible = true
      // transform in WORLD space: the ghost is parented to the scene, while the
      // source object may be nested (the cube model sits inside a pivot group)
      obj.getWorldQuaternion(this._quat)
      ghost.position.copy(this._centre).applyMatrix4(straddling.matrixThisToLinked)
      ghost.quaternion.copy(straddling.quaternionThisToLinked).multiply(this._quat)
      obj.getWorldScale(ghost.scale)
      ghost.updateMatrixWorld(true)

      const ghostMaterials = []
      ghost.traverse((o) => {
        if (o.isMesh) ghostMaterials.push(...(Array.isArray(o.material) ? o.material : [o.material]))
      })
      setPlane(
        ghostMaterials,
        exit.planeNormal,
        exit.planeNormal.dot(exit.planePoint) - GHOST_CLIP_BIAS_LINKED
      )
    }
  }
}

function setPlane(materials, normal, dist) {
  for (const m of materials) {
    const p = m.clippingPlanes[0]
    p.normal.copy(normal)
    p.constant = -dist
  }
}
