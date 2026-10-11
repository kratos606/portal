import * as THREE from 'three'
import {
  CLIP_EPSILON,
  RENDERFIX_BOUND_PLANES,
  PORTAL_HALF_WIDTH,
  PORTAL_HALF_HEIGHT,
} from './constants.js'

/**
 * Polygon / frustum geometry helpers, ported from
 *   sp/src/game/client/portal/Portal_DynamicMeshRenderingUtils.cpp
 *   sp/src/game/client/portal/portalrenderable_flatbasic.cpp
 *
 * Allocation-light: the clipping core works on caller-supplied buffers.
 */

// Module scratch for clipPolyToPlane. Safe because it is synchronous and never
// re-enters itself.
const dists = new Float64Array(64)
const sides = new Int8Array(64)

/**
 * Sutherland-Hodgman clip of a convex polygon against a plane.
 * Port of ClipPolyToPlane_LerpTexCoords() minus the texcoord lerping.
 *
 * @param {THREE.Vector3[]} input
 * @param {number}          count    live vertices in `input`
 * @param {THREE.Vector3[]} output   destination, needs count + 1 slots
 * @param {THREE.Plane}     plane    front = normal side
 * @param {number}          epsilon
 * @returns {number} vertices written to `output`
 */
export function clipPolyToPlane(input, count, output, plane, epsilon = CLIP_EPSILON) {
  const nx = plane.normal.x
  const ny = plane.normal.y
  const nz = plane.normal.z
  const dist = -plane.constant // n.p + constant = 0  =>  n.p = -constant

  let front = 0
  let back = 0

  for (let i = 0; i < count; i++) {
    const p = input[i]
    const d = p.x * nx + p.y * ny + p.z * nz - dist
    dists[i] = d
    if (d > epsilon) {
      sides[i] = 1
      front++
    } else if (d < -epsilon) {
      sides[i] = -1
      back++
    } else {
      sides[i] = 0
    }
  }

  if (front === 0) return 0
  if (back === 0) {
    for (let i = 0; i < count; i++) output[i].copy(input[i])
    return count
  }

  let out = 0
  for (let i = 0; i < count; i++) {
    const j = (i + 1) % count
    if (sides[i] !== -1) output[out++].copy(input[i])
    if (sides[i] === 0 || sides[j] === sides[i]) continue

    const di = dists[i]
    const t = di / (di - dists[j])
    const a = input[i]
    const b = input[j]
    const o = output[out++]
    o.x = a.x + t * (b.x - a.x)
    o.y = a.y + t * (b.y - a.y)
    o.z = a.z + t * (b.z - a.z)
  }
  return out
}

/**
 * Clips a polygon against several planes, ping-ponging between two buffers.
 * @returns {THREE.Vector3[]} the surviving vertices (references into a buffer
 *          owned by this module — copy out if you need them to persist)
 */
export function clipPolygonByPlanes(points, planes, planeCount = planes.length, bufferA, bufferB) {
  let inV = bufferA
  let outV = bufferB
  for (let i = 0; i < points.length; i++) inV[i].copy(points[i])
  let n = points.length

  for (let p = 0; p < planeCount; p++) {
    if (n < 3) {
      n = 0
      break
    }
    n = clipPolyToPlane(inV, n, outV, planes[p])
    const t = inV
    inV = outV
    outV = t
  }

  inV.count = n
  return inV
}

const _frustum = new THREE.Frustum()
const _projScreen = new THREE.Matrix4()

/**
 * The camera's 6 frustum planes in world space.
 * @param {THREE.Camera} camera
 * @param {THREE.Plane[]} out array of 6 planes, reused
 */
export function getCameraFrustumPlanes(camera, out) {
  camera.updateMatrixWorld()
  _projScreen.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
  _frustum.setFromProjectionMatrix(_projScreen)
  for (let i = 0; i < 6; i++) out[i].copy(_frustum.planes[i])
  return out
}

const _rotMat = new THREE.Matrix4()
const _coneA = Array.from({ length: 16 }, () => new THREE.Vector3())
const _coneB = Array.from({ length: 16 }, () => new THREE.Vector3())
const _edgeA = new THREE.Vector3()
const _edgeB = new THREE.Vector3()
const _normal = new THREE.Vector3()
const _farCam = new THREE.Vector3()

