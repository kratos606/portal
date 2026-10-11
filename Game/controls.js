import EventEmitter from './Utils/EventEmitter.js'
import * as THREE from 'three'
import CANNON from 'cannon'
import Game from './game.js'
import {
  LAYER_VIEWMODEL,
  PLAYER_RADIUS,
  PLAYER_EYE_OFFSET,
} from './portal/constants.js'
import { shouldTeleport, computeTeleport, applyToBody } from './portal/PortalTeleport.js'

/**
 * First person controller.
 *
 * The player is a single cannon sphere with fixedRotation. Valve curls the
 * player's AABB into a ball when they transit a floor portal
 * (prop_portal.cpp:1039); a sphere body gets the same "no corners to catch on"
 * property without the hack, which is what makes free portal traversal feel
 * right here.
 */

const UP = new THREE.Vector3(0, 1, 0)
const HALF_PI = Math.PI / 2

export default class Controls extends EventEmitter {
  constructor() {
    super()

    this.game = new Game()
    this.camera = this.game.camera
    this.physics = this.game.physics
    this.sizes = this.game.sizes

    this.walkSpeed = 4.4
    this.sprintSpeed = 7.2
    this.jumpSpeed = 6.2
    this.groundAccel = 14
    this.airAccel = 2.2

    this.keys = Object.create(null)
    this.grounded = false
    this.wish = new THREE.Vector3()
    this.pointerLocked = false

    this._fwd = new THREE.Vector3()
    this._right = new THREE.Vector3()
    this._rayFrom = new CANNON.Vec3()
    this._rayTo = new CANNON.Vec3()
    this._linkQuat = new THREE.Quaternion()
    this._euler = new THREE.Euler(0, 0, 0, 'YXZ')
    this._centre = new THREE.Vector3()
    this._prevCentre = new THREE.Vector3()
    this._bodyQuat = new THREE.Quaternion()
    this._bodyVel = new THREE.Vector3()

    this.setBody()
    this.setListeners()
    this.setViewmodel()
  }

  setBody() {
    const body = new CANNON.Body({
      mass: 80,
      shape: new CANNON.Sphere(PLAYER_RADIUS),
      material: this.physics.playerMaterial,
      linearDamping: 0.02,
      angularDamping: 1,
    })
    body.fixedRotation = true
    body.updateMassProperties()
    body.position.set(0, PLAYER_RADIUS + 0.05, 8)
    body.collisionFilterGroup = this.physics.groupPlayer
    body.collisionFilterMask = this.physics.defaultMask
    body.allowSleep = false
    this.physics.world.addBody(body)
    this.body = body
    this.spawnPoint = body.position.clone()
  }

