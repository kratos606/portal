/**
 * Stencil state-machine test for the portal renderer.
 *
 * There is no GL context in this environment, so the WebGLRenderer is replaced
 * by a recorder. That still exercises the real PortalSystem code path end to
 * end: every layer mask, stencil reference and clip plane it asks for is
 * captured at the moment it would have hit the GPU, and asserted against
 * CPortalRender::DrawPortalsUsingStencils()
 * (sp/src/game/client/portal/PortalRender.cpp:453).
 *
 *   npm run test:system
 */
import * as THREE from 'three'

import PortalSystem from '../Game/portal/PortalSystem.js'
import Portal from '../Game/portal/Portal.js'
import {
  LAYER_WORLD,
  LAYER_PORTALS,
  LAYER_PORTAL_BLUE,
  PORTAL_STENCIL_DEPTH,
} from '../Game/portal/constants.js'

// ---------------------------------------------------------------------------
// harness
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
function ok(c, m = 'expected truthy') {
  if (!c) throw new Error(m)
}
function eq(a, b, m = '') {
  if (a !== b) throw new Error(`${m} expected ${b}, got ${a}`)
}
const V = (x, y, z) => new THREE.Vector3(x, y, z)

/** Records every draw the portal renderer asks for. */
class StubRenderer {
  constructor() {
    this.calls = []
    this.clippingPlanes = []
    this.localClippingEnabled = false
    this.autoClear = false
    this._gl = { STENCIL_BITS: 0x0d57, getParameter: () => 8 }
  }
  getContext() {
    return this._gl
  }
  render(scene, camera) {
    this.calls.push({
      scene,
      camera,
      isScreenPass: scene.userData?.isScreenScene === true,
      layerMask: camera.layers.mask,
      // clip planes are mutated in place, so resolve their values now
      clipping: this.clippingPlanes.map((p) => ({ n: p.normal.clone(), c: p.constant })),
      drawn: collectDrawn(scene, camera),
    })
  }
}

/**
 * Resolves what a real renderer would submit for this call, snapshotting the
 * stencil state by VALUE — the materials are mutated again straight after.
 */
function collectDrawn(scene, camera) {
  const out = []
  scene.updateMatrixWorld(true)
  scene.traverseVisible((o) => {
    if (!o.isMesh || !o.layers.test(camera.layers)) return
    const m = o.material
    out.push({
      name: o.name || o.type,
      stencilWrite: m.stencilWrite,
      stencilFunc: m.stencilFunc,
      stencilRef: m.stencilRef,
      stencilZPass: m.stencilZPass,
      depthWrite: m.depthWrite,
      colorWrite: m.colorWrite,
    })
  })
  return out
}

function makePortal(side, position, normal) {
  const p = new Portal(side)
  p.place(position, normal)
  return p
}

function buildRig({
  cameraPos = V(0, 1.4, 10),
  cameraTarget = V(0, 1.4, 0),
  maxDepth = PORTAL_STENCIL_DEPTH,
  oneVisible = false,
} = {}) {
  const scene = new THREE.Scene()
  const renderer = new StubRenderer()

  const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.05, 220)
  camera.position.copy(cameraPos)
  camera.lookAt(cameraTarget)
  camera.updateProjectionMatrix()
  camera.updateMatrixWorld(true)
  scene.add(camera)

  const virtual = new THREE.PerspectiveCamera(75, 16 / 9, 0.05, 220)

  const portals = [
    makePortal('blue', V(-2, 1.4, -3.9), V(0, 0, 1)),
    // With oneVisible the exit portal sits behind the camera, so exactly one
    // hole is cut and the frame sequence is fully deterministic.
    makePortal('orange', oneVisible ? V(2, 1.4, 20) : V(2, 1.4, -3.9), V(0, 0, 1)),
  ]
  for (const p of portals) scene.add(p.group)
  portals[0].pair = portals[1]
  portals[1].pair = portals[0]
  portals[0].updateLinkMatrix()
  portals[1].updateLinkMatrix()

  const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const wall = new THREE.Mesh(new THREE.PlaneGeometry(20, 8), wallMat)
  wall.name = 'world_wall'
  wall.position.set(0, 2, -4)
  scene.add(wall)

  const system = new PortalSystem({ renderer, scene, camera, virtualCamera: virtual })
  system.maxDepth = maxDepth
  system.collectWorldMaterials(scene)
  system.screen.scene.userData.isScreenScene = true

  return { scene, renderer, camera, virtual, portals, system, wallMat, wall }
}

