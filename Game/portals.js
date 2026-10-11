import * as THREE from 'three';
import { portalMatrix, throughPoint, throughDirection, throughQuaternion, portalCrossing } from './portalMath.js';

export const PORTAL_WIDTH = 1.65;
export const PORTAL_HEIGHT = 2.65;
const COLORS = [0x23a9ff, 0xff9b35];

function ring(color) {
  const shape = new THREE.Shape();
  shape.absellipse(0, 0, PORTAL_WIDTH / 2 + .075, PORTAL_HEIGHT / 2 + .075, 0, Math.PI * 2);
  const hole = new THREE.Path();
  hole.absellipse(0, 0, PORTAL_WIDTH / 2 - .02, PORTAL_HEIGHT / 2 - .02, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  return new THREE.Mesh(new THREE.ShapeGeometry(shape, 48), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, depthWrite: false, toneMapped: false }));
}

export class PortalSystem {
  constructor(scene, renderer, camera, world) {
    this.scene = scene;
    this.renderer = renderer;
    this.camera = camera;
    this.world = world;
    this.portals = [null, null];
    this.viewCamera = camera.clone();
    this.viewCamera.layers.disable(1); // the first-person portal gun only belongs in the main view
    this.targets = [0, 1].map(() => [this.makeTarget(), this.makeTarget()]);
    this.readIndex = 0;
    this.cooldowns = new WeakMap();
    this.clock = 0;
  }

  makeTarget() {
    const target = new THREE.WebGLRenderTarget(640, 480, { depthBuffer: true, stencilBuffer: false });
    target.texture.colorSpace = THREE.SRGBColorSpace;
    return target;
  }

  resize(width, height) {
    const scale = Math.min(1, 1100 / Math.max(width, height));
    for (const pair of this.targets) for (const target of pair)
      target.setSize(Math.max(1, Math.floor(width * scale)), Math.max(1, Math.floor(height * scale)));
  }

  place(index, panel, point, notify = true) {
    const other = this.portals[1 - index];
    // The front face must be wholly on its panel and not overlap a linked hole.
    const p = panel.mesh.worldToLocal(point.clone());
    const horizontalInset = .16, verticalInset = .02;
    p.x = THREE.MathUtils.clamp(p.x, -panel.width / 2 + PORTAL_WIDTH / 2 + horizontalInset, panel.width / 2 - PORTAL_WIDTH / 2 - horizontalInset);
    p.y = THREE.MathUtils.clamp(p.y, -panel.height / 2 + PORTAL_HEIGHT / 2 + verticalInset, panel.height / 2 - PORTAL_HEIGHT / 2 - verticalInset);
    p.z = 0;
    const otherLocal = other && panel.mesh.worldToLocal(other.group.position.clone());
    if (other && (other.panel === panel || other.panel === panel.opposite) && Math.abs(p.x - otherLocal.x) < PORTAL_WIDTH + .15 && Math.abs(p.y - otherLocal.y) < PORTAL_HEIGHT + .15) return false;
    const old = this.portals[index];
    if (old) {
      this.scene.remove(old.group);
      old.group.traverse(child => { if (child.geometry) child.geometry.dispose(); if (child.material) child.material.dispose(); });
      this.portals[index] = null;
      this.world.rebuildPanel(old.panel);
      if (old.panel.opposite) this.world.rebuildPanel(old.panel.opposite);
    }
    const group = new THREE.Group();
    group.position.copy(panel.mesh.localToWorld(p.clone())).addScaledVector(panel.normal, .035);
    group.quaternion.copy(panel.mesh.quaternion);
    const surface = new THREE.Mesh(new THREE.CircleGeometry(1, 48), new THREE.MeshBasicMaterial({ map: this.targets[index][this.readIndex].texture, side: THREE.FrontSide, toneMapped: false }));
    // Elliptical portal mask. UVs remain conventional for the render target.
    surface.geometry.dispose();
    const geometry = new THREE.CircleGeometry(1, 64);
    const positions = geometry.attributes.position;
    for (let i = 0; i < positions.count; i++) positions.setXY(i, positions.getX(i) * PORTAL_WIDTH / 2, positions.getY(i) * PORTAL_HEIGHT / 2);
    geometry.computeVertexNormals();
    surface.geometry = geometry;
    surface.position.z = .004;
    group.add(surface);
    const edge = ring(COLORS[index]);
    edge.position.z = .015;
    group.add(edge);
    const glow = new THREE.PointLight(COLORS[index], 3, 3.4);
    glow.position.z = .3;
    group.add(glow);
    this.scene.add(group);
    this.portals[index] = { group, surface, panel, local: p, index };
    this.world.rebuildPanel(panel);
    if (panel.opposite) this.world.rebuildPanel(panel.opposite);
    if (notify) this.world.onPortalPlaced(index);
    return true;
  }

