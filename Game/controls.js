import * as THREE from 'three';

export default class FirstPersonControls {
  constructor(world, canvas) {
    this.world = world;
    this.camera = world.camera;
    this.canvas = canvas;
    this.keys = new Set();
    this.releaseMomentum = 0;
    this.locked = false;
    this.euler = new THREE.Euler(0, 0, 0, 'YXZ');
    canvas.addEventListener('click', () => { if (!world.complete) canvas.requestPointerLock(); });
    document.querySelector('#start').addEventListener('click', () => canvas.requestPointerLock());
    document.addEventListener('pointerlockchange', () => {
      this.locked = document.pointerLockElement === canvas;
      document.querySelector('#start').hidden = this.locked || world.complete;
    });
    document.addEventListener('mousemove', e => {
      if (!this.locked) return;
      this.euler.setFromQuaternion(this.camera.quaternion, 'YXZ');
      this.euler.y -= e.movementX * .0023;
      this.euler.x = THREE.MathUtils.clamp(this.euler.x - e.movementY * .0023, -Math.PI / 2 + .02, Math.PI / 2 - .02);
      this.euler.z = 0;
      this.camera.quaternion.setFromEuler(this.euler);
    });
    document.addEventListener('mousedown', e => {
      if (!this.locked) return;
      if (e.button === 0 || e.button === 2) this.world.shoot(e.button === 0 ? 0 : 1);
    });
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if (['Space', 'KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) e.preventDefault();
      this.keys.add(e.code);
      if (e.repeat || !this.locked) return;
      if (e.code === 'KeyE') this.world.toggleCube();
      if (e.code === 'KeyF') this.world.throwCube();
      if (e.code === 'Space' && this.onGround()) {
        this.world.player.velocity.y = 7;
      }
    });
    document.addEventListener('keyup', e => this.keys.delete(e.code));
    window.addEventListener('blur', () => this.keys.clear());
  }

  onGround() {
    const body = this.world.player;
    for (const contact of this.world.physics.contacts) {
      if (contact.bi !== body && contact.bj !== body) continue;
      // Cannon's contact normal points from bi toward bj.
      const sign = contact.bi === body ? -1 : 1;
      if (contact.ni.y * sign > .55) return true;
    }
    return false;
  }

  update(dt) {
    if (!this.locked) return;
    const body = this.world.player;
    if (this.releaseMomentum > 0) { this.releaseMomentum -= dt; return; }
    const forward = new THREE.Vector3();
    this.camera.getWorldDirection(forward);
    forward.y = 0;
    if (forward.lengthSq() < .01) forward.set(0, 0, -1);
    forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();
    const z = Number(this.keys.has('KeyW') || this.keys.has('ArrowUp')) - Number(this.keys.has('KeyS') || this.keys.has('ArrowDown'));
    const x = Number(this.keys.has('KeyD') || this.keys.has('ArrowRight')) - Number(this.keys.has('KeyA') || this.keys.has('ArrowLeft'));
    const input = forward.multiplyScalar(z).addScaledVector(right, x);
    if (input.lengthSq() > 1) input.normalize();
    const ground = this.onGround();
    const smoothing = 1 - Math.exp(-dt * (ground ? 12 : 2.2));
    const speed = 5.3;
    body.velocity.x += (input.x * speed - body.velocity.x) * smoothing;
    body.velocity.z += (input.z * speed - body.velocity.z) * smoothing;
  }
}
