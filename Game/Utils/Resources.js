import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'

/**
 * Asset loader with real progress.
 *
 * Every source reports byte-level progress, so the loading screen tracks
 * actual download state rather than a fake timer. A failed asset is reported
 * and skipped rather than hanging the boot sequence.
 */
export default class Resources extends EventEmitter {
  constructor(sources) {
    super()
    this.sources = sources
    this.items = {}
    this.errors = []

    this.toLoad = this.sources.length
    this.loaded = 0
    this.bytes = new Map()

    this.loaders = {
      gltfModel: new GLTFLoader(),
      texture: new THREE.TextureLoader(),
      cubeTexture: new THREE.CubeTextureLoader(),
    }
  }

  get progress() {
    if (this.toLoad === 0) return 1
    let byteFraction = 0
    for (const source of this.sources) {
      byteFraction += this.bytes.get(source.name) ?? 0
    }
    return byteFraction / this.toLoad
  }

  /** @returns {Promise<void>} resolves when every source has settled */
  load() {
    if (this.toLoad === 0) return Promise.resolve()

    return new Promise((resolve) => {
      let settled = 0
      const done = () => {
        settled++
        if (settled === this.toLoad) resolve()
      }

      for (const source of this.sources) {
        const loader = this.loaders[source.type]
        if (!loader) {
          console.warn(`Resources: no loader for type "${source.type}"`)
          this.sourceLoaded(source, null)
          done()
          continue
        }

        loader.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file)
            done()
          },
          (event) => {
            if (event.lengthComputable) {
              this.bytes.set(source.name, event.loaded / event.total)
            } else {
              // unknown total: count it as partially in flight
              this.bytes.set(source.name, Math.min(0.9, (this.bytes.get(source.name) ?? 0) + 0.05))
            }
            this.trigger('progress', this.progress, source.name)
          },
          (error) => {
            console.warn(`Resources: failed to load ${source.path}`, error)
            this.errors.push(source)
            this.sourceLoaded(source, null)
            done()
          }
        )
      }
    })
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file
    this.bytes.set(source.name, 1)
    this.loaded++
    this.trigger('progress', this.progress, source.name)
    if (this.loaded === this.toLoad) this.trigger('ready')
  }
}
