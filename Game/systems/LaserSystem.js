import * as THREE from 'three'
import { MAX_PORTAL_TRACE_BOUNCES } from '../portal/constants.js'
import { intersectRayWithPortal } from '../portal/geometry.js'

/**
 * Thermal Discouragement Beam.
 *
 * The through-portal part follows UTIL_Portal_TraceRay_With() from
 * sp/src/game/shared/portal/portal_util_shared.cpp:498: trace normally, then
 * check whether a portal is closer than the world hit, and if the ray is
 * heading INTO the portal continue it out of the linked one.
 * UTIL_Portal_Trace_Beam() caps the chain at 16 bounces.
 */

const _origin = new THREE.Vector3()
const _dir = new THREE.Vector3()

export default class LaserSystem {
  constructor(scene) {
    this.scene = scene
    /** @type {Array<{position: THREE.Vector3, direction: THREE.Vector3, active: boolean}>} */
    this.emitters = []
    /** @type {THREE.Object3D[]} */
    this.blockers = []
    /** @type {Array<import('../portal/Portal.js').default>} */
    this.portals = []

    this.segments = [] // {start, end}
    this.hitReceptor = null

    this.beamGroup = new THREE.Group()
    this.beamGroup.name = 'laserBeams'
    scene.add(this.beamGroup)

    const coreGeo = new THREE.CylinderGeometry(0.022, 0.022, 1, 8, 1, true)
    coreGeo.translate(0, 0.5, 0)
    coreGeo.rotateX(Math.PI / 2)
    this.coreGeo = coreGeo

    this.coreMat = new THREE.MeshBasicMaterial({
      color: 0xff3b2f,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    this.glowMat = new THREE.MeshBasicMaterial({
      color: 0xff8a5c,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const glowGeo = new THREE.CylinderGeometry(0.075, 0.075, 1, 8, 1, true)
    glowGeo.translate(0, 0.5, 0)
    glowGeo.rotateX(Math.PI / 2)
    this.glowGeo = glowGeo

    this.pool = []
    this.poolIndex = 0
    this.maxDistance = 120
  }

  addEmitter(position, direction) {
    const e = {
      position: position.clone(),
      direction: direction.clone().normalize(),
      active: true,
    }
    this.emitters.push(e)

    const housing = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.28, 0.4, 20),
      new THREE.MeshStandardMaterial({ color: 0x2b3238, roughness: 0.4, metalness: 0.8 })
    )
    housing.position.copy(position).addScaledVector(e.direction, -0.2)
    housing.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), e.direction)
    this.scene.add(housing)

    const lens = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 16, 12),
      new THREE.MeshBasicMaterial({ color: 0xff6a4a })
    )
    lens.position.copy(position)
    this.scene.add(lens)
    e.lens = lens

    return e
  }

  /**
   * @param {THREE.Vector3} position
   * @param {THREE.Vector3} normal   direction the pad faces
   * @param {object} [opts]
   * @param {THREE.Vector3} [opts.half]  box half extents; falls back to a sphere
   * @param {number} [opts.radius]
   * @param {(on: boolean) => void} [opts.onActivate]
   */
  addReceptor(position, normal, opts = {}) {
    const onActivate = opts.onActivate ?? null
    const group = new THREE.Group()
    group.position.copy(position)
    group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal.clone().normalize())

    const isBox = !!opts.half
    const half = isBox ? opts.half.clone() : null
    const radius = opts.radius ?? 0.34

    if (isBox) {
      const plate = new THREE.Mesh(
        new THREE.BoxGeometry(half.x * 2, half.y * 2, half.z * 2),
        new THREE.MeshStandardMaterial({
          color: 0x2c343c,
          emissive: new THREE.Color(0x101820),
          emissiveIntensity: 0.5,
          roughness: 0.55,
          metalness: 0.45,
        })
      )
      group.add(plate)
    } else {
      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(radius * 1.2, radius * 1.2, 0.12, 24),
        new THREE.MeshStandardMaterial({ color: 0x39424a, roughness: 0.4, metalness: 0.8 })
      )
      plate.rotation.x = Math.PI / 2
      group.add(plate)

      const lens = new THREE.Mesh(new THREE.SphereGeometry(radius * 0.7, 20, 14), lensMat0)
      lens.position.z = 0.04
      group.add(lens)
    }

    const lensMat = new THREE.MeshBasicMaterial({ color: 0x2a2f34 })
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x2b3138,
      transparent: true,
      opacity: 0.9,
    })

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(isBox ? Math.min(half.x, half.z) : radius, 0.03, 8, 40),
      ringMat
    )
    ring.rotation.x = Math.PI / 2
    group.add(ring)

    this.scene.add(group)

    const receptor = {
      position: position.clone(),
      normal: normal.clone().normalize(),
      radius,
      half,
      activated: false,
      group,
      lensMat,
      ringMat,
      onActivate,
    }
    this.receptors = this.receptors || []
    this.receptors.push(receptor)
    return receptor
  }

  _getBeamMesh() {
    if (this.poolIndex < this.pool.length) {
      const m = this.pool[this.poolIndex++]
      m.visible = true
      return m
    }
    const group = new THREE.Group()
    const core = new THREE.Mesh(this.coreGeo, this.coreMat)
    const glow = new THREE.Mesh(this.glowGeo, this.glowMat)
    group.add(core, glow)
    group.frustumCulled = false
    this.beamGroup.add(group)
    this.pool.push(group)
    this.poolIndex++
    return group
  }

  update(dt, portals, blockers = this.blockers) {
    this.portals = portals
    this.blockers = blockers
    this.segments.length = 0
    this.poolIndex = 0
    for (const m of this.pool) m.visible = false

    const receptorsHit = new Set()
    this.receptorsHit = receptorsHit

    for (const emitter of this.emitters) {
      if (!emitter.active) continue
      emitter.lens.material.color.setHex(0xff6a4a)
      this.trace(emitter.position, emitter.direction, 0, receptorsHit)
    }

    // draw segments
    for (const seg of this.segments) {
      const mesh = this._getBeamMesh()
      const len = seg.start.distanceTo(seg.end)
      mesh.position.copy(seg.start)
      mesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        _dir.copy(seg.end).sub(seg.start).normalize()
      )
      mesh.scale.set(1, 1, len)
    }

    // receptor state
    for (const r of this.receptors || []) {
      const on = receptorsHit.has(r)
      if (on !== r.activated) {
        r.activated = on
        if (r.onActivate) r.onActivate(on)
      }
      r.lensMat.color.setHex(on ? 0xff4a30 : 0x2a2f34)
      r.ringMat.color.setHex(on ? 0xff7a55 : 0x2b3138)
      r.ringMat.opacity = on ? 1 : 0.9
      const plateMat = r.group.children[0]?.material
      if (plateMat?.emissive) {
        plateMat.emissive.setHex(on ? 0x6a1a10 : 0x101820)
        plateMat.emissiveIntensity = on ? 1.6 : 0.5
      }
    }
  }

  /**
   * Traces one beam, recursing through portals.
   * @param {THREE.Vector3} origin
   * @param {THREE.Vector3} direction  normalised
   * @param {number} depth
   * @param {Set} receptorsHit
   * @param {THREE.Object3D} [ignoreObject]
   */
  trace(origin, direction, depth, receptorsHit, ignoreObject = null) {
    if (depth > MAX_PORTAL_TRACE_BOUNCES) return

    // nearest portal hit along the ray
    let portal = null
    let portalT = Infinity
    for (const p of this.portals) {
      if (!p.active || !p.pair || p.openAmount < 0.5) continue
      const t = intersectRayWithPortal(p, origin, direction, p.halfWidth, p.halfHeight)
      if (t >= 0 && t < portalT) {
        portalT = t
        portal = p
      }
    }

    // nearest receptor hit
    let receptor = null
    let receptorT = Infinity
    for (const r of this.receptors || []) {
      const t = r.half
        ? rayBox(origin, direction, r.position, r.half)
        : raySphere(origin, direction, r.position, r.radius)
      if (t >= 0 && t < receptorT) {
        receptorT = t
        receptor = r
      }
    }

    // nearest world hit
    _ray.set(origin, direction)
    _ray.far = Math.min(this.maxDistance, Math.min(portalT, receptorT))
    const hits = _ray.intersectObjects(this.blockers, false)
    const worldT = hits.length ? hits[0].distance : Infinity

    // pick whichever is closest
    if (portal && portalT <= worldT && portalT <= receptorT) {
      this.segments.push({ start: origin.clone(), end: _origin.copy(origin).addScaledVector(direction, portalT).clone() })
      // out the other side
      const exit = portal.pair
      _origin.copy(origin).addScaledVector(direction, portalT).applyMatrix4(portal.matrixThisToLinked)
      _dir.copy(direction).applyMatrix4(_rot.extractRotation(portal.matrixThisToLinked)).normalize()
      // step just clear of the exit plane
      _origin.addScaledVector(_dir, 0.02)
      this.trace(_origin, _dir, depth + 1, receptorsHit)
      return
    }

    if (receptor && receptorT <= worldT) {
      this.segments.push({ start: origin.clone(), end: _origin.copy(origin).addScaledVector(direction, receptorT).clone() })
      receptorsHit.add(receptor)
      return
    }

    const end = hits.length
      ? hits[0].point.clone()
      : _origin.copy(origin).addScaledVector(direction, this.maxDistance).clone()
    this.segments.push({ start: origin.clone(), end })
  }
}

