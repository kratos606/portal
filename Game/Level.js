import * as THREE from 'three'
import CANNON from 'cannon'
import Game from './game.js'
import { getSurfaceTextures } from './TextureFactory.js'
import { GROUP_DEFAULT, GROUP_PLAYER, GROUP_CUBE, GROUP_PROPS } from './physics.js'

/**
 * The test chamber: geometry, static physics, and the set of surfaces a portal
 * may be placed on.
 *
 * Every portal-able surface gets its own collision group bit so that a
 * traveller standing in a portal hole can have just that surface removed from
 * its collision mask — the same trick the portal simulator achieves by clipping
 * the local collision geometry.
 */

export const ROOM = { halfX: 12, halfZ: 12, height: 8 }

export default class Level {
  constructor(scene, physics, renderer) {
    this.game = new Game()
    this.scene = scene
    this.physics = physics
    this.renderer = renderer
    this.textures = getSurfaceTextures(renderer, this.game.resources?.items ?? {})

    /** @type {Array<{mesh: THREE.Mesh, group: number, name: string}>} */
    this.surfaces = []
    this.props = []

    this.build()
  }

  _addSurface(mesh, name, { repeat = [1, 1], thickness = 0.3, portalable = true } = {}) {
    mesh.receiveShadow = true
    mesh.castShadow = false
    this.scene.add(mesh)

    const group = this.physics.allocSurfaceGroup()
    mesh.userData.collisionGroup = group
    mesh.userData.portalable = portalable

    const params = mesh.geometry.parameters
    const body = new CANNON.Body({ mass: 0, material: this.physics.ground })
    body.addShape(
      new CANNON.Box(new CANNON.Vec3(params.width / 2, params.height / 2, thickness / 2))
    )
    body.position.copy(mesh.position)
    body.quaternion.copy(mesh.quaternion)
    body.collisionFilterGroup = group
    body.collisionFilterMask = GROUP_PLAYER | GROUP_CUBE | GROUP_PROPS | GROUP_DEFAULT
    body.userData = { surfaceName: name }
    this.physics.addBody(body)

    mesh.userData.body = body
    this.surfaces.push({ mesh, group, name, body })
    return mesh
  }

  _mat(set, repeat, extra = {}) {
    const map = set.map.clone()
    const normalMap = set.normalMap.clone()
    map.needsUpdate = true
    normalMap.needsUpdate = true
    map.repeat.set(repeat[0], repeat[1])
    normalMap.repeat.set(repeat[0], repeat[1])
    map.wrapS = map.wrapT = THREE.RepeatWrapping
    normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
    return new THREE.MeshStandardMaterial({
      map,
      normalMap,
      normalScale: new THREE.Vector2(0.8, 0.8),
      roughness: 0.72,
      metalness: 0.12,
      ...extra,
    })
  }

  build() {
    const { halfX, halfZ, height } = ROOM
    const T = this.textures

    // ---- floor ---------------------------------------------------------------
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(halfX * 2, halfZ * 2),
      this._mat(T.floor, [halfX, halfZ], { roughness: 0.55, metalness: 0.25 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.name = 'floor'
    this.floor = this._addSurface(floor, 'floor', { repeat: [12, 12], thickness: 0.5 })

    // ---- ceiling -------------------------------------------------------------
    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(halfX * 2, halfZ * 2),
      this._mat(T.ceiling, [halfX / 2, halfZ / 2], {
        emissive: new THREE.Color(0x9fb4c8),
        emissiveIntensity: 0.25,
        emissiveMap: T.ceiling.map,
      })
    )
    ceiling.rotation.x = Math.PI / 2
    ceiling.position.y = height
    ceiling.name = 'ceiling'
    this.ceiling = this._addSurface(ceiling, 'ceiling', { thickness: 0.5 })

    // ---- walls ---------------------------------------------------------------
    const wallMat = () => this._mat(T.panels, [halfX, height / 2])
    const wallGeo = new THREE.PlaneGeometry(halfX * 2, height)

    const mk = (name, px, pz, ry) => {
      const m = new THREE.Mesh(wallGeo, wallMat())
      m.position.set(px, height / 2, pz)
      m.rotation.y = ry
      m.name = name
      return this._addSurface(m, name, { thickness: 0.4 })
    }
    this.wallNorth = mk('wallNorth', 0, -halfZ, 0)
    this.wallSouth = mk('wallSouth', 0, halfZ, Math.PI)
    this.wallWest = mk('wallWest', -halfX, 0, Math.PI / 2)
    this.wallEast = mk('wallEast', halfX, 0, -Math.PI / 2)

    // ---- raised platform ------------------------------------------------------
    const platMat = this._mat(T.panels, [3, 1])
    const plat = new THREE.Mesh(new THREE.BoxGeometry(6, 1.2, 6), platMat)
    plat.position.set(-7.5, 0.6, -7.5)
    plat.castShadow = true
    plat.receiveShadow = true
    this.scene.add(plat)

    const platTop = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), this._mat(T.floor, [3, 3]))
    platTop.rotation.x = -Math.PI / 2
    platTop.position.set(-7.5, 1.201, -7.5)
    platTop.name = 'platformTop'
    this.platform = this._addSurface(platTop, 'platformTop', { thickness: 1.2 })

