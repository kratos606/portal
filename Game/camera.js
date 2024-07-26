import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import Game from './game.js'

export default class Camera {
    constructor() {
        this.game = new Game()
        this.sizes = this.game.sizes
        this.scene = this.game.scene
        this.canvas = this.game.canvas
        this.setInstance()
        this.setControls()
        this.canvas.onclick = () => {
            this.controls.lock()
            document.body.requestFullscreen()
        }
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000)
        this.instance.position.y = 10
        this.instance.position.z = 10
        this.instance.rotation.reorder('YXZ')
        this.scene.add(this.instance)
    }

    setControls() {
        this.controls = new PointerLockControls(this.instance, this.canvas)
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
}