import * as THREE from "three"
import CANNON from "cannon"
import Game from "./game"

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

export default class World {
    constructor() {
        this.game = new Game()
        this.scene = this.game.scene
        this.physics = this.initPhysics()
        this.physics.gravity.set(0,-10,0)
        this.defaultMaterial = new CANNON.Material('default')
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();
        this.leftPortal = []
        this.rightPortal = []
        this.portalPhysics = false
        this.collisionDetected = false;
        this.virtualCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.scene.add(this.virtualCamera);
        this.collisionDetected = false
        this.portalHandler = new Portal(this.scene, this.game.renderer.instance);
        this.active = ''
        this.previousContacts = [];
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
        window.addEventListener('click', this.shoot.bind(this));
        this.setWorld()
        this.loadTextures()

    }

    initPhysics(){
        // Setup our world
        let world = new CANNON.World();
        world.quatNormalizeSkip = 0;
        world.quatNormalizeFast = false;
    
        var solver = new CANNON.GSSolver();
    
        world.defaultContactMaterial.contactEquationStiffness = 1e9;
        world.defaultContactMaterial.contactEquationRelaxation = 4;
    
        solver.iterations = 10;
        solver.tolerance = 0.1;
        let split = true;
        if(split)
            world.solver = new CANNON.SplitSolver(solver);
        else
            world.solver = solver;
    
        world.gravity.set(0,-9.8,0);
        world.broadphase = new CANNON.NaiveBroadphase();
    
        return world
    }

    worldToLocal(object, vector) {
        const worldInverse = new THREE.Matrix4().copy(object.matrixWorld).invert();
        return vector.clone().applyMatrix4(worldInverse);
    }
    
    localToWorld(object, vector) {
        return vector.clone().applyMatrix4(object.matrixWorld);
    }

    shoot(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        this.raycaster.setFromCamera({x:0,y:0}, this.game.camera.instance);

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

            // Clamp the local position to the nearest valid point within the wall bounds
            localPosition.x = THREE.MathUtils.clamp(localPosition.x, -halfWallSize.x + halfPortalSize.x, halfWallSize.x - halfPortalSize.x);
            localPosition.y = THREE.MathUtils.clamp(localPosition.y, -halfWallSize.y + halfPortalSize.y, halfWallSize.y - halfPortalSize.y);

            // Convert back to world coordinates
            const validPoint = this.localToWorld(object, localPosition);

            circle.position.copy(validPoint);
            circle.rotation.copy(object.rotation);
            circle.scale.y = 1.5;

            // Adjust circle position slightly to ensure it's on the wall
            circle.position.addScaledVector(circle.getWorldDirection(new THREE.Vector3()), 0.01);
            this.boxBody = new CANNON.Body()
            this.boxBody.mass = 0
            this.boxBody.material = this.defaultMaterial
            // this.boxBody.collisionFilterGroup = 1
            // this.boxBody.collisionFilterMask = 0
            this.boxBody.collisionResponse = false
            this.boxBody.addShape(new CANNON.Box(new CANNON.Vec3(3.34,5,5)))
            this.boxBody.quaternion.copy(circle.quaternion)
            this.boxBody.position.copy(circle.position)
            this.boxBody.class = 'portal'
            this.boxBody.object = intersects[0].object

            // Check for intersections with existing portals of the opposite type
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

            this.physics.addBody(this.boxBody)
            circle.physicObject = this.boxBody

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
                this.boxBody.ref = 'left'
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
                this.boxBody.ref = 'right'
                this.rightPortal.push(circle);
            }

            const planePortal = new THREE.Mesh(geometry1, materialPortal);
            planePortal.position.copy(circle.position);
            planePortal.rotation.copy(circle.rotation);
            planePortal.position.addScaledVector(circle.getWorldDirection(new THREE.Vector3()), 0.01);

