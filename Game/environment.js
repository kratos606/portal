import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import Game from "./game"

export default class Environment {
    constructor() {
        this.game = new Game()
        this.scene = this.game.scene
        this.setLight()
    }
    setLight() {
        RectAreaLightUniformsLib.init();
        this.scene.add(new THREE.AmbientLight({ color: 0x000000 }))
        const width = 24;
        const height = 48;
        const intensity = 3;
        const rectLight = new THREE.RectAreaLight(0xffffff, intensity, width, height);
        rectLight.position.set(0, 29.9, 0);
        rectLight.lookAt(0, 0, 0);
        rectLight.castShadow = true
        rectLight.layers.enable(1)
        this.scene.add(rectLight)
    }
}