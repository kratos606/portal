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
    }
}