const _ray = new THREE.Raycaster()
const _rot = new THREE.Matrix4()
const lensMat0 = new THREE.MeshBasicMaterial({ color: 0x2a2f34 })

/** Slab test against an axis-aligned box. Returns entry distance or -1. */
function rayBox(origin, dir, centre, half) {
  let tmin = -Infinity
  let tmax = Infinity
  for (const axis of ['x', 'y', 'z']) {
    const o = origin[axis] - centre[axis]
    const d = dir[axis]
    const h = half[axis]
    if (Math.abs(d) < 1e-9) {
      if (Math.abs(o) > h) return -1
      continue
    }
    let t1 = (-h - o) / d
    let t2 = (h - o) / d
    if (t1 > t2) {
      const t = t1
      t1 = t2
      t2 = t
    }
    if (t1 > tmin) tmin = t1
    if (t2 < tmax) tmax = t2
    if (tmin > tmax) return -1
  }
  if (tmax < 0) return -1
  return tmin >= 0 ? tmin : tmax
}

function raySphere(origin, dir, centre, radius) {
  const ox = origin.x - centre.x
  const oy = origin.y - centre.y
  const oz = origin.z - centre.z
  const b = ox * dir.x + oy * dir.y + oz * dir.z
  const c = ox * ox + oy * oy + oz * oz - radius * radius
  const disc = b * b - c
  if (disc < 0) return -1
  const t = -b - Math.sqrt(disc)
  return t >= 0 ? t : -1
}
