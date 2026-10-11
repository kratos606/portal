import * as THREE from 'three'
import { PORTAL_FUNNEL_AMOUNT, PORTAL_HALF_WIDTH, PORTAL_HALF_HEIGHT } from '../portal/constants.js'

/**
 * Air steering toward a floor portal you are falling into.
 *
 * Direct port of CPortalGameMovement::FunnelIntoPortal() from
 * sp/src/game/shared/portal/portal_gamemovement.cpp:177, with the inch based
 * thresholds converted to metres.
 *
 *   PORTAL_FUNNEL_AMOUNT            6.0
 *   wishdir components              64 in/s  -> 1.626 m/s
 *   fall speed gate                165 in/s  -> 4.191 m/s
 *   max height above portal        512 in    -> 13.005 m
 *   must be above portal by          8 in    -> 0.203 m
 *
 * The funnel is a proportional controller: it drives horizontal velocity toward
 * `toPortal * 6`, which is why it snaps you in quite firmly.
 */

const WISH_LIMIT = 1.626
const FALL_GATE = -4.191
const MAX_HEIGHT = 13.005
const MIN_CLEARANCE = -0.203

const _right = new THREE.Vector3()
const _up = new THREE.Vector3()
const _fwd = new THREE.Vector3()
const _toPortal = new THREE.Vector3()

export default class FunnelSystem {
  constructor() {
    this.enabled = true
    this._tmp = new THREE.Vector3()
  }

  /**
   * @param {Array<import('../portal/Portal.js').default>} portals
   * @param {object} traveller
   * @param {THREE.Vector3} traveller.position   world position (feet/centre)
   * @param {THREE.Vector3} traveller.velocity   m/s
   * @param {THREE.Vector3} traveller.wish       desired horizontal move dir * speed
   * @returns {boolean} true if any funnel was applied
   */
  apply(portals, traveller) {
    if (!this.enabled) return false
    let applied = false
    for (const portal of portals) {
      if (!portal.active || !portal.pair) continue
      if (this.funnelIntoPortal(portal, traveller)) applied = true
    }
    return applied
  }

  funnelIntoPortal(portal, traveller) {
    _fwd.set(0, 0, 1).transformDirection(portal.matrixWorld)
    // vPortalForward.z < 0.8 -> only upward facing portals funnel
    if (_fwd.y < 0.8) return false

    _right.set(1, 0, 0).transformDirection(portal.matrixWorld)
    _up.set(0, 1, 0).transformDirection(portal.matrixWorld)
    // flatten to the horizontal plane, as the source zeroes the z components
    _right.y = 0
    _up.y = 0
    if (_right.lengthSq() < 1e-8 || _up.lengthSq() < 1e-8) return false
    _right.normalize()
    _up.normalize()

    _toPortal.copy(portal.planePoint).sub(traveller.position)

    // player steering hard, or not falling fast enough, or way too high
    if (Math.abs(traveller.wish.x) > WISH_LIMIT || Math.abs(traveller.wish.z) > WISH_LIMIT) return false
    if (traveller.velocity.y > FALL_GATE) return false
    if (_toPortal.y < -MAX_HEIGHT) return false

    // must be horizontally inside 1.5x the aperture on both axes
    const alongRight = _toPortal.dot(_right)
    const alongUp = _toPortal.dot(_up)
    if (Math.abs(alongRight) > PORTAL_HALF_WIDTH * 1.5) return false
    if (Math.abs(alongUp) > PORTAL_HALF_HEIGHT * 1.5) return false

    // must actually be above the portal
    if (_toPortal.y > MIN_CLEARANCE) return false

    // fFunnel = toPortal * FUNNEL_AMOUNT - velocity
    traveller.velocity.x = _toPortal.x * PORTAL_FUNNEL_AMOUNT
    traveller.velocity.z = _toPortal.z * PORTAL_FUNNEL_AMOUNT
    return true
  }
}
