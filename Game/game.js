import * as THREE from 'three'
import Time from './Utils/Time.js'
import Sizes from './Utils/Sizes.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import UI from './ui/UI.js'
import Camera from './camera.js'
import Renderer from './renderer.js'
import Environment from './environment.js'
import World from './world.js'
import Controls from './controls.js'

/**
 * Game shell.
 *
 * Owns the frame loop and the four states the UI can be in:
 *   loading -> menu -> playing <-> paused
 *
 * Subsystems reach it through the singleton (`new Game()` returns the existing
 * instance), which keeps the constructor order the only thing that has to be
 * got right: physics before world, camera before world, world before controls.
 */
export default class Game {
  static instance

  constructor(canvas) {
    if (Game.instance) return Game.instance
    Game.instance = this

    this.canvas = canvas
    this.state = 'loading'
    this.deltaTime = 1 / 60

    this.time = new Time()
    this.sizes = new Sizes()
    this.scene = new THREE.Scene()
    this.renderer = new Renderer()
    this.ui = new UI()

    this.sizes.on('resize', () => this.resize())

    this.rafId = 0
    this.update = this.update.bind(this)
    this.update()
  }

  // --------------------------------------------------------------------- boot

  async boot() {
    const ui = this.ui

    // --- assets -------------------------------------------------------------
    ui.setProgress(0.02, 'Contacting Aperture Science mainframe…')
    const resources = new Resources(sources)
    this.resources = resources

    resources.on('progress', (fraction, name) => {
      const source = sources.find((s) => s.name === name)
      ui.setProgress(0.05 + fraction * 0.55, `Retrieving ${source?.label ?? name}`)
    })

    if (sources.length > 0) await resources.load()

    // --- chamber ------------------------------------------------------------
    await this.stage(0.62, 'Weaving test chamber surfaces', () => {
      this.camera = new Camera()
      this.environment = new Environment()
    })

    await this.stage(0.78, 'Establishing physics environment', () => {
      this.world = new World()
    })

    await this.stage(0.92, 'Compiling portal render pipeline', () => {
      this.controls = new Controls()
      this.wireEvents()
    })

    // One throwaway frame so every shader variant in use is compiled before the
    // player sees anything — otherwise the first portal stutters.
    ui.setProgress(0.97, 'Precompiling shaders')
    await this.nextFrame()
    this.renderer.instance.compile(this.scene, this.camera.instance)
    await this.nextFrame()

    ui.setProgress(1, 'Ready')
    await this.sleep(260)

    ui.hideLoading()
    this.setState('menu')
  }

  /** Runs a setup step and yields to the browser so the bar can repaint. */
  async stage(fraction, label, fn) {
    this.ui.setProgress(fraction, label)
    await this.nextFrame()
    fn()
    await this.nextFrame()
  }

  nextFrame() {
    return new Promise((resolve) => requestAnimationFrame(() => resolve()))
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  wireEvents() {
    const ui = this.ui

    ui.onStart(() => this.start())
    ui.onResume(() => this.resume())
    ui.onQuit(() => this.toMenu())

    this.controls.on('unlock', () => {
      if (this.state === 'playing') this.pause()
    })
    this.controls.on('teleport', () => {
      ui.setStats('')
    })

    this.onPortalFired = (side, ok) => ui.fire(side, ok)
    this.onPortalFizzle = (reason) => {
      const text = FIZZLE_TEXT[reason]
      if (text) this.flashPrompt(text)
    }
    this.onPortalPlaced = () => this.updatePortalStatus()
    this.onPuzzleSolved = (solved) => {
      ui.setObjective(
        solved
          ? 'Circuit closed. The Enrichment Center thanks you for your cooperation.'
          : 'Route the Thermal Discouragement Beam into the ceiling catch pad.',
        solved
      )
    }
    this.onReset = () => {
      this.updatePortalStatus()
      ui.setObjective('Route the Thermal Discouragement Beam into the ceiling catch pad.', false)
    }

    // clicking the canvas while paused resumes
    this.canvas.addEventListener('click', () => {
      if (this.state === 'paused') this.resume()
    })

    this.world.onPuzzleSolved = null
  }

  // ------------------------------------------------------------------- states

  setState(state) {
    this.state = state
    const ui = this.ui
    if (state === 'menu') ui.showMenu()
    else if (state === 'playing') ui.hideMenu()
  }

  start() {
    this.setState('playing')
    this.controls.lock()
    this.updatePortalStatus()
    this.ui.setObjective('Route the Thermal Discouragement Beam into the ceiling catch pad.', false)
  }

  pause() {
    this.state = 'paused'
    this.ui.showPause()
  }

  resume() {
    this.ui.hidePause()
    this.state = 'playing'
    this.controls.lock()
  }

  toMenu() {
    this.ui.hidePause()
    this.controls.unlock()
    this.setState('menu')
  }

  get isPlaying() {
    return this.state === 'playing' && !!this.controls?.pointerLocked
  }

  // ------------------------------------------------------------------ helpers

  updatePortalStatus() {
    if (!this.world) return
    this.ui.setPortalState('blue', this.world.portals.blue.active)
    this.ui.setPortalState('orange', this.world.portals.orange.active)
  }

  flashPrompt(text) {
    this.ui.setPrompt(text)
    clearTimeout(this._promptTimer)
    this._promptTimer = setTimeout(() => this.ui.setPrompt(null), 1400)
  }

  resize() {
    this.renderer?.resize()
    this.camera?.resize()
  }

  // --------------------------------------------------------------------- loop

  update() {
    this.rafId = requestAnimationFrame(this.update)

    const dt = this.time.update()
    this.deltaTime = dt

    if (this.world) {
      if (this.state === 'playing') this.world.update(dt)
      else this.world.syncMeshes()

      this.world.render()

      const s = this.world.stats
      this.ui.setStats(
        `views ${s.portalViews}  depth ${s.depth}  holes ${s.holesCut}`
      )
      this.ui.updateFps(dt)
    }
  }

  dispose() {
    cancelAnimationFrame(this.rafId)
    this.world?.dispose()
    this.renderer.instance.dispose()
  }
}

const FIZZLE_TEXT = {
  NO_SURFACE: 'Surface does not support portals',
  CANT_FIT: 'Not enough room for a portal there',
  OVERLAP_LINKED: 'Portals would overlap',
  BAD_SURFACE: 'Portal would hang off the edge',
}
