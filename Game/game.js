import * as THREE from 'three'
import Camera from './camera'
import Renderer from './renderer'
import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Stats from './Utils/stats.js'
import World from './world'
import Environment from './environment'
import FirstPersonControls from './controls'
import Resources from './Utils/Resources.js'
import sources from './sources.js'

export default class Game {
    static instance
    constructor(canvas) {
        if (Game.instance) {
            return Game.instance
        }
        Game.instance = this
        this.canvas = canvas
        this.time = new Time()
        this.sizes = new Sizes()
        this.scene = new THREE.Scene()
        this.renderer = new Renderer()
        this.resources = new Resources(sources)
        this.stats = new Stats(true)
        this.camera = new Camera()
        this.world = new World()
        this.controls = new FirstPersonControls()
        this.environment = new Environment()
        this.sizes.on('resize', () => {
            this.resize()
        })
        this.update()
    }
    resize() {
        this.renderer.resize()
        this.camera.resize()
    }
    update() {
        if (this.controls) {
            this.controls.update(this.time.elapsed)
        }
        if (this.stats) {
            this.stats.update()
        }
        if (this.world) {
            this.world.update()
        }
        window.requestAnimationFrame(() => {
            this.update()
        })
    }
}