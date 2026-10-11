import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import World from './world.js';
import FirstPersonControls from './controls.js';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, .04, 90);
    this.camera.rotation.order = 'YXZ';
    this.camera.layers.enable(1);
    this.scene.add(this.camera);
    this.loadPortalGun();
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.world = new World(this.scene, this.camera, this.renderer);
    this.controls = new FirstPersonControls(this.world, canvas);
    this.world.controls = this.controls;
    window.addEventListener('resize', () => this.resize());
    this.last = performance.now();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  loadPortalGun() {
    new GLTFLoader().load(`${import.meta.env.BASE_URL}portal_gun.glb`, gltf => {
      const gun = gltf.scene;
      gun.scale.setScalar(.006);
      gun.position.set(.38, -.38, -.76);
      gun.rotation.set(0, Math.PI, 0);
      gun.traverse(child => child.layers.set(1));
      this.camera.add(gun);
    });
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
    this.world.portals.resize(w, h);
  }

  loop(now) {
    const dt = Math.min((now - this.last) / 1000, .05);
    this.last = now;
    this.controls.update(dt);
    this.world.update(dt);
    this.world.portals.render();
    requestAnimationFrame(this.loop);
  }
}
