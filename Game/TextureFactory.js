import * as THREE from 'three'

/**
 * Procedural Aperture-style surface textures.
 *
 * The Portal-Base repository ships no material assets at all (verified: zero
 * portal .vmt / .vsh / .fx files in the tree), so the test-chamber look is
 * generated here at runtime. No downloads, crisp at any pixel ratio, and every
 * surface is tileable.
 */

function makeCanvas(size) {
  const c = document.createElement('canvas')
  c.width = size
  c.height = size
  return c
}

/** Value noise, good enough for surface grain. */
function noiseField(size, cells, seed = 1) {
  const grid = new Float32Array(cells * cells)
  let s = seed
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
  for (let i = 0; i < grid.length; i++) grid[i] = rand()

  const out = new Float32Array(size * size)
  const scale = cells / size
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const fx = x * scale
      const fy = y * scale
      const x0 = Math.floor(fx) % cells
      const y0 = Math.floor(fy) % cells
      const x1 = (x0 + 1) % cells
      const y1 = (y0 + 1) % cells
      const tx = fx - Math.floor(fx)
      const ty = fy - Math.floor(fy)
      const sx = tx * tx * (3 - 2 * tx)
      const sy = ty * ty * (3 - 2 * ty)
      const a = grid[y0 * cells + x0]
      const b = grid[y0 * cells + x1]
      const c = grid[y1 * cells + x0]
      const d = grid[y1 * cells + x1]
      out[y * size + x] = (a + (b - a) * sx) * (1 - sy) + (c + (d - c) * sx) * sy
    }
  }
  return out
}

