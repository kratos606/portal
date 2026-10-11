import { mountApertures } from './Aperture.js'

/**
 * All DOM chrome: the loading screen, the pre-test briefing, the pause card and
 * the in-game HUD. The renderer owns the canvas; this owns everything on top
 * of it.
 */
export default class UI {
  constructor() {
    mountApertures()

    this.el = {
      loading: document.getElementById('loadingOverlay'),
      menu: document.getElementById('menuOverlay'),
      pause: document.getElementById('pauseOverlay'),
      hud: document.getElementById('hud'),
      crosshair: document.getElementById('crosshair'),
      progressFill: document.getElementById('progressFill'),
      progressLabel: document.getElementById('progressLabel'),
      progressPercent: document.getElementById('progressPercent'),
      startBtn: document.getElementById('startBtn'),
      resumeBtn: document.getElementById('resumeBtn'),
      quitBtn: document.getElementById('quitBtn'),
      fps: document.getElementById('fps'),
      prompt: document.getElementById('prompt'),
      objective: document.getElementById('objective'),
      objectiveText: document.querySelector('#objective .objective__text'),
      stats: document.getElementById('hudStats'),
      portalRows: {
        blue: document.querySelector('.portal-status__row[data-side="blue"]'),
        orange: document.querySelector('.portal-status__row[data-side="orange"]'),
      },
    }

    this._fireTimeout = 0
    this._fpsAccum = 0
    this._fpsFrames = 0
  }

  onStart(cb) {
    this.el.startBtn.addEventListener('click', () => cb())
  }
  onResume(cb) {
    this.el.resumeBtn.addEventListener('click', () => cb())
    this.el.pause.addEventListener('click', (e) => {
      if (e.target === this.el.pause) cb()
    })
  }
  onQuit(cb) {
    this.el.quitBtn.addEventListener('click', () => cb())
  }

  // ------------------------------------------------------------- loading

  setProgress(fraction, label) {
    const pct = Math.round(Math.max(0, Math.min(1, fraction)) * 100)
    this.el.progressFill.style.width = `${pct}%`
    this.el.progressPercent.textContent = `${pct}%`
    if (label) this.el.progressLabel.textContent = label
  }

  hideLoading() {
    this.el.loading.classList.add('is-hidden')
    setTimeout(() => {
      this.el.loading.hidden = true
    }, 520)
  }

  // ---------------------------------------------------------------- menu

  showMenu() {
    this.el.menu.hidden = false
    requestAnimationFrame(() => this.el.menu.classList.remove('is-hidden'))
    this.el.hud.classList.remove('is-visible')
    document.body.classList.remove('playing')
  }

  hideMenu() {
    this.el.menu.classList.add('is-hidden')
    setTimeout(() => {
      this.el.menu.hidden = true
    }, 520)
    this.el.hud.classList.add('is-visible')
    document.body.classList.add('playing')
  }

  // --------------------------------------------------------------- pause

  showPause() {
    this.el.pause.hidden = false
    document.body.classList.remove('playing')
  }
  hidePause() {
    this.el.pause.hidden = true
    document.body.classList.add('playing')
  }

  // ----------------------------------------------------------------- hud

  setPortalState(side, active) {
    const row = this.el.portalRows[side]
    if (!row) return
    row.classList.toggle('is-active', active)
    row.querySelector('[data-state]').textContent = active ? 'linked' : 'inactive'
  }

  setPrompt(text) {
    if (text) {
      this.el.prompt.textContent = text
      this.el.prompt.classList.add('is-visible')
    } else {
      this.el.prompt.classList.remove('is-visible')
    }
  }

  setObjective(text, done = false) {
    this.el.objectiveText.textContent = text
    this.el.objective.classList.toggle('is-done', done)
  }

  /** Pulses the crosshair in the colour of the portal just fired. */
  fire(side, ok = true) {
    const c = this.el.crosshair
    c.dataset.side = ok ? side : ''
    c.dataset.state = ok ? '' : 'invalid'
    c.classList.add('is-firing')
    clearTimeout(this._fireTimeout)
    this._fireTimeout = setTimeout(() => {
      c.classList.remove('is-firing')
      c.dataset.side = ''
      c.dataset.state = ''
    }, 170)
  }

  updateFps(dt) {
    this._fpsAccum += dt
    this._fpsFrames++
    if (this._fpsAccum >= 0.5) {
      const fps = Math.round(this._fpsFrames / this._fpsAccum)
      this.el.fps.textContent = `${fps} fps`
      this._fpsAccum = 0
      this._fpsFrames = 0
    }
  }

  setStats(text) {
    if (!text) {
      this.el.stats.classList.remove('is-visible')
      this.el.stats.textContent = ''
      return
    }
    this.el.stats.classList.add('is-visible')
    if (this.el.stats.textContent !== text) this.el.stats.textContent = text
  }
}