/** dt = 1 drives openAmount straight to 1 (source ramps at 2x real time). */
function frame(rig) {
  rig.renderer.calls.length = 0
  rig.system.render(rig.portals, 1.0)
  return rig.renderer.calls
}

const names = (call) => call.drawn.map((d) => d.name)

// ===========================================================================

test('one portal pair produces the exact Valve draw sequence', () => {
  const rig = buildRig({ oneVisible: true, maxDepth: 1 })
  const calls = frame(rig)

  // Camera is 14 m away, so the render-fix mesh is not triggered. The sequence
  // is Valve's, plus the overlay pass the nested level runs on its way out:
  //   0 mask | 1 depth-clear | 2 far view | 3 nested overlays
  //   4 depth-clear | 5 depth-restore | 6 decrement | 7 overlays
  eq(calls.length, 8, 'draw count')

  // ---- 0: cut the hole on the portal's own layer
  eq(calls[0].layerMask, 1 << LAYER_PORTAL_BLUE, 'step 0 layer')
  ok(names(calls[0]).includes('portal_blue_mask'), 'step 0 draws the mask mesh')
  const mask = calls[0].drawn.find((d) => d.name === 'portal_blue_mask')
  eq(mask.stencilWrite, true, 'mask writes stencil')
  eq(mask.stencilFunc, THREE.EqualStencilFunc, 'mask tests EQUAL')
  eq(mask.stencilRef, 0, 'mask tests EQUAL 0 at level 0')
  eq(mask.stencilZPass, THREE.IncrementStencilOp, 'mask INCRs on pass')
  eq(mask.colorWrite, false, 'mask writes no colour')

  // ---- 1: depth-only clear inside the hole, at the CHILD reference
  ok(calls[1].isScreenPass, 'step 1 is a fullscreen pass')
  eq(calls[1].drawn[0].stencilRef, 1, 'depth clear at ref 1')
  eq(calls[1].drawn[0].stencilZPass, THREE.KeepStencilOp, 'depth clear keeps stencil')
  eq(calls[1].drawn[0].depthWrite, true, 'depth clear writes depth')

  // ---- 2: the far side, with the virtual camera
  const far = calls[2]
  eq(far.camera, rig.virtual, 'step 2 uses the virtual camera')
  eq(far.layerMask, 1 << LAYER_WORLD, 'step 2 renders the world layer')
  const wall = far.drawn.find((d) => d.name === 'world_wall')
  ok(wall, 'the world is submitted for the far view')
  eq(wall.stencilWrite, true, 'world materials are stencil tested')
  eq(wall.stencilFunc, THREE.EqualStencilFunc, 'world materials use EQUAL')
  eq(wall.stencilRef, 1, 'world materials test EQUAL 1')

  // clip plane in force is the EXIT portal's plane
  const exit = rig.portals[1]
  ok(far.clipping[0].n.dot(exit.planeNormal) > 0.999, 'clip plane matches the exit portal')

  // ---- 3: the nested level's own overlay pass, restricted to ref 1
  eq(calls[3].layerMask, 1 << LAYER_PORTALS, 'step 3 is the nested overlay pass')
  eq(calls[3].camera, rig.virtual, 'step 3 belongs to the far view')
  eq(
    calls[3].drawn.find((d) => d.name === 'portal_blue_surface')?.stencilRef,
    1,
    'nested portal surfaces are masked to the hole'
  )

  // ---- 4/5: clear depth again, then re-establish it at the portal plane
  ok(calls[4].isScreenPass, 'step 4 is a fullscreen pass')
  eq(calls[5].layerMask, 1 << LAYER_PORTAL_BLUE, 'step 5 restores depth on the mask layer')
  eq(names(calls[5]).join(','), 'portal_blue_depth', 'step 5 submits the depth quad ONLY')

  // ---- 6: unwind the stencil back to the parent level
  ok(calls[6].isScreenPass, 'step 6 is a fullscreen pass')
  eq(calls[6].drawn[0].stencilRef, 1, 'decrement targets ref 1')
  eq(calls[6].drawn[0].stencilZPass, THREE.DecrementStencilOp, 'decrement DECRs on pass')
  eq(calls[6].drawn[0].depthWrite, false, 'decrement writes no depth')

  // ---- 7: the portal surfaces themselves
  eq(calls[7].layerMask, 1 << LAYER_PORTALS, 'final pass draws the portal surfaces')
  eq(calls[7].camera, rig.camera, 'final pass belongs to the primary view')
  eq(rig.wallMat.stencilWrite, false, 'stencil scope released')
})

test('the stencil invariant holds: reference equals recursion depth', () => {
  const rig = buildRig()
  const calls = frame(rig)

  const farViews = calls.filter((c) => c.camera === rig.virtual)
  ok(farViews.length >= 1, 'expected at least one far-side render')
  for (const c of farViews) {
    const wall = c.drawn.find((d) => d.name === 'world_wall')
    if (!wall) continue
    ok(
      wall.stencilRef >= 1 && wall.stencilRef <= PORTAL_STENCIL_DEPTH,
      `world drawn at ref ${wall.stencilRef}, outside 1..${PORTAL_STENCIL_DEPTH}`
    )
  }
  // level 0's view must be at ref 1, never 0 or 2
  eq(farViews[0].drawn.find((d) => d.name === 'world_wall').stencilRef, 1, 'level 0 view ref')
})

test('the exit portal never cuts a hole inside its own view', () => {
  const rig = buildRig()
  const calls = frame(rig)

  // Blue's block is: mask, depth-clear, FAR VIEW, <nested work>, depth-clear...
  // Everything between the far view and the next fullscreen pass is the
  // recursion, which runs with exitPortal = orange. Orange must not be cut
  // there -- that is the pCurrentPortal == m_pRenderingViewExitPortal skip.
  const farIndex = calls.findIndex((c) => c.camera === rig.virtual)
  ok(farIndex >= 0, 'expected a far-side render')
  let end = farIndex + 1
  while (end < calls.length && !calls[end].isScreenPass) end++
  const nested = calls.slice(farIndex + 1, end)
  for (const c of nested) {
    ok(!names(c).includes('portal_orange_mask'), 'exit portal cut inside its own view')
  }
})

test('a portal behind the camera draws nothing', () => {
  const rig = buildRig({ cameraPos: V(0, 1.4, 0), cameraTarget: V(0, 1.4, -10) })
  rig.portals[0].group.position.set(-2, 1.4, 20) // behind the camera
  rig.portals[0].updateDerived()
  const calls = frame(rig)
  eq(
    calls.filter((c) => names(c).includes('portal_blue_mask')).length,
    0,
    'no hole is cut for a portal behind the camera'
  )
  ok(calls.length > 0, 'the facing portal is still drawn')
})

test('recursion depth is bounded by the stencil bits', () => {
  const rig = buildRig()
  eq(rig.system.maxDepth, PORTAL_STENCIL_DEPTH, 'maxDepth honours r_portal_stencil_depth')
  ok(rig.system.maxDepth <= 10, 'hard ceiling is MAX_PORTAL_RECURSIVE_VIEWS - 1')
  frame(rig)
  ok(rig.system.stats.depth <= PORTAL_STENCIL_DEPTH, `depth was ${rig.system.stats.depth}`)
  // both portals face the camera here, so both get a hole at level 0
  ok(rig.system.stats.holesCut >= 2, `expected >= 2 holes, got ${rig.system.stats.holesCut}`)
})

test('a single visible portal cuts exactly one hole', () => {
  const rig = buildRig({ oneVisible: true, maxDepth: 1 })
  frame(rig)
  eq(rig.system.stats.holesCut, 1, 'holes cut')
  eq(rig.system.stats.portalViews, 1, 'far views rendered')
})

test('the clip plane array never changes length', () => {
  const rig = buildRig()
  frame(rig)
  // numClippingPlanes is part of three.js's program cache key, so growing the
  // array would force a shader recompile in the middle of a frame.
  eq(rig.renderer.clippingPlanes.length, 2, 'clip plane array length is constant')
  const far = rig.renderer.calls.find((c) => c.camera === rig.virtual)
  ok(far.clipping.length === 2, 'the far view sees both slots')
})

test('the portal-pass materials are never managed as world materials', () => {
  const rig = buildRig()
  const managed = rig.system.worldMaterials
  const portalMats = [
    rig.portals[0].maskMaterial,
    rig.portals[0].depthMaterial,
    rig.portals[0].surfaceMaterial,
    rig.portals[0].glowMaterial,
  ]
  for (const m of portalMats) ok(!managed.includes(m), 'portal-pass material must be unmanaged')
  ok(managed.includes(rig.wallMat), 'world material must be managed')
  // The rim is an ordinary opaque ring: it lives on the world layer and picks
  // the stencil scope up from here, so it must be managed.
  ok(managed.includes(rig.portals[0].rimMaterial), 'rim must be managed as world')

  // Guards the failure mode where exitStencilScope() flips stencilWrite off on
  // the mask material, silently disabling every hole after the first frame.
  frame(rig)
  eq(rig.portals[0].maskMaterial.stencilWrite, true, 'mask still writes after frame 1')
  frame(rig)
  eq(rig.portals[0].maskMaterial.stencilWrite, true, 'mask still writes after frame 2')
  eq(rig.portals[0].maskMaterial.stencilZPass, THREE.IncrementStencilOp, 'still INCR')
})

