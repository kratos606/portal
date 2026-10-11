import * as THREE from 'three'
import Game from './game.js'
import { ROOM } from './Level.js'

/**
 * Test-chamber lighting.
 *
 * One shadow-casting directional light with a tight ortho frustum, plus a
 * hemisphere fill and two practicals. Shadows are the single biggest frame cost
 * in a scene like this, so there is exactly one shadow map and it is sized to
 * the room rather than to the far plane.
 */
export default class Environment {
  constructor() {
    this.game = new Game()
    this.scene = this.game.scene
    this.setLights()
  }

  setLights() {
    const hemi = new THREE.HemisphereLight(0xbcd4ee, 0x2a2f36, 0.55)
    this.scene.add(hemi)

    const key = new THREE.DirectionalLight(0xffffff, 2.1)
    key.position.set(8, 18, 10)
    key.castShadow = true
    key.shadow.mapSize.set(2048, 2048)
    key.shadow.camera.near = 1
    key.shadow.camera.far = 60
    const r = Math.max(ROOM.halfX, ROOM.halfZ) + 2
    key.shadow.camera.left = -r
    key.shadow.camera.right = r
    key.shadow.camera.top = r
    key.shadow.camera.bottom = -r
    key.shadow.bias = -0.0006
    key.shadow.normalBias = 0.02
    this.scene.add(key)
    this.scene.add(key.target)

    const fill = new THREE.DirectionalLight(0x9fc4ff, 0.35)
    fill.position.set(-10, 6, -8)
    this.scene.add(fill)

    // ceiling practicals
    const warm = new THREE.PointLight(0xffe6c0, 26, 26, 2)
    warm.position.set(-7.5, 7.2, -7.5)
    this.scene.add(warm)

    const cool = new THREE.PointLight(0xbfe0ff, 22, 26, 2)
    cool.position.set(7.5, 7.2, 7.5)
    this.scene.add(cool)

    this.scene.fog = new THREE.Fog(0x0a0e14, 34, 92)
    this.scene.background = new THREE.Color(0x05070a)
  }
}
