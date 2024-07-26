import * as THREE from 'three'
import Game from './game.js'

export default class Renderer {
    constructor() {
        this.game = new Game()
        this.canvas = this.game.canvas
        this.sizes = this.game.sizes
        this.scene = this.game.scene
        this.camera = this.game.camera

        this.setInstance()
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            context: this.canvas.getContext('webgl2', {
                stencil: true,
                depth: true,
                powerPreference: 'high-performance',
                antialias: true,
            }),
            powerPreference : 'high-performance',
            stencil:true,
            depth:true,
            antialias:true
        })
        this.instance.autoClear = false
        this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.SRGBColorSpace
        this.instance.toneMapping = THREE.ACESFilmicToneMapping
        this.instance.toneMappingExposure = 0.5
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }
}