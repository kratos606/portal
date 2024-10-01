import * as THREE from "three"
import CANNON from "cannon"
import Game from "./game"
import { GLTFLoader } from "three/examples/jsm/Addons.js";

class Portal {
    constructor(scene, renderer) {
        this.scene = scene;
        this.renderer = renderer;
        this.tmpScene = new THREE.Scene();

        this.rotationYMatrix = new THREE.Matrix4().makeRotationY(Math.PI);
        this.inverse = new THREE.Matrix4();
        this.dstInverse = new THREE.Matrix4();
        this.srcToCam = new THREE.Matrix4();
        this.srcToDst = new THREE.Matrix4();
        this.result = new THREE.Matrix4();

        this.dstRotationMatrix = new THREE.Matrix4();
        this.normal = new THREE.Vector3();
        this.clipPlane = new THREE.Plane();
        this.clipVector = new THREE.Vector4();
        this.q = new THREE.Vector4();
        this.projectionMatrix = new THREE.Matrix4();
        this.cameraInverseViewMat = new THREE.Matrix4();

        this.originalCameraMatrixWorld = new THREE.Matrix4();
        this.originalCameraProjectionMatrix = new THREE.Matrix4();

        this.maxRecursion = 2;
    }

    computePortalProjectionMatrix(sourcePortal, viewMat, projMat){
        const destinationPortal = sourcePortal.pair;
        this.cameraInverseViewMat.copy(viewMat).invert();
        this.dstRotationMatrix.identity().extractRotation(destinationPortal.matrixWorld);
  
        // TODO: Use -1 if dot product is negative (?)
        this.normal.set(0, 0, 1).applyMatrix4(this.dstRotationMatrix);
  
        this.clipPlane.setFromNormalAndCoplanarPoint(this.normal, destinationPortal.position);
        this.clipPlane.applyMatrix4(this.cameraInverseViewMat);
  
        this.clipVector.set(
           this.clipPlane.normal.x,
           this.clipPlane.normal.y,
           this.clipPlane.normal.z,
           this.clipPlane.constant,
        );
        this.projectionMatrix.copy(projMat);
  
        this.q.x = (Math.sign(this.clipVector.x) + this.projectionMatrix.elements[8]) / this.projectionMatrix.elements[0];
        this.q.y = (Math.sign(this.clipVector.y) + this.projectionMatrix.elements[9]) / this.projectionMatrix.elements[5];
        this.q.z = -1.0;
        this.q.w = (1.0 + this.projectionMatrix.elements[10]) / projMat.elements[14];
  
        this.clipVector.multiplyScalar(2 / this.clipVector.dot(this.q));
  
        this.projectionMatrix.elements[2] = this.clipVector.x;
        this.projectionMatrix.elements[6] = this.clipVector.y;
        this.projectionMatrix.elements[10] = this.clipVector.z + 1.0;
        this.projectionMatrix.elements[14] = this.clipVector.w;
  
        return this.projectionMatrix;
     }

    computePortalViewMatrix(sourcePortal, viewMat){
        this.srcToCam.multiplyMatrices(this.inverse.copy(viewMat).invert(), sourcePortal.matrixWorld.clone());
        this.dstInverse.copy(sourcePortal.pair.matrixWorld.clone()).invert();
        this.srcToDst.identity().multiply(this.srcToCam).multiply(this.rotationYMatrix).multiply(this.dstInverse);
        this.result.copy(this.srcToDst).invert();
        return this.result;
    }

    renderScene(camera, children, viewMat, projMat){
        this.tmpScene.children = children;
        this.originalCameraMatrixWorld.copy(camera.matrixWorld);
        this.originalCameraProjectionMatrix.copy(camera.projectionMatrix);
        const position = new THREE.Vector3();
        const rotation = new THREE.Quaternion();
        const scale = new THREE.Vector3();
        viewMat.decompose(position, rotation, scale);
        camera.position.copy(position);
        camera.quaternion.copy(rotation);
        camera.matrixWorld.compose(camera.position, camera.quaternion, camera.scale);
        camera.projectionMatrix.copy(projMat);
        camera.updateMatrixWorld(true);
        this.renderer.render(this.tmpScene, camera);
        camera.matrixAutoUpdate = true;
        camera.matrixWorld.copy(this.originalCameraMatrixWorld);
        camera.matrixWorldInverse.copy(this.originalCameraMatrixWorld).invert();
        camera.projectionMatrix.copy(this.originalCameraProjectionMatrix);
    }

    render(camera, recursionLevel = 0, virtualCamera, portals,viewMat,projMat) {
        if (recursionLevel > this.maxRecursion) return;

        const gl = this.renderer.getContext();

        for (let i = 0; i < portals.length; i++) {
            let portal = portals[i];

            gl.colorMask(false, false, false, false);
            gl.depthMask(false);
            gl.disable(gl.DEPTH_TEST);
            gl.enable(gl.STENCIL_TEST);
            gl.stencilFunc(gl.NOTEQUAL, recursionLevel, 0xff);
            gl.stencilOp(gl.INCR, gl.KEEP, gl.KEEP);
            gl.stencilMask(0xff);

            this.renderScene(camera, [portal, camera],viewMat,projMat);

            const destViewMat = this.computePortalViewMatrix(portal, viewMat).clone();
            const destProjMat = this.computePortalProjectionMatrix(portal, destViewMat, projMat).clone();

            if (recursionLevel === this.maxRecursion) {
                gl.colorMask(true, true, true, true);
                gl.depthMask(true);
                this.renderer.clear(false, true, false);
                gl.enable(gl.DEPTH_TEST);
                gl.enable(gl.STENCIL_TEST);
                gl.stencilMask(0x00);
                gl.stencilFunc(gl.EQUAL, recursionLevel + 1, 0xff);
                this.renderScene(virtualCamera, this.scene.children.filter((child) => child!==portal),destViewMat,destProjMat);
            } else {
                this.render(virtualCamera, recursionLevel + 1, virtualCamera, [portal, portal.pair],destViewMat,destProjMat);
            }

            gl.colorMask(false, false, false, false);
            gl.depthMask(false);
            gl.enable(gl.STENCIL_TEST);
            gl.stencilMask(0xff);
            gl.stencilFunc(gl.NOTEQUAL, recursionLevel + 1, 0xFF);
            gl.stencilOp(gl.DECR, gl.KEEP, gl.KEEP);

            this.renderScene(camera, [portal, camera],viewMat,projMat);
        }

        gl.disable(gl.STENCIL_TEST);
        gl.stencilMask(0x00);
        gl.colorMask(false, false, false, false);
        gl.enable(gl.DEPTH_TEST);
        gl.depthMask(true);
        gl.depthFunc(gl.ALWAYS);
        this.renderer.clear(false, true, false);

        this.renderScene(camera, [...portals, camera],viewMat,projMat);

        gl.depthFunc(gl.LESS);
        gl.enable(gl.STENCIL_TEST);
        gl.stencilMask(0x00);
        gl.stencilFunc(gl.LEQUAL, recursionLevel, 0xff);
        gl.colorMask(true, true, true, true);
        gl.depthMask(true);
        gl.enable(gl.DEPTH_TEST);

        if(recursionLevel == 0){
            this.renderScene(camera, this.scene.children.filter((child)=>child.class!=='player'),viewMat,projMat);
        }
        else{
            this.renderScene(camera, this.scene.children,viewMat,projMat);
        }
    }
}

const GROUP_DEFAULT = 1 << 0; // 0001
const GROUP_PLAYER  = 1 << 1; // 0010
const GROUP_CUBE    = 1 << 2; // 0100
const GROUP_PORTAL  = 1 << 3; // 1000
const GROUP_WALL    = 1 << 4; // 1 0000

