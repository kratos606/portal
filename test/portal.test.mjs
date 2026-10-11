/**
 * Node-side tests for the portal logic.
 *
 * Everything here is pure maths or physics wiring that does not need a GL
 * context, so it runs straight under `node`. The WebGL stencil pass itself is
 * not exercised — see PORTAL_LOGIC.md §6 for the state machine it implements.
 *
 *   npm test
 */
import * as THREE from 'three'
import CANNON from 'cannon'

import Portal from '../Game/portal/Portal.js'
import PortalGun from '../Game/portal/PortalGun.js'
import Physics from '../Game/physics.js'
import FunnelSystem from '../Game/systems/FunnelSystem.js'
import LaserSystem from '../Game/systems/LaserSystem.js'
import {
  clipPolygonByPlanes,
  getPortalCorners,
  buildRenderFixCone,
  intersectRayWithPortal,
  sphereIntersectsPortalHole,
  pointInPortalHole,
} from '../Game/portal/geometry.js'
import {
  shouldTeleport,
  computeTeleport,
  applyToBody,
} from '../Game/portal/PortalTeleport.js'
import {
  PORTAL_HALF_WIDTH,
  PORTAL_HALF_HEIGHT,
  MIN_FLOOR_EXIT_VELOCITY_PLAYER,
  PLAYER_RADIUS,
  RENDERFIX_BOUND_PLANES,
} from '../Game/portal/constants.js'
import { GROUP_SURFACE_FIRST } from '../Game/physics.js'

// ---------------------------------------------------------------------------
// micro test harness
// ---------------------------------------------------------------------------
let passed = 0
let failed = 0
const failures = []

function test(name, fn) {
  try {
    fn()
    passed++
  } catch (err) {
    failed++
    failures.push(`${name}\n      ${err.message}`)
  }
}
function ok(cond, msg = 'expected truthy') {
  if (!cond) throw new Error(msg)
}
function near(a, b, eps = 1e-6, msg = '') {
  if (Math.abs(a - b) > eps) throw new Error(`${msg} expected ${b}, got ${a}`)
}
function vecNear(v, x, y, z, eps = 1e-5, msg = '') {
  if (Math.abs(v.x - x) > eps || Math.abs(v.y - y) > eps || Math.abs(v.z - z) > eps) {
    throw new Error(`${msg} expected (${x}, ${y}, ${z}), got (${v.x}, ${v.y}, ${v.z})`)
  }
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
const V = (x, y, z) => new THREE.Vector3(x, y, z)

function makePortal(side, position, normal) {
  const p = new Portal(side)
  p.place(position, normal)
  return p
}

function link(a, b) {
  a.pair = b
  b.pair = a
  a.updateLinkMatrix()
  b.updateLinkMatrix()
}

function quad() {
  return [V(-1, -1, 0), V(1, -1, 0), V(1, 1, 0), V(-1, 1, 0)]
}
function buf(n = 24) {
  return Array.from({ length: n }, () => new THREE.Vector3())
}

// ===========================================================================
// 1. Link matrix — PORTAL_LOGIC.md §5
// ===========================================================================
test('link matrix maps the entry origin onto the exit origin', () => {
  const a = makePortal('blue', V(0, 1.4, 0), V(0, 0, 1))
  const b = makePortal('orange', V(10, 1.4, -5), V(-1, 0, 0))
  link(a, b)

  const mapped = V(0, 1.4, 0).applyMatrix4(a.matrixThisToLinked)
  vecNear(mapped, 10, 1.4, -5, 1e-5, 'entry origin ->')
})

test('link matrix is a proper rotation (never mirrors)', () => {
  const a = makePortal('blue', V(0, 1.4, 0), V(0, 0, 1))
  const b = makePortal('orange', V(3, 1.4, 3), V(0, 1, 0)) // floor portal
  link(a, b)

  for (const [name, p] of [['blue', a], ['orange', b]]) {
    const det = new THREE.Matrix4().extractRotation(p.matrixThisToLinked).determinant()
    near(det, 1, 1e-6, `${name} link determinant`)
  }
})

test('link matrix maps entry forward to MINUS exit forward', () => {
  // matThisToLinked = remoteToWorld * RotY(pi) * inverse(localToWorld), so the
  // entry basis lands on the exit basis turned 180 degrees. The physical
  // invariant is the one below: into the entry == out of the exit.
  const a = makePortal('blue', V(0, 1.4, 0), V(0, 0, 1))
  const b = makePortal('orange', V(3, 0, 3), V(0, 1, 0))
  link(a, b)

  const fwd = a.transformDirection(V(0, 0, 1))
  vecNear(fwd, 0, -1, 0, 1e-5, 'entry +Z ->')

  const intoEntry = V(0, 0, -1) // walking into a, against its normal
  const outOfExit = a.transformDirection(intoEntry)
  vecNear(outOfExit, 0, 1, 0, 1e-5, 'into entry ->')
})

test('traversing both portals round-trips to the start', () => {
  const a = makePortal('blue', V(-4, 1.4, 2), V(1, 0, 0))
  const b = makePortal('orange', V(6, 2.2, -1), V(0, 0, -1))
  link(a, b)

  const p = V(1.5, -0.7, 0.3)
  const once = p.clone().applyMatrix4(a.matrixThisToLinked)
  const twice = once.clone().applyMatrix4(b.matrixThisToLinked)
  vecNear(twice, p.x, p.y, p.z, 1e-5, 'round trip ->')
})

test('unlinked portals leave the link matrix at identity', () => {
  const a = makePortal('blue', V(0, 1.4, 0), V(0, 0, 1))
  a.pair = null
  a.updateLinkMatrix()
  ok(a.matrixThisToLinked.equals(new THREE.Matrix4()), 'expected identity')
})

// ===========================================================================
// 2. Aperture geometry
// ===========================================================================
test('portal corners form the expected rectangle', () => {
  const p = makePortal('blue', V(0, 0, 0), V(0, 0, 1))
  const out = [V(), V(), V(), V()]
  getPortalCorners(p.group, PORTAL_HALF_WIDTH, PORTAL_HALF_HEIGHT, out)

  near(out[0].x, PORTAL_HALF_WIDTH, 1e-6, 'corner0.x')
  near(out[0].y, PORTAL_HALF_HEIGHT, 1e-6, 'corner0.y')
  near(out[2].x, -PORTAL_HALF_WIDTH, 1e-6, 'corner2.x')
  near(out[2].y, -PORTAL_HALF_HEIGHT, 1e-6, 'corner2.y')
  near(out[0].distanceTo(out[2]), 2 * Math.hypot(PORTAL_HALF_WIDTH, PORTAL_HALF_HEIGHT), 1e-6, 'diagonal')
})

test('aperture is 1.63 m by 2.74 m (32" x 54")', () => {
  near(PORTAL_HALF_WIDTH * 2, 1.6256, 1e-3, 'width')
  near(PORTAL_HALF_HEIGHT * 2, 2.7432, 1e-3, 'height')
})

test('hole test accepts a sphere straddling the plane', () => {
  const p = makePortal('blue', V(0, 0, 0), V(0, 0, 1))
  ok(sphereIntersectsPortalHole(p, V(0, 0, 0), 0.4), 'centred sphere should straddle')
  ok(sphereIntersectsPortalHole(p, V(0, 0, 0.3), 0.4), 'just in front should straddle')
  ok(!sphereIntersectsPortalHole(p, V(0, 0, 1.0), 0.4), 'far in front should not')
  ok(!sphereIntersectsPortalHole(p, V(0, 5, 0), 0.4), 'above the aperture should not')
  ok(!sphereIntersectsPortalHole(p, V(3, 0, 0), 0.4), 'beside the aperture should not')
})

test('pointInPortalHole respects the rectangle', () => {
  const p = makePortal('blue', V(0, 0, 0), V(0, 0, 1))
  ok(pointInPortalHole(p, V(0, 0, 0.1)), 'inside')
  ok(!pointInPortalHole(p, V(0, 0, -0.1)), 'behind the plane')
  ok(!pointInPortalHole(p, V(PORTAL_HALF_WIDTH * 1.5, 0, 0.1)), 'outside the width')
})

// ===========================================================================
// 3. Ray / portal intersection — UTIL_IntersectRayWithPortal
// ===========================================================================
test('ray into the aperture returns the correct distance', () => {
  const p = makePortal('blue', V(0, 0, 0), V(0, 0, 1))
  const t = intersectRayWithPortal(p, V(0, 0, 5), V(0, 0, -1))
  near(t, 5, 1e-6, 'distance')
})

test('ray outside the aperture misses', () => {
  const p = makePortal('blue', V(0, 0, 0), V(0, 0, 1))
  near(intersectRayWithPortal(p, V(PORTAL_HALF_WIDTH * 2, 0, 5), V(0, 0, -1)), -1, 0, 'off to the side')
  near(intersectRayWithPortal(p, V(0, PORTAL_HALF_HEIGHT * 2, 5), V(0, 0, -1)), -1, 0, 'above')
})

test('rays arriving from behind the portal are rejected', () => {
  const p = makePortal('blue', V(0, 0, 0), V(0, 0, 1))
  near(intersectRayWithPortal(p, V(0, 0, -5), V(0, 0, 1)), -1, 0, 'from behind')
})

// ===========================================================================
// 4. Polygon clipping (Sutherland-Hodgman) — used by the frustum cone
// ===========================================================================
test('clipPolygonByPlanes keeps the half that survives', () => {
  const planes = [new THREE.Plane().setFromNormalAndCoplanarPoint(V(1, 0, 0), V(0, 0, 0))]
  const out = clipPolygonByPlanes(quad(), planes, 1, buf(), buf())
  ok(out.count === 4, `expected 4 verts, got ${out.count}`)
  for (let i = 0; i < out.count; i++) ok(out[i].x >= -1e-6, 'all verts must be on +X')
})

test('clipPolygonByPlanes reports empty when everything is clipped away', () => {
  // normal -X through (-5,0,0) keeps x < -5, which nothing in the quad satisfies
  const planes = [new THREE.Plane().setFromNormalAndCoplanarPoint(V(-1, 0, 0), V(-5, 0, 0))]
  const out = clipPolygonByPlanes(quad(), planes, 1, buf(), buf())
  ok(out.count < 3, `expected degenerate, got ${out.count}`)
})

test('clipPolygonByPlanes does not overrun its scratch buffers', () => {
  // 12 planes against a 4-gon: the intermediate count can reach 16, so the
  // buffers must be sized for it rather than for the input vertex count.
  const planes = []
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2
    // normal points inward so the surviving region is the prism interior
    planes.push(
      new THREE.Plane().setFromNormalAndCoplanarPoint(
        V(-Math.cos(a), -Math.sin(a), 0),
        V(Math.cos(a) * 0.5, Math.sin(a) * 0.5, 0)
      )
    )
  }
  const out = clipPolygonByPlanes(quad(), planes, 12, buf(40), buf(40))
  ok(out.count === 12, `expected a 12-gon, got ${out.count}`)
  for (let i = 0; i < out.count; i++) {
    ok(Number.isFinite(out[i].x) && Number.isFinite(out[i].y), 'vertex must be finite')
  }
})

test('render-fix cone is 12 radial planes plus back and front', () => {
  const p = makePortal('blue', V(1, 2, 3), V(0, 1, 0))
  const planes = Array.from({ length: RENDERFIX_BOUND_PLANES + 2 }, () => new THREE.Plane())
  buildRenderFixCone(p.group, planes, PORTAL_HALF_WIDTH, PORTAL_HALF_HEIGHT)
  ok(planes.length === 14, 'plane count')
  for (const pl of planes) {
    ok(Number.isFinite(pl.normal.x) && pl.normal.lengthSq() > 1e-9, 'normal must be finite')
    ok(Number.isFinite(pl.constant), 'constant must be finite')
  }
  // every radial normal is unit length
  for (let i = 0; i < RENDERFIX_BOUND_PLANES; i++) near(planes[i].normal.length(), 1, 1e-6, 'radial normal length')
})

// ===========================================================================
// 5. Teleportation — PORTAL_LOGIC.md §8
// ===========================================================================
function teleportRig() {
  const a = makePortal('blue', V(0, 1.4, 0), V(0, 0, 1))
  const b = makePortal('orange', V(8, 1.4, 0), V(0, 0, -1))
  link(a, b)
  return { a, b }
}

test('teleport gate needs a crossing AND an overlap with the hole', () => {
  const { a } = teleportRig()
  const centre = V(0, 1.4, -0.05) // just behind the plane, dead centre
  const before = V(0, 1.4, 0.05)

  ok(shouldTeleport(a, centre, PLAYER_RADIUS, before), 'should teleport')
  ok(!shouldTeleport(a, centre, PLAYER_RADIUS, V(0, 1.4, -0.5)), 'already behind: no re-trigger')
  ok(!shouldTeleport(a, V(0, 1.4, 0.5), PLAYER_RADIUS, V(0, 1.4, 1.0)), 'still in front: no')
  ok(!shouldTeleport(a, V(0, 6.0, -0.05), PLAYER_RADIUS, V(0, 6.0, 0.05)), 'outside the hole: no')
})

test('teleport moves the traveller to the linked portal', () => {
  const { a } = teleportRig()
  const centre = V(0, 1.4, -0.02)
  const result = computeTeleport(a, {
    origin: centre,
    centre,
    quaternion: new THREE.Quaternion(),
    velocity: V(0, 0, -5),
    isPlayer: true,
  })
  // entered 2 cm behind the entry plane, so exit 2 cm in front of the exit one
  const exit = result.exit
  near(exit.planeDistance(result.position), 0.02, 1e-4, 'distance in front of the exit plane')
  vecNear(result.position, 8, 1.4, -0.02, 1e-4, 'exit position')
})

test('teleport rotates velocity and never adds to its magnitude', () => {
  const { a } = teleportRig()
  const centre = V(0, 1.4, -0.02)
  const result = computeTeleport(a, {
    origin: centre,
    centre,
    quaternion: new THREE.Quaternion(),
    velocity: V(0, 0, -5),
    isPlayer: true,
  })
  near(result.velocity.length(), 5, 1e-5, 'speed preserved')
  // entering head-on against a's normal, so we leave along b's normal
  const exitNormal = V(0, 0, 1).transformDirection(result.exit.matrixWorld)
  near(result.velocity.clone().normalize().dot(exitNormal), 1, 1e-5, 'exits along the exit normal')
  vecNear(result.velocity, 0, 0, -5, 1e-5, 'b faces -Z')
})

test('exiting a floor portal enforces the 300 in/s player velocity floor', () => {
  const a = makePortal('blue', V(0, 4, 0), V(0, -1, 0)) // ceiling, facing down
  const b = makePortal('orange', V(0, 0, 8), V(0, 1, 0)) // floor, facing up
  link(a, b)

  const centre = V(0, 4.02, 0) // just behind the ceiling portal's plane (above it)
  ok(a.planeDistance(centre) < 0, 'sanity: centre is behind the entry plane')

  const result = computeTeleport(a, {
    origin: centre,
    centre,
    quaternion: new THREE.Quaternion(),
    velocity: V(0, -1, 0),
    isPlayer: true,
  })
  ok(result.velocity.y >= MIN_FLOOR_EXIT_VELOCITY_PLAYER - 1e-6, `got ${result.velocity.y}`)
})

test('applyToBody writes position, orientation and velocity to the body', () => {
  const body = new CANNON.Body({ mass: 80 })
  const result = {
    position: V(1, 2, 3),
    quaternion: new THREE.Quaternion(0, 0.7071, 0, 0.7071),
    velocity: V(4, 5, 6),
  }
  applyToBody(result, body)
  near(body.position.x, 1, 0, 'x')
  near(body.position.y, 2, 0, 'y')
  near(body.position.z, 3, 0, 'z')
  near(body.velocity.y, 5, 0, 'vy')
  near(body.quaternion.y, 0.7071, 1e-9, 'qy')
})

// ===========================================================================
// 6. Placement — FitPortalOnSurface / VerifyPortalPlacement
// ===========================================================================
function wallSurface() {
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(8, 4))
  mesh.position.set(0, 2, -5)
  mesh.updateMatrixWorld(true)
  mesh.userData.collisionGroup = 16
  return mesh
}

test('gun places a portal aligned to the surface normal', () => {
  const gun = new PortalGun({ surfaces: [wallSurface()] })
  const portals = { blue: new Portal('blue'), orange: new Portal('orange') }
  const result = gun.tryPlace(V(0, 2, 0), V(0, 0, -1), portals, 'blue')

  ok(result?.ok, `placement failed: ${JSON.stringify(result)}`)
  const n = V(0, 0, 1).transformDirection(portals.blue.matrixWorld)
  vecNear(n, 0, 0, 1, 1e-4, 'portal normal')
  near(portals.blue.position.z, -5 + 0.015, 1e-6, 'sits just off the wall')
  ok(portals.blue.pair === portals.orange, 'portals linked')
})

test('gun refuses a shot that misses every portal-able surface', () => {
  const gun = new PortalGun({ surfaces: [wallSurface()] })
  const portals = { blue: new Portal('blue'), orange: new Portal('orange') }
  const result = gun.tryPlace(V(0, 2, 0), V(0, 1, 0), portals, 'blue')
  ok(!result?.ok, 'expected a fizzle')
  ok(result?.reason === 'NO_SURFACE', `expected NO_SURFACE, got ${result?.reason}`)
})

test('gun refuses to place two portals on top of each other', () => {
  const surface = wallSurface()
  const gun = new PortalGun({ surfaces: [surface] })
  const portals = { blue: new Portal('blue'), orange: new Portal('orange') }
  gun.tryPlace(V(0, 2, 0), V(0, 0, -1), portals, 'blue')
  const second = gun.tryPlace(V(0.1, 2, 0), V(0, 0, -1), portals, 'orange')
  ok(!second?.ok, 'expected overlap rejection')
  ok(second?.reason === 'OVERLAP_LINKED', `expected OVERLAP_LINKED, got ${second?.reason}`)
})

// ===========================================================================
// 7. Collision groups — the portal-hole clipping mechanism
// ===========================================================================
test('each portal-able surface gets its own collision bit', () => {
  const physics = new Physics()
  const seen = new Set()
  for (let i = 0; i < 8; i++) {
    const bit = physics.allocSurfaceGroup()
    ok(!seen.has(bit), 'bits must be distinct')
    seen.add(bit)
    near(bit, GROUP_SURFACE_FIRST << i, 0, `bit ${i}`)
  }
  // 8 surface bits, plus GROUP_DEFAULT which is always part of the mask
  ok(physics.allSurfaceMask === 0b111111110001, `mask was ${physics.allSurfaceMask.toString(2)}`)
})

test('mask surgery removes exactly one surface', () => {
  const physics = new Physics()
  const a = physics.allocSurfaceGroup()
  const b = physics.allocSurfaceGroup()
  const mask = physics.defaultMask
  ok((mask & a) !== 0 && (mask & b) !== 0, 'both surfaces in the default mask')
  const clipped = mask & ~a
  ok((clipped & a) === 0, 'surface a removed')
  ok((clipped & b) !== 0, 'surface b untouched')
})

// ===========================================================================
// 8. Funnel — CPortalGameMovement::FunnelIntoPortal
// ===========================================================================
function funnelRig() {
  const floor = makePortal('blue', V(0, 0, 0), V(0, 1, 0))
  const other = makePortal('orange', V(0, 4, 10), V(0, 0, -1))
  link(floor, other)
  return floor
}
function traveller(y, vy, wishX = 0, wishZ = 0) {
  return {
    position: V(0, y, 0),
    velocity: V(0.5, vy, -0.5),
    wish: V(wishX, 0, wishZ),
  }
}

test('funnel pulls a falling player toward a floor portal', () => {
  const funnel = new FunnelSystem()
  const t = traveller(3, -6)
  ok(funnel.funnelIntoPortal(funnelRig(), t), 'expected a funnel')
  near(t.velocity.x, 0, 1e-6, 'centred: no lateral push')
  near(t.velocity.z, 0, 1e-6, 'centred: no longitudinal push')
})

test('funnel corrects lateral drift toward the aperture', () => {
  const funnel = new FunnelSystem()
  const t = traveller(3, -6)
  t.position.x = 0.5
  ok(funnel.funnelIntoPortal(funnelRig(), t), 'expected a funnel')
  near(t.velocity.x, -0.5 * 6.0, 1e-6, 'PORTAL_FUNNEL_AMOUNT is 6')
})

test('funnel ignores portals that do not face up', () => {
  const funnel = new FunnelSystem()
  const wall = makePortal('blue', V(0, 1.4, 0), V(0, 0, 1))
  link(wall, makePortal('orange', V(5, 1.4, 5), V(0, 0, -1)))
  ok(!funnel.funnelIntoPortal(wall, traveller(3, -6)), 'wall portals must not funnel')
})

test('funnel gives up when the player is steering hard', () => {
  const funnel = new FunnelSystem()
  ok(!funnel.funnelIntoPortal(funnelRig(), traveller(3, -6, 4, 0)), 'wish over 1.63 m/s')
})

test('funnel gives up when the player is too high or not falling', () => {
  const funnel = new FunnelSystem()
  ok(!funnel.funnelIntoPortal(funnelRig(), traveller(20, -6)), 'above 13 m')
  ok(!funnel.funnelIntoPortal(funnelRig(), traveller(3, -1)), 'falling too slowly')
  ok(!funnel.funnelIntoPortal(funnelRig(), traveller(-1, -6)), 'below the portal')
})

// ===========================================================================
// 9. Laser — UTIL_Portal_Trace_Beam, 16 bounce cap
// ===========================================================================
function laserRig() {
  const scene = new THREE.Scene()
  const laser = new LaserSystem(scene)
  laser.addEmitter(V(-5, 0, 0), V(1, 0, 0))
  const receptor = laser.addReceptor(V(0, 0, 10), V(0, 0, -1), { radius: 0.5 })

  // beam dies on the east wall unless a portal catches it
  const a = makePortal('blue', V(0, 0, 0), V(-1, 0, 0))
  const b = makePortal('orange', V(0, 0, -5), V(0, 0, 1))
  link(a, b)
  a.openAmount = 1
  b.openAmount = 1

  return { scene, laser, receptor, portals: [a, b] }
}

test('laser reaches the receptor through a linked portal pair', () => {
  const { scene, laser, receptor, portals } = laserRig()
  scene.updateMatrixWorld(true)
  laser.update(1 / 60, portals, [])
  ok(receptor.activated, 'receptor should be lit')
  ok(laser.segments.length === 2, `expected 2 segments, got ${laser.segments.length}`)
})

test('laser is blocked by world geometry', () => {
  const { scene, laser, receptor, portals } = laserRig()
  const blocker = new THREE.Mesh(new THREE.PlaneGeometry(4, 4))
  blocker.position.set(0, 0, 5)
  blocker.rotation.y = Math.PI
  scene.add(blocker)
  scene.updateMatrixWorld(true)
  laser.blockers = [blocker]
  laser.update(1 / 60, portals, laser.blockers)
  ok(!receptor.activated, 'receptor must stay dark')
})

test('laser without a portal stops at the far plane', () => {
  const scene = new THREE.Scene()
  const laser = new LaserSystem(scene)
  laser.addEmitter(V(-5, 0, 0), V(1, 0, 0))
  const receptor = laser.addReceptor(V(0, 0, 10), V(0, 0, -1), { radius: 0.5 })
  scene.updateMatrixWorld(true)
  laser.update(1 / 60, [], [])
  ok(!receptor.activated, 'nothing to carry the beam')
})

test('laser portal recursion is capped at 16 bounces', () => {
  // Two portals facing each other: without the cap this recurses forever.
  const scene = new THREE.Scene()
  const laser = new LaserSystem(scene)
  laser.addEmitter(V(-5, 0, 0), V(1, 0, 0))

  const a = makePortal('blue', V(0, 0, 0), V(-1, 0, 0))
  const b = makePortal('orange', V(4, 0, 0), V(1, 0, 0))
  link(a, b)
  a.openAmount = 1
  b.openAmount = 1

  scene.updateMatrixWorld(true)
  laser.update(1 / 60, [a, b], [])
  ok(laser.segments.length <= 18, `segments must be bounded, got ${laser.segments.length}`)
  ok(laser.segments.length > 1, 'expected the beam to chain')
})

test('box receptor catches a beam aimed at the pad', () => {
  const scene = new THREE.Scene()
  const laser = new LaserSystem(scene)
  laser.addEmitter(V(0, 0, 0), V(0, 1, 0))
  const receptor = laser.addReceptor(V(0, 6, 0), V(0, -1, 0), {
    half: V(3, 0.15, 3),
  })
  scene.updateMatrixWorld(true)
  laser.update(1 / 60, [], [])
  ok(receptor.activated, 'pad should be lit')
})

// ===========================================================================
// report
// ===========================================================================
console.log(`\n  portal logic: ${passed} passed, ${failed} failed\n`)
if (failed) {
  for (const f of failures) console.log(`  ✗ ${f}\n`)
  process.exit(1)
}
console.log('  ✓ all green\n')
