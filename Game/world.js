import * as THREE from 'three';
import CANNON from 'cannon';
import { PortalSystem, PORTAL_WIDTH, PORTAL_HEIGHT } from './portals.js';

const stone = new THREE.MeshStandardMaterial({ color: 0xcbd2cc, roughness: .88 });
const panelLight = new THREE.MeshStandardMaterial({ color: 0xe4e7e0, roughness: .72 });
const dark = new THREE.MeshStandardMaterial({ color: 0x303d40, roughness: .85, metalness: .45 });
const orange = new THREE.MeshStandardMaterial({ color: 0xffac47, emissive: 0x7b2f0c, emissiveIntensity: .7 });

export default class World {
  constructor(scene, camera, renderer) {
    this.scene = scene;
    this.camera = camera;
    this.renderer = renderer;
    this.physics = new CANNON.World();
    this.physics.gravity.set(0, -19, 0);
    this.physics.broadphase = new CANNON.NaiveBroadphase();
    this.physics.solver.iterations = 12;
    // Cannon's default friction suppresses virtually all FPS horizontal motion.
    // Give the player frictionless contact and the cube its own grippy material.
    this.physics.defaultContactMaterial.friction = 0;
    this.cubeMaterial = new CANNON.Material('cube');
    this.physics.addContactMaterial(new CANNON.ContactMaterial(this.cubeMaterial, this.physics.defaultMaterial, { friction: .55, restitution: .04 }));
    this.physics.defaultContactMaterial.restitution = .05;
    this.panels = [];
    this.shootables = [];
    this.raycaster = new THREE.Raycaster();
    this.portals = new PortalSystem(scene, renderer, camera, this);
    this.held = false;
    this.complete = false;
    this.doorOpen = false;
    this.buildChamber();
    this.createCube();
    this.createPlayer();
    this.portals.resize(window.innerWidth, window.innerHeight);
    // Two linked portals make the mechanics usable from the first second.
    this.portals.place(0, this.dividerFront, new THREE.Vector3(0, 1.35, .13), false);
    this.portals.place(1, this.rearPanel, new THREE.Vector3(-3.5, 1.35, -12.99), false);
  }