  setViewmodel() {
    this.viewmodel = new THREE.Group()
    this.viewmodel.layers.set(LAYER_VIEWMODEL)
    this.camera.instance.add(this.viewmodel)

    const gun = this.game.resources?.items?.portalGun
    if (gun) {
      const model = gun.scene.clone(true)
      // fit the prop into a sane viewmodel scale/position
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const target = 0.34
      const scale = target / Math.max(size.x, size.y, size.z)
      model.scale.setScalar(scale)

      const centre = box.getCenter(new THREE.Vector3()).multiplyScalar(scale)
      model.position.set(0.16 - centre.x, -0.16 - centre.y, -0.34 - centre.z)
      model.rotation.set(0, Math.PI * 0.02, 0)
      model.traverse((o) => {
        if (o.isMesh) {
          o.layers.set(LAYER_VIEWMODEL)
          o.castShadow = false
          o.receiveShadow = false
          if (o.material) o.material = Array.isArray(o.material)
            ? o.material.map((m) => m.clone())
            : o.material.clone()
        }
      })
      this.viewmodel.add(model)
      this.gunModel = model
    } else {
      // no gun asset: a simple barrel so the view is never empty
      const barrel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.06, 0.5, 16),
        new THREE.MeshStandardMaterial({ color: 0xdfe6ee, roughness: 0.35, metalness: 0.6 })
      )
      barrel.rotation.x = Math.PI / 2
      barrel.position.set(0.17, -0.15, -0.32)
      barrel.layers.set(LAYER_VIEWMODEL)
      this.viewmodel.add(barrel)
    }

    this._gunBase = new THREE.Vector3()
    this._gunSway = 0
  }

  setListeners() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.code] = true
      if (e.code === 'Space') e.preventDefault()
    })
    document.addEventListener('keyup', (e) => {
      this.keys[e.code] = false
    })
    window.addEventListener('blur', () => {
      for (const k in this.keys) this.keys[k] = false
    })

    const controls = this.camera.controls
    if (controls) {
      controls.addEventListener('lock', () => {
        this.pointerLocked = true
        this.trigger('lock')
      })
      controls.addEventListener('unlock', () => {
        this.pointerLocked = false
        this.trigger('unlock')
      })
    }
  }

  lock() {
    this.camera.controls?.lock()
  }
  unlock() {
    this.camera.controls?.unlock()
  }

  /** Camera-relative wish direction, flat on the ground plane. */
  updateWish() {
    const k = this.keys
    let fwd = 0
    let side = 0
    if (k.KeyW || k.ArrowUp) fwd += 1
    if (k.KeyS || k.ArrowDown) fwd -= 1
    if (k.KeyD || k.ArrowRight) side += 1
    if (k.KeyA || k.ArrowLeft) side -= 1

    this.camera.instance.getWorldDirection(this._fwd)
    this._fwd.y = 0
    if (this._fwd.lengthSq() < 1e-6) this._fwd.set(0, 0, -1)
    this._fwd.normalize()
    this._right.crossVectors(this._fwd, UP).normalize()

    this.wish.set(0, 0, 0)
    this.wish.addScaledVector(this._fwd, fwd)
    this.wish.addScaledVector(this._right, side)
    if (this.wish.lengthSq() > 1) this.wish.normalize()
  }

  updateGrounded() {
    const p = this.body.position
    this._rayFrom.set(p.x, p.y, p.z)
    this._rayTo.set(p.x, p.y - (PLAYER_RADIUS + 0.14), p.z)
    const hit = this.physics.raycastClosest(this._rayFrom, this._rayTo, {
      mask: this.body.collisionFilterMask,
      group: this.body.collisionFilterGroup,
    })
    const r = this.physics.rayResult
    this.grounded = !!hit && r.hasHit && r.hitNormalWorld.y > 0.4
  }

  move(dt) {
    this.updateWish()
    this.updateGrounded()

    const sprinting = !!(this.keys.ShiftLeft || this.keys.ShiftRight)
    const speed = sprinting ? this.sprintSpeed : this.walkSpeed
    const accel = this.grounded ? this.groundAccel : this.airAccel

    const targetX = this.wish.x * speed
    const targetZ = this.wish.z * speed
    const v = this.body.velocity
    const t = Math.min(1, accel * dt)
    v.x += (targetX - v.x) * t
    v.z += (targetZ - v.z) * t

    if (this.grounded && this.keys.Space) {
      v.y = this.jumpSpeed
      this.grounded = false
    }
  }

  /**
   * Portal traversal. Returns true if the player was teleported this frame.
   * @param {Array<import('./portal/Portal.js').default>} portals
   */
  checkPortals(portals) {
    const p = this.body.position
    this._centre.set(p.x, p.y, p.z)

    let moved = false
    for (const portal of portals) {
      if (!portal.active || !portal.pair) continue
      if (!shouldTeleport(portal, this._centre, PLAYER_RADIUS, this._prevCentre)) continue

      const result = computeTeleport(portal, {
        origin: this._centre,
        centre: this._centre,
        quaternion: this._bodyQuat.set(
          this.body.quaternion.x,
          this.body.quaternion.y,
          this.body.quaternion.z,
          this.body.quaternion.w
        ),
        velocity: this._bodyVel.set(
          this.body.velocity.x,
          this.body.velocity.y,
          this.body.velocity.z
        ),
        isPlayer: true,
      })

      applyToBody(result, this.body)
      this.reorientCamera(result)
      // The exit portal is now in front of us; seed the crossing test so we do
      // not immediately fall back through it.
      this._prevCentre.copy(result.position)
      this._centre.copy(result.position)
      this.trigger('teleport', portal)
      moved = true
      break
    }

    this._prevCentre.copy(this._centre)
    return moved
  }

  /**
   * Re-aims the camera through the link matrix.
   *
   * Valve's TransformAnglesToWorldSpace applies the link rotation to the whole
   * orientation. PointerLockControls rebuilds its euler from the camera
   * quaternion every mouse move with order YXZ and a +/-90 degree pitch clamp,
   * so any roll we leave in would be discarded on the next frame anyway. Apply
   * the real rotation, then keep only its yaw and pitch.
   */
  reorientCamera(result) {
    const cam = this.camera.instance

    this._linkQuat.setFromRotationMatrix(result.matrix)
    this._linkQuat.multiply(cam.quaternion)

    const e = this._euler.setFromQuaternion(this._linkQuat, 'YXZ')
    e.z = 0
    e.x = Math.max(-HALF_PI + 0.01, Math.min(HALF_PI - 0.01, e.x))
    cam.quaternion.setFromEuler(e)
    cam.up.set(0, 1, 0)
  }

  update(dt) {
    if (this.pointerLocked) this.move(dt)
    else this.wish.set(0, 0, 0)

    const cam = this.camera.instance
    cam.position.set(
      this.body.position.x,
      this.body.position.y + PLAYER_EYE_OFFSET,
      this.body.position.z
    )

    // viewmodel sway
    if (this.gunModel) {
      const speed = Math.hypot(this.body.velocity.x, this.body.velocity.z)
      this._gunSway += dt * (2 + speed * 1.2)
      const bob = this.grounded ? Math.sin(this._gunSway * 2) * Math.min(speed, 8) * 0.0022 : 0
      this.viewmodel.position.set(0, bob, 0)
    }

    // fell out of the world
    if (this.body.position.y < -12) this.respawn()
  }

  respawn() {
    this.body.position.copy(this.spawnPoint)
    this.body.velocity.setZero()
    this.body.angularVelocity.setZero()
    this.trigger('respawn')
  }
}
