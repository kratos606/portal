/**
 * Procedural aperture iris SVG.
 *
 * Portal's loading screen is built around the Aperture Science iris, so the
 * crosshair and the menu mark are generated from the same blade geometry rather
 * than shipped as a bitmap: crisp at any pixel ratio, and free to animate.
 *
 * @param {object} [opts]
 * @param {number} [opts.blades]
 * @param {boolean} [opts.ring]
 * @param {boolean} [opts.dot]
 */
export function apertureSVG({ blades = 8, ring = true, dot = true } = {}) {
  const cx = 50
  const cy = 50
  const R = 41
  const r = 14
  const step = (Math.PI * 2) / blades
  const span = step * 1.08

  const f = (n) => n.toFixed(2)
  let paths = ''

  for (let i = 0; i < blades; i++) {
    const a0 = i * step - Math.PI / 2
    const a1 = a0 + span
    const ax = cx + Math.cos(a0) * R
    const ay = cy + Math.sin(a0) * R
    const bx = cx + Math.cos(a1) * R
    const by = cy + Math.sin(a1) * R
    const a2 = a1 + step * 0.34
    const ix = cx + Math.cos(a2) * r
    const iy = cy + Math.sin(a2) * r

    paths +=
      `<path class="aperture__blade" d="M${f(ax)} ${f(ay)} ` +
      `A ${R} ${R} 0 0 1 ${f(bx)} ${f(by)} L${f(ix)} ${f(iy)} Z"/>`
  }

  const ringEl = ring ? `<circle class="aperture__ring" cx="50" cy="50" r="46"/>` : ''
  const dotEl = dot ? `<circle class="aperture__dot" cx="50" cy="50" r="2.6"/>` : ''

  return (
    `<svg viewBox="0 0 100 100" aria-hidden="true">` +
    `<g class="aperture__blades">${paths}</g>${ringEl}${dotEl}</svg>`
  )
}

/** Injects the iris into every element that wants one. */
export function mountApertures() {
  const specs = [
    ['#loadingAperture', { blades: 8 }],
    ['#menuAperture', { blades: 8 }],
    ['#crosshair', { blades: 6, ring: true, dot: true }],
  ]
  for (const [selector, opts] of specs) {
    const el = document.querySelector(selector)
    if (el) el.innerHTML = apertureSVG(opts)
  }
}