  addBlock(w, h, d, x, y, z, material = dark) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z);
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    this.scene.add(mesh);
    return mesh;
  }

  // Panel local +Z is the playable side. Rebuilding both visual tiles and
  // collision slabs leaves a real physical hole, rather than disabling a wall.
  addPanel(name, width, height, position, quaternion, material = panelLight) {
    const mesh = new THREE.Group();
    mesh.position.copy(position);
    mesh.quaternion.copy(quaternion);
    this.scene.add(mesh);
    const panel = { name, width, height, mesh, material, slabs: [], bodies: [], normal: new THREE.Vector3(0, 0, 1).applyQuaternion(quaternion) };
    this.panels.push(panel);
    this.rebuildPanel(panel);
    return panel;
  }

  rebuildPanel(panel) {
    for (const child of panel.slabs) {
      panel.mesh.remove(child);
      const i = this.shootables.indexOf(child);
      if (i !== -1) this.shootables.splice(i, 1);
      child.geometry.dispose();
    }
    for (const body of panel.bodies) this.physics.removeBody(body);
    panel.slabs = []; panel.bodies = [];
    const w = panel.width, h = panel.height;
    // Both sides of the divider share the same holes. Partition into cells
    // so two portals on opposite faces can make distinct openings.
    const cuts = this.portals.portals.filter(p => p && (p.panel === panel || p.panel === panel.opposite))
      .map(p => panel.mesh.worldToLocal(p.group.position.clone()));
    const apertureW = PORTAL_WIDTH + .12, apertureH = PORTAL_HEIGHT + .20;
    const xs = [-w / 2, w / 2], ys = [-h / 2, h / 2];
    for (const cut of cuts) {
      xs.push(Math.max(-w / 2, cut.x - apertureW / 2), Math.min(w / 2, cut.x + apertureW / 2));
      ys.push(Math.max(-h / 2, cut.y - apertureH / 2), Math.min(h / 2, cut.y + apertureH / 2));
    }
    xs.sort((a, b) => a - b); ys.sort((a, b) => a - b);
    const regions = [];
    for (let ix = 0; ix < xs.length - 1; ix++) for (let iy = 0; iy < ys.length - 1; iy++) {
      const mx = (xs[ix] + xs[ix + 1]) / 2, my = (ys[iy] + ys[iy + 1]) / 2;
      if (!cuts.some(c => Math.abs(mx - c.x) < apertureW / 2 && Math.abs(my - c.y) < apertureH / 2))
        regions.push([xs[ix], xs[ix + 1], ys[iy], ys[iy + 1]]);
    }
    for (const [left, right, bottom, top] of regions) {
      if (right - left < .005 || top - bottom < .005) continue;
      const cx = (left + right) / 2, cy = (bottom + top) / 2;
      const sw = right - left, sh = top - bottom;
      const slab = new THREE.Mesh(new THREE.BoxGeometry(sw, sh, .26), panel.material);
      slab.position.set(cx, cy, -.13);
      slab.receiveShadow = true;
      slab.userData.panel = panel;
      panel.mesh.add(slab);
      panel.slabs.push(slab);
      this.shootables.push(slab);
      const center = new THREE.Vector3(cx, cy, -.13).applyQuaternion(panel.mesh.quaternion).add(panel.mesh.position);
      const body = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(sw / 2, sh / 2, .13)) });
      body.position.set(center.x, center.y, center.z);
      body.quaternion.set(panel.mesh.quaternion.x, panel.mesh.quaternion.y, panel.mesh.quaternion.z, panel.mesh.quaternion.w);
      this.physics.addBody(body);
      panel.bodies.push(body);
    }
  }

  buildChamber() {
    this.scene.background = new THREE.Color(0x101d21);
    this.scene.fog = new THREE.Fog(0x101d21, 30, 55);
    this.scene.add(new THREE.HemisphereLight(0xd9efff, 0x3d4844, 2.2));
    for (const [x, z] of [[-5, 7], [5, 7], [-5, -7], [5, -7]]) {
      const lamp = new THREE.PointLight(0xe3f3f5, 38, 12);
      lamp.position.set(x, 5.5, z);
      this.scene.add(lamp);
      this.addBlock(2.8, .08, .7, x, 5.92, z, new THREE.MeshBasicMaterial({ color: 0xe6f9ff }));
    }
    const q = (axis, angle) => new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(...axis), angle);
    const identity = new THREE.Quaternion();
    this.addPanel('floor', 18, 26, new THREE.Vector3(0, 0, 0), q([1, 0, 0], -Math.PI / 2), stone);
    this.addPanel('ceiling', 18, 26, new THREE.Vector3(0, 6, 0), q([1, 0, 0], Math.PI / 2));
    this.addPanel('west', 26, 6, new THREE.Vector3(-9, 3, 0), q([0, 1, 0], Math.PI / 2));
    this.addPanel('east', 26, 6, new THREE.Vector3(9, 3, 0), q([0, 1, 0], -Math.PI / 2));
    this.addPanel('entrance', 18, 6, new THREE.Vector3(0, 3, 13), q([0, 1, 0], Math.PI));
    this.dividerFront = this.addPanel('divider front', 18, 6, new THREE.Vector3(0, 3, .13), identity);
    this.dividerBack = this.addPanel('divider back', 18, 6, new THREE.Vector3(0, 3, -.13), q([0, 1, 0], Math.PI));
    this.dividerFront.opposite = this.dividerBack;
    this.dividerBack.opposite = this.dividerFront;
    this.rearPanel = this.addPanel('exit wall', 11.8, 6, new THREE.Vector3(-3.1, 3, -13), identity);
    this.addPanel('exit right', 3.4, 6, new THREE.Vector3(7.3, 3, -13), identity);
    this.addPanel('exit header', 2.8, 3, new THREE.Vector3(4.2, 4.5, -13), identity);
    this.door = this.addBlock(2.78, 3, .22, 4.2, 1.5, -13, dark);
    this.doorBody = new CANNON.Body({ mass: 0, shape: new CANNON.Box(new CANNON.Vec3(1.39, 1.5, .11)) });
    this.doorBody.position.set(4.2, 1.5, -13);
    this.physics.addBody(this.doorBody);
    this.addBlock(3, .12, .4, 4.2, 3.1, -12.9, orange);
    this.addBlock(1.4, .15, 1.4, 4.1, .08, -7, dark);
    this.plate = this.addBlock(1.05, .055, 1.05, 4.1, .19, -7, orange);
    this.plateLight = new THREE.PointLight(0xff9b35, 2, 3);
    this.plateLight.position.set(4.1, .4, -7);
    this.scene.add(this.plateLight);
    // Repeating tile seams, restrained architectural stripes and glowing trim.
    for (let x = -8; x <= 8; x += 2) for (let z = -12; z <= 12; z += 2) {
      const tile = new THREE.Mesh(new THREE.PlaneGeometry(1.94, 1.94), new THREE.MeshStandardMaterial({ color: (x + z) % 4 ? 0xb5beb9 : 0xa9b5b0, roughness: .95 }));
      tile.rotation.x = -Math.PI / 2; tile.position.set(x, .004, z);
      tile.receiveShadow = true; this.scene.add(tile);
    }
    for (const z of [-12.7, -1, 12.7]) {
      this.addBlock(17.7, .1, .07, 0, 4.6, z, dark);
      this.addBlock(17.7, .035, .08, 0, 4.48, z, new THREE.MeshBasicMaterial({ color: 0x71b9c1 }));
    }
    this.label('01 / RELAXATION VAULT', 0, 4.9, .32, 4.2);
    this.label('WEIGHTED STORAGE CUBE', -4, 3, 12.82, 2.7, true);
    this.label('EXIT', 4.2, 3.55, -12.7, 1.8);
    // A small corridor behind the exit makes reaching the threshold readable.
    this.addBlock(3, .2, 3, 4.2, -.1, -14.3, stone);
    this.addBlock(.2, 3, 3, 2.7, 1.5, -14.3, dark);
    this.addBlock(.2, 3, 3, 5.7, 1.5, -14.3, dark);
  }

  label(text, x, y, z, width, reverse = false) {
    const canvas = document.createElement('canvas');
    canvas.width = 1024; canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#2d3b3d'; ctx.fillRect(0, 0, 1024, 128);
    ctx.fillStyle = '#c8e0e1'; ctx.font = 'bold 47px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(text, 512, 67);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, width / 8), new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }));
    mesh.position.set(x, y, z);
    if (reverse) mesh.rotation.y = Math.PI;
    this.scene.add(mesh);
  }

  createCube() {
    this.cube = new THREE.Group();
    const shell = new THREE.Mesh(new THREE.BoxGeometry(.69, .69, .69), dark);
    shell.castShadow = true; this.cube.add(shell);
    for (const [axis, side] of [['x', -1], ['x', 1], ['y', -1], ['y', 1], ['z', -1], ['z', 1]]) {
      const face = new THREE.Mesh(new THREE.BoxGeometry(.47, .47, .02), new THREE.MeshStandardMaterial({ color: 0xe4e8dc, emissive: 0x45220d, emissiveIntensity: .25, roughness: .65 }));
      if (axis === 'x') { face.rotation.y = Math.PI / 2; face.position.x = side * .36; }
      if (axis === 'y') { face.rotation.x = Math.PI / 2; face.position.y = side * .36; }
      if (axis === 'z') face.position.z = side * .36;
      this.cube.add(face);
    }
    this.scene.add(this.cube);
    this.cubeBody = new CANNON.Body({ mass: 2, material: this.cubeMaterial, shape: new CANNON.Box(new CANNON.Vec3(.35, .35, .35)), linearDamping: .015, angularDamping: .18 });
    this.cubeBody.position.set(-3, 1.3, 7);
    this.physics.addBody(this.cubeBody);
  }

  createPlayer() {
    this.player = new CANNON.Body({ mass: 5, fixedRotation: true, linearDamping: .015 });
    // Body origin stays near the eyes/torso; the sphere is offset to the feet.
    this.player.addShape(new CANNON.Sphere(.38), new CANNON.Vec3(0, -.55, 0));
    this.player.position.set(0, 1.1, 9);
    this.physics.addBody(this.player);
    this.camera.position.set(0, 1.72, 9);
    this.controls = null;
  }

  shoot(index) {
    this.camera.getWorldDirection(this.raycaster.ray.direction);
    this.raycaster.ray.origin.copy(this.camera.position);
    this.raycaster.far = 45;
    const hits = this.raycaster.intersectObjects(this.shootables, false);
    // A solid door or cube should block a shot, too.
    const blocker = this.raycaster.intersectObject(this.door, false)[0];
    const cubeBlocker = this.raycaster.intersectObject(this.cube, true)[0];
    if (!hits.length || (!this.doorOpen && blocker && blocker.distance < hits[0].distance) ||
        (cubeBlocker && cubeBlocker.distance < hits[0].distance)) return false;
    const hit = hits[0];
    const panel = hit.object.userData.panel;
    if (this.raycaster.ray.direction.dot(panel.normal) > -.05) return false; // back face
    return this.portals.place(index, panel, hit.point);
  }

  toggleCube() {
    if (this.complete) return;
    if (this.held) {
      this.held = false;
      this.cubeBody.type = CANNON.Body.DYNAMIC;
      this.cubeBody.collisionResponse = true;
      this.cubeBody.updateMassProperties();
      const dir = new THREE.Vector3(); this.camera.getWorldDirection(dir);
      this.cubeBody.velocity.set(this.player.velocity.x + dir.x * 3, this.player.velocity.y + dir.y * 3 + 1, this.player.velocity.z + dir.z * 3);
      this.onCube(false);
    } else if (this.camera.position.distanceTo(this.cube.position) < 2.5) {
      this.held = true;
      this.cubeBody.type = CANNON.Body.KINEMATIC;
      this.cubeBody.collisionResponse = false;
      this.cubeBody.velocity.setZero();
      this.cubeBody.angularVelocity.setZero();
      this.onCube(true);
    }
  }

  throwCube() {
    if (!this.held) return;
    this.toggleCube();
    const dir = new THREE.Vector3(); this.camera.getWorldDirection(dir);
    this.cubeBody.velocity.set(this.player.velocity.x + dir.x * 10, this.player.velocity.y + dir.y * 10 + 2, this.player.velocity.z + dir.z * 10);
  }

  update(dt) {
    dt = Math.min(dt, .05);
    this.portals.clock += dt;
    const prevPlayer = new THREE.Vector3(this.player.position.x, this.player.position.y, this.player.position.z);
    const prevCube = new THREE.Vector3(this.cubeBody.position.x, this.cubeBody.position.y, this.cubeBody.position.z);
    if (this.held) {
      const target = new THREE.Vector3(0, -.16, -1.5).applyQuaternion(this.camera.quaternion).add(this.camera.position);
      this.cubeBody.position.set(target.x, target.y, target.z);
      this.cubeBody.velocity.setZero();
    }
    this.physics.step(1 / 60, dt, 4);
    this.portals.check(this.player, null, prevPlayer, .38, true);
    if (!this.held) this.portals.check(this.cubeBody, this.cube, prevCube, .48);
    this.camera.position.set(this.player.position.x, this.player.position.y + .62, this.player.position.z);
    this.cube.position.set(this.cubeBody.position.x, this.cubeBody.position.y, this.cubeBody.position.z);
    this.cube.quaternion.set(this.cubeBody.quaternion.x, this.cubeBody.quaternion.y, this.cubeBody.quaternion.z, this.cubeBody.quaternion.w);
    if (!this.doorOpen && !this.held && Math.abs(this.cube.position.x - 4.1) < .72 && Math.abs(this.cube.position.z + 7) < .72 && this.cube.position.y < .8) {
      this.doorOpen = true;
      this.physics.removeBody(this.doorBody);
      this.door.visible = false;
      this.plate.material = new THREE.MeshStandardMaterial({ color: 0x65e6b2, emissive: 0x17865d, emissiveIntensity: 1 });
      this.plateLight.color.set(0x65e6b2);
      document.querySelector('#objective').textContent = 'EXIT OPEN  /  Proceed through the door';
      this.sound(660);
    }
    if (this.doorOpen && this.player.position.z < -13.6 && this.player.position.x > 2.8 && !this.complete) {
      this.complete = true;
      document.querySelector('#complete').hidden = false;
      document.exitPointerLock?.();
      this.sound(880);
    }
    if (this.player.position.y < -15) {
      this.player.position.set(0, 1.1, 9);
      this.player.velocity.setZero();
    }
  }

  sound(freq = 440) {
    try {
      this.audio ??= new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = this.audio.createOscillator(), gain = this.audio.createGain();
      oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(freq, this.audio.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(freq * .55, this.audio.currentTime + .16);
      gain.gain.setValueAtTime(.06, this.audio.currentTime);
      gain.gain.exponentialRampToValueAtTime(.001, this.audio.currentTime + .18);
      oscillator.connect(gain).connect(this.audio.destination);
      oscillator.start(); oscillator.stop(this.audio.currentTime + .18);
    } catch { /* audio unavailable */ }
  }

  onPortalPlaced(index) {
    const dot = document.querySelector(index ? '#orange-indicator' : '#blue-indicator');
    dot.classList.add('fired');
    this.sound(index ? 360 : 520);
  }
  onTeleport(isPlayer) { if (isPlayer) this.sound(310); }
  onCube(held) { document.querySelector('#carry').textContent = held ? 'CUBE HELD  ·  E DROP  ·  F THROW' : 'E  PICK UP CUBE'; this.sound(held ? 500 : 300); }
}
