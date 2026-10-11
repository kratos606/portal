import * as THREE from 'three'
import CANNON from 'cannon'
import Game from './game.js'
import Physics from './physics.js'
import Level from './Level.js'
import Portal from './portal/Portal.js'
import PortalSystem from './portal/PortalSystem.js'
import PortalGun from './portal/PortalGun.js'
import PortalGhosts from './portal/PortalGhosts.js'
import FunnelSystem from './systems/FunnelSystem.js'
import LaserSystem from './systems/LaserSystem.js'
import {
  PORTAL_HALF_WIDTH,
  PORTAL_HALF_HEIGHT,
  PLAYER_RADIUS,
  LAYER_WORLD,
  LAYER_VIEWMODEL,
} from './portal/constants.js'
import { sphereIntersectsPortalHole } from './portal/geometry.js'

/**
 * The chamber: portals, props and the puzzle.
 *
 * Everything that has to cooperate — the stencil renderer, the clip-plane
 * ghosts, the funnel, the laser and the collision mask surgery — is wired up
 * here and stepped from one update().
 */

const _tmpVec = new THREE.Vector3()
const _tmpVec2 = new THREE.Vector3()
const _pos = new THREE.Vector3()

export default class World {
  constructor() {
    this.game = new Game()
    this.scene = this.game.scene
    this.renderer = this.game.renderer.instance

    this.game.physics = new Physics()
    this.physics = this.game.physics

    this.level = new Level(this.scene, this.physics, this.renderer)

    this.setPortals()
    this.setSystems()
    this.setCube()
    this.setPuzzle()
    this.setInput()

    // three.js needs the world matrices current before the first portal pass
    this.scene.updateMatrixWorld(true)
    this.portalSystem.collectWorldMaterials(this.scene)
    for (const m of this.level.surfaces) this.portalSystem.registerCullable(m.mesh)
  }

  // ------------------------------------------------------------------ portals

  setPortals() {
    this.portals = { blue: new Portal('blue'), orange: new Portal('orange') }
    this.portalList = [this.portals.blue, this.portals.orange]

    for (const p of this.portalList) {
      p.group.layers.enable(LAYER_WORLD)
      this.scene.add(p.group)
    }

    this.portalSystem = new PortalSystem({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.game.camera.instance,
      virtualCamera: this.game.camera.virtual,
    })

    this.portalGun = new PortalGun({ surfaces: this.level.getPortalableSurfaces() })
    this.portalGun.onFizzle = (reason) => this.game.onPortalFizzle?.(reason)
    this.portalGhosts = new PortalGhosts(this.scene)
  }

  setSystems() {
    this.funnel = new FunnelSystem()
    this.laser = new LaserSystem(this.scene)
  }

  // --------------------------------------------------------------------- cube

