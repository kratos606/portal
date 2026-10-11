import * as THREE from 'three'
import {
  MIN_FLOOR_EXIT_VELOCITY,
  MIN_FLOOR_EXIT_VELOCITY_PLAYER,
  MAX_EXIT_VELOCITY,
} from './constants.js'
import { sphereIntersectsPortalHole } from './geometry.js'

/**
 * Teleport logic, ported from CProp_Portal::ShouldTeleportTouchingEntity() and
 * CProp_Portal::TeleportTouchingEntity() in
 * sp/src/game/server/portal/prop_portal.cpp:804 and :929.
 *
 * The trigger is exactly the source's two conditions:
 *   1. the traveller's centre has crossed to the back of the portal plane, and
 *   2. the traveller's volume actually intersects the portal hole.
 *
 * Valve has to "curl the player into a ball" (ForceDuckThisFrame + a 16 unit
 * nudge) whenever the portals are not both axis-aligned on Z, because a Source
 * player is an AABB that cannot rotate. A bounding sphere has no such problem,
 * so this port drops that hack entirely — which is the one place where the web
 * version is strictly more correct than the original.
 */

const _rot = new THREE.Matrix4()
const _newPos = new THREE.Vector3()
const _centreOffset = new THREE.Vector3()
const _newVel = new THREE.Vector3()
const _exitFwd = new THREE.Vector3()
const _entryFwd = new THREE.Vector3()
const _newQuat = new THREE.Quaternion()

/**
 * @param {object} portal  a Portal
 * @param {THREE.Vector3} centre  world-space centre of the traveller
 * @param {number} radius  bounding radius
 * @param {THREE.Vector3} [previousCentre]  centre last tick, to confirm the crossing
 */
export function shouldTeleport(portal, centre, radius, previousCentre = null) {
  if (!portal || !portal.pair || !portal.active) return false

  // 1. centre is behind the portal plane
  if (portal.planeDistance(centre) >= 0) return false

  // it must have just crossed, not spawned behind it
  if (previousCentre && portal.planeDistance(previousCentre) < 0) return false

  // 2. the volume actually intersects the hole
  return sphereIntersectsPortalHole(
    portal,
    centre,
    radius,
    portal.halfWidth,
    portal.halfHeight
  )
}

/**
 * Applies the teleport to a physics body plus its visual.
 *
 * @param {object} portal
 * @param {object} opts
 * @param {THREE.Vector3} opts.origin       body origin (may differ from centre)
 * @param {THREE.Vector3} opts.centre       body world centre
 * @param {THREE.Quaternion} opts.quaternion
 * @param {THREE.Vector3} opts.velocity
 * @param {boolean} [opts.isPlayer]
 * @returns {{position: THREE.Vector3, quaternion: THREE.Quaternion, velocity: THREE.Vector3}|null}
 */
export function computeTeleport(portal, opts) {
  const M = portal.matrixThisToLinked
  const exit = portal.pair

  // Source transforms the CENTRE and then re-applies the origin offset:
  //   ptNewOrigin  = M * ptOtherCenter;
  //   ptNewOrigin += ptOtherOrigin - ptOtherCenter;
  _newPos.copy(opts.centre).applyMatrix4(M)
  _centreOffset.subVectors(opts.origin, opts.centre)
  _newPos.add(_centreOffset)

  // angles: TransformAnglesToWorldSpace, never angle arithmetic (gimbal lock)
  _newQuat.copy(portal.quaternionThisToLinked).multiply(opts.quaternion)

  // velocity is rotated, never translated
  _newVel.copy(opts.velocity).applyMatrix4(_rot.extractRotation(M))

  // ---- velocity hacks -------------------------------------------------------
  // Source tests vForward, the portal's NORMAL: a portal on the floor has its
  // normal pointing up. Testing the portal's up vector instead would catch
  // every wall portal too and fling the player skyward on a flat wall-to-wall
  // trip. (prop_portal.cpp, quoted in PORTAL_LOGIC.md §8.)
  _exitFwd.set(0, 0, 1).transformDirection(exit.group.matrixWorld)
  _entryFwd.set(0, 0, 1).transformDirection(portal.group.matrixWorld)

  if (_exitFwd.y > 0.7071) {
    // exiting a floor portal
    const min = opts.isPlayer
      ? MIN_FLOOR_EXIT_VELOCITY_PLAYER
      : // Source branches on the entry portal here too, but both arms are 50.
        _entryFwd.y > 0.7071
        ? MIN_FLOOR_EXIT_VELOCITY
        : MIN_FLOOR_EXIT_VELOCITY
    if (_newVel.y < min) _newVel.y = min
  }
  if (_newVel.lengthSq() > MAX_EXIT_VELOCITY * MAX_EXIT_VELOCITY) {
    _newVel.setLength(MAX_EXIT_VELOCITY)
  }

  return {
    position: _newPos.clone(),
    quaternion: _newQuat.clone(),
    velocity: _newVel.clone(),
    entry: portal,
    exit,
  }
}

/** Applies a computed teleport to a cannon body. */
export function applyToBody(result, body) {
  if (!result || !body) return
  body.position.set(result.position.x, result.position.y, result.position.z)
  body.quaternion.set(
    result.quaternion.x,
    result.quaternion.y,
    result.quaternion.z,
    result.quaternion.w
  )
  body.velocity.set(result.velocity.x, result.velocity.y, result.velocity.z)
  // Source does the velocity in two stages for props as a resting-contact bug
  // workaround; cannon does not need it, but it does need waking.
  body.wakeUp()
  body.angularVelocity.scale(0.4, body.angularVelocity)
}
