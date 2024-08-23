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
        this.scene.add(new THREE.AmbientLight({ color: 0xffffff,intensity:0.2 }))
        const intensity = 20000;
        const pointLight = new THREE.PointLight(0xffffff, intensity);
        pointLight.distance = 1000
        pointLight.position.set(0, 50, 0);
        pointLight.castShadow = true;
        pointLight.layers.enable(1);
        this.scene.add(pointLight);
    }
}