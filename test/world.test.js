import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import World from '../Game/world.js';

// World construction is pure scene/physics setup; no WebGL context needed.
globalThis.window = { innerWidth: 800, innerHeight: 600 };
globalThis.document = {
  createElement: () => ({ getContext: () => ({ fillRect() {}, fillText() {} }) }),
  querySelector: () => ({ textContent: '', classList: { add() {} } }),
};
const makeWorld = () => {
  const world = new World(new THREE.Scene(), new THREE.PerspectiveCamera(), {});
  world.controls = { releaseMomentum: 0 };
  return world;
};

test('divider gets matching physical holes on both faces, and re-placement fills the old hole', () => {
  const world = makeWorld();
  assert.ok(world.dividerFront.slabs.length > 1);
  assert.ok(world.dividerBack.slabs.length > 1);
  const west = world.panels.find(p => p.name === 'west');
  assert.equal(world.portals.place(0, west, new THREE.Vector3(-9, 2, 0), false), true);
  assert.equal(world.dividerFront.slabs.length, 1);
  assert.equal(world.dividerBack.slabs.length, 1);
  assert.ok(west.slabs.length > 1);
});

test('cube crosses physical hole, keeps speed, and travels outward from linked portal', () => {
  const world = makeWorld();
  world.cubeBody.position.set(0, 1.35, .8);
  world.cubeBody.velocity.set(0, 0, -10);
  for (let i = 0; i < 12; i++) world.update(1 / 60);
  assert.ok(world.cubeBody.position.z < -10 && world.cubeBody.position.z > -13);
  assert.ok(world.cubeBody.velocity.z > 8, `velocity: ${world.cubeBody.velocity.z}`);
});

test('player can walk through an open portal while grounded', () => {
  const world = makeWorld();
  world.player.position.set(0, .93, .8);
  world.player.velocity.set(0, 0, -5);
  for (let i = 0; i < 18; i++) world.update(1 / 60);
  assert.ok(world.player.position.z < -10 && world.player.position.z > -13);
  assert.ok(world.player.velocity.z > 4);
  assert.ok(world.controls.releaseMomentum > 0);
});

test('a falling player exits a floor portal with preserved horizontal launch momentum', () => {
  const world = makeWorld();
  const floor = world.panels.find(p => p.name === 'floor');
  assert.equal(world.portals.place(0, floor, new THREE.Vector3(0, 0, 5), false), true);
  world.player.position.set(0, 1.5, 5);
  world.player.velocity.set(0, -6, 0);
  for (let i = 0; i < 12; i++) world.update(1 / 60);
  assert.ok(world.player.position.z < -10);
  assert.ok(world.player.velocity.z > 5);
});

test('carrying, throwing and placing the cube releases physics and opens the exit', () => {
  const world = makeWorld();
  world.camera.position.copy(world.cube.position);
  world.toggleCube();
  assert.equal(world.held, true);
  world.throwCube();
  assert.equal(world.held, false);
  assert.equal(world.cubeBody.type, 1); // CANNON.Body.DYNAMIC
  assert.ok(world.cubeBody.velocity.length() > 9);
  world.cubeBody.position.set(4.1, 1, -7);
  world.cubeBody.velocity.setZero();
  for (let i = 0; i < 65; i++) world.update(1 / 60);
  assert.equal(world.doorOpen, true);
  assert.equal(world.door.visible, false);
  assert.equal(world.physics.bodies.includes(world.doorBody), false);
});
