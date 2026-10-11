# Portal — Enrichment Center

A first-person portal game in the browser, built with [three.js](https://threejs.org) and
[cannon.js](https://github.com/schteppe/cannon.js).

The portal renderer is not an approximation. It is a port of the one Valve shipped,
reconstructed from the *Portal* source and documented line by line in
**[PORTAL_LOGIC.md](./PORTAL_LOGIC.md)**. Stencil-buffer recursion, hardware clip planes,
ghost renderables for objects straddling a portal, and centre-crosses-plane teleportation —
the same mechanisms, the same constants, the same edge cases.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production bundle into dist/
npm test           # 49 logic + renderer tests, no browser needed
```

---

## Controls

| Input | Action |
|---|---|
| `W` `A` `S` `D` | Move |
| `Space` | Jump |
| `Shift` | Sprint |
| **Left click** | Fire portal one (blue) |
| **Right click** | Fire portal two (orange) |
| `E` | Pick up / drop the Weighted Storage Cube |
| `R` | Reset the chamber |
| `Esc` | Pause |

**Objective:** a Thermal Discouragement Beam leaves the west wall and dies on the east one.
The catch pad is on the ceiling. Route the beam through a pair of portals to close the circuit.

---

## How the portals actually work

### The stencil state machine

Every frame, for each visible portal at recursion level `L`, the renderer reproduces
`CPortalRender::DrawPortalsUsingStencils()`:

| Step | Stencil | What is drawn |
|---|---|---|
| 1 | `EQUAL L`, **INCR** on pass | the portal's mask quad — cuts the hole, depth tested, so a wall in front correctly blocks it |
| 2 | `EQUAL L+1` | depth-only clear inside the hole (colour untouched) |
| 3 | *(children set their own)* | the world beyond, from a virtual camera, **with the stencil test still on** so it can only paint inside the hole |
| 4 | `EQUAL L+1` | clear depth again, then re-establish it at the portal plane |
| 5 | `EQUAL L+1`, **DECR** on pass | fullscreen unwind back to `L` |
| 6 | | the portal surface and glow |

The invariant is **stencil value == recursion depth**. That is what bounds the recursion at
`min(r_portal_stencil_depth, 2^stencilBits - 1)` and what lets two portals see through each
other without either view leaking outside its hole.

`test/portal-system.test.mjs` swaps the WebGL renderer for a recorder and asserts this exact
sequence, including the stencil reference in force at every draw.

### Three.js-specific workarounds

The port had to solve two problems the original never met:

- **`WebGLState.setMaterial()` re-applies stencil state from the material on every draw**, so
  a raw `gl.stencilFunc()` call is clobbered before the next triangle. All stencil state is
  therefore driven through three.js's public `Material.stencil*` properties. `numClippingPlanes`
  is part of the shader program cache key, so the clip-plane array is kept at a **constant
  length** and its `Plane` objects are mutated in place — growing it would recompile shaders
  mid-frame.
- **WebGL's NDC near plane is −1, not 0.** Source's render-fix mesh forces `z = 0.00001`; here
  it is forced to `−0.99999`.

### No oblique projection

The original does not use it, and neither does this. The far view is a real perspective camera
placed through the link matrix; the near plane is never warped. Clipping is done with a single
hardware clip plane at the exit portal.

### The link matrix

```
matThisToLinked = remote.matrixWorld · RotY(π) · inverse(this.matrixWorld)
```

Angles are never added — orientations are composed as matrices, exactly as
`TransformAnglesToWorldSpace()` does, which is what avoids gimbal lock when a wall portal is
linked to a floor portal.

### Teleportation

The gate is the source's two conditions and nothing else:

1. the traveller's **centre** has crossed behind the portal plane, and
2. the traveller's volume actually intersects the aperture.

Position, orientation and velocity are all transformed by the link matrix; velocity is rotated,
never translated. Exiting a floor portal enforces the 300 in/s player velocity floor so you
cannot get stuck in the ground.

Valve has to "curl the player into a ball" whenever the two portals are not both axis-aligned
on Z, because a Source player is an axis-aligned box that cannot rotate. Here the player is a
**sphere body**, so that hack is unnecessary — the one place the web version is strictly more
correct than the original.

### Slicing

There is no geometry cutting. As in the original, an object straddling a portal is drawn twice:
the real one clipped at the entry plane (0.3″ bias), and a **ghost** transformed through the
portal and clipped at the exit plane (0.75″ bias). `Game/portal/PortalGhosts.js`.

---

## Kept from the original project

- **The funnel** — `CPortalGameMovement::FunnelIntoPortal()` ported in
  `Game/systems/FunnelSystem.js`, thresholds converted from inches. It is a proportional
  controller that drives horizontal velocity toward `toPortal × 6.0` while you fall toward an
  upward-facing portal.
- **The laser** — extended into a full Thermal Discouragement Beam in
  `Game/systems/LaserSystem.js`, chaining through portals up to the source's 16-bounce cap.

---

## Layout

```
Game/
  portal/
    constants.js        every constant, converted from inches, with its source citation
    geometry.js         Sutherland–Hodgman clipping, frustum-through-portal, hole tests
    Portal.js           one portal: basis, link matrix, mask / depth / surface / rim meshes
    PortalSystem.js     the stencil state machine
    PortalGun.js        placement: corner fitting, overlap and edge rejection
    PortalTeleport.js   the teleport gate and the transform
    PortalGhosts.js     clip-plane slicing
  systems/
    FunnelSystem.js     air steering into a floor portal
    LaserSystem.js      Thermal Discouragement Beam
  ui/
    Aperture.js         the aperture iris, generated as SVG
    UI.js               loading screen, briefing, pause, HUD
  Level.js              chamber geometry, one collision bit per portal-able surface
  physics.js            cannon setup and collision groups
  TextureFactory.js     surface materials
test/
  portal.test.mjs       link matrix, teleport, placement, funnel, laser, clipping
  portal-system.test.mjs stencil state machine, verified against PortalRender.cpp
```

### Collision groups

Every portal-able surface owns a single collision bit. While a traveller overlaps a portal's
hole, that one bit is removed from its collision mask — the client-side half of what the
original gets from per-portal physics environments.

---

## Assets

`public/textures/concrete_modular_*.png` are the *Portal* material set. Everything else is
procedural: the rest of the game's content lives in `.vpk` archives that are not
redistributable. The aperture iris used for the crosshair and the loading screen is generated
as SVG, so it stays crisp at any pixel ratio and costs no download.

---

## What is not verified here

The stencil state machine, the link matrix, the teleport gate, the funnel, the laser and the
polygon clipping are covered by `npm test` (49 tests, no browser required).

The WebGL output itself — what the frame actually looks like — needs a browser. It has not
been visually verified in this environment.
