import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import Game from './game.js'
import { LAYER_WORLD } from './portal/constants.js'

export default class Camera {
  constructor() {
    this.game = new Game()
    this.sizes = this.game.sizes
    this.scene = this.game.scene

    this.setInstance()
  }

  setInstance() {
    // near is kept tight so the portal render-fix mesh has something to sit on
    this.instance = new THREE.PerspectiveCamera(75, this.sizes.aspect, 0.05, 220)
    this.instance.position.set(0, 1.7, 8)
    this.instance.rotation.reorder('YXZ')
    this.instance.layers.set(LAYER_WORLD)
    this.scene.add(this.instance)

    // the camera used for views beyond a portal; never added to the scene graph
    this.virtual = new THREE.PerspectiveCamera(75, this.sizes.aspect, 0.05, 220)
    this.virtual.matrixAutoUpdate = true
    this.virtual.layers.set(LAYER_WORLD)

    // PointerLockControls reads camera.quaternion on every mouse move, which is
    // exactly what lets portal traversal re-aim the view externally.
    this.controls = new PointerLockControls(this.instance, this.game.canvas)
  }

  resize() {
    const aspect = this.sizes.aspect
    this.instance.aspect = aspect
    this.instance.updateProjectionMatrix()
    this.virtual.aspect = aspect
    this.virtual.updateProjectionMatrix()
  }
}