  // Computes the remote eye pose and clips geometry behind the exit plane.
  // Ping-pong textures avoid sampling the render target being written. The
  // previous frame's other view supplies a bounded recursive portal image.
  render() {
    const [a, b] = this.portals;
    if (a && b) {
      this.scene.updateMatrixWorld(true);
      this.camera.updateMatrixWorld(true);
      const write = 1 - this.readIndex;
      for (const portal of [a, b]) {
        const exit = this.portals[1 - portal.index];
        const matrix = portalMatrix(portal.group, exit.group).multiply(this.camera.matrixWorld);
        matrix.decompose(this.viewCamera.position, this.viewCamera.quaternion, this.viewCamera.scale);
        this.viewCamera.projectionMatrix.copy(this.camera.projectionMatrix);
        this.viewCamera.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse);
        this.viewCamera.updateMatrixWorld(true);
        this.clipCamera(exit);
        // Hide our own surface during the offscreen pass (safe even if occluded).
        portal.surface.visible = false;
        this.renderer.setRenderTarget(this.targets[portal.index][write]);
        this.renderer.clear();
        this.renderer.render(this.scene, this.viewCamera);
        portal.surface.visible = true;
      }
      this.renderer.setRenderTarget(null);
      this.readIndex = write;
      for (const portal of [a, b]) portal.surface.material.map = this.targets[portal.index][write].texture;
    }
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);
  }

  clipCamera(exit) {
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(exit.group.quaternion);
    const point = exit.group.position.clone().addScaledVector(normal, .025);
    const plane = new THREE.Plane().setFromNormalAndCoplanarPoint(normal, point).applyMatrix4(this.viewCamera.matrixWorldInverse);
    const clip = new THREE.Vector4(plane.normal.x, plane.normal.y, plane.normal.z, plane.constant);
    const e = this.viewCamera.projectionMatrix.elements;
    const sign = v => v >= 0 ? 1 : -1;
    const q = new THREE.Vector4((sign(clip.x) + e[8]) / e[0], (sign(clip.y) + e[9]) / e[5], -1, (1 + e[10]) / e[14]);
    const denom = clip.dot(q);
    if (Math.abs(denom) > 1e-5) {
      clip.multiplyScalar(2 / denom);
      e[2] = clip.x; e[6] = clip.y; e[10] = clip.z + 1; e[14] = clip.w;
      this.viewCamera.projectionMatrixInverse.copy(this.viewCamera.projectionMatrix).invert();
    }
  }

  teleport(body, mesh, from, radius = .38, isPlayer = false) {
    const to = this.portals[1 - from.index];
    const position = throughPoint(new THREE.Vector3(body.position.x, body.position.y, body.position.z), from.group, to.group);
    const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(to.group.quaternion);
    // Keep the body entirely on the exit side, without throwing away momentum.
    const dist = position.clone().sub(to.group.position).dot(normal);
    position.addScaledVector(normal, Math.max(0, radius + .06 - dist));
    body.position.set(position.x, position.y, position.z);
    const velocity = throughDirection(new THREE.Vector3(body.velocity.x, body.velocity.y, body.velocity.z), from.group, to.group);
    body.velocity.set(velocity.x, velocity.y, velocity.z);
    if (isPlayer) {
      this.camera.quaternion.copy(throughQuaternion(this.camera.quaternion, from.group, to.group));
      this.camera.rotation.reorder('YXZ');
      this.world.controls.releaseMomentum = .35;
    } else {
      const q = throughQuaternion(new THREE.Quaternion(body.quaternion.x, body.quaternion.y, body.quaternion.z, body.quaternion.w), from.group, to.group);
      body.quaternion.set(q.x, q.y, q.z, q.w);
      const angular = throughDirection(new THREE.Vector3(body.angularVelocity.x, body.angularVelocity.y, body.angularVelocity.z), from.group, to.group);
      body.angularVelocity.set(angular.x, angular.y, angular.z);
      mesh.position.copy(position);
    }
    body.aabbNeedsUpdate = true;
    body.wakeUp();
    this.cooldowns.set(body, { until: this.clock + .22, portal: to });
    this.world.onTeleport(isPlayer);
  }

  check(body, mesh, previous, radius, isPlayer = false) {
    if (!this.portals[0] || !this.portals[1] || this.cooldowns.get(body)?.until > this.clock) return;
    const current = new THREE.Vector3(body.position.x, body.position.y, body.position.z);
    for (const portal of this.portals) {
      const margin = isPlayer ? .17 : .2;
      const normal = new THREE.Vector3(0, 0, 1).applyQuaternion(portal.group.quaternion);
      // The player's collision sphere is at their feet. Test the feet when
      // falling into a floor portal, rather than waiting for the eye to sink.
      const offset = isPlayer && normal.y > .7 && body.velocity.y < -1.8 ? new THREE.Vector3(0, -.93, 0) : new THREE.Vector3();
      if (portalCrossing(previous.clone().add(offset), current.clone().add(offset), portal.group, PORTAL_WIDTH, PORTAL_HEIGHT, margin) !== null) {
        this.teleport(body, mesh, portal, radius, isPlayer);
        break;
      }
    }
  }
}