export default class World {
    constructor() {
        this.game = new Game()
        this.scene = this.game.scene
        this.physics = this.initPhysics()
        this.physics.gravity.set(0, -20, 0)
        this.defaultMaterial = new CANNON.Material('default')
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2()
        this.leftPortal = []
        this.rightPortal = []
        this.portalPhysics = false
        this.collisionDetected = false
        this.virtualCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
        this.scene.add(this.virtualCamera)
        this.collisionDetected = false
        this.portalHandler = new Portal(this.scene, this.game.renderer.instance)
        this.active = ''
        this.previousContacts = []
        this.worldBounds = {
            min: new CANNON.Vec3(-100, -100, -100),
            max: new CANNON.Vec3(100, 100, 100)
        }
        const defaultContactMaterial = new CANNON.ContactMaterial(
            this.defaultMaterial,
            this.defaultMaterial,
            {
                friction: 0,
                restitution: 0
            }
        )
        this.physics.defaultContactMaterial = defaultContactMaterial
        window.addEventListener('click', this.shoot.bind(this))

        this.isHoldingCube = false
        this.holdDistance = 10
        this.pickupRange = 20

        this.holdingConstraint = null
        this.holdBody = null

        this.isJumping = true;

        this.onKeyDown = this.onKeyDown.bind(this)
        window.addEventListener('keydown', this.onKeyDown)

        this.setWorld()
        this.createCompanionCube()
        this.loadTextures()

        let upVector = new CANNON.Vec3(0, 1, 0);
        let contactNormal = new CANNON.Vec3(0, 0, 0);

        this.physics.addEventListener("postStep", (e) => {
            this.isJumping = true; // Assume jumping until proven otherwise
            if (this.physics.contacts.length > 0) {
                for (let contact of this.physics.contacts) {
                    if (contact.bi.class == 'companionCube' || contact.bj.class == 'companionCube') {
                        if (contact.bi.class == 'companionCube') {
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
    }

    initPhysics() {
        let world = new CANNON.World()
        world.quatNormalizeSkip = 0
        world.quatNormalizeFast = false

        var solver = new CANNON.GSSolver()

        world.defaultContactMaterial.contactEquationStiffness = 1e9
        world.defaultContactMaterial.contactEquationRelaxation = 4

        solver.iterations = 20
        solver.tolerance = 0.001
        let split = true
        if (split)
            world.solver = new CANNON.SplitSolver(solver)
        else
            world.solver = solver

        world.gravity.set(0, -9.8, 0)
        world.broadphase = new CANNON.NaiveBroadphase()

        return world
    }

    worldToLocal(object, vector) {
        const worldInverse = new THREE.Matrix4().copy(object.matrixWorld).invert()
        return vector.clone().applyMatrix4(worldInverse)
    }

    localToWorld(object, vector) {
        return vector.clone().applyMatrix4(object.matrixWorld)
    }

    shoot(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        this.raycaster.setFromCamera({ x: 0, y: 0 }, this.game.camera.instance);
    
        const intersects = this.raycaster.intersectObjects([
            this.plane, this.roof, this.scene.getObjectByName('backWall'),
            this.scene.getObjectByName('frontWall'), this.scene.getObjectByName('leftWall'),
            this.scene.getObjectByName('rightWall')
        ]);
    
        if (intersects.length > 0) {
            const intersection = intersects[0];
            const object = intersection.object;
    
            const geometry = new THREE.CircleGeometry(5, 32);
            const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const circle = new THREE.Mesh(geometry, material);
    
            const portalSize = new THREE.Vector2(10, 15);
            const halfPortalSize = portalSize.clone().multiplyScalar(0.5);
            const wallSize = new THREE.Vector2(object.geometry.parameters.width, object.geometry.parameters.height);
            const halfWallSize = wallSize.clone().multiplyScalar(0.5);
    
            let localPosition = this.worldToLocal(object, intersection.point);
    
            localPosition.x = THREE.MathUtils.clamp(localPosition.x, -halfWallSize.x + halfPortalSize.x, halfWallSize.x - halfPortalSize.x);
            localPosition.y = THREE.MathUtils.clamp(localPosition.y, -halfWallSize.y + halfPortalSize.y, halfWallSize.y - halfPortalSize.y);
    
            const validPoint = this.localToWorld(object, localPosition);
    
            circle.position.copy(validPoint);
            circle.rotation.copy(object.rotation);
            circle.scale.y = 1.5;
    
            circle.position.addScaledVector(circle.getWorldDirection(new THREE.Vector3()), 0.01);
            
            // Create the physics body for the portal
            this.boxBody = new CANNON.Body({
                collisionFilterGroup: GROUP_PORTAL,
                collisionFilterMask: GROUP_WALL | GROUP_DEFAULT | GROUP_CUBE | GROUP_PLAYER,
            });
            this.boxBody.mass = 0;
            this.boxBody.material = this.defaultMaterial;
            this.boxBody.collisionResponse = false;
            this.boxBody.addShape(new CANNON.Box(new CANNON.Vec3(3.34, 5, 1.5)));
            this.boxBody.quaternion.copy(circle.quaternion);
            this.boxBody.position.copy(circle.position);
            this.boxBody.class = 'portal';
            this.boxBody.object = intersects[0].object;
    
            // Handle the intersection detection with the portal
            let intersectionDetected = false;
            if (event.button === 0) {
                this.rightPortal.forEach((rightPortal) => {
                    if (this.boxBody.object === rightPortal.physicObject.object && this.detectIntersection(this.boxBody, rightPortal.physicObject)) {
                        intersectionDetected = true;
                    }
                });
            } else if (event.button === 2) {
                this.leftPortal.forEach((leftPortal) => {
                    if (this.boxBody.object === leftPortal.physicObject.object && this.detectIntersection(this.boxBody, leftPortal.physicObject)) {
                        intersectionDetected = true;
                    }
                });
            }
    
            if (intersectionDetected) {
                return;
            }
    
            this.physics.addBody(this.boxBody);
            circle.physicObject = this.boxBody;
    
            const geometry1 = new THREE.PlaneGeometry(19, 19);
            let materialPortal;
    
            if (event.button === 0) {
                this.materialBlue = new THREE.ShaderMaterial({
                    uniforms: {
                        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                        iTime: { value: 0 }
                    },
                    vertexShader: document.getElementById('vertexShader').textContent,
                    fragmentShader: document.getElementById('fragmentShaderOrange').textContent
                });
                materialPortal = this.materialBlue;
                this.boxBody.ref = 'left';
                this.leftPortal.push(circle);
            } else if (event.button === 2) {
                this.materialOrange = new THREE.ShaderMaterial({
                    uniforms: {
                        iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                        iTime: { value: 0 }
                    },
                    vertexShader: document.getElementById('vertexShader').textContent,
                    fragmentShader: document.getElementById('fragmentShaderBlue').textContent
                });
                materialPortal = this.materialOrange;
                this.boxBody.ref = 'right';
                this.rightPortal.push(circle);
            }
    
            const planePortal = new THREE.Mesh(geometry1, materialPortal);
            planePortal.position.copy(circle.position);
            planePortal.rotation.copy(circle.rotation);
            planePortal.position.addScaledVector(circle.getWorldDirection(new THREE.Vector3()), 0.01);
    
            this.scene.add(planePortal);
            circle.torus = planePortal;
    
            // Add a new plane for the player to stand on below the portal
            const standPlaneGeometry = new THREE.BoxGeometry(10, 0.1,0.1); // Adjust size as needed
            const standPlaneMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
            const standPlane = new THREE.Mesh(standPlaneGeometry, standPlaneMaterial);
    
            // Position the stand plane below the portal
            standPlane.position.copy(circle.position);
            standPlane.position.y -= 5 * 1.5; // Adjust this value to control the height difference
            standPlane.quaternion.copy(circle.quaternion)
    
            // Create the physics body for the stand plane
            const standPlaneBody = new CANNON.Body({
                mass: 0,
                position: new CANNON.Vec3(standPlane.position.x, standPlane.position.y, standPlane.position.z),
                shape: new CANNON.Box(new CANNON.Vec3(10 / 2, 0.1 / 2, 4 / 2)),
                collisionFilterGroup: GROUP_DEFAULT,
                collisionFilterMask: GROUP_PLAYER | GROUP_CUBE
            });

            standPlaneBody.quaternion.copy(standPlane.quaternion)
    
            this.physics.addBody(standPlaneBody);

            circle.plane = standPlane;

        }
    }    

    detectIntersection(bodyA, bodyB, buffer = 4) {
        const shapeA = bodyA.shapes[0]
        const shapeB = bodyB.shapes[0]

        const posA = bodyA.position
        const posB = bodyB.position

        const halfSizeA = shapeA.halfExtents
        const halfSizeB = shapeB.halfExtents

        return (
            Math.abs(posA.x - posB.x) < (halfSizeA.x + halfSizeB.x + buffer) &&
            Math.abs(posA.y - posB.y) < (halfSizeA.y + halfSizeB.y + buffer) &&
            Math.abs(posA.z - posB.z) < (halfSizeA.z + halfSizeB.z + buffer)
        )
    }

    calculateAngle(v1, v2) {
        const dot = v1.dot(v2)
        const angle = Math.acos(dot / (v1.length() * v2.length()))
        return angle
    }

    isBodyOutOfBounds(body) {
        const position = body.position
        return (
            position.x < this.worldBounds.min.x ||
            position.x > this.worldBounds.max.x ||
            position.y < this.worldBounds.min.y ||
            position.y > this.worldBounds.max.y ||
            position.z < this.worldBounds.min.z ||
            position.z > this.worldBounds.max.z
        )
    }

    setWorld() {
        const floorShape = new CANNON.Plane()
        const floorBody = new CANNON.Body({
            collisionFilterGroup: GROUP_WALL,
            collisionFilterMask: GROUP_PLAYER | GROUP_CUBE | GROUP_PORTAL | GROUP_DEFAULT,
        })
        floorBody.mass = 0
        floorBody.addShape(floorShape)
        floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5)
        this.physics.addBody(floorBody)

        const floorTexture = new THREE.TextureLoader().load('/textures/concrete_modular_floor001c.png')
        floorTexture.repeat.set(4, 4)
        floorTexture.wrapS = THREE.RepeatWrapping
        floorTexture.wrapT = THREE.RepeatWrapping

        const floorMaterial = new THREE.MeshStandardMaterial({
            map: floorTexture,
            roughness: 0.2,
            metalness: 0.1
        })

        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            floorMaterial
        )
        this.plane.rotation.x = -Math.PI / 2
        this.plane.receiveShadow = true
        this.plane.position.set(0, 0, 0)
        this.scene.add(this.plane)
        this.plane.physicObject = floorBody

        const wallShape = new CANNON.Box(new CANNON.Vec3(100, 50, 1))

        const createWall = (width, height, depth, color, position, rotation) => {
            const wallTexture = new THREE.TextureLoader().load('/textures/concrete_modular_wall001a.png')
            wallTexture.repeat.set(4, 3)
            wallTexture.wrapS = THREE.RepeatWrapping
            wallTexture.wrapT = THREE.RepeatWrapping

            const wallMaterial = new THREE.MeshStandardMaterial({
                map: wallTexture,
                side: THREE.DoubleSide
            })

            const wallMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(width, height),
                wallMaterial
            )
            wallMesh.position.set(position.x, position.y, position.z)
            wallMesh.rotation.set(rotation.x, rotation.y, rotation.z)
            this.scene.add(wallMesh)

            const wallBody = new CANNON.Body({
                collisionFilterGroup: GROUP_WALL,
                collisionFilterMask: GROUP_PLAYER | GROUP_CUBE | GROUP_PORTAL | GROUP_DEFAULT,
            })
            wallBody.mass = 0
            wallBody.addShape(wallShape)
            wallBody.position.copy(wallMesh.position)
            wallBody.quaternion.copy(wallMesh.quaternion)
            this.physics.addBody(wallBody)

            wallMesh.physicObject = wallBody
            return wallMesh
        }

        const wallHeight = 100
        const wallYPosition = wallHeight / 2

        let backWallMesh = createWall(200, wallHeight, 1, 0xf0ffff, { x: 0, y: wallYPosition, z: 100 }, { x: 0, y: Math.PI, z: 0 })
        backWallMesh.name = 'backWall'

        let frontWallMesh = createWall(200, wallHeight, 1, 0xff0fff, { x: 0, y: wallYPosition, z: -100 }, { x: 0, y: 0, z: 0 })
        frontWallMesh.name = 'frontWall'

        let leftWallMesh = createWall(200, wallHeight, 1, 0xfff0ff, { x: -100, y: wallYPosition, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 })
        leftWallMesh.name = 'leftWall'

        let rightWallMesh = createWall(200, wallHeight, 1, 0xffff0f, { x: 100, y: wallYPosition, z: 0 }, { x: 0, y: -Math.PI / 2, z: 0 })
        rightWallMesh.name = 'rightWall'

        const roofTexture = new THREE.TextureLoader().load('/textures/concrete_modular_ceiling001a.png')
        roofTexture.repeat.set(4, 4)
        roofTexture.wrapS = THREE.RepeatWrapping
        roofTexture.wrapT = THREE.RepeatWrapping

        const roofMaterial = new THREE.MeshStandardMaterial({
            map: roofTexture,
        })

        this.roof = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            roofMaterial
        )
        this.roof.rotation.x = Math.PI / 2
        this.roof.position.y = wallHeight
        this.scene.add(this.roof)

        const roofShape = new CANNON.Plane()
        const roofBody = new CANNON.Body({
            collisionFilterGroup: GROUP_WALL,
            collisionFilterMask: GROUP_PLAYER | GROUP_CUBE | GROUP_PORTAL | GROUP_DEFAULT,
        })
        roofBody.mass = 0
        roofBody.addShape(roofShape)
        roofBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI * 0.5)
        roofBody.position.y = wallHeight
        this.physics.addBody(roofBody)

        this.roof.physicObject = roofBody
    }

    loadTextures() {
        this.game.resources.on('ready', () => {
            // Load resources if needed
        })
    }

    renderPortal() {
        this.game.renderer.instance.clear()
        this.game.camera.instance.updateMatrixWorld(true)
        this.portalHandler.render(this.game.camera.instance, 0, this.virtualCamera, [this.rightPortal[0], this.leftPortal[0]], this.game.camera.instance.matrixWorld.clone(), this.game.camera.instance.projectionMatrix.clone())
    }

    isWithinFunnel(coneOrigin, coneDirection, objectPosition, coneAngle, coneHeight = 10) {
        const upDirection = new THREE.Vector3(0, 1, 0)
        const facingUpward = coneDirection.dot(upDirection) > 0.7

        if (!facingUpward) {
            return false
        }

        const toObject = new THREE.Vector3().subVectors(objectPosition, coneOrigin)

        const projectedDistance = toObject.dot(coneDirection)

        if (projectedDistance > coneHeight || projectedDistance < 0) {
            return false
        }

        const directionToObject = toObject.normalize()
        const angle = coneDirection.angleTo(directionToObject)

        return angle < coneAngle
    }

    funnelObjectTowardsPortal(objectPosition, coneOrigin) {
        const toConeOrigin = new THREE.Vector3().copy(coneOrigin).sub(objectPosition)
        toConeOrigin.y = 0

        const direction = toConeOrigin.normalize()

        const funnelSpeed = 0.2

        const newPosition = new THREE.Vector3().copy(objectPosition)
        newPosition.x += direction.x * funnelSpeed
        newPosition.z += direction.z * funnelSpeed

        this.game.controls.cameraBody.position.set(newPosition.x, this.game.controls.cameraBody.position.y, newPosition.z)
    }

    update() {
        this.physics.step(1 / 75, this.game.time.delta, 3)

        this.contact = false

        if(this.companionCubeBody){
            if (!this.isJumping) {
                this.companionCubeBody.linearDamping = 0.99
            } else {
                this.companionCubeBody.linearDamping = 0
            }
        }

        if (this.rightPortal.length > 0) {
            document.querySelector('.blue').classList.add('active')
        } else {
            document.querySelector('.blue').classList.remove('active')
        }

        if (this.leftPortal.length > 0) {
            document.querySelector('.orange').classList.add('active')
        } else {
            document.querySelector('.orange').classList.remove('active')
        }

        if (this.rightPortal.length > 0 && this.leftPortal.length > 0) {
            const funnelConeAngle = Math.PI / 6
            const playerPosition = this.game.camera.instance.position

            this.leftPortal.forEach((portal) => {
                const coneOrigin = portal.position
                const coneDirection = new THREE.Vector3()
                portal.getWorldDirection(coneDirection)

                if (this.isWithinFunnel(coneOrigin, coneDirection, playerPosition, funnelConeAngle)) {
                    this.funnelObjectTowardsPortal(playerPosition, coneOrigin)
                }
            })

            this.rightPortal.forEach((portal) => {
                const coneOrigin = portal.position
                const coneDirection = new THREE.Vector3()
                portal.getWorldDirection(coneDirection)

                if (this.isWithinFunnel(coneOrigin, coneDirection, playerPosition, funnelConeAngle)) {
                    this.funnelObjectTowardsPortal(playerPosition, coneOrigin)
                }
            })
        }

        this.physics.contacts.forEach((contact) => {
            let bodyA = contact.bi
            let bodyB = contact.bj
            if (((bodyA.class == 'camera' && bodyB.class == 'portal') || (bodyB.class == 'camera' && bodyA.class == 'portal')) && (this.rightPortal.length > 0 && this.leftPortal.length > 0)) {
                this.contact = true
            }
        })

        if (this.materialBlue) {
            this.materialBlue.uniforms.iTime.value += 0.05
        }
        if (this.materialOrange) {
            this.materialOrange.uniforms.iTime.value += 0.05
        }

        if (this.isBodyOutOfBounds(this.game.controls.cameraBody)) {
            this.game.controls.cameraBody.sleep()
            this.game.controls.cameraBody.position.set(20, 10, 0)
            this.game.controls.cameraBody.wakeUp()
        }

        if (this.rightPortal.length > 0 && this.leftPortal.length > 0) {
            this.rightPortal[0].pair = this.leftPortal[0]
            this.leftPortal[0].pair = this.rightPortal[0]
            this.game.camera.instance.layers.set(0)
            this.renderPortal()
            this.game.renderer.instance.clearDepth()
            this.game.camera.instance.layers.set(1)
            this.game.renderer.instance.render(this.scene, this.game.camera.instance)
        } else {
            this.tmpScene = new THREE.Scene()
            this.tmpScene.children = this.scene.children.filter((child) => child.class !== 'player')
            this.game.camera.instance.layers.set(0)
            this.game.renderer.instance.render(this.tmpScene, this.game.camera.instance)
            this.game.renderer.instance.clearDepth()
            this.game.camera.instance.layers.set(1)
            this.game.renderer.instance.render(this.tmpScene, this.game.camera.instance)
        }

        this.managePortals()

        if (this.rightPortal.length > 0 && this.leftPortal.length > 0) {

            let sourcePortal = null
            let destinationPortal = null

            // Determine which portal the cube is colliding with
            for (let i = 0; i < this.physics.contacts.length; i++) {
                const contact = this.physics.contacts[i]
                const bodyA = contact.bi
                const bodyB = contact.bj

                if (
                    (bodyA.class === 'companionCube' && bodyB.class === 'portal') ||
                    (bodyA.class === 'portal' && bodyB.class === 'companionCube')
                ) {
                    // Identify the portal body and its reference
                    const portalBody = bodyA.class === 'portal' ? bodyA : bodyB
                    const portalRef = portalBody.ref // 'left' or 'right'

                    if (portalRef === 'left') {
                        sourcePortal = this.leftPortal[0]
                        destinationPortal = this.rightPortal[0]
                    } else if (portalRef === 'right') {
                        sourcePortal = this.rightPortal[0]
                        destinationPortal = this.leftPortal[0]
                    }

                    // Break out of the loop once the colliding portal is found
                    break
                }
            }

            // If the cube is not colliding with any portal, default to one pair
            if (!sourcePortal || !destinationPortal) {
                sourcePortal = this.leftPortal[0]
                destinationPortal = this.rightPortal[0]
            }

            // Synchronize the clone's position and rotation using source and destination portals
            const relativePosition = sourcePortal.worldToLocal(this.companionCube.position.clone())
            relativePosition.applyQuaternion(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI))
            const newCubePosition = destinationPortal.localToWorld(relativePosition)
            this.cubeClone.position.copy(newCubePosition)

            // Synchronize rotation
            const relativeRotation = sourcePortal.quaternion.clone().invert().multiply(this.companionCube.quaternion)
            relativeRotation.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI))
            this.cubeClone.quaternion.copy(destinationPortal.quaternion.clone().multiply(relativeRotation))
            
