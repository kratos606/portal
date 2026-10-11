/**
 * Remote assets.
 *
 * The concrete_modular_* PNGs are the Valve Portal material set that shipped
 * with this repository. Everything else in the scene is generated procedurally:
 * the rest of the game's content lives in .vpk archives that are not
 * redistributable, and a canvas-drawn aperture iris stays crisp at any pixel
 * ratio where a bitmap would not.
 */
export default [
  { name: 'cube', type: 'gltfModel', path: './cube.glb', label: 'Weighted Storage Cube' },
  { name: 'portalGun', type: 'gltfModel', path: './portal_gun.glb', label: 'Handheld Portal Device' },
  {
    name: 'wall',
    type: 'texture',
    path: './textures/concrete_modular_wall001a.png',
    label: 'concrete_modular_wall001a',
  },
  {
    name: 'floor',
    type: 'texture',
    path: './textures/concrete_modular_floor001c.png',
    label: 'concrete_modular_floor001c',
  },
  {
    name: 'ceiling',
    type: 'texture',
    path: './textures/concrete_modular_ceiling001a.png',
    label: 'concrete_modular_ceiling001a',
  },
]