/** Builds a normal map from a height field with a sobel filter. */
function normalFromHeight(height, size, strength = 2.0) {
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  const img = ctx.createImageData(size, size)
  const at = (x, y) => height[((y + size) % size) * size + ((x + size) % size)]

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const tl = at(x - 1, y - 1), t = at(x, y - 1), tr = at(x + 1, y - 1)
      const l = at(x - 1, y), r = at(x + 1, y)
      const bl = at(x - 1, y + 1), b = at(x, y + 1), br = at(x + 1, y + 1)

      const dx = tr + 2 * r + br - (tl + 2 * l + bl)
      const dy = bl + 2 * b + br - (tl + 2 * t + tr)

      let nx = -dx * strength
      let ny = -dy * strength
      let nz = 1
      const len = Math.hypot(nx, ny, nz)
      nx /= len; ny /= len; nz /= len

      const i = (y * size + x) * 4
      img.data[i] = (nx * 0.5 + 0.5) * 255
      img.data[i + 1] = (ny * 0.5 + 0.5) * 255
      img.data[i + 2] = (nz * 0.5 + 0.5) * 255
      img.data[i + 3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
  return canvas
}

/**
 * A beveled wall panel, 2m x 2m in world space.
 * Returns { map, normalMap, roughnessMap }
 */
export function makePanelTexture(size = 512, tint = [214, 218, 222]) {
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  const height = new Float32Array(size * size)

  const [br, bg, bb] = tint
  ctx.fillStyle = `rgb(${br},${bg},${bb})`
  ctx.fillRect(0, 0, size, size)

  // two panels per tile
  const panels = 2
  const pw = size / panels
  const bevel = size * 0.022
  const gap = size * 0.012

  for (let py = 0; py < panels; py++) {
    for (let px = 0; px < panels; px++) {
      const x = px * pw + gap
      const y = py * pw + gap
      const w = pw - gap * 2
      const h = pw - gap * 2

      // recessed seam
      ctx.fillStyle = 'rgba(58,64,70,0.85)'
      ctx.fillRect(x - gap, y - gap, w + gap * 2, h + gap * 2)

      // face with a vertical gradient
      const g = ctx.createLinearGradient(x, y, x, y + h)
      g.addColorStop(0, `rgb(${br + 10},${bg + 10},${bb + 12})`)
      g.addColorStop(0.5, `rgb(${br},${bg},${bb})`)
      g.addColorStop(1, `rgb(${br - 22},${bg - 22},${bb - 20})`)
      ctx.fillStyle = g
      ctx.fillRect(x, y, w, h)

      // bevel highlight / shadow
      ctx.strokeStyle = 'rgba(255,255,255,0.28)'
      ctx.lineWidth = bevel * 0.5
      ctx.beginPath()
      ctx.moveTo(x, y + h)
      ctx.lineTo(x, y)
      ctx.lineTo(x + w, y)
      ctx.stroke()

      ctx.strokeStyle = 'rgba(0,0,0,0.30)'
      ctx.beginPath()
      ctx.moveTo(x + w, y)
      ctx.lineTo(x + w, y + h)
      ctx.lineTo(x, y + h)
      ctx.stroke()

      // corner bolts
      ctx.fillStyle = 'rgba(120,128,136,0.9)'
      const inset = w * 0.09
      const bolt = w * 0.018
      for (const [bx, by] of [
        [x + inset, y + inset], [x + w - inset, y + inset],
        [x + inset, y + h - inset], [x + w - inset, y + h - inset],
      ]) {
        ctx.beginPath()
        ctx.arc(bx, by, bolt, 0, Math.PI * 2)
        ctx.fill()
      }

      // height field for the normal map
      for (let yy = Math.max(0, Math.floor(y - gap)); yy < Math.min(size, y + h + gap); yy++) {
        for (let xx = Math.max(0, Math.floor(x - gap)); xx < Math.min(size, x + w + gap); xx++) {
          const inside = xx >= x && xx < x + w && yy >= y && yy < y + h
          const edge = Math.min(xx - x, x + w - xx, yy - y, y + h - yy)
          let hv = inside ? 0.55 + Math.min(edge / bevel, 1) * 0.45 : 0.05
          height[yy * size + xx] = hv
        }
      }
    }
  }

  // grain
  const n1 = noiseField(size, 96, 7)
  const n2 = noiseField(size, 12, 31)
  const img = ctx.getImageData(0, 0, size, size)
  for (let i = 0; i < size * size; i++) {
    const grain = (n1[i] - 0.5) * 16 + (n2[i] - 0.5) * 10
    img.data[i * 4] = clamp255(img.data[i * 4] + grain)
    img.data[i * 4 + 1] = clamp255(img.data[i * 4 + 1] + grain)
    img.data[i * 4 + 2] = clamp255(img.data[i * 4 + 2] + grain)
    height[i] = clamp01(height[i] + (n1[i] - 0.5) * 0.05)
  }
  ctx.putImageData(img, 0, 0)

  const map = new THREE.CanvasTexture(canvas)
  const normalMap = new THREE.CanvasTexture(normalFromHeight(height, size, 1.6))
  return finish(map, normalMap)
}

/** Dark industrial floor grating. */
export function makeFloorTexture(size = 512) {
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  const height = new Float32Array(size * size).fill(0.5)

  ctx.fillStyle = 'rgb(96,100,104)'
  ctx.fillRect(0, 0, size, size)

  const tiles = 4
  const tw = size / tiles
  const gap = size * 0.008

  for (let ty = 0; ty < tiles; ty++) {
    for (let tx = 0; tx < tiles; tx++) {
      const x = tx * tw + gap
      const y = ty * tw + gap
      const w = tw - gap * 2

      ctx.fillStyle = 'rgba(38,42,46,0.9)'
      ctx.fillRect(tx * tw, ty * tw, tw, tw)

      const g = ctx.createLinearGradient(x, y, x + w, y + w)
      g.addColorStop(0, 'rgb(126,131,136)')
      g.addColorStop(1, 'rgb(88,92,96)')
      ctx.fillStyle = g
      ctx.fillRect(x, y, w, w)

      // hazard stripe in one corner tile
      if ((tx + ty) % 4 === 0) {
        ctx.save()
        ctx.beginPath()
        ctx.rect(x, y, w, w)
        ctx.clip()
        ctx.strokeStyle = 'rgba(226,168,44,0.16)'
        ctx.lineWidth = w * 0.09
        for (let s = -w; s < w * 2; s += w * 0.24) {
          ctx.beginPath()
          ctx.moveTo(x + s, y)
          ctx.lineTo(x + s + w, y + w)
          ctx.stroke()
        }
        ctx.restore()
      }

      for (let yy = Math.floor(y); yy < y + w; yy++) {
        for (let xx = Math.floor(x); xx < x + w; xx++) {
          const edge = Math.min(xx - x, x + w - xx, yy - y, y + w - yy)
          height[yy * size + xx] = 0.45 + Math.min(edge / (size * 0.02), 1) * 0.5
        }
      }
    }
  }

  const n = noiseField(size, 128, 99)
  const img = ctx.getImageData(0, 0, size, size)
  for (let i = 0; i < size * size; i++) {
    const grain = (n[i] - 0.5) * 22
    img.data[i * 4] = clamp255(img.data[i * 4] + grain)
    img.data[i * 4 + 1] = clamp255(img.data[i * 4 + 1] + grain)
    img.data[i * 4 + 2] = clamp255(img.data[i * 4 + 2] + grain)
  }
  ctx.putImageData(img, 0, 0)

  const map = new THREE.CanvasTexture(canvas)
  const normalMap = new THREE.CanvasTexture(normalFromHeight(height, size, 2.2))
  return finish(map, normalMap)
}

/** Ceiling with recessed light strips. */
export function makeCeilingTexture(size = 512) {
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d')
  const height = new Float32Array(size * size).fill(0.4)

  ctx.fillStyle = 'rgb(176,180,184)'
  ctx.fillRect(0, 0, size, size)

  ctx.fillStyle = 'rgba(52,56,60,0.8)'
  ctx.fillRect(0, size * 0.44, size, size * 0.12)

  const g = ctx.createLinearGradient(0, size * 0.45, 0, size * 0.55)
  g.addColorStop(0, 'rgb(255,252,240)')
  g.addColorStop(0.5, 'rgb(236,240,246)')
  g.addColorStop(1, 'rgb(200,206,214)')
  ctx.fillStyle = g
  ctx.fillRect(size * 0.03, size * 0.465, size * 0.94, size * 0.07)

  for (let y = Math.floor(size * 0.465); y < size * 0.535; y++) {
    for (let x = 0; x < size; x++) height[y * size + x] = 0.95
  }

  const n = noiseField(size, 80, 5)
  const img = ctx.getImageData(0, 0, size, size)
  for (let i = 0; i < size * size; i++) {
    const grain = (n[i] - 0.5) * 14
    img.data[i * 4] = clamp255(img.data[i * 4] + grain)
    img.data[i * 4 + 1] = clamp255(img.data[i * 4 + 1] + grain)
    img.data[i * 4 + 2] = clamp255(img.data[i * 4 + 2] + grain)
  }
  ctx.putImageData(img, 0, 0)

  const map = new THREE.CanvasTexture(canvas)
  const normalMap = new THREE.CanvasTexture(normalFromHeight(height, size, 1.2))
  return finish(map, normalMap)
}

function finish(map, normalMap) {
  for (const t of [map, normalMap]) {
    t.wrapS = THREE.RepeatWrapping
    t.wrapT = THREE.RepeatWrapping
    t.anisotropy = 8
  }
  map.colorSpace = THREE.SRGBColorSpace
  return { map, normalMap }
}

function clamp255(v) {
  return v < 0 ? 0 : v > 255 ? 255 : v
}
function clamp01(v) {
  return v < 0 ? 0 : v > 1 ? 1 : v
}

/**
 * Derives a tangent-space normal map from a loaded colour texture.
 *
 * Valve ships these materials as diffuse-only .vmts with a $bumpmap that is not
 * redistributable, so the surface detail is recovered from the diffuse channel
 * with a 3x3 sobel instead.
 */
function surfaceSetFromTexture(texture, size = 512, strength = 1.1) {
  const canvas = makeCanvas(size)
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(texture.image, 0, 0, size, size)
  const data = ctx.getImageData(0, 0, size, size).data

  const height = new Float32Array(size * size)
  for (let i = 0; i < height.length; i++) {
    const j = i * 4
    // perceptual luminance: the panel grout lines are what we actually want
    height[i] = (data[j] * 0.299 + data[j + 1] * 0.587 + data[j + 2] * 0.114) / 255
  }

  const normalMap = new THREE.CanvasTexture(normalFromHeight(height, size, strength))
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping
  texture.colorSpace = THREE.SRGBColorSpace
  return finish(texture, normalMap)
}

/** Shared, created once. */
let _cache = null

/**
 * @param {THREE.WebGLRenderer} renderer
 * @param {object} [loaded] Valve textures keyed by resource name, when they arrived
 * @returns {{panels: object, floor: object, ceiling: object}}
 */
export function getSurfaceTextures(renderer, loaded = {}) {
  if (_cache) return _cache
  const maxAniso = renderer ? renderer.capabilities.getMaxAnisotropy() : 1

  // Prefer the real concrete_modular_* materials from the game; fall back to
  // generated panels if they did not arrive.
  const panels = loaded.wall ? surfaceSetFromTexture(loaded.wall) : makePanelTexture(512)
  const floor = loaded.floor
    ? surfaceSetFromTexture(loaded.floor, 512, 1.5)
    : makeFloorTexture(512)
  const ceiling = loaded.ceiling
    ? surfaceSetFromTexture(loaded.ceiling, 512, 1.0)
    : makeCeilingTexture(512)

  for (const set of [panels, floor, ceiling]) {
    set.map.anisotropy = maxAniso
    set.normalMap.anisotropy = maxAniso
  }
  _cache = { panels, floor, ceiling }
  return _cache
}

/** Drops the cached set so the next call rebuilds it. Test hook. */
export function resetSurfaceTextures() {
  _cache = null
}