    // solid sides of the platform (non portalable)
    const platBody = new CANNON.Body({ mass: 0, material: this.physics.ground })
    platBody.addShape(new CANNON.Box(new CANNON.Vec3(3, 0.6, 3)))
    platBody.position.set(-7.5, 0.6, -7.5)
    platBody.collisionFilterGroup = GROUP_DEFAULT
    platBody.collisionFilterMask = GROUP_PLAYER | GROUP_CUBE | GROUP_PROPS
    this.physics.addBody(platBody)

    // ---- light strips ---------------------------------------------------------
    this.addLightStrips()

    // ---- observation glass ----------------------------------------------------
    this.addObservationRoom()
  }

  addLightStrips() {
    const { halfX, halfZ, height } = ROOM
    const geo = new THREE.BoxGeometry(0.18, 0.12, 1)
    const mat = new THREE.MeshBasicMaterial({ color: 0xdfe9f5 })
    const positions = []
    for (let z = -halfZ + 3; z <= halfZ - 3; z += 6) {
      positions.push([-halfX + 0.12, height - 0.9, z, 0])
      positions.push([halfX - 0.12, height - 0.9, z, 0])
    }
    for (let x = -halfX + 3; x <= halfX - 3; x += 6) {
      positions.push([x, height - 0.9, -halfZ + 0.12, 1])
      positions.push([x, height - 0.9, halfZ - 0.12, 1])
    }

    const instanced = new THREE.InstancedMesh(geo, mat, positions.length)
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const s = new THREE.Vector3(1, 1, 1)
    const p = new THREE.Vector3()
    positions.forEach(([x, y, z, rot], i) => {
      q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), rot ? Math.PI / 2 : 0)
      s.set(1, 1, rot ? halfZ * 2 - 4 : halfX * 2 - 4)
      p.set(x, y, z)
      instanced.setMatrixAt(i, m.compose(p, q, s))
    })
    instanced.instanceMatrix.needsUpdate = true
    this.scene.add(instanced)
  }

  addObservationRoom() {
    // a dark recessed alcove behind the north wall, purely for depth
    const { halfX, halfZ, height } = ROOM
    const geo = new THREE.BoxGeometry(10, 3.2, 0.1)
    const mat = new THREE.MeshStandardMaterial({
      color: 0x14181d,
      roughness: 0.4,
      metalness: 0.6,
    })
    const glass = new THREE.Mesh(geo, mat)
    glass.position.set(0, height - 2.4, -halfZ + 0.25)
    this.scene.add(glass)

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(10.6, 3.8, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x2a3138, roughness: 0.5, metalness: 0.7 })
    )
    frame.position.set(0, height - 2.4, -halfZ + 0.1)
    this.scene.add(frame)
  }

  /** All meshes a portal may be placed on. */
  getPortalableSurfaces() {
    return this.surfaces.map((s) => s.mesh)
  }

  /** Collision mask covering every static surface. */
  getAllSurfaceMask() {
    let mask = 0
    for (const s of this.surfaces) mask |= s.group
    return mask | GROUP_DEFAULT
  }

  update() {}
}
