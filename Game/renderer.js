import * as THREE from 'three'
import Game from './game.js'

export default class Renderer {
  constructor() {
    this.game = new Game()
    this.canvas = this.game.canvas
    this.sizes = this.game.sizes

    this.setInstance()
  }

  setInstance() {
    // A stencil buffer is mandatory: the whole portal renderer is built on it.
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      powerPreference: 'high-performance',
      antialias: true,
      stencil: true,
      depth: true,
      alpha: false,
      preserveDrawingBuffer: false,
    })

    const gl = this.instance.getContext()
    const stencilBits = gl.getParameter(gl.STENCIL_BITS)
    if (!stencilBits) {
      throw new Error(
        'This browser did not provide a stencil buffer, which the portal renderer requires.'
      )
    }

    // The portal pass drives its own clears; three.js must not clear for us.
    this.instance.autoClear = false
    this.instance.autoClearColor = false
    this.instance.autoClearDepth = false
    this.instance.autoClearStencil = false

    this.instance.outputColorSpace = THREE.SRGBColorSpace
    this.instance.toneMapping = THREE.ACESFilmicToneMapping
    this.instance.toneMappingExposure = 1.05

    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap
    this.instance.shadowMap.autoUpdate = true

    this.instance.setClearColor(0x05070a, 1)
    this.instance.setClearStencil(0)

    // Clip planes are used for portal views and ghost slicing. Keep the count
    // constant so three.js never has to recompile programs mid-frame.
    this.instance.localClippingEnabled = true

    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height)
    this.instance.setPixelRatio(this.sizes.pixelRatio)
  }
}