/**
 * Port of CPortalRenderable_FlatBasic::CalcFrustumThroughPortal().
 *
 * Clips the aperture against the incoming frustum, then builds the cone of rays
 * from the camera through each surviving aperture edge, carried through the
 * portal by matrixThisToLinked. Near plane becomes the exit portal's plane; far
 * plane is the incoming far plane rotated through.
 *
 * @returns {number} plane count written to outPlanes, 0 if not visible
 */
export function calcFrustumThroughPortal(
  cameraPos,
  portalCorners,
  inputPlanes,
  inputPlaneCount,
  thisToLinked,
  exitNormal,
  exitPoint,
  outPlanes
) {
  const clipped = clipPolygonByPlanes(portalCorners, inputPlanes, inputPlaneCount, _coneA, _coneB)
  const n = clipped.count
  if (n < 3) return 0

  _farCam.copy(cameraPos).applyMatrix4(thisToLinked)
  _rotMat.extractRotation(thisToLinked)

  let count = 0
  for (let i = 0; i < n; i++) {
    const p1 = clipped[i]
    const p2 = clipped[(i + 1) % n]
    _edgeA.subVectors(p1, cameraPos)
    _edgeB.subVectors(p2, cameraPos)
    _normal.crossVectors(_edgeA, _edgeB)
    if (_normal.lengthSq() < 1e-14) continue
    _normal.normalize().applyMatrix4(_rotMat)
    outPlanes[count++].setFromNormalAndCoplanarPoint(_normal, _farCam)
  }
  if (count < 3) return 0

  // near plane = the exit portal's own plane
  outPlanes[count++].setFromNormalAndCoplanarPoint(exitNormal, exitPoint)

  // far plane = incoming far plane rotated through the portal
  const far = inputPlanes[inputPlaneCount - 1]
  _normal.copy(far.normal).applyMatrix4(_rotMat)
  _edgeA.copy(far.normal).multiplyScalar(-far.constant).applyMatrix4(thisToLinked)
  outPlanes[count++].setFromNormalAndCoplanarPoint(_normal, _edgeA)

  return count
}

const _rfNormal = new THREE.Vector3()
const _rfPoint = new THREE.Vector3()
const _rfRight = new THREE.Vector3()
const _rfUp = new THREE.Vector3()
const _rfFwd = new THREE.Vector3()
const _origin = new THREE.Vector3()

/**
 * The render-fix bounding cone from PortalMoved(): 12 side planes around a 1.1x
 * scaled aperture, a back plane at the portal, and a front plane 5" out.
 * @param {THREE.Object3D} portal
 * @param {THREE.Plane[]} outPlanes length >= RENDERFIX_BOUND_PLANES + 2
 */
export function buildRenderFixCone(
  portal,
  outPlanes,
  halfWidth,
  halfHeight,
  frontClip = 5 * 0.0254
) {
  _rfRight.set(1, 0, 0).transformDirection(portal.matrixWorld)
  _rfUp.set(0, 1, 0).transformDirection(portal.matrixWorld)
  _rfFwd.set(0, 0, 1).transformDirection(portal.matrixWorld)
  const origin = portal.getWorldPosition(_origin)

  for (let i = 0; i < RENDERFIX_BOUND_PLANES; i++) {
    const a = (i * Math.PI * 2) / RENDERFIX_BOUND_PLANES
    const upBlend = Math.cos(a)
    const rightBlend = Math.sin(a)

    _rfNormal.set(0, 0, 0).addScaledVector(_rfUp, -upBlend).addScaledVector(_rfRight, -rightBlend)
    _rfPoint
      .copy(origin)
      .addScaledVector(_rfUp, upBlend * halfHeight * 1.1)
      .addScaledVector(_rfRight, rightBlend * halfWidth * 1.1)

    outPlanes[i].setFromNormalAndCoplanarPoint(_rfNormal, _rfPoint)
  }

  _rfNormal.copy(_rfFwd).negate()
  outPlanes[RENDERFIX_BOUND_PLANES].setFromNormalAndCoplanarPoint(_rfNormal, origin)

  // front plane, `frontClip` behind the portal: the two together form a thin
  // slab on the far side of the plane, which is what the fix quad must land in
  _rfPoint.copy(origin).addScaledVector(_rfFwd, -frontClip)
  outPlanes[RENDERFIX_BOUND_PLANES + 1].setFromNormalAndCoplanarPoint(_rfFwd, _rfPoint)

  return outPlanes
}

const _cRight = new THREE.Vector3()
const _cUp = new THREE.Vector3()
const _cOrigin = new THREE.Vector3()

