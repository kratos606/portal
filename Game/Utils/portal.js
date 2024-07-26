import * as THREE from 'three';

const tmpVector3 = new THREE.Vector3();

const debugStencilRect = false;
const debugStencilColor = false;

export class ActivePortal {
  portalCamera;
  isOnscreen = false;

  /** Location of source end. */
  sourcePosition = new THREE.Vector3();
  sourceRealm = '';

  /** Location of destination end. */
  destinationPosition = new THREE.Vector3();
  destinationRealm = '';

  /** Depth of the nearest point of the portal. */
  nearDepth = Infinity;

  /** Size of the hole. */
  apertureSize = new THREE.Vector3();
  aperturePlane = new THREE.Plane();

  /** Direction the hole is facing */
  apertureFacing = new THREE.Vector4();
  apertureSide = THREE.FrontSide;

  /** Difference between near and far end. Used to calculate relative camera position. */
  differential = new THREE.Vector3();

  // The geometric appearance of the portal.
  geometry = new THREE.BoxGeometry(1, 2, 0);
  material = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    colorWrite: debugStencilColor,
  });
  mesh = new THREE.Mesh(this.geometry, this.material);

  /** Rectangular bounds of portal on screen. */
  mainScreenRect = new THREE.Box2();
  portalScreenRect = new THREE.Box2();

  /** Same as screenRect, but in a form acceptable to scissor/viewport calls. */
  portalViewport = new THREE.Vector4();
  // Used in calculations
  lookAtPt = new THREE.Vector3();
  worldPt = new THREE.Vector3();
  screenPt = new THREE.Vector2();
  cameraFacing = new THREE.Vector3();
  sourceScene;
  destinationScene;
  

  stencilIndex = 0;
  needsUpdate = false;

  constructor() {
    this.portalCamera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    this.clippingPlane = new THREE.Plane();
    this.mesh.matrixAutoUpdate = false;
    this.mesh.renderOrder = 2;
    this.mesh.visible = true;
    this.mesh.name = 'Portal';
    this.mesh.onBeforeRender = renderer => {
      if (this.mesh.visible) {
        const gl = renderer.getContext();
        gl.enable(gl.STENCIL_TEST);
        gl.stencilMask(0xff);
        gl.stencilFunc(gl.ALWAYS, this.stencilIndex, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
      }
    };
    this.mesh.onAfterRender = renderer => {
      if (this.mesh.visible) {
        const gl = renderer.getContext();
        gl.disable(gl.STENCIL_TEST);
        gl.stencilMask(0);
        gl.stencilFunc(gl.ALWAYS, 1, 0xff);
        gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
      }
    };
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
    this.mesh.parent?.remove(this.mesh);
  }

  setSource(position, realm) {
    this.sourcePosition.copy(position);
    this.sourceRealm = realm;
    this.mesh.position.copy(this.sourcePosition);
    this.mesh.updateMatrix();
    this.needsUpdate = true;
  }

  setDestination(position, realm) {
    this.destinationPosition.copy(position);
    this.destinationRealm = realm;
    this.material.colorWrite = !realm; // If no realm set, draw magenta
  }

  setAperture(size, facing, side) {
    this.apertureSize.copy(size).multiplyScalar(0.5);
    this.apertureFacing.copy(facing);
    this.apertureSide = side;
    this.needsUpdate = true;
  }

  update(camera, screenSize, viewCenter) {
    this.differential.copy(this.destinationPosition).sub(this.sourcePosition);

    if (this.needsUpdate) {
      this.needsUpdate = false;

      // Update aperature rendering
      this.geometry?.dispose();
      this.geometry = new THREE.BoxGeometry(
        this.apertureSize.x * 2,
        this.apertureSize.y * 2,
        this.apertureSize.z * 2
      );
      this.mesh.geometry = this.geometry;
      this.mesh.geometry.computeBoundingSphere();
      this.mesh.frustumCulled = true;

      if (this.apertureSize.x === 0) {
        tmpVector3.set(1, 0, 0);
        this.aperturePlane.setFromNormalAndCoplanarPoint(tmpVector3, this.sourcePosition);
      } else if (this.apertureSize.x === 0) {
        tmpVector3.set(0, 1, 0);
        this.aperturePlane.setFromNormalAndCoplanarPoint(tmpVector3, this.sourcePosition);
      } else if (this.apertureSize.z === 0) {
        tmpVector3.set(0, 0, 1);
        this.aperturePlane.setFromNormalAndCoplanarPoint(tmpVector3, this.sourcePosition);
      } else {
        console.error('portal not flat');
      }
      // private aperture = new Box3();

      // this.aperture.min.set(0, 0, 0);
      // this.aperture.max.set(0, 0, 0);
      // this.aperture.translate(this.sourcePosition);
      // this.aperture.expandByVector(this.apertureSize);
    }

    this.mainScreenRect.min.set(0, 0);
    this.mainScreenRect.max.copy(screenSize);
    const widthHalf = screenSize.width / 2;
    const heightHalf = screenSize.height / 2;
    this.nearDepth = Infinity;

    const addPortalPoint = (x, y, z) => {
      this.worldPt.set(x, y, z);
      this.worldPt.applyMatrix4(this.mesh.matrixWorld);
      this.worldPt.project(camera);

      this.screenPt.x = Math.round(this.worldPt.x * widthHalf + widthHalf);
      this.screenPt.y = Math.round(-(this.worldPt.y * heightHalf) + heightHalf);
      this.portalScreenRect.expandByPoint(this.screenPt);

      this.worldPt.applyMatrix4(camera.projectionMatrixInverse);
      this.nearDepth = Math.min(this.nearDepth, -this.worldPt.z);
    };

    this.portalScreenRect.makeEmpty();

// Compute all 8 points of the aperture box.
addPortalPoint(-this.apertureSize.x, -this.apertureSize.y, -this.apertureSize.z);
addPortalPoint(this.apertureSize.x, -this.apertureSize.y, -this.apertureSize.z);
addPortalPoint(-this.apertureSize.x, this.apertureSize.y, -this.apertureSize.z);
addPortalPoint(this.apertureSize.x, this.apertureSize.y, -this.apertureSize.z);
addPortalPoint(-this.apertureSize.x, -this.apertureSize.y, this.apertureSize.z);
addPortalPoint(this.apertureSize.x, -this.apertureSize.y, this.apertureSize.z);
addPortalPoint(-this.apertureSize.x, this.apertureSize.y, this.apertureSize.z);
addPortalPoint(this.apertureSize.x, this.apertureSize.y, this.apertureSize.z);
this.portalScreenRect.expandByScalar(2);

// Set a flag indicating whether the portal screen rect overlaps the main viewport.
this.cameraFacing.copy(this.sourcePosition).sub(camera.position);
tmpVector3.set(this.apertureFacing.x, this.apertureFacing.y, this.apertureFacing.z);
this.clippingPlane.normal.copy(tmpVector3);
this.clippingPlane.constant = -this.destinationPosition.dot(tmpVector3);
this.isOnscreen = this.mainScreenRect.intersectsBox(this.portalScreenRect);
if (this.apertureSide === THREE.FrontSide) {
  this.isOnscreen &&= this.cameraFacing.dot(tmpVector3) > 0;
} else if (this.apertureSide === THREE.BackSide) {
  this.isOnscreen &&= this.cameraFacing.dot(tmpVector3) < 0;
}

// Compute viewport coordinates.
this.portalViewport.x = this.portalScreenRect.min.x;
this.portalViewport.y = screenSize.height - this.portalScreenRect.max.y;
this.portalViewport.z = this.portalScreenRect.max.x - this.portalScreenRect.min.x;
this.portalViewport.w = this.portalScreenRect.max.y - this.portalScreenRect.min.y;

this.lookAtPt.copy(viewCenter).add(this.differential);

// Place the portal camera in the same relative position to the far end as the camera
// is to the near end.
this.portalCamera.position.copy(camera.position).add(this.differential);
this.portalCamera.lookAt(this.lookAtPt);
this.portalCamera.setViewOffset(
  screenSize.width,
  screenSize.height,
  this.portalScreenRect.min.x,
  this.portalScreenRect.min.y,
  this.portalScreenRect.max.x - this.portalScreenRect.min.x,
  this.portalScreenRect.max.y - this.portalScreenRect.min.y
);

this.mesh.visible = this.isOnscreen;
}
addToScene(sourceScene, destinationScene) {
    if (this.sourceScene !== sourceScene) {
      this.sourceScene = sourceScene;
      sourceScene.add(this.mesh);
    }
    this.destinationScene = destinationScene;
  }
  
  removeFromScene() {
    this.sourceScene = undefined;
    this.mesh.parent?.remove(this.mesh);
  }
  
  setStencilIndex(index) {
    this.stencilIndex = index;
  }
  
  render(renderer) {
    if (this.destinationScene) {
        console.log(renderer)
      renderer.clippingPlanes[0] = this.clippingPlane
      renderer.autoClearStencil = false;
      renderer.setScissor(this.portalViewport);
      renderer.setViewport(this.portalViewport);
      this.mesh.visible = false;
      const gl = renderer.getContext();
      renderer.autoClearColor = false;
      gl.enable(gl.STENCIL_TEST);
      gl.stencilFunc(gl.EQUAL, this.stencilIndex, 0xff);
      gl.stencilMask(0);
      gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
      renderer.autoClearColor = debugStencilRect;
      renderer.render(this.destinationScene, this.portalCamera);
      gl.disable(gl.STENCIL_TEST);
      this.mesh.visible = this.isOnscreen;
      renderer.setClearColor('#000000');
    }
  }
  
  /** Return 'true' if a motion path passes through the portal aperture.
      @param p0 start point of the motion.
      @param p1 end point of the motion.
      @param yOffset Since actors often have their origin at their feet, move the points upward
          slightly so we are testing whether their midpoint traverses the portal.
  */
  isTraversal(p0, p1, yOffset) {
    let d0;
    let d1;
    // Assume thast portal is zero-size in one dimension.
    if (this.apertureSize.x === 0) {
      d0 = p0.x - this.sourcePosition.x;
      d1 = p1.x - this.sourcePosition.x;
    } else if (this.apertureSize.y === 0) {
      d0 = p0.y - this.sourcePosition.y;
      d1 = p1.y - this.sourcePosition.y;
    } else if (this.apertureSize.z === 0) {
      d0 = p0.z - this.sourcePosition.z;
      d1 = p1.z - this.sourcePosition.z;
    } else {
      console.exception('non-planar portal');
      return false;
    }
  
    // If p0 and p1 both on the same side of the portal, then false.
    if ((d0 < 0) === (d1 < 0)) {
      return false;
    }
  
    // Vector is zero-length or co-planar with portal.
    if (d1 - d0 === 0) {
      return false;
    }
  
    const t = d0 / (d0 - d1);
    if (t < 0 || t > 1) {
      return false;
    }
  
    tmpVector3.copy(p0).lerp(p1, t).sub(this.sourcePosition);
    if (this.apertureSize.x > 0 && Math.abs(tmpVector3.x) >= this.apertureSize.x) {
      return false;
    }
    if (this.apertureSize.y > 0 && Math.abs(tmpVector3.y + yOffset) >= this.apertureSize.y) {
      return false;
    }
    if (this.apertureSize.z > 0 && Math.abs(tmpVector3.z) >= this.apertureSize.z) {
      return false;
    }
  
    return true;
  }
}