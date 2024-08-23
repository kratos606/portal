import * as THREE from 'three';
import CANNON from 'cannon';
import Game from './game';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export default class FirstPersonControl {
    constructor() {
        this.game = new Game();
        this.camera = this.game.camera.instance;
        this.domElement = this.game.canvas;
        this.enabled = false;
        this.xSpeed = 0.5;
        this.ySpeed = 0.5;
        this.yMinLimit = -90;
        this.yMaxLimit = 90;
        this.x = 0;
        this.y = 0;
        this.active = 0;
        this.velocity = new THREE.Vector3();
        this.vector = new THREE.Vector3();
        this.teleportAngle = 0;
        this.isJumping = true;
        this.teleportPosition = new CANNON.Vec3(0, 10, 0);
        this.previousPosition = new THREE.Vector3();
        this.isMoving = false;

        this.pressedKeys = {};

        this.cameraBody = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(0.1, 10, 0.1)),
            position: new CANNON.Vec3(0, 10, 0),
            material: this.game.world.defaultMaterial
        });
        this.cameraBody.linearDamping = 0.99;
        this.cameraBody.angularDamping = 1; // Prevent rotation

        this.cameraBody.fixedRotation = true; // Fix rotation
        this.cameraBody.updateMassProperties(); // Update mass properties

        this.cameraBody.class = 'camera';
        this.cameraBody.addEventListener('collide', (event) => {
            if (event.body.class === 'portal') {
                this.game.world.collisionDetected = true;
            }
        });
        this.game.world.physics.addBody(this.cameraBody);

        const loader = new GLTFLoader();
        loader.load('/lara webp (1024).glb', (gltf) => {
            this.model = gltf.scene;
            this.model.scale.set(6, 6, 6);
            this.model.rotation.y = 1;
            this.game.scene.add(this.model);

            this.model.traverse(function (object) {
                object.class = 'player'
                if (object.isMesh) object.castShadow = true;
            });

            this.skeleton = new THREE.SkeletonHelper(this.model);
            this.skeleton.visible = false;
            this.game.scene.add(this.skeleton);

            const animations = gltf.animations;

            this.mixer = new THREE.AnimationMixer(this.model);

            this.idleAction = this.mixer.clipAction(animations[1]);
            this.walkAction = this.mixer.clipAction(animations[4]);
            this.runAction = this.mixer.clipAction(animations[0]);
            this.leftAction = this.mixer.clipAction(animations[3]);
            this.rightAction = this.mixer.clipAction(animations[2]);

            this.actions = {
                'idle': this.idleAction,
                'walk': this.walkAction,
                'back': this.runAction,
                'left': this.leftAction,
                'right': this.rightAction
            };

            this.activeAction = this.idleAction;
            this.fadeToAction('idle', 0.2);
        });
        loader.load('/portal_gun.glb',(gltf) => {
            this.model2 = gltf.scene;
            this.model2.scale.set(0.04, 0.04, 0.04);
            this.model2.traverse((child)=>{
                child.layers.enable(1)
            })
            this.game.scene.add(this.model2);
        })

        let upVector = new CANNON.Vec3(0, 1, 0);
        let contactNormal = new CANNON.Vec3(0, 0, 0);

        this.game.world.physics.addEventListener("postStep", (e) => {
            this.isJumping = true; // Assume jumping until proven otherwise
            if (this.game.world.physics.contacts.length > 0) {
                for (let contact of this.game.world.physics.contacts) {
                    if (contact.bi.class == 'camera' || contact.bj.class == 'camera') {
                        if (contact.bi.class == 'camera') {
                            contactNormal = new CANNON.Vec3().copy(contact.ni).scale(-1);
                        } else {
                            contactNormal = new CANNON.Vec3().copy(contact.ni);
                        }
                        const collisionResponse = contact.bi.collisionResponse && contact.bj.collisionResponse;
                        this.isJumping = !(collisionResponse && contactNormal.dot(upVector) > 0.5);
                    }
                }
            }
        });

        this.controls = new PointerLockControls(this.camera, document.body);
        this.initEventListeners();
    }

    initEventListeners() {
        document.addEventListener('fullscreenchange', this.onFullScreenChange.bind(this));
        this.domElement.addEventListener('click', this.requestPointerLock.bind(this));
        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    teleportCamera() {
        if (this.game.world.active === 'leftportal') {
            this.cameraBody.position.copy(this.game.world.rightPortalPosition);
        } else if (this.game.world.active === 'rightportal') {
            this.cameraBody.position.copy(this.game.world.leftPortalPosition);
        }
    }

    onKeyDown(event) {
        this.pressedKeys[event.keyCode] = true;
        this.updateMovementAndAnimation();
    }

    onKeyUp(event) {
        delete this.pressedKeys[event.keyCode];
        this.updateMovementAndAnimation();
    }

    updateMovementAndAnimation() {
        let newVelocityX = 0;
        let newVelocityZ = 0;
        let newAction = 'idle';

        if (87 in this.pressedKeys) { // W
            newVelocityZ = -1;
            newAction = 'walk';
        }
        if (83 in this.pressedKeys) { // S
            newVelocityZ = 1;
            newAction = 'back';
        }
        if (65 in this.pressedKeys) { // A
            newVelocityX = -1;
            newAction = 'right';
        }
        if (68 in this.pressedKeys) { // D
            newVelocityX = 1;
            newAction = 'left';
        }
        if(32 in this.pressedKeys) {
            this.jump()
        }

        if (newVelocityX !== 0 && newVelocityZ !== 0) {
            newVelocityX *= 0.7071; // Normalize speed when moving diagonally
            newVelocityZ *= 0.7071;
        }

        this.velocity.x = newVelocityX;
        this.velocity.z = newVelocityZ;

        if (this.velocity.x === 0 && this.velocity.z === 0) {
            newAction = 'idle';
        }

        this.fadeToAction(newAction, 0.2);
    }

    jump() {
        if (!this.enabled || this.isJumping) return;
        this.cameraBody.applyImpulse(new CANNON.Vec3(0, 20, 0), this.cameraBody.position);
        this.isJumping = true;
    }

    onFullScreenChange() {
        this.enabled = document.fullscreenElement === document.body;
    }

    requestPointerLock() {
        this.controls.lock();
    }

    moveForward(distance) {
        if (!this.enabled) return;

        const verticalRotation = new THREE.Quaternion();
        const euler = new THREE.Euler();
        euler.setFromQuaternion(this.camera.quaternion, 'YXZ');
        euler.x = 0;
        euler.z = 0;
        verticalRotation.setFromEuler(euler);
        this.cameraBody.quaternion.copy(verticalRotation);

        const forward = new CANNON.Vec3();
        this.cameraBody.quaternion.vmult(new CANNON.Vec3(0, 0, -1), forward);
        forward.normalize();

        const newVelocity = forward.scale(distance);
        this.cameraBody.position.vadd(newVelocity, this.cameraBody.position);
    }

    moveRight(distance) {
        if (!this.enabled) return;

        const verticalRotation = new THREE.Quaternion();
        const euler = new THREE.Euler();
        euler.setFromQuaternion(this.camera.quaternion, 'YXZ');
        euler.x = 0;
        euler.z = 0;
        verticalRotation.setFromEuler(euler);
        this.cameraBody.quaternion.copy(verticalRotation);

        const right = new CANNON.Vec3();
        this.cameraBody.quaternion.vmult(new CANNON.Vec3(1, 0, 0), right);
        right.normalize();

        const newVelocity = right.scale(distance);
        this.cameraBody.position.vadd(newVelocity, this.cameraBody.position);
    }

    fadeToAction(name, duration) {
        const previousAction = this.activeAction;
        this.activeAction = this.actions[name];

        if (previousAction !== this.activeAction) {
            if (previousAction) {
                previousAction.fadeOut(duration);
            }
            this.activeAction
                .reset()
                .setEffectiveTimeScale(1)
                .setEffectiveWeight(1)
                .fadeIn(duration)
                .play();
        }
    }

    update(timeElapsedS) {
        if (this.mixer) {
            this.mixer.update(this.game.time.delta / 1000);
        }
        this.moveForward(-this.velocity.z / 3);
        this.moveRight(this.velocity.x / 3);
        this.camera.position.copy(this.cameraBody.position);

        // Synchronize gun model with the camera
        if (this.model2) {
            const cameraPosition = this.camera.position.clone();
            const cameraQuaternion = this.camera.quaternion.clone();
            const gunOffset = new THREE.Vector3(2, -1.5, -2); // Adjust the offset as needed

            // Apply the camera's rotation to the offset
            gunOffset.applyQuaternion(cameraQuaternion);

            // Position the gun relative to the camera
            this.model2.position.copy(cameraPosition).add(gunOffset);
            this.model2.quaternion.copy(cameraQuaternion);
        }

        this.previousPosition.copy(this.camera.position);

        if (this.model) {
            let cameraPosition = this.camera.position.clone();
            let cameraRotationY = Math.atan2(this.camera.matrix.elements[8], this.camera.matrix.elements[10]);
            let rotationMatrix = new THREE.Matrix4().makeRotationY(cameraRotationY);
            let relativePosition = new THREE.Vector3(2, -10, 2.5);
            relativePosition.applyMatrix4(rotationMatrix);
            this.model.position.copy(cameraPosition).add(relativePosition);
            this.model.rotation.y = cameraRotationY;
        }

        if (!this.isJumping) {
            this.cameraBody.linearDamping = 0.99
        } else {
            this.cameraBody.linearDamping = 0
        }

        if(this.cameraBody.velocity.y > 50){
            this.cameraBody.velocity.y = 5
        }

        // Keep player upright
        this.cameraBody.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), this.camera.rotation.y);
    }
}