/** The aperture's 4 world corners, CCW seen from the front (m_ptCorners). */
export function getPortalCorners(portal, halfWidth, halfHeight, out) {
  _cRight.set(1, 0, 0).transformDirection(portal.matrixWorld).multiplyScalar(halfWidth)
  _cUp.set(0, 1, 0).transformDirection(portal.matrixWorld).multiplyScalar(halfHeight)
  const o = portal.getWorldPosition(_cOrigin)

  out[0].copy(o).add(_cRight).add(_cUp)
  out[1].copy(o).sub(_cRight).add(_cUp)
  out[2].copy(o).sub(_cRight).sub(_cUp)
  out[3].copy(o).add(_cRight).sub(_cUp)
  return out
}

const _hRight = new THREE.Vector3()
const _hUp = new THREE.Vector3()
const _hFwd = new THREE.Vector3()
const _hDelta = new THREE.Vector3()
const _hOrigin = new THREE.Vector3()

/**
 * CPortalSimulator::EntityIsInPortalHole(), specialised for a bounding sphere.
 * The sphere must straddle the portal plane AND overlap the aperture rect.
 */
export function sphereIntersectsPortalHole(
  portal,
  centre,
  radius,
  halfWidth = portal.halfWidth ?? PORTAL_HALF_WIDTH,
  halfHeight = portal.halfHeight ?? PORTAL_HALF_HEIGHT
) {
  _hRight.set(1, 0, 0).transformDirection(portal.matrixWorld)
  _hUp.set(0, 1, 0).transformDirection(portal.matrixWorld)
  _hFwd.set(0, 0, 1).transformDirection(portal.matrixWorld)
  _hDelta.subVectors(centre, portal.getWorldPosition(_hOrigin))

  const along = _hDelta.dot(_hFwd)
  if (Math.abs(along) > radius) return false

  const inPlane = Math.sqrt(Math.max(0, radius * radius - along * along))
  return (
    Math.abs(_hDelta.dot(_hRight)) <= halfWidth + inPlane &&
    Math.abs(_hDelta.dot(_hUp)) <= halfHeight + inPlane
  )
}

/** Is a world point inside the aperture rect and in front of the plane? */
export function pointInPortalHole(
  portal,
  point,
  halfWidth = portal.halfWidth ?? PORTAL_HALF_WIDTH,
  halfHeight = portal.halfHeight ?? PORTAL_HALF_HEIGHT,
  tolerance = 0
) {
  _hRight.set(1, 0, 0).transformDirection(portal.matrixWorld)
  _hUp.set(0, 1, 0).transformDirection(portal.matrixWorld)
  _hFwd.set(0, 0, 1).transformDirection(portal.matrixWorld)
  _hDelta.subVectors(point, portal.getWorldPosition(_hOrigin))

  if (_hDelta.dot(_hFwd) < 0) return false
  return (
    Math.abs(_hDelta.dot(_hRight)) <= halfWidth + tolerance &&
    Math.abs(_hDelta.dot(_hUp)) <= halfHeight + tolerance
  )
}

const _tA = new THREE.Vector3()
const _tB = new THREE.Vector3()

/**
 * UTIL_IntersectRayWithPortal(): ray vs the aperture, treated as a rectangle.
 * Returns the distance along the ray, or -1. Rejects rays not arriving from the
 * front, exactly as the source does with `DotProduct(vForward, ray.m_Delta) > 0`.
 */
export function intersectRayWithPortal(
  portal,
  origin,
  direction,
  halfWidth = portal.halfWidth ?? PORTAL_HALF_WIDTH,
  halfHeight = portal.halfHeight ?? PORTAL_HALF_HEIGHT
) {
  _hFwd.set(0, 0, 1).transformDirection(portal.matrixWorld)
  if (_hFwd.dot(direction) >= 0) return -1 // moving away from the front face

  _hRight.set(1, 0, 0).transformDirection(portal.matrixWorld)
  _hUp.set(0, 1, 0).transformDirection(portal.matrixWorld)
  const o = portal.getWorldPosition(_hOrigin)

  const denom = direction.dot(_hFwd)
  if (Math.abs(denom) < 1e-9) return -1
  _tA.subVectors(o, origin)
  const t = _tA.dot(_hFwd) / denom
  if (t < 0) return -1

  _tB.copy(origin).addScaledVector(direction, t).sub(o)
  if (Math.abs(_tB.dot(_hRight)) > halfWidth) return -1
  if (Math.abs(_tB.dot(_hUp)) > halfHeight) return -1
  return t
}
