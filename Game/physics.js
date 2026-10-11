import CANNON from 'cannon'

/**
 * Physics setup shared by everything.
 *
 * Collision groups are the important part: every portal-able surface owns a
 * single bit, so a traveller standing in a portal hole can have exactly that
 * surface removed from its mask. That is the client-side half of what Valve
 * gets from per-portal physics environments (PortalSimulation.cpp:1291).
 */

export const GROUP_DEFAULT = 1 << 0
export const GROUP_PLAYER = 1 << 1
export const GROUP_CUBE = 1 << 2
export const GROUP_PROPS = 1 << 3
export const GROUP_SURFACE_FIRST = 1 << 4
/** Bits 4..11 are available for portal-able surfaces. */
export const GROUP_SURFACE_COUNT = 8

/** Portal's sv_gravity is 800 in/s^2 = 20.32 m/s^2. */
export const GRAVITY = -20.32

export default class Physics {
  constructor() {
    this.world = new CANNON.World()
    this.world.gravity.set(0, GRAVITY, 0)
    this.world.broadphase = new CANNON.SAPBroadphase(this.world)
    this.world.allowSleep = false
    this.world.solver.iterations = 14
    this.world.defaultContactMaterial.contactEquationStiffness = 1e8
    this.world.defaultContactMaterial.contactEquationRelaxation = 4

    this.default = new CANNON.Material('default')
    this.player = new CANNON.Material('player')
    this.ground = new CANNON.Material('ground')

    // The player slides: portal surfaces are meant to be low friction so
    // momentum survives a trip through a portal.
    this.world.addContactMaterial(
      new CANNON.ContactMaterial(this.player, this.ground, {
        friction: 0.0,
        restitution: 0.0,
      })
    )
    this.world.addContactMaterial(
      new CANNON.ContactMaterial(this.default, this.ground, {
        friction: 0.35,
        restitution: 0.02,
      })
    )
    this.world.defaultContactMaterial = new CANNON.ContactMaterial(
      this.default,
      this.default,
      { friction: 0.35, restitution: 0.05 }
    )

    this.groupDefault = GROUP_DEFAULT
    this.groupPlayer = GROUP_PLAYER
    this.groupCube = GROUP_CUBE
    this.groupProps = GROUP_PROPS

    this._surfaceMask = 0
    this._nextBit = 0

    this.bodies = []

    // Raycast scratch, reused every frame.
    this.rayFrom = new CANNON.Vec3()
    this.rayTo = new CANNON.Vec3()
    this.rayResult = new CANNON.RaycastResult()
    this.rayOptions = {
      skipBackfaces: true,
      collisionFilterMask: -1,
      collisionFilterGroup: -1,
      checkCollisionResponse: true,
    }
  }

  /** Allocates the next free portal-able surface bit. */
  allocSurfaceGroup() {
    if (this._nextBit >= GROUP_SURFACE_COUNT) {
      throw new Error('Out of collision-group bits for portal-able surfaces')
    }
    const bit = GROUP_SURFACE_FIRST << this._nextBit
    this._nextBit++
    this._surfaceMask |= bit
    return bit
  }

  /** Mask covering every static surface, for entities that clip nothing. */
  get allSurfaceMask() {
    return this._surfaceMask | GROUP_DEFAULT
  }

  /** Everything a traveller should collide with by default. */
  get defaultMask() {
    return this.allSurfaceMask | GROUP_CUBE | GROUP_PROPS | GROUP_DEFAULT
  }

  get playerMaterial() {
    return this.player
  }

  get defaultContactMaterial() {
    return this.default
  }

  addBody(body) {
    this.world.addBody(body)
    this.bodies.push(body)
    return body
  }

  /**
   * @param {CANNON.Vec3} from
   * @param {CANNON.Vec3} to
   * @param {object} [opts] overrides for collisionFilterMask/Group
   * @returns {CANNON.RaycastResult}
   */
  raycastClosest(from, to, opts) {
    this.rayResult.reset()
    this.rayOptions.collisionFilterMask = opts?.mask ?? -1
    this.rayOptions.collisionFilterGroup = opts?.group ?? -1
    return this.world.raycastClosest(from, to, this.rayOptions, this.rayResult)
  }

  step(dt, maxSubSteps = 3, fixedStep = 1 / 120) {
    this.world.step(fixedStep, dt, maxSubSteps)
  }
}
