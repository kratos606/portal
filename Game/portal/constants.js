/**
 * Portal constants, ported from Valve's Portal-Base.
 *
 * Source values are in inches (Z-up, left handed). Three.js is Y-up and this
 * project uses metres, so every inch value is converted with / 39.3701.
 *
 *   sp/src/game/shared/portal/portal_shareddefs.h
 *   sp/src/game/shared/portal/prop_portal_shared.cpp:18
 *   sp/src/game/server/portal/prop_portal.cpp:42
 */

const INCH = 1 / 39.3701

/** PORTAL_HALF_WIDTH 32.0f  -> 0.813 m  (portal is 1.63 m wide) */
export const PORTAL_HALF_WIDTH = 32 * INCH
/** PORTAL_HALF_HEIGHT 54.0f -> 1.372 m  (portal is 2.74 m tall) */
export const PORTAL_HALF_HEIGHT = 54 * INCH
/** PORTAL_HALF_DEPTH 2.0f */
export const PORTAL_HALF_DEPTH = 2 * INCH
/** PORTAL_BUMP_FORGIVENESS 2.0f */
export const PORTAL_BUMP_FORGIVENESS = 2 * INCH

/**
 * vLocalMins/vLocalMaxs give an OBB 64" deep out the front of the portal.
 * We use half of that so the trigger volume straddles the plane, which is what
 * makes "half way through" detectable.
 */
export const PORTAL_HOLE_HALF_DEPTH = 32 * INCH

/** MINIMUM_FLOOR_PORTAL_EXIT_VELOCITY 50.0f (in/s) -> m/s */
export const MIN_FLOOR_EXIT_VELOCITY = 50 * INCH
/** MINIMUM_FLOOR_PORTAL_EXIT_VELOCITY_PLAYER 300.0f (in/s) -> m/s */
export const MIN_FLOOR_EXIT_VELOCITY_PLAYER = 300 * INCH
/** MAXIMUM_PORTAL_EXIT_VELOCITY 1000.0f (in/s) -> m/s */
export const MAX_EXIT_VELOCITY = 1000 * INCH

/** r_portal_stencil_depth default. Hard ceiling MAX_PORTAL_RECURSIVE_VIEWS-1 = 10. */
export const PORTAL_STENCIL_DEPTH = 2

/** PORTALRENDERFIXMESH_OUTERBOUNDPLANES */
export const RENDERFIX_BOUND_PLANES = 12

/** Clip-plane bias behind the exit portal: 0.5" in source. */
export const CLIP_PLANE_BIAS = 0.5 * INCH
/** Real-entity render clip bias: 0.3" */
export const GHOST_CLIP_BIAS_SELF = 0.3 * INCH
/** Ghost render clip bias: 0.75" */
export const GHOST_CLIP_BIAS_LINKED = 0.75 * INCH

/** Polygon clip epsilon, 0.01f in source (scaled to metres). */
export const CLIP_EPSILON = 0.0005

/** UTIL_Portal_Trace_Beam caps chained portal traces at 16. */
export const MAX_PORTAL_TRACE_BOUNCES = 16

/** PORTAL_FUNNEL_AMOUNT 6.0f */
export const PORTAL_FUNNEL_AMOUNT = 6.0

/** Player standing / duck heights (72" / 36"). */
export const PLAYER_HEIGHT = 72 * INCH
export const PLAYER_EYE_HEIGHT = 64 * INCH
export const PLAYER_RADIUS = 16 * INCH

/**
 * The player body is a single sphere, so its centre rests one radius above the
 * floor. The eye therefore sits this far above the centre.
 */
export const PLAYER_EYE_OFFSET = PLAYER_EYE_HEIGHT - PLAYER_RADIUS

/** Layer bit assignments. three.js supports 32 layers. */
export const LAYER_WORLD = 0
export const LAYER_PORTALS = 1
export const LAYER_PORTAL_BLUE = 2
export const LAYER_PORTAL_ORANGE = 3
export const LAYER_VIEWMODEL = 4
export const LAYER_NO_PORTAL_VIEW = 5 // objects hidden while rendering a portal view

export const PORTAL_COLORS = {
  blue: 0x3ea8ff,
  orange: 0xff9d2e,
  blueDark: 0x0b4d8c,
  orangeDark: 0x8c4300,
}