            if(!this.holdBody){
                this.checkCubePortalTeleport()
            }

            let cubePortalContact = false
            let playerPortalContact = false

            for (let i = 0; i < this.physics.contacts.length; i++) {
                const contact = this.physics.contacts[i]
                const bodyA = contact.bi
                const bodyB = contact.bj

                if ((bodyA.class === 'companionCube' && bodyB.class === 'portal') ||
                    (bodyA.class === 'portal' && bodyB.class === 'companionCube')) {
                    this.companionCubeBody.collisionFilterMask &= ~GROUP_WALL
                    cubePortalContact = true
                }

                if ((bodyA.class === 'camera' && bodyB.class === 'portal') ||
                    (bodyA.class === 'portal' && bodyB.class === 'camera')) {
                    this.game.controls.cameraBody.collisionFilterMask &= ~GROUP_WALL
                    playerPortalContact = true
                }

                if ((bodyA.class === 'camera' && bodyB.ref === 'right') ||
                    (bodyA.ref === 'right' && bodyB.class === 'camera')) {
                    this.checkLeftPortalTeleport()
                    break
                }
            }

            if (!cubePortalContact) {
                this.companionCubeBody.collisionFilterMask = GROUP_DEFAULT | GROUP_WALL | GROUP_PORTAL | GROUP_PLAYER
            }

