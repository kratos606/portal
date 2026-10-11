import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { portalMatrix, throughPoint, throughDirection, throughQuaternion, portalCrossing } from '../Game/portalMath.js';

const near = (a, b, eps = 1e-5) => assert.ok(a.distanceTo(b) < eps, `${a.toArray()} != ${b.toArray()}`);
const portal = (pos, rotation = new THREE.Quaternion()) => {
  const p = new THREE.Object3D(); p.position.copy(pos); p.quaternion.copy(rotation); p.updateMatrixWorld(true); return p;
};
const turn = (axis, angle) => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(...axis), angle);

test('opposed wall portals preserve incoming velocity and lateral offset', () => {
  const a = portal(new THREE.Vector3(0, 1, 0));
  const b = portal(new THREE.Vector3(4, 1, -10), turn([0, 1, 0], Math.PI));
  near(throughPoint(new THREE.Vector3(.3, 1.4, -.25), a, b), new THREE.Vector3(4.3, 1.4, -10.25));
  near(throughDirection(new THREE.Vector3(1, 2, -8), a, b), new THREE.Vector3(1, 2, -8));
});

test('perpendicular wall portals rotate position, look direction and momentum together', () => {
  const a = portal(new THREE.Vector3(0, 0, 0));
  const b = portal(new THREE.Vector3(8, 0, 2), turn([0, 1, 0], Math.PI / 2));
  const velocity = new THREE.Vector3(0, 0, -12);
  const newVelocity = throughDirection(velocity, a, b);
  near(newVelocity, new THREE.Vector3(12, 0, 0));
  assert.ok(Math.abs(newVelocity.length() - velocity.length()) < 1e-6);
  const look = new THREE.Vector3(0, 0, -1).applyQuaternion(throughQuaternion(new THREE.Quaternion(), a, b));
  near(look, newVelocity.clone().normalize());
  near(throughPoint(new THREE.Vector3(0, 0, -.5), a, b), new THREE.Vector3(8.5, 0, 2));
});

test('floor to wall redirects downward falling speed outward without flattening it', () => {
  const floor = portal(new THREE.Vector3(0, 0, 0), turn([1, 0, 0], -Math.PI / 2));
  const wall = portal(new THREE.Vector3(0, 2, -8));
  const v = throughDirection(new THREE.Vector3(0, -15, 0), floor, wall);
  near(v, new THREE.Vector3(0, 0, 15));
});

test('linked transformation round trips both points and velocity', () => {
  const a = portal(new THREE.Vector3(-3, 2, 1), turn([0, 1, 0], -.8));
  const b = portal(new THREE.Vector3(7, 4, 5), turn([1, 0, 0], -.7));
  const p = new THREE.Vector3(.4, 2.1, 1.5), v = new THREE.Vector3(3, -8, 2);
  near(throughPoint(throughPoint(p, a, b), b, a), p);
  near(throughDirection(throughDirection(v, a, b), b, a), v);
  const result = portalMatrix(b, a).multiply(portalMatrix(a, b));
  assert.ok(result.equals(new THREE.Matrix4()) || result.elements.every((e, i) => Math.abs(e - new THREE.Matrix4().elements[i]) < 1e-5));
});

test('only front-to-back crossings through the opening qualify', () => {
  const a = portal(new THREE.Vector3(0, 1.5, 0));
  assert.equal(portalCrossing(new THREE.Vector3(.3, 1.4, 1), new THREE.Vector3(.3, 1.4, -1), a, 1.65, 2.65, .2), .5);
  assert.equal(portalCrossing(new THREE.Vector3(.3, 1.4, -1), new THREE.Vector3(.3, 1.4, 1), a, 1.65, 2.65), null);
  assert.equal(portalCrossing(new THREE.Vector3(1.2, 1.4, 1), new THREE.Vector3(1.2, 1.4, -1), a, 1.65, 2.65), null);
  assert.equal(portalCrossing(new THREE.Vector3(0, 1.4, 1), new THREE.Vector3(0, 1.4, .1), a, 1.65, 2.65), null);
});