            this.scene.add(planePortal);
            circle.torus = planePortal;
        }
    }

    detectIntersection(bodyA, bodyB, buffer = 4) { // default buffer value
        const shapeA = bodyA.shapes[0];
        const shapeB = bodyB.shapes[0];
    
        const posA = bodyA.position;
        const posB = bodyB.position;
    
        const halfSizeA = shapeA.halfExtents;
        const halfSizeB = shapeB.halfExtents;
    
        return (
            Math.abs(posA.x - posB.x) < (halfSizeA.x + halfSizeB.x + buffer) &&
            Math.abs(posA.y - posB.y) < (halfSizeA.y + halfSizeB.y + buffer) &&
            Math.abs(posA.z - posB.z) < (halfSizeA.z + halfSizeB.z + buffer)
        );
    }    

    calculateAngle(v1, v2) {
        const dot = v1.dot(v2);
        const angle = Math.acos(dot / (v1.length() * v2.length()));
        return angle;
    }

    isBodyOutOfBounds(body) {
        const position = body.position;
        return (
          position.x < this.worldBounds.min.x ||
          position.x > this.worldBounds.max.x ||
          position.y < this.worldBounds.min.y ||
          position.y > this.worldBounds.max.y ||
          position.z < this.worldBounds.min.z ||
          position.z > this.worldBounds.max.z
        );
      }

      setWorld() {
        // Adjusting the floor
        const floorShape = new CANNON.Plane();
        const floorBody = new CANNON.Body();
        floorBody.mass = 0;
        floorBody.addShape(floorShape);
        floorBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI * 0.5);
        this.physics.addBody(floorBody);
    
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshStandardMaterial({
                roughness: 0.2,
                metalness: 0.1
            })
        );
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.receiveShadow = true;
        this.plane.position.set(0, 0, 0);
        this.scene.add(this.plane);
        this.plane.physicObject = floorBody;
    
        // Adjusting the walls
        const wallShape = new CANNON.Box(new CANNON.Vec3(100, 50, 1));
    
        const createWall = (width, height, depth, color, position, rotation) => {
            const wallMesh = new THREE.Mesh(
                new THREE.PlaneGeometry(width, height),
                new THREE.MeshStandardMaterial({
                    color: color,
                    side: THREE.DoubleSide
                })
            );
            wallMesh.position.set(position.x, position.y, position.z);
            wallMesh.rotation.set(rotation.x, rotation.y, rotation.z);
            this.scene.add(wallMesh);
    
            const wallBody = new CANNON.Body();
            wallBody.mass = 0;
            wallBody.addShape(wallShape);
            wallBody.position.copy(wallMesh.position);
            wallBody.quaternion.copy(wallMesh.quaternion);
            this.physics.addBody(wallBody);
    
            wallMesh.physicObject = wallBody;
            return wallMesh;
        };
    
        const wallHeight = 100;
        const wallYPosition = wallHeight / 2;
    
        let backWallMesh = createWall(200, wallHeight, 1, 0xf0ffff, { x: 0, y: wallYPosition, z: 100 }, { x: 0, y: Math.PI, z: 0 });
        backWallMesh.name = 'backWall';
    
        let frontWallMesh = createWall(200, wallHeight, 1, 0xff0fff, { x: 0, y: wallYPosition, z: -100 }, { x: 0, y: 0, z: 0 });
        frontWallMesh.name = 'frontWall';
    
        let leftWallMesh = createWall(200, wallHeight, 1, 0xfff0ff, { x: -100, y: wallYPosition, z: 0 }, { x: 0, y: Math.PI / 2, z: 0 });
        leftWallMesh.name = 'leftWall';
    
        let rightWallMesh = createWall(200, wallHeight, 1, 0xffff0f, { x: 100, y: wallYPosition, z: 0 }, { x: 0, y: -Math.PI / 2, z: 0 });
        rightWallMesh.name = 'rightWall';
    
        // Adjusting the roof
        this.roof = new THREE.Mesh(
            new THREE.PlaneGeometry(200, 200),
            new THREE.MeshStandardMaterial()
        );
        this.roof.rotation.x = Math.PI / 2;
        this.roof.position.y = wallHeight;
        this.scene.add(this.roof);
    
        const roofShape = new CANNON.Plane();
        const roofBody = new CANNON.Body();
        roofBody.mass = 0;
        roofBody.addShape(roofShape);
        roofBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI * 0.5);
        roofBody.position.y = wallHeight;
        this.physics.addBody(roofBody);
    
        this.roof.physicObject = roofBody;
    }    
    
    loadTextures() {
        this.game.resources.on('ready', () => {
            
        })
    }

    renderPortal(){
        this.game.renderer.instance.clear();
        this.game.camera.instance.updateMatrixWorld(true);
        this.portalHandler.render(this.game.camera.instance, 0, this.virtualCamera, [this.rightPortal[0], this.leftPortal[0]],this.game.camera.instance.matrixWorld.clone(),this.game.camera.instance.projectionMatrix.clone());
    }

    isWithinFunnel(coneOrigin, coneDirection, objectPosition, coneAngle, coneHeight = 10) {
        // Check if the portal is facing upward
        const upDirection = new THREE.Vector3(0, 1, 0);
        const facingUpward = coneDirection.dot(upDirection) > 0.7; // Adjust the threshold if needed
    
        if (!facingUpward) {
            return false;
        }
    
        // Calculate the vector from cone origin to object
        const toObject = new THREE.Vector3().subVectors(objectPosition, coneOrigin);
        
        // Project the toObject vector onto the cone direction
        const projectedDistance = toObject.dot(coneDirection);
        
        // Check if the object is within the cone's height
        if (projectedDistance > coneHeight || projectedDistance < 0) {
            return false;
        }
        
        // Calculate the angle between the cone direction and the object direction
        const directionToObject = toObject.normalize();
        const angle = coneDirection.angleTo(directionToObject);
        
        // Check if the object is within the cone's angle
        return angle < coneAngle;
    }

    funnelObjectTowardsPortal(objectPosition, coneOrigin) {
        // Calculate the vector from the object to the cone origin, ignoring the y component
        const toConeOrigin = new THREE.Vector3().copy(coneOrigin).sub(objectPosition);
        toConeOrigin.y = 0; // Set the y component to 0 to only affect x and z positions
        
        // Normalize the vector to get the direction
        const direction = toConeOrigin.normalize();
        
        // Define the funnel speed
        const funnelSpeed = 0.2;
        
        // Calculate the new position, only affecting x and z
        const newPosition = new THREE.Vector3().copy(objectPosition);
        newPosition.x += direction.x * funnelSpeed;
        newPosition.z += direction.z * funnelSpeed;
        
        // Update the object's position in the physical world
        this.game.controls.cameraBody.position.set(newPosition.x, this.game.controls.cameraBody.position.y, newPosition.z);
    }       
    
    update() {
        this.physics.step(1 / 75, this.game.time.delta, 3)

        this.contact = false

        if(this.rightPortal.length > 0){
            document.querySelector('.blue').classList.add('active')
        }
        else{
            document.querySelector('.blue').classList.remove('active')
        }

        if(this.leftPortal.length > 0){
            document.querySelector('.orange').classList.add('active')
        }
        else{
            document.querySelector('.orange').classList.remove('active')
        }

        if (this.rightPortal.length > 0 && this.leftPortal.length > 0) {
            const funnelConeAngle = Math.PI / 6; // Define the cone angle (e.g., 30 degrees)
            const playerPosition = this.game.camera.instance.position;

            this.leftPortal.forEach((portal) => {
                const coneOrigin = portal.position;
                const coneDirection = new THREE.Vector3();
                portal.getWorldDirection(coneDirection);

                if (this.isWithinFunnel(coneOrigin, coneDirection, playerPosition, funnelConeAngle)) {
                    this.funnelObjectTowardsPortal(playerPosition, coneOrigin);
                }
            });

            this.rightPortal.forEach((portal) => {
                const coneOrigin = portal.position;
                const coneDirection = new THREE.Vector3();
                portal.getWorldDirection(coneDirection);

                if (this.isWithinFunnel(coneOrigin, coneDirection, playerPosition, funnelConeAngle)) {
                    this.funnelObjectTowardsPortal(playerPosition, coneOrigin);
                }
            });
        }

        this.physics.contacts.forEach((contact) => {
            let bodyA = contact.bi
            let bodyB = contact.bj
            if(((bodyA.class == 'camera' && bodyB.class == 'portal') || (bodyB.class == 'camera' && bodyA.class == 'portal')) && (this.rightPortal.length > 0 && this.leftPortal.length > 0)){
                this.contact = true
            }
        })

        if(!this.contact){
            this.physics.bodies.forEach((body) => {
                if(body.class !== 'portal'){
                    body.collisionResponse = true
                }
            })
        }

        else{
            this.leftPortal[0].physicObject.collisionResponse = false
            this.rightPortal[0].physicObject.collisionResponse = false
            if(this.leftPortal[0].physicObject.object.physicObject) this.leftPortal[0].physicObject.object.physicObject.collisionResponse = false
            if(this.rightPortal[0].physicObject.object.physicObject) this.rightPortal[0].physicObject.object.physicObject.collisionResponse = false
        }

        if(this.materialBlue){
            this.materialBlue.uniforms.iTime.value += 0.05;
        }
        if(this.materialOrange){
            this.materialOrange.uniforms.iTime.value += 0.05;
        }

        if (this.isBodyOutOfBounds(this.game.controls.cameraBody)) {
            this.game.controls.cameraBody.sleep()
            this.game.controls.cameraBody.position.set(20, 10, 0)
            this.game.controls.cameraBody.wakeUp()
        }

        if (this.rightPortal.length > 0 && this.leftPortal.length > 0){
            this.rightPortal[0].pair = this.leftPortal[0]
            this.leftPortal[0].pair = this.rightPortal[0]
            this.game.camera.instance.layers.set(0)
            this.renderPortal()
            this.game.renderer.instance.clearDepth()
            this.game.camera.instance.layers.set(1)
            this.game.renderer.instance.render(this.scene, this.game.camera.instance)
        }
        else{
            this.tmpScene = new THREE.Scene()
            this.tmpScene.children = this.scene.children.filter((child)=>child.class!=='player')
            this.game.camera.instance.layers.set(0)
            this.game.renderer.instance.render(this.tmpScene, this.game.camera.instance)
            this.game.renderer.instance.clearDepth()
            this.game.camera.instance.layers.set(1)
            this.game.renderer.instance.render(this.tmpScene, this.game.camera.instance)
        }

        this.managePortals()

        if (this.rightPortal.length > 0 && this.leftPortal.length > 0) {
            // Check for collisions
            for (let i = 0; i < this.physics.contacts.length; i++) {
                const contact = this.physics.contacts[i];
                const bodyA = contact.bi;
                const bodyB = contact.bj;

                if ((bodyA.class === 'camera' && bodyB.ref === 'right') || (bodyA.ref === 'right' && bodyB.class === 'camera')) {
                    this.checkLeftPortalTeleport()
                    break; // No need to check further if we found a collision
                }
            }

            for (let i = 0; i < this.physics.contacts.length; i++) {
                const contact = this.physics.contacts[i];
                const bodyA = contact.bi;
                const bodyB = contact.bj;

                if ((bodyA.class === 'camera' && bodyB.ref === 'left') || (bodyA.ref === 'left' && bodyB.class === 'camera')) {
                    this.checkRightPortalTeleport()
                    break; // No need to check further if we found a collision
                }
            }
        } else {
            this.resetPortalColors()
        }

        if (!this.collisionDetected) {
            this.game.controls.cameraBody.wakeUp();
        }
    }

    managePortals() {
        // Manage left portals
        this.leftPortal.forEach((portalData) => {
            this.scene.add(portalData)
        })

        if (this.leftPortal.length > 1) {
            const circleToRemove = this.leftPortal.shift()
            this.scene.remove(circleToRemove.box)
            this.scene.remove(circleToRemove.torus)
            this.physics.remove(circleToRemove.physicObject)
            this.scene.remove(circleToRemove)
        }

        // Manage right portals
        this.rightPortal.forEach((portalData) => {
            this.scene.add(portalData)
        })

        if (this.rightPortal.length > 1) {
            const circleToRemove = this.rightPortal.shift()
            this.scene.remove(circleToRemove.box)
            this.scene.remove(circleToRemove.torus)
            this.physics.remove(circleToRemove.physicObject)
            this.scene.remove(circleToRemove)
        }
    }

    teleport(sourcePortal, camera, body) {
        // Set up the halfTurn quaternion
        const halfTurn = new THREE.Quaternion();
        halfTurn.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI); // 180 degrees around Y axis
    
        // Store the camera's forward direction before teleportation
        const forwardDirection = new THREE.Vector3();
        camera.getWorldDirection(forwardDirection);
    
        // Perform teleportation logic
        const relativePos = sourcePortal.worldToLocal(camera.position.clone());
        relativePos.applyQuaternion(halfTurn);
        const newPos = sourcePortal.pair.localToWorld(relativePos)
        if (newPos.y < 9.98){
            newPos.y = 10
        }
        body.position.copy(newPos);
    
        // Update rotation of camera
        const relativeRot = sourcePortal.quaternion.clone().invert().multiply(camera.quaternion);
        relativeRot.premultiply(halfTurn);
        camera.quaternion.copy(sourcePortal.pair.quaternion.clone().multiply(relativeRot));
    
        // Calculate the new target rotation to align the up direction with the world up direction
        const newForwardDirection = new THREE.Vector3();
        camera.getWorldDirection(newForwardDirection);
        const targetRotation = new THREE.Quaternion().setFromRotationMatrix(
            new THREE.Matrix4().lookAt(
                new THREE.Vector3(0, 0, 0), // Eye
                newForwardDirection,        // Target
                new THREE.Vector3(0, 1, 0)  // Up
            )
        );
    
        // Apply the new target rotation to the camera
        camera.quaternion.copy(targetRotation);

        const inTransform = sourcePortal
        const outTransform = sourcePortal.pair

        // Update velocity of object (assuming you're using a physics library like Cannon.js)
        if (body) {
            // Create a Cannon.js vector for the body's velocity
            const worldVelocity = new CANNON.Vec3(body.velocity.x, body.velocity.y, body.velocity.z);
        
            // Create quaternions for the inTransform and outTransform (assuming you can get their quaternion values)
            const inTransformQuaternion = new CANNON.Quaternion(
                inTransform.quaternion.x,
                inTransform.quaternion.y,
                inTransform.quaternion.z,
                inTransform.quaternion.w
            );
        
            const outTransformQuaternion = new CANNON.Quaternion(
                outTransform.quaternion.x,
                outTransform.quaternion.y,
                outTransform.quaternion.z,
                outTransform.quaternion.w
            );
        
            // Define a quaternion for the half turn rotation
            const halfTurn = new CANNON.Quaternion();
            halfTurn.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI); // Example: rotate 180 degrees around Y axis
        
            // Convert world velocity to local velocity
            const relativeVel = worldVelocity.clone();
            inTransformQuaternion.inverse().vmult(relativeVel, relativeVel); // Convert to local space
        
            // Apply quaternion to the local velocity
            halfTurn.vmult(relativeVel, relativeVel);
        
            // Convert local velocity back to world coordinates
            outTransformQuaternion.vmult(relativeVel, relativeVel); // Convert back to world space

            // Copy the rotated world velocity back to the Cannon.js body
            body.velocity.copy(relativeVel);
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
            this.teleport(this.rightPortal[0],this.game.camera.instance,this.game.controls.cameraBody)
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
            this.teleport(this.leftPortal[0],this.game.camera.instance,this.game.controls.cameraBody)
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
}