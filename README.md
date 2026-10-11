# Portal — Test Chamber 01

A browser-based Portal-inspired test chamber built with Three.js and Cannon.js. The level includes linked blue/orange portals, a movable weighted cube, a floor button and an exit door.

## Play

```sh
npm install
npm run dev
```

Click **Begin** to lock the mouse. Use WASD to move, mouse to look, Space to jump, left/right click to place blue/orange portals on the light-colored panels, E to pick up/drop the cube, and F to throw it. Put the cube on the illuminated button and walk out through the exit. Press Escape to release the mouse.

## Implementation

The linked-space transform is `destination.matrixWorld * rotationY(π) * inverse(source.matrixWorld)` (see `Game/portalMath.js`). The same rigid transform drives the virtual portal camera, traveler position, orientation, linear velocity and cube angular velocity. Plane crossing (front to back, within the aperture) triggers traversal; portal placement rebuilds both the visual and Cannon collision slabs around the aperture. Each portal has ping-pong render targets, a destination-side oblique near clip plane and bounded previous-frame recursive views. A brief post-teleport input grace period keeps launch momentum from being immediately overwritten by walking controls.

The reference is the [Portal-Base](https://github.com/SonicEraZoR/Portal-Base) source, especially `prop_portal_shared.cpp` (linked-space transform) and `prop_portal.cpp` (position, eye angle and velocity during teleport). This is an original web adaptation and a **Portal-inspired introductory chamber**, not a reproduction of Valve's maps, assets, or complete collision simulator. Extremely fast bodies and objects partly straddling a portal do not yet have Source's continuous, duplicated-through-the-plane physics.

Run `npm test` to check the linked transform and crossing behavior; `npm run build` for a production build.
