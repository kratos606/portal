import * as THREE from 'three';

// Portal-Base's UpdatePortalTransformationMatrix: destination * half-turn * inverse(source).
// A portal's local +Z points into the room. Both positions and directions use this
// SAME transform; directions deliberately exclude translation.
const halfTurn = new THREE.Matrix4().makeRotationY(Math.PI);
export function portalMatrix(source, destination) {
  source.updateMatrixWorld(true);
  destination.updateMatrixWorld(true);
  return destination.matrixWorld.clone().multiply(halfTurn).multiply(source.matrixWorld.clone().invert());
}

export function throughPoint(point, source, destination) {
  return point.clone().applyMatrix4(portalMatrix(source, destination));
}

export function throughDirection(direction, source, destination) {
  return direction.clone().transformDirection(portalMatrix(source, destination)).multiplyScalar(direction.length());
}

export function throughQuaternion(quaternion, source, destination) {
  const rotation = new THREE.Quaternion().setFromRotationMatrix(portalMatrix(source, destination));
  return rotation.multiply(quaternion.clone());
}

// Intersect the swept center, not a proximity-trigger volume. A crossing only
// counts from the front, within the opening, while moving into the portal.
export function portalCrossing(previous, current, portal, width, height, margin = 0) {
  portal.updateMatrixWorld(true);
  const a = portal.worldToLocal(previous.clone());
  const b = portal.worldToLocal(current.clone());
  if (a.z <= 0 || b.z > 0 || a.z === b.z) return null;
  const t = a.z / (a.z - b.z);
  const hit = a.lerp(b, t);
  if (Math.abs(hit.x) > width / 2 - margin || Math.abs(hit.y) > height / 2 - margin) return null;
  return t;
}
