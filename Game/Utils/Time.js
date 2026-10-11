/**
 * Frame clock. Driven by Game's single requestAnimationFrame loop rather than
 * running its own, so there is exactly one tick per frame.
 */
export default class Time {
  constructor() {
    this.start = performance.now()
    this.current = this.start
    /** seconds since start */
    this.elapsed = 0
    /** seconds since the previous frame */
    this.delta = 1 / 60
    this.frames = 0
  }

  update() {
    const now = performance.now()
    let delta = (now - this.current) / 1000
    this.current = now

    // A tab that was backgrounded can hand back a huge delta; clamp so physics
    // and the portal recursion never have to swallow a multi-second step.
    if (delta > 0.1) delta = 0.1
    if (delta <= 0) delta = 1 / 240

    this.delta = delta
    this.elapsed = (now - this.start) / 1000
    this.frames++
    return delta
  }
}