            if (!playerPortalContact) {
                this.game.controls.cameraBody.collisionFilterMask = GROUP_DEFAULT | GROUP_WALL | GROUP_PORTAL | GROUP_CUBE
            }

            for (let i = 0; i < this.physics.contacts.length; i++) {
                const contact = this.physics.contacts[i]
                const bodyA = contact.bi
                const bodyB = contact.bj

                if ((bodyA.class === 'camera' && bodyB.ref === 'left') || (bodyA.ref === 'left' && bodyB.class === 'camera')) {
                    this.checkRightPortalTeleport()
                    break
                }
            }
        } else {
            this.resetPortalColors()
        }

        if (!this.collisionDetected) {
            this.game.controls.cameraBody.wakeUp()
        }

        if (this.holdBody) {
            const holdPosition = this.getHoldPosition()
            this.holdBody.position.copy(holdPosition)
            this.holdBody.quaternion.copy(this.game.camera.instance.quaternion)
        }

        if (this.companionCube) {
            this.companionCube.position.copy(this.companionCubeBody.position)
            this.companionCube.quaternion.copy(this.companionCubeBody.quaternion)
        }
    }

    managePortals() {
        this.leftPortal.forEach((portalData) => {
            this.scene.add(portalData)
        })

        if (this.leftPortal.length > 1) {
            const circleToRemove = this.leftPortal.shift()
            this.scene.remove(circleToRemove.box)
            this.scene.remove(circleToRemove.torus)
            this.physics.remove(circleToRemove.physicObject)
            this.physics.remove(circleToRemove.plane)
            this.scene.remove(circleToRemove)
        }

        this.rightPortal.forEach((portalData) => {
            this.scene.add(portalData)
        })

        if (this.rightPortal.length > 1) {
            const circleToRemove = this.rightPortal.shift()
            this.scene.remove(circleToRemove.box)
            this.scene.remove(circleToRemove.torus)
            this.physics.remove(circleToRemove.physicObject)
            this.physics.remove(circleToRemove.plane)
            this.scene.remove(circleToRemove)
        }
    }

    teleport(sourcePortal, camera, body) {
        const halfTurn = new THREE.Quaternion()
        halfTurn.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI)

        const forwardDirection = new THREE.Vector3()
        camera.getWorldDirection(forwardDirection)

        const relativePos = sourcePortal.worldToLocal(camera.position.clone())
        relativePos.applyQuaternion(halfTurn)
        const newPos = sourcePortal.pair.localToWorld(relativePos)
        if (newPos.y < 9.98) {
            newPos.y = 10
        }
        body.position.copy(newPos)

        const relativeRot = sourcePortal.quaternion.clone().invert().multiply(camera.quaternion)
        relativeRot.premultiply(halfTurn)
        camera.quaternion.copy(sourcePortal.pair.quaternion.clone().multiply(relativeRot))

        const newForwardDirection = new THREE.Vector3()
        camera.getWorldDirection(newForwardDirection)
        const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
            new THREE.Matrix4().lookAt(
                new THREE.Vector3(0, 0, 0),
                newForwardDirection,
                new THREE.Vector3(0, 1, 0)
            )
        )

        camera.quaternion.copy(targetRotation)

        const inTransform = sourcePortal
        const outTransform = sourcePortal.pair

        if (body) {
            // Convert the body's velocity to THREE.Vector3
            const worldVelocity = new THREE.Vector3(body.velocity.x, body.velocity.y, body.velocity.z)
    
            // Transform the velocity into the portal's local space
            const relativeVelocity = worldVelocity.clone()
            relativeVelocity.applyQuaternion(sourcePortal.quaternion.clone().invert())
    
            // Apply the half-turn rotation
            relativeVelocity.applyQuaternion(halfTurn)
    
            // Transform the velocity into the destination portal's world space
            relativeVelocity.applyQuaternion(sourcePortal.pair.quaternion)
    
            // Set the body's velocity
            body.velocity.set(relativeVelocity.x, relativeVelocity.y, relativeVelocity.z)
        }
    }

    checkLeftPortalTeleport() {
        const portalForward = new THREE.Vector3()
        this.rightPortal[0].getWorldDirection(portalForward)

        const travelerPosition = this.game.camera.instance.position.clone()
        const portalPosition = this.rightPortal[0].position.clone()
        const portalToTraveler = travelerPosition.sub(portalPosition)

        const dotProduct = portalForward.dot(portalToTraveler)

        if (dotProduct < 0) {
            this.teleport(this.rightPortal[0], this.game.camera.instance, this.game.controls.cameraBody)
        }
    }

    checkRightPortalTeleport() {
        const portalForward = new THREE.Vector3()
        this.leftPortal[0].getWorldDirection(portalForward)

        const travelerPosition = this.game.camera.instance.position.clone()
        const portalPosition = this.leftPortal[0].position.clone()
        const portalToTraveler = travelerPosition.sub(portalPosition)

        const dotProduct = portalForward.dot(portalToTraveler)

        if (dotProduct < 0) {
            this.teleport(this.leftPortal[0], this.game.camera.instance, this.game.controls.cameraBody)
        }
    }

    resetPortalColors() {
        if (this.leftPortal.length > 0) {
            this.leftPortal[0].material.color = new THREE.Color(0xff9a00)
            this.leftPortal[0].material.needsUpdate = true
        }

        if (this.rightPortal.length > 0) {
            this.rightPortal[0].material.color = new THREE.Color(0x00a2ff)
            this.rightPortal[0].material.needsUpdate = true
        }
    }

    createCompanionCube() {
        const loader = new GLTFLoader()

        loader.load('/cube.glb', (gltf) => {
            this.companionCube = gltf.scene

            const box = new THREE.Box3().setFromObject(this.companionCube)
            const center = box.getCenter(new THREE.Vector3())
            this.companionCube.position.sub(center)

            this.companionCube.position.set(0, 5, -5)
            this.companionCube.scale.set(0.13, 0.13, 0.13)
            this.companionCube.castShadow = true
            this.companionCube.receiveShadow = true

            this.companionCube.traverse((child) => {
                if (child.isMesh && child.material) {
                    if (child.material.map) {
                        child.material.map.colorSpace = THREE.SRGBColorSpace
                        child.material.metalness = 0.7
                    }
                    if (child.material.emissiveMap) {
                        child.material.emissiveMap.colorSpace = THREE.SRGBColorSpace
                    }
                    child.material.needsUpdate = true
                }
            })

            this.scene.add(this.companionCube)

            this.cubeClone = this.companionCube.clone()

            this.cubeClone.position.z = 200

            this.scene.add(this.cubeClone)

            const cubeShape = new CANNON.Box(new CANNON.Vec3(2.5, 2.5, 2.5))
            this.companionCubeBody = new CANNON.Body({
                mass: 1,
                material: this.defaultMaterial,
                collisionFilterGroup: GROUP_CUBE,
                collisionFilterMask: GROUP_WALL | GROUP_PLAYER | GROUP_DEFAULT | GROUP_PORTAL,
            })
            this.companionCubeBody.addShape(cubeShape)
            this.companionCubeBody.position.copy(this.companionCube.position)
            this.companionCubeBody.linearDamping = 0
            this.companionCubeBody.angularDamping = 0.5
            this.companionCubeBody.class = 'companionCube'

            this.physics.addBody(this.companionCubeBody)

            this.companionCube.body = this.companionCubeBody
        }, undefined, (error) => {
            console.error('An error occurred while loading the cube model:', error)
        })
    }

    getHoldPosition() {
        const camera = this.game.camera.instance
        const cameraDirection = new THREE.Vector3()
        camera.getWorldDirection(cameraDirection)
        cameraDirection.normalize()

        return new THREE.Vector3().copy(camera.position)
            .add(cameraDirection.multiplyScalar(this.holdDistance))
    }

    onKeyDown(event) {
        if (event.key === 'e') {
            if (!this.isHoldingCube) {
                this.tryPickupCube()
            } else {
                this.dropCube()
            }
        }
    }

    tryPickupCube() {
        const playerPosition = this.game.camera.instance.position
        const cubePosition = this.companionCube.position.clone()
        const distance = playerPosition.distanceTo(cubePosition)
    
        if (distance <= this.pickupRange) {
            this.isHoldingCube = true
    
            const holdPosition = this.getHoldPosition()
            this.holdBody = new CANNON.Body({
                mass: 0,
                type: CANNON.Body.KINEMATIC,
                collisionFilterGroup: 0,
                collisionFilterMask: 0
            })
            this.holdBody.position.copy(holdPosition)
            this.physics.addBody(this.holdBody)
    
            this.holdingConstraint = new CANNON.PointToPointConstraint(
                this.companionCubeBody,
                new CANNON.Vec3(0, 0, 0),
                this.holdBody,
                new CANNON.Vec3(0, 0, 0),
                1e6
            )
            this.physics.addConstraint(this.holdingConstraint)
    
            this.companionCubeBody.angularDamping = 1
    
            // Add this line to remove collision with the player
            this.companionCubeBody.collisionFilterMask &= ~GROUP_PLAYER
        }
    }

    dropCube() {
        this.isHoldingCube = false
    
        if (this.holdingConstraint) {
            this.physics.removeConstraint(this.holdingConstraint)
            this.holdingConstraint = null
        }
    
        if (this.holdBody) {
            this.physics.removeBody(this.holdBody)
            this.holdBody = null
        }
    
        // Add the player group back to the collision mask
        this.companionCubeBody.collisionFilterMask |= GROUP_PLAYER
        this.companionCubeBody.angularDamping = 0.5
    }

    checkCubePortalTeleport() {
        const cubePosition = new THREE.Vector3(
            this.companionCubeBody.position.x,
            this.companionCubeBody.position.y,
            this.companionCubeBody.position.z
        )

        const rightPortalPosition = this.rightPortal[0].position.clone()
        const rightPortalForward = new THREE.Vector3()
        this.rightPortal[0].getWorldDirection(rightPortalForward)
        const rightPortalToCube = cubePosition.clone().sub(rightPortalPosition)
        const rightDotProduct = rightPortalForward.dot(rightPortalToCube)

        if (rightDotProduct < 0) {
            this.teleport(this.rightPortal[0], this.companionCube, this.companionCubeBody)
        }

        const leftPortalPosition = this.leftPortal[0].position.clone()
        const leftPortalForward = new THREE.Vector3()
        this.leftPortal[0].getWorldDirection(leftPortalForward)
        const leftPortalToCube = cubePosition.clone().sub(leftPortalPosition)
        const leftDotProduct = leftPortalForward.dot(leftPortalToCube)

        if (leftDotProduct < 0) {
            this.teleport(this.leftPortal[0], this.companionCube, this.companionCubeBody)
        }
    }
}