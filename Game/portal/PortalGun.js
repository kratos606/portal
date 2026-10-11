import * as THREE from 'three'
import { PORTAL_HALF_WIDTH, PORTAL_HALF_HEIGHT, PORTAL_BUMP_FORGIVENESS } from './constants.js'

/**
 * Portal placement, following the shape of FitPortalOnSurface() and
 * VerifyPortalPlacement() from sp/src/game/server/portal/portal_placement.h.
 *
 * Valve traces each of the four edges/corners and snaps the portal onto
 * geometry that is not perfectly flat, recursing when a corner lands on a
 * different surface. We do the same corner sampling, then slide the portal back
 * onto the surface instead of recursing, which is enough for axis-aligned
 * panel geometry.
 */

const _right = new THREE.Vector3()
const _up = new THREE.Vector3()
const _fwd = new THREE.Vector3()
const _basis = new THREE.Matrix4()
const _quat = new THREE.Quaternion()
const _tmp = new THREE.Vector3()
const WORLD_UP = new THREE.Vector3(0, 1, 0)
/** Distance the portal sits off the surface it is placed on. */
const PORTAL_SURFACE_OFFSET = 0.015

export default class PortalGun {
  /**
   * @param {object} opts
   * @param {THREE.Object3D[]} opts.surfaces  objects a portal may be placed on
   * @param {THREE.Raycaster} [opts.raycaster]
   */
  constructor({ surfaces, raycaster = new THREE.Raycaster() }) {
    this.surfaces = surfaces
    this.raycaster = raycaster
    this.raycaster.far = 200
    /** @type {(reason: string, point: THREE.Vector3, normal: THREE.Vector3) => void} */
    this.onFizzle = null
  }

  /**
   * @param {THREE.Vector3} origin
   * @param {THREE.Vector3} direction normalised
   * @param {object} portals {blue: Portal, orange: Portal}
   * @param {'blue'|'orange'} side
   */
  tryPlace(origin, direction, portals, side) {
    this.raycaster.set(origin, direction)
    const hits = this.raycaster.intersectObjects(this.surfaces, false)
    if (hits.length === 0) return this._fail('NO_SURFACE', null, null)

    const hit = hits[0]
    if (!hit.face) return this._fail('NO_SURFACE', hit.point, null)

    const normal = hit.face.normal
      .clone()
      .transformDirection(hit.object.matrixWorld)
      .normalize()

    let point = hit.point.clone()

    // Build the portal basis so we can test the corners.
    this._buildBasis(normal, _quat)

    // ---- corner fitting: make sure the whole aperture sits on this surface --
    const fitted = this.fitOnSurface(point, normal, _quat, hit.object, 6)
    if (!fitted) return this._fail('CANT_FIT', point, normal)
    point = fitted

    // ---- rejection volumes ---------------------------------------------------
    if (this.overlapsLinked(portals, side, point, _quat)) {
      return this._fail('OVERLAP_LINKED', point, normal)
    }
    if (this.outsideSurfaceBounds(point, normal, _quat, hit.object)) {
      return this._fail('BAD_SURFACE', point, normal)
    }

    const portal = portals[side]
    // Sit a hair off the wall: stops z-fighting with the panel and guarantees a
    // beam or ray hitting the portal reports the portal as nearer than the wall.
    point = point.clone().addScaledVector(normal, PORTAL_SURFACE_OFFSET)
    portal.place(point, normal)
    portal.wall = hit.object
    portal.updateDerived()
    portal.pair = portals[side === 'blue' ? 'orange' : 'blue']
    portal.pair.pair = portal
    portal.updateLinkMatrix()
    portal.pair.updateLinkMatrix()

    return { ok: true, point, normal, object: hit.object }
  }

  _buildBasis(normal, outQuat) {
    _fwd.copy(normal).normalize()
    _up.copy(WORLD_UP).addScaledVector(_fwd, -_fwd.y / Math.max(1e-6, _fwd.lengthSq()))
    _up.copy(WORLD_UP).addScaledVector(_fwd, -WORLD_UP.dot(_fwd))
    if (_up.lengthSq() < 1e-6) _up.set(1, 0, 0).addScaledVector(_fwd, -_fwd.x)
    _up.normalize()
    _right.crossVectors(_up, _fwd).normalize()
    _basis.makeBasis(_right, _up, _fwd)
    return outQuat.setFromRotationMatrix(_basis)
  }

  /**
   * Slides the portal along the surface until all four corners and the four
   * edge midpoints land on the same object. Returns the fitted point or null.
   */
  fitOnSurface(point, normal, quat, target, maxIterations) {
    const probe = new THREE.Raycaster()
    probe.far = 4
    const p = point.clone()

    _right.set(1, 0, 0).applyQuaternion(quat)
    _up.set(0, 1, 0).applyQuaternion(quat)

    for (let iter = 0; iter < maxIterations; iter++) {
      let worst = null
      let worstPen = 0

      const samples = [
        [-1, -1], [1, -1], [-1, 1], [1, 1],
        [0, -1], [0, 1], [-1, 0], [1, 0],
      ]
      for (const [su, sv] of samples) {
        _tmp
          .copy(p)
          .addScaledVector(_right, su * PORTAL_HALF_WIDTH)
          .addScaledVector(_up, sv * PORTAL_HALF_HEIGHT)
          .addScaledVector(normal, 0.05)

        probe.set(_tmp, _tmp.clone().sub(normal).normalize())
        const h = probe.intersectObject(target, false)
        if (h.length === 0) {
          // off the surface: measure how far out along the offending axis
          const pen = 1
          if (pen > worstPen) {
            worstPen = pen
            worst = [su, sv]
          }
        }
      }

      if (!worst) return p

      // nudge back toward the surface centre along the offending axis
      const [su, sv] = worst
      const step = 0.08
      p.addScaledVector(_right, -su * step)
      p.addScaledVector(_up, -sv * step)
    }
    return null
  }

  /** IsPortalOverlappingOtherPortals() */
  overlapsLinked(portals, side, point, quat) {
    const other = portals[side === 'blue' ? 'orange' : 'blue']
    if (!other || !other.active) return false

    _right.set(1, 0, 0).applyQuaternion(quat)
    _up.set(0, 1, 0).applyQuaternion(quat)

    const d = _tmp.copy(point).sub(other.planePoint)
    const along = d.dot(other.planeNormal)
    if (Math.abs(along) > 0.3) return false
    const u = Math.abs(d.dot(_right))
    const v = Math.abs(d.dot(_up))
    return u < PORTAL_HALF_WIDTH * 2 - PORTAL_BUMP_FORGIVENESS &&
           v < PORTAL_HALF_HEIGHT * 2 - PORTAL_BUMP_FORGIVENESS
  }

  /** Cheap guard so portals do not hang off the edge of a wall. */
  outsideSurfaceBounds(point, normal, quat, target) {
    if (!target.geometry) return false
    if (!target.geometry.boundingBox) target.geometry.computeBoundingBox()
    const bb = target.geometry.boundingBox
    const local = point.clone().applyMatrix4(_invWorld.copy(target.matrixWorld).invert())
    const pad = 0.02
    return (
      local.x < bb.min.x + pad || local.x > bb.max.x - pad ||
      local.y < bb.min.y + pad || local.y > bb.max.y - pad
    )
  }

  _fail(reason, point, normal) {
    if (this.onFizzle) this.onFizzle(reason, point, normal)
    return { ok: false, reason, point, normal }
  }
}
const _invWorld = new THREE.Matrix4()