  setCube() {
    const asset = this.game.resources?.items?.cube
    let mesh

    if (asset) {
      mesh = asset.scene.clone(true)
      const box = new THREE.Box3().setFromObject(mesh)
      const size = box.getSize(new THREE.Vector3())
      const target = 0.62
      mesh.scale.setScalar(target / Math.max(size.x, size.y, size.z))
      const centre = box.getCenter(new THREE.Vector3()).multiplyScalar(mesh.scale.x)
      const pivot = new THREE.Group()
      mesh.position.sub(centre)
      pivot.add(mesh)
      mesh = pivot
    } else {
      mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.62, 0.62, 0.62),
        new THREE.MeshStandardMaterial({ color: 0xc9d3dd, roughness: 0.4, metalness: 0.55 })
      )
    }

    mesh.position.set(2.4, 0.4, 3.2)
    mesh.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true
        o.receiveShadow = true
        if (o.material && !Array.isArray(o.material)) o.material = o.material.clone()
      }
    })
    this.scene.add(mesh)
    this.cubeMesh = mesh

    const body = new CANNON.Body({
      mass: 12,
      shape: new CANNON.Box(new CANNON.Vec3(0.31, 0.31, 0.31)),
      material: this.physics.default,
      linearDamping: 0.06,
      angularDamping: 0.28,
    })
    body.position.copy(mesh.position)
    body.collisionFilterGroup = this.physics.groupCube
    body.collisionFilterMask = this.physics.defaultMask | this.physics.groupPlayer
    this.physics.addBody(body)
    this.cubeBody = body

    this.heldCube = false
    this._holdOffset = new THREE.Vector3()

    // slice it when it straddles a portal, exactly like the client ghosts do
    this.portalGhosts.register(mesh, 0.45)
  }

  // ------------------------------------------------------------------- puzzle

  setPuzzle() {
    // A beam leaves the west wall and dies on the east one. The catch pad sits
    // on the ceiling, so the only way to close the circuit is a floor portal.
    this.laser.addEmitter(new THREE.Vector3(-11.7, 3.2, 0), new THREE.Vector3(1, 0, 0))

    this.receptor = this.laser.addReceptor(
      new THREE.Vector3(0, 7.85, 0),
      new THREE.Vector3(0, -1, 0),
      { half: new THREE.Vector3(3, 0.15, 3) }
    )

    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(6, 0.1, 6),
      new THREE.MeshStandardMaterial({
        color: 0x1b222b,
        emissive: new THREE.Color(0x1b2a38),
        emissiveIntensity: 0.4,
        roughness: 0.6,
        metalness: 0.3,
      })
    )
    pad.position.set(0, 7.84, 0)
    this.scene.add(pad)
    this.receptorPad = pad
    this.receptorPadMat = pad.material

    this.laser.blockers = [...this.level.surfaces.map((s) => s.mesh), this.cubeMesh]

    this.solved = false
    this.onPuzzleSolved = null
  }

  // -------------------------------------------------------------------- input

  setInput() {
    const canvas = this.game.canvas

    canvas.addEventListener('contextmenu', (e) => e.preventDefault())
    canvas.addEventListener('mousedown', (e) => {
      if (!this.game.isPlaying) return
      if (e.button === 0) this.fire('blue')
      else if (e.button === 2) this.fire('orange')
    })

    document.addEventListener('keydown', (e) => {
      if (!this.game.isPlaying) return
      if (e.code === 'KeyE') this.toggleCube()
      if (e.code === 'KeyR') this.reset()
    })
  }

  fire(side) {
    const controls = this.game.controls
    const camera = this.game.camera.instance
    const origin = camera.getWorldPosition(_tmpVec)
    const direction = camera.getWorldDirection(_tmpVec2).normalize()

    const result = this.portalGun.tryPlace(origin, direction, this.portals, side)
    this.game.onPortalFired?.(side, !!result?.ok)

    if (result?.ok) {
      this.game.onPortalPlaced?.(side, result.point, result.normal)
      this.refreshMasks()
      return
    }
    return result
  }

  toggleCube() {
    if (this.heldCube) {
      this.heldCube = false
      this.cubeBody.type = CANNON.Body.DYNAMIC
      this.cubeBody.updateMassProperties()
      this.cubeBody.wakeUp()
      const cam = this.game.camera.instance
      cam.getWorldDirection(_tmpVec)
      this.cubeBody.velocity.set(_tmpVec.x * 6, _tmpVec.y * 6 + 1.2, _tmpVec.z * 6)
      this.game.onPrompt?.(null)
      return
    }

    const cam = this.game.camera.instance
    const eye = cam.getWorldPosition(_tmpVec)
    const dist = eye.distanceTo(this.cubeMesh.position)
    if (dist < 2.6) {
      this.heldCube = true
      this.cubeBody.type = CANNON.Body.KINEMATIC
      this.cubeBody.velocity.setZero()
      this.cubeBody.angularVelocity.setZero()
    }
  }

  // ------------------------------------------------------------ hole clipping

  /**
   * Remove the surface a portal sits on from a traveller's collision mask while
   * they overlap that portal's hole.
   */
  refreshMasks() {
    const travellers = [
      { body: this.game.controls?.body, radius: PLAYER_RADIUS },
      { body: this.cubeBody, radius: 0.45 },
    ]

    for (const t of travellers) {
      if (!t.body) continue
      let mask = this.physics.defaultMask
      if (t.body === this.cubeBody) mask |= this.physics.groupPlayer

      _pos.set(t.body.position.x, t.body.position.y, t.body.position.z)
      for (const portal of this.portalList) {
        if (!portal.active || !portal.pair) continue
        const group = portal.wall?.userData?.collisionGroup
        if (!group) continue
        if (sphereIntersectsPortalHole(portal, _pos, t.radius)) mask &= ~group
      }
      t.body.collisionFilterMask = mask
    }
  }

  // -------------------------------------------------------------------- reset

  reset() {
    for (const p of this.portalList) {
      p.active = false
      p.openAmount = 0
      p.wall = null
      p.setVisible(false)
    }
    this.portals.blue.pair = null
    this.portals.orange.pair = null
    this.portals.blue.updateLinkMatrix()
    this.portals.orange.updateLinkMatrix()

    this.cubeBody.position.set(2.4, 0.4, 3.2)
    this.cubeBody.velocity.setZero()
    this.cubeBody.angularVelocity.setZero()
    this.cubeBody.type = CANNON.Body.DYNAMIC
    this.cubeBody.updateMassProperties()
    this.heldCube = false

    this.game.controls?.respawn()
    this.refreshMasks()
    this.game.onReset?.()
  }

  // ------------------------------------------------------------------- update

  update(dt) {
    const controls = this.game.controls

    // 1. funnel, then movement, then portals: Valve runs game movement (which
    //    includes FunnelIntoPortal) before the portal simulation touches.
    if (controls) {
      controls.updateWish()
      controls.updateGrounded()
      this.funnel.apply(this.portalList, {
        position: _tmpVec.copy(controls.body.position),
        velocity: _tmpVec2.set(
          controls.body.velocity.x,
          controls.body.velocity.y,
          controls.body.velocity.z
        ),
        wish: controls.wish,
      })
      controls.body.velocity.x = _tmpVec2.x
      controls.body.velocity.z = _tmpVec2.z

      controls.move(dt)
      controls.checkPortals(this.portalList)
    }

    this.updateCube(dt)

    // 2. physics
    this.physics.step(dt)

    // 3. post-physics: sync transforms, then let portals act on bodies
    this.syncMeshes()
    if (controls) controls.update(dt)

    this.portalGhosts.update(this.portalList)
    this.refreshMasks()

    this.laser.update(dt, this.portalList, this.laser.blockers)
    this.updatePuzzle()
  }

  updateCube(dt) {
    if (!this.heldCube) return
    const cam = this.game.camera.instance
    const eye = cam.getWorldPosition(_tmpVec)
    const dir = cam.getWorldDirection(_tmpVec2)

    const target = eye.clone().addScaledVector(dir, 1.5)
    target.y -= 0.25

    const p = this.cubeBody.position
    const k = Math.min(1, dt * 18)
    this.cubeBody.velocity.set(
      (target.x - p.x) * 18,
      (target.y - p.y) * 18,
      (target.z - p.z) * 18
    )
    this.cubeBody.angularVelocity.scale(1 - k, this.cubeBody.angularVelocity)
    // face the camera, upright — the companion cube is never held sideways
    this.cubeBody.quaternion.setFromEuler(0, Math.atan2(dir.x, dir.z) + Math.PI, 0)
  }

  syncMeshes() {
    this.cubeMesh.position.copy(this.cubeBody.position)
    this.cubeMesh.quaternion.copy(this.cubeBody.quaternion)
  }

  updatePuzzle() {
    const solved = this.receptor.activated
    if (solved !== this.solved) {
      this.solved = solved
      this.receptorPadMat.emissiveIntensity = solved ? 2.2 : 0.4
      this.receptorPadMat.emissive.setHex(solved ? 0x2ee08a : 0x1b2a38)
      this.game.onPuzzleSolved?.(solved)
    }
    return solved
  }

  // ------------------------------------------------------------------- render

  /**
   * Draws one frame. The portal pass is the whole scene render: the base view is
   * drawn first so the stencil mask pass has something to depth-test against.
   */
  render() {
    const camera = this.game.camera.instance
    const renderer = this.renderer

    renderer.clear(true, true, true)
    camera.layers.set(LAYER_WORLD)
    camera.layers.enable(LAYER_VIEWMODEL)
    renderer.render(this.scene, camera)

    this.portalSystem.render(this.portalList, this.game.deltaTime)
  }

  get stats() {
    return this.portalSystem.stats
  }

  dispose() {
    this.portalSystem.dispose()
    this.portalGhosts.dispose?.()
    for (const p of this.portalList) p.dispose()
  }
}

export { PORTAL_HALF_WIDTH, PORTAL_HALF_HEIGHT }