test('the render-fix mesh only ever runs in the primary view', () => {
  const rig = buildRig()
  frame(rig)
  const before = rig.renderer.calls.length

  // DrawRenderFixMesh() returns immediately unless GetViewRecursionLevel() == 0
  rig.renderer.calls.length = 0
  rig.system.drawRenderFix(rig.portals[0], 1, 1)
  eq(rig.renderer.calls.length, 0, 'a nested level must not draw the render fix')

  rig.renderer.calls.length = 0
  rig.system.drawRenderFix(rig.portals[0], 1, 0)
  ok(before > 0, 'sanity')
})

test('the render-fix polygon is built when the camera is inside the slab', () => {
  const rig = buildRig()
  const portal = rig.portals[0]
  const geometry = rig.system.getRenderFixMesh(portal).geometry

  // The fix quad sits at zNear + 0.01 along the view axis, and the cone keeps a
  // slab `frontClip` deep BEHIND the portal plane. With near = 0.05 the camera
  // has to be about 5 cm out for the quad to land in that slab.
  const camera = new THREE.PerspectiveCamera(75, 16 / 9, 0.05, 220)
  camera.position.set(-2, 1.4, -3.9 + 0.05)
  camera.lookAt(-2, 1.4, -3.9)
  camera.updateProjectionMatrix()
  camera.updateMatrixWorld(true)

  ok(
    rig.system.buildRenderFixGeometry(portal, camera, geometry, 0.05),
    'expected a render-fix polygon 5 cm out'
  )
  const pos = geometry.attributes.position.array
  ok(geometry.drawRange.count >= 3, 'polygon has vertices')
  for (let i = 0; i < geometry.drawRange.count; i++) {
    ok(Math.abs(pos[i * 3 + 2] + 0.99999) < 1e-6, 'depth is forced to the WebGL near plane')
  }

  // Far away, the quad falls outside the slab and nothing is produced.
  const far = new THREE.PerspectiveCamera(75, 16 / 9, 0.05, 220)
  far.position.set(-2, 1.4, -3.9 + 1.0)
  far.lookAt(-2, 1.4, -3.9)
  far.updateProjectionMatrix()
  far.updateMatrixWorld(true)
  eq(
    rig.system.buildRenderFixGeometry(portal, far, geometry, 1.0),
    false,
    'no render fix a metre out'
  )
})

test('cone culling is restored after the far-side render', () => {
  const rig = buildRig()
  rig.system.registerCullable(rig.wall)
  frame(rig)
  eq(rig.wall.visible, true, 'culling must be restored')
})

test('an unopened portal is hidden, so its rim cannot float in the room', () => {
  const rig = buildRig()
  // the rim lives on the world layer and is drawn by the base pass, so a portal
  // that has never been fired must not be visible at all
  rig.portals[0].active = false
  rig.portals[0].openAmount = 0
  rig.portals[0].update(1 / 60, PORTAL_STENCIL_DEPTH)
  eq(rig.portals[0].group.visible, false, 'unopened portal hidden')

  rig.portals[0].active = true
  rig.portals[0].update(1 / 60, PORTAL_STENCIL_DEPTH)
  eq(rig.portals[0].group.visible, true, 'fired portal visible')

  // and it stays visible through the closing animation before dropping out
  rig.portals[0].active = false
  rig.portals[0].update(1 / 60, PORTAL_STENCIL_DEPTH)
  eq(rig.portals[0].group.visible, true, 'still visible while closing')
  rig.portals[0].openAmount = 0
  rig.portals[0].update(1 / 60, PORTAL_STENCIL_DEPTH)
  eq(rig.portals[0].group.visible, false, 'gone once closed')
})

test('inactive portals draw nothing', () => {
  const rig = buildRig()
  rig.portals[0].active = false
  rig.portals[1].active = false
  const calls = frame(rig)
  for (const c of calls) ok(!names(c).some((n) => /_mask$/.test(n)), 'no mask pass')
  eq(rig.system.stats.holesCut, 0, 'no holes cut')
})

// ---------------------------------------------------------------------------
console.log(`\n  portal renderer: ${passed} passed, ${failed} failed\n`)
if (failed) {
  for (const f of failures) console.log(`  ✗ ${f}\n`)
  process.exit(1)
}
console.log('  ✓ all green\n')
