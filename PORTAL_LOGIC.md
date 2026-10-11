# Portal (Valve `Portal-Base`) — Portal Mechanics Extracted for a Three.js Port

Everything below was read directly out of `SonicEraZoR/Portal-Base` (Valve's Portal 1 source + SonicEraZoR's
mod additions). File paths are relative to `sp/src/`.

---

## 0. Direct answers to your questions

| Question | Answer |
|---|---|
| **Do they use a stencil buffer?** | **Yes — that is the primary path.** `r_portal_use_stencils` defaults to `"1"`. The portal view is rendered *in place into the back buffer* over a stencil hole, recursively. `game/client/portal/PortalRender.cpp:34` |
| **Do they use oblique projection?** | **No.** The word "oblique" appears exactly once in the entire source tree, in a comment inside a generated shader header (`materialsystem/stdshaders/common_ps_fxc.h:418`), and it's about step sizes for a surface effect. Portal views are clipped with **hardware user clip planes** (`IMatRenderContext::PushCustomClipPlane`), not by bending the projection matrix. |
| **Do they slice geometry?** | **No geometric slicing.** "Slicing" is done two ways: (1) **render clip planes** — a straddling entity is drawn twice (the real one clipped to one side, a *ghost renderable* transformed through the portal and clipped to the other side); (2) **physics shadow clones** — a duplicate physics object living in a *second physics environment* on the far side of the portal. |
| **Is there a portal shader in this repo?** | **No.** There are **zero** portal `.fx`/`.vsh`/`.psh`/`.vmt` files in the repo. `materialsystem/stdshaders/` has 87 shader `.cpp` files and none of them mention portals. What *is* here is the C++ that drives the shaders, plus three material proxies. See §11. |
| **Teleport logic?** | Server-side, trigger-volume + center-crosses-plane based. Full walk-through in §8. |

### The two render paths

```
r_portal_use_stencils 1  (default)  →  stencil path  →  recursive in-place back-buffer rendering
                                                        DrawPortalsUsingStencils()
r_portal_use_stencils 0             →  texture path  →  _rt_Portal1 / _rt_Portal2 full-frame RTs
                                                        DrawPortalsToTextures()
```

`ShouldUseStencilsToRenderPortals()` = `r_portal_use_stencils.GetBool() && materials->StencilBufferBits() != 0`
(`PortalRender.cpp:241-244`). XBox 360 was stencil-only — the texture-mode materials are `#if !defined(_X360)`.

**For Three.js you want the stencil path.** Your existing `Game/world.js` is already ~80% of the way there
(direct-to-backbuffer recursion with stencil) — §12 gives the exact deltas.

---

## 1. Source map

### Client — rendering
| File | Role |
|---|---|
| `game/client/portal/PortalRender.h/.cpp` | `CPortalRender` singleton. The stencil state machine, recursion bookkeeping, view-ID tree, water/fog handling. **The core file.** |
| `game/client/portal/portalrenderable_flatbasic.h/.cpp` | `CPortalRenderable_FlatBasic` — the portal surface itself. Portal→portal transform, frustum clipping through the portal, stencil mask, render-fix mesh, depth doubler. |
| `game/client/portal/Portal_DynamicMeshRenderingUtils.cpp` | Sutherland–Hodgman polygon clipping (`ClipPolyToPlane_LerpTexCoords`) + convex-polygon-as-triangle-strip emitter. |
| `game/client/portal/portal_render_targets.cpp` | `_rt_Portal1`, `_rt_Portal2`, `_rt_DepthDoubler`, per-recursion-depth water RTs. |
| `game/client/portal/c_prop_portal.cpp` | `C_Prop_Portal` client entity: ghost renderables (= visual slicing), static amount, open amount. |
| `game/client/portal/C_PortalGhostRenderable.cpp` | A duplicated renderable of a straddling entity, transformed through the portal, drawn with a clip plane. |
| `game/client/portal/materialproxy_portalstatic.cpp` | Material proxies `PortalStatic`, `PortalStaticModel`, `PortalOpenAmount` → feed `$staticamount` / `$openamount` floats to the shaders. |
| `game/client/viewrender.cpp` | Integration points: `ViewDrawScene_PortalStencil()`, `DrawPortalsUsingStencils()` call site, `VIEW_CLEAR_OBEY_STENCIL`. |

### Shared / server — simulation
| File | Role |
|---|---|
| `game/shared/portal/portal_shareddefs.h` | `PORTAL_HALF_WIDTH 32`, `PORTAL_HALF_HEIGHT 54`, `PORTAL_HALF_DEPTH 2`, fizzle types. |
| `game/shared/portal/prop_portal_shared.cpp` | `UpdatePortalTransformationMatrix()` — **the portal→portal matrix**. |
| `game/shared/portal/PortalSimulation.cpp` (2500 lines) | `CPortalSimulator` — per-portal physics environment, collision polyhedrons, link matrix, entity ownership. |
| `game/shared/portal/portal_util_shared.cpp` | Traces, point/ray/plane transforms through portals, portal OBB tests. |
| `game/server/portal/prop_portal.cpp` | **`ShouldTeleportTouchingEntity()` + `TeleportTouchingEntity()`** — the teleport. Touch handling, ownership handoff. |
| `game/server/portal/physicsshadowclone.cpp` | `CPhysicsShadowClone` — duplicated physics bodies on the far side. |
| `game/server/portal/portal_placement.cpp` | `FitPortalOnSurface()`, `VerifyPortalPlacement()`. |
| `game/server/portal/portal_player.cpp` | `CPortal_Player` — eye-angle fixup after portalling, portal-environment traces. |
| `game/shared/portal/portal_gamemovement.cpp` | `FunnelIntoPortal()` — air steering toward a floor portal you're falling into. |

---

## 2. Constants and the portal data model

```cpp
// game/shared/portal/portal_shareddefs.h
#define PORTAL_HALF_WIDTH        32.0f   // 64" wide
#define PORTAL_HALF_HEIGHT       54.0f   // 108" tall
#define PORTAL_HALF_DEPTH         2.0f
#define PORTAL_BUMP_FORGIVENESS   2.0f
#define MIN_FLING_SPEED         300

// game/shared/portal/prop_portal_shared.cpp:18
const Vector CProp_Portal_Shared::vLocalMins( 0.0f, -PORTAL_HALF_WIDTH, -PORTAL_HALF_HEIGHT );
const Vector CProp_Portal_Shared::vLocalMaxs( 64.0f,  PORTAL_HALF_WIDTH,  PORTAL_HALF_HEIGHT );
```

Note the OBB is **64 units deep**, not 4 — the trigger volume is a 64×64×108 box whose back face sits at the
portal origin and extends 64 units *out the front*. That depth is what makes "halfway through" detectable.

A portal is stored as a centre + orthonormal basis (Source is **left-handed, Z-up**):

```cpp
Vector m_ptOrigin;                 // centre
Vector m_vForward, m_vUp, m_vRight;
float  m_fStaticAmount;            // 0 = clear view, 1 = opaque static (no link / end of recursion)
float  m_fSecondaryStaticAmount;   // fade-in value used at the end of the recursion chain
float  m_fOpenAmount;              // 0..1 opening animation
bool   m_bIsPortal2;               // picks _rt_Portal1 vs _rt_Portal2
```

Derived per move in `PortalMoved()` (`portalrenderable_flatbasic.cpp:103`, body from `:105`):

```cpp
m_ptForwardOrigin = m_ptOrigin + m_vForward;
m_fPlaneDist      = m_vForward.Dot( m_ptOrigin );          // plane equation, used everywhere
// 4 corners, offset one unit forward (used for PVS/vis origins)
m_ptCorners[0] = (m_ptForwardOrigin + right) + up;   // +r +u
m_ptCorners[1] = (m_ptForwardOrigin - right) + up;   // -r +u
m_ptCorners[2] = (m_ptForwardOrigin - right) - up;   // -r -u
m_ptCorners[3] = (m_ptForwardOrigin + right) - up;   // +r -u
```

**Backface test** used by every visibility routine:

```cpp
if ( m_vForward.Dot( vCameraPos ) <= m_fPlaneDist ) return false;  // camera behind the plane
```

---

## 3. The portal→portal transform (this is the heart of everything)

```cpp
// game/shared/portal/prop_portal_shared.cpp:21
void CProp_Portal_Shared::UpdatePortalTransformationMatrix(
        const matrix3x4_t &localToWorld, const matrix3x4_t &remoteToWorld, VMatrix *pMatrix )
{
    VMatrix matPortal1ToWorldInv, matPortal2ToWorld, matRotation;

    MatrixInverseTR( localToWorld, matPortal1ToWorldInv );   // inverse of a rigid transform

    matRotation.Identity();          // 180° about the portal's "up" axis
    matRotation.m[0][0] = -1.0f;
    matRotation.m[1][1] = -1.0f;

    matPortal2ToWorld = remoteToWorld;
    *pMatrix = matPortal2ToWorld * matRotation * matPortal1ToWorldInv;
}
```

And the bases it's fed (`portalrenderable_flatbasic.cpp:166-168`):

```cpp
matrix3x4_t localToWorld ( m_vForward, -m_vRight, m_vUp, m_ptOrigin );
matrix3x4_t remoteToWorld( m_pLinkedPortal->m_vForward, -m_pLinkedPortal->m_vRight,
                           m_pLinkedPortal->m_vUp, m_pLinkedPortal->m_ptOrigin );
CProp_Portal_Shared::UpdatePortalTransformationMatrix( localToWorld, remoteToWorld, &m_matrixThisToLinked );
MatrixInverseTR( m_matrixThisToLinked, m_pLinkedPortal->m_matrixThisToLinked );
```

### Why `-m_vRight`?
Source's local space is left-handed, so `(forward, right, up)` is not a right-handed basis. Using
`(forward, -right, up)` makes it one, and then the `diag(-1,-1,1)` rotation is a proper rotation rather than
a reflection. The net effect:

* a point moving along **this** portal's `+forward` (into the wall) maps to a point moving along
  **−linkedForward** (out of the far portal);
* handedness is preserved, so nothing gets mirrored.

### The same formula, server side
`CPortalSimulator::UpdateLinkMatrix()` (`PortalSimulation.cpp:360`) recomputes it identically and also
stores the inverse plus position/angle decomposition (the physics API needs angles, not matrices):

```cpp
m_InternalData.Placement.matThisToLinked = matRemoteToWorld * matRotation * matLocalToWorldInverse;
m_InternalData.Placement.matThisToLinked.InverseTR( m_InternalData.Placement.matLinkedToThis );

MatrixAngles( matThisToLinked.As3x4(), ptaap_ThisToLinked.qAngleTransform,  ptaap_ThisToLinked.ptOriginTransform );
MatrixAngles( matLinkedToThis.As3x4(), ptaap_LinkedToThis.qAngleTransform,  ptaap_LinkedToThis.ptOriginTransform );
```

If a portal has no link, the matrix is set to **identity**, with the comment
*"don't accidentally teleport objects to zero space"*.

### Transform helpers (`portal_util_shared.cpp`)
Points, vectors, angles, rays and planes all go through the same matrix:

```cpp
void UTIL_Portal_PointTransform ( const VMatrix m, const Vector &pt,  Vector &out )  { out = m * pt; }
void UTIL_Portal_VectorTransform( const VMatrix m, const Vector &v,   Vector &out )  { out = m.ApplyRotation( v ); }
void UTIL_Portal_AngleTransform ( const VMatrix m, const QAngle &q,   QAngle &out )
{
    // angles are transformed via the matrix, NOT by adding angles — gimbal-lock safe
    out = TransformAnglesToWorldSpace( q, m.As3x4() );
}
void UTIL_Portal_PlaneTransform ( const VMatrix m, const VPlane &p,   VPlane &out )
{
    out.m_Normal = m.ApplyRotation( p.m_Normal );
    out.m_Dist   = out.m_Normal.Dot( m * ( p.m_Normal * p.m_Dist ) );   // transform a point ON the plane
}
```

> **Key rule:** never transform *angles* by adding/subtracting. Always rotate a basis and re-extract angles.
> Source explicitly notes *"originally we did a transformation on the angles, but that doesn't quite work
> right for gimbal lock cases"* (`prop_portal.cpp:1070`).

---

## 4. Render path A — the stencil path (the real one)

### Where it hooks into the frame

```
CViewRender::RenderView
  └─ DrawWorldAndEntities (opaque)
  └─ CRendering3dView::DrawTranslucentRenderables          viewrender.cpp:4326
       ├─ if ( ShouldDrawPortals() )                        // false while drawing a skybox
       │    DrawPortalsUsingStencils( pViewRender )   ◄────── THE PORTAL PASS
       │    if (it returned true) { rebuild vis + render lists }
       └─ ...translucent entities
  └─ UpdateDepthDoublerTexture( view )                      viewrender.cpp:1038
```

So the order within a frame is: **opaque world → stencil hole + recursive portal views → portal overlay quads
→ translucent entities.** The portal pass runs *after* opaque geometry, which is what makes the stencil mask
correctly occluded by walls in front of it.

### Recursion limit

```cpp
#define MAX_PORTAL_RECURSIVE_VIEWS 11

const int iMaxDepth = MIN( r_portal_stencil_depth.GetInt(),                       // default 2
                           MIN( MAX_PORTAL_RECURSIVE_VIEWS,
                                (1 << materials->StencilBufferBits()) ) - 1 );
```

With an 8-bit stencil buffer that's `MIN(2, MIN(11, 255) - 1) = 2`. **Stencil value == recursion depth** —
that's the whole trick, and it's why the depth is bounded by the stencil bit count.

### The state machine

Notation: `L` = current recursion level, `ref = L`, `childRef = L + 1`.

| Step | Stencil func / ref | Ops (fail, zfail, pass) | What is drawn |
|---|---|---|---|
| **entry, only when `L == 0`** | `ALWAYS`, ref 0 | keep, keep, **REPLACE** | nothing — just establishes state |
| **0** `DrawPreStencilMask()` | `EQUAL`, ref `L` | keep, keep, keep | portal *refract* quad, **only if** `0 < m_fOpenAmount < 1` (the opening animation) |
| **1** `DrawStencilMask()` | `EQUAL`, ref `L` | keep, keep, **INCR** | portal quad (`portal_stencil_hole`) + render-fix mesh (`writez_model`) |
| **2** clear depth in hole | `EQUAL`, ref `L+1` | keep, keep, keep | `ClearBuffersObeyStencil( false, true )` — **depth only**, colour untouched |
| **3** recurse | *(children set their own)* | | `RenderPortalViewToBackBuffer()` → new view → `ViewDrawScene_PortalStencil()` |
| **4** `DrawPostStencilFixes()` | `EQUAL`, ref `L+1` | keep, keep, keep | clear depth again → fog quad → portal quad + render-fix, **depth-write only** |
| **5** unwind | `EQUAL`, ref `L+1` | keep, keep, **DECR** | `PerformFullScreenStencilOperation()` — full-screen, no colour/depth change |
| **exit** | `L == 0` → disable stencil<br>`L > 0` → `EQUAL`, ref `L`, pass KEEP | | then `DrawPortal()` for every portal (static overlay / depth doubler) |

Verbatim from `PortalRender.cpp:453`:

```cpp
bool CPortalRender::DrawPortalsUsingStencils( CViewRender *pViewRender )
{
    if( !ShouldUseStencilsToRenderPortals() ) return false;

    int iDrawFlags = pViewRender->GetDrawFlags();
    if ( (iDrawFlags & DF_RENDER_REFLECTION) != 0 ) return false;
    if ( ((iDrawFlags & DF_CLIP_Z) != 0) && ((iDrawFlags & DF_CLIP_BELOW) == 0) ) return false; // clipping above water

    // ... build actualActivePortals[], skipping invisible ones and freeing their view-id nodes ...

    const int iMaxDepth = MIN( r_portal_stencil_depth.GetInt(),
                               MIN( MAX_PORTAL_RECURSIVE_VIEWS, (1 << materials->StencilBufferBits()) ) - 1 );
    if( m_iViewRecursionLevel >= iMaxDepth )
    {
        m_iRemainingPortalViewDepth = 0;              // "end of the line" → portals draw full static
        for each portal: pCurrentPortal->DrawPortal();
        return false;
    }
    m_iRemainingPortalViewDepth = (iMaxDepth - m_iViewRecursionLevel) - 1;

    pRenderContext->Flush( true );                    // don't corrupt the last opaque draw

    m_RecursiveViewSetups[m_iViewRecursionLevel] = *pViewSetup;
    memcpy( &ViewBackup, pViewSetup, sizeof(CViewSetup) );   // the recursive view MUTATES pViewSetup

    int iParentLevelStencilReferenceValue = m_iViewRecursionLevel;
    int iStencilReferenceValue            = iParentLevelStencilReferenceValue + 1;

    if( m_iViewRecursionLevel == 0 ) {
        SetStencilEnable(true); CompareFunction(ALWAYS); PassOp(REPLACE);
        FailOp(KEEP); ZFailOp(KEEP); TestMask(0xFF); WriteMask(0xFF); ReferenceValue(0);
        m_RecursiveViewComplexFrustums[0].RemoveAll();
    }
    if( m_RecursiveViewComplexFrustums[m_iViewRecursionLevel].Count() == 0 )
        m_RecursiveViewComplexFrustums[m_iViewRecursionLevel]
            .AddMultipleToTail( FRUSTUM_NUMPLANES, pViewRender->GetFrustum() );

    for( int i = 0; i != iNumRenderablePortals; ++i )
    {
        CPortalRenderable *pCurrentPortal = actualActivePortals[i];
        m_RecursiveViewComplexFrustums[m_iViewRecursionLevel + 1].RemoveAll();

        if( (pCurrentPortal->GetLinkedPortal() == NULL) ||
            (pCurrentPortal == m_pRenderingViewExitPortal) ||          // don't render the portal we just came out of
            !pCurrentPortal->ShouldUpdatePortalView_BasedOnView( *pViewSetup,
                                    m_RecursiveViewComplexFrustums[m_iViewRecursionLevel] ) )
        { /* free its view-id node, continue */ }

        // STEP 0
        { CompareFunction(EQUAL); PassOp(KEEP); FailOp(KEEP); ZFailOp(KEEP);
          ReferenceValue(iParentLevelStencilReferenceValue);
          pCurrentPortal->DrawPreStencilMask(); }

        // STEP 1
        { PassOp(INCR);
          pCurrentPortal->DrawStencilMask(); }

        if ( bIsQueuedMode ||
             pCurrentPortal->ShouldUpdatePortalView_BasedOnPixelVisibility(
                 pCurrentPortalViewNode->fScreenFilledByPortalSurfaceLastFrame_Normalized ) )
        {
            // STEP 2
            { PassOp(KEEP); ReferenceValue(iStencilReferenceValue);
              pRenderContext->ClearBuffersObeyStencil( false, true ); }   // depth only, inside the hole

            // STEP 3
            { bRebuildDrawListsWhenDone = true;
              /* back up fog mode/colour/distances + sky glow overlays */
              m_PortalViewIDNodeChain[m_iViewRecursionLevel + 1] = <this portal's node>;
              pCurrentPortal->RenderPortalViewToBackBuffer( pViewRender, *pViewSetup );
              m_PortalViewIDNodeChain[m_iViewRecursionLevel + 1] = NULL;
              /* restore fog, restore view setup, hard-reset stencil state */ }

            // STEP 4
            { pCurrentPortal->DrawPostStencilFixes(); }
        }

        // STEP 5
        { ReferenceValue(iStencilReferenceValue); CompareFunction(EQUAL); PassOp(DECR);
          FailOp(KEEP); ZFailOp(KEEP);
          pRenderContext->PerformFullScreenStencilOperation(); }
    }

    // STEP 6
    if( m_iViewRecursionLevel == 0 ) { SetStencilEnable(false); CompareFunction(NEVER); ReferenceValue(0); }
    else { ReferenceValue(iParentLevelStencilReferenceValue); CompareFunction(EQUAL); PassOp(KEEP); }

    if( bRebuildDrawListsWhenDone )
        memcpy( (void*)pViewSetup, &ViewBackup, sizeof(CViewSetup) );

    pRenderContext->Flush( true );
    ++m_iRemainingPortalViewDepth;
    for each portal: pCurrentPortal->DrawPortal();
    return bRebuildDrawListsWhenDone;
}
```

`ClearBuffersObeyStencil` and `PerformFullScreenStencilOperation` are engine primitives
(`public/materialsystem/imaterialsystem.h:1378` and `:1422`):

```cpp
// This is a version of clear buffers which will only clear the buffer at pixels which pass the stencil test
virtual void ClearBuffersObeyStencil( bool bClearColor, bool bClearDepth ) = 0;
// Apply stencil operations to every pixel on the screen without disturbing depth or color buffers
virtual void PerformFullScreenStencilOperation( void ) = 0;
```

### The three stencil-mask callbacks

```cpp
// portalrenderable_flatbasic.cpp:639
void CPortalRenderable_FlatBasic::DrawPreStencilMask( void )
{
    if ( ( m_fOpenAmount > 0.0f ) && ( m_fOpenAmount < 1.0f ) )
        DrawSimplePortalMesh( m_Materials.m_Portal_Refract[ m_bIsPortal2 ? 1 : 0 ] );
}

void CPortalRenderable_FlatBasic::DrawStencilMask( void )
{
    DrawSimplePortalMesh( m_Materials.m_Portal_Stencil_Hole );
    DrawRenderFixMesh( g_pPortalRender->m_MaterialsAccess.m_WriteZ_Model );
}

void CPortalRenderable_FlatBasic::DrawPostStencilFixes( void )
{
    CMatRenderContextPtr pRenderContext( materials );
    pRenderContext->ClearBuffersObeyStencil( false, true );  // fast clipping may have hosed depth, reset it
    RenderFogQuad();                                          // replace the fog we overwrote
    DrawSimplePortalMesh( g_pPortalRender->m_MaterialsAccess.m_WriteZ_Model, 0.0f );
    DrawRenderFixMesh(    g_pPortalRender->m_MaterialsAccess.m_WriteZ_Model, 0.0f );
}
```

Three subtle points:

1. **The stencil mask is depth-tested.** Step 1 draws the portal quad *after* the opaque world with depth
   testing on, so a wall in front of the portal correctly blocks the hole. The `INCR` only fires on
   *pass* (`STENCILOPERATION_INCR` is the pass op; fail and zfail are `KEEP`).
2. **Step 2 wipes the depth that step 1 wrote.** `ClearBuffersObeyStencil(false, true)` clears depth exactly
   where stencil == `L+1`, i.e. exactly where the mask drew. So step 1's depth writes are throwaway; its only
   purpose is the stencil increment. The `writez_model` render-fix mesh is drawn there because it covers
   pixels *outside* the portal quad (near-plane clipping) that also need the hole.
3. **Step 4 restores depth and fog but not colour.** `engine/writez_model` writes Z only. The recursive view
   left the hole with the far side's depth values, which are meaningless in *this* view's depth range, so
   they're cleared and the portal quad re-establishes a sane depth at the portal plane.

### The recursive view itself

```cpp
// portalrenderable_flatbasic.cpp:398
void CPortalRenderable_FlatBasic::RenderPortalViewToBackBuffer( CViewRender *pViewRender, const CViewSetup &cameraView )
{
    if( m_fStaticAmount == 1.0f ) return;    // nothing to see anyway
    if( m_pLinkedPortal == NULL ) return;

    Frustum FrustumBackup; memcpy( FrustumBackup, pViewRender->GetFrustum(), sizeof(Frustum) );

    Frustum seeThroughFrustum;
    bool bUseSeeThroughFrustum = CalcFrustumThroughPortal( cameraView.origin, seeThroughFrustum );   // §5

    Vector vCameraForward; AngleVectors( cameraView.angles, &vCameraForward, NULL, NULL );

    // ---- build the portal view -------------------------------------------------
    Vector ptPOVOrigin = m_matrixThisToLinked * cameraView.origin;
    Vector vPOVForward = m_matrixThisToLinked.ApplyRotation( vCameraForward );
    Vector ptRemotePortalPosition = m_pLinkedPortal->m_ptOrigin;
    Vector vRemotePortalForward   = m_pLinkedPortal->m_vForward;

    CViewSetup portalView = cameraView;
    if( portalView.zNear < 1.0f ) portalView.zNear = 1.0f;              // floor the near plane at 1"
    QAngle qPOVAngles = TransformAnglesToWorldSpace( cameraView.angles, m_matrixThisToLinked.As3x4() );

    portalView.origin = ptPOVOrigin;
    portalView.angles = qPOVAngles;
    portalView.m_bOrtho = false;
    // width/height/x/y/fov/aspect all inherited from the main view — the hole IS the screen

    CopyToCurrentView( pViewRender, portalView );

    // ---- THE CLIP PLANE (this is what replaces oblique projection) -------------
    float fCustomClipPlane[4];
    fCustomClipPlane[0] = vRemotePortalForward.x;
    fCustomClipPlane[1] = vRemotePortalForward.y;
    fCustomClipPlane[2] = vRemotePortalForward.z;
    fCustomClipPlane[3] = vRemotePortalForward.Dot( ptRemotePortalPosition - (vRemotePortalForward * 0.5f) );
    //                  ^ moved back half an inch "to eliminate visual artifacts for half-in objects"
    pRenderContext->PushCustomClipPlane( fCustomClipPlane );

    {
        ViewCustomVisibility_t customVisibility;
        m_pLinkedPortal->AddToVisAsExitPortal( &customVisibility );   // PVS from the EXIT portal's corners
        render->Push3DView( portalView, /*clearFlags*/ 0, /*target*/ NULL, pViewRender->GetFrustum() );
        {
            if( bUseSeeThroughFrustum )
                memcpy( pViewRender->GetFrustum(), seeThroughFrustum, sizeof(Frustum) );
            render->OverrideViewFrustum( pViewRender->GetFrustum() );

            SetViewRecursionLevel( g_pPortalRender->GetViewRecursionLevel() + 1 );
            CPortalRenderable *entryBackup = g_pPortalRender->GetCurrentViewEntryPortal();
            CPortalRenderable *exitBackup  = g_pPortalRender->GetCurrentViewExitPortal();
            SetViewEntranceAndExitPortals( this, m_pLinkedPortal );

            //DRAW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            ViewDrawScene_PortalStencil( pViewRender, portalView, &customVisibility );

            SetViewEntranceAndExitPortals( entryBackup, exitBackup );

            if( m_InternallyMaintainedData.m_bUsableDepthDoublerConfiguration &&
                (g_pPortalRender->GetRemainingPortalViewDepth() == 1) )
            {
                // cached AFTER use, deliberately: the front buffer is one frame behind the current
                // view matrix, otherwise you get a lag effect when the player turns their head
                pRenderContext->GetMatrix( MATERIAL_VIEW, &m_InternallyMaintainedData.m_DepthDoublerTextureView );
            }
            SetViewRecursionLevel( g_pPortalRender->GetViewRecursionLevel() - 1 );
        }
        render->PopView( pViewRender->GetFrustum() );
        memcpy( pViewRender->GetFrustum(), FrustumBackup, sizeof(Frustum) );
        render->OverrideViewFrustum( FrustumBackup );
    }

    pRenderContext->PopCustomClipPlane();
    CopyToCurrentView( pViewRender, cameraView );
}
```

Things worth copying exactly:

* **`Push3DView(..., clearFlags = 0, target = NULL)`** — no clear at all, straight into the back buffer.
  The stencil hole *is* the scissor.
* **`pCurrentPortal == m_pRenderingViewExitPortal` is skipped** in the portal loop. Without this you get an
  infinite regress looking back out of the portal you just came through.
* **Near plane floored at 1.0 unit.** Prevents degenerate/negative depth ranges.
* **The clip plane is the *exit* portal's plane**, pushed back 0.5 units. That 0.5" is why a cube half-way
  through a portal renders correctly on both sides.
* **The clip plane is pushed/popped as a stack** so nested recursive views compose.

### `ShouldDrawPortals()` and view rebuilding

```cpp
// viewrender.h:246
virtual bool ShouldDrawPortals() { return true; }
// viewrender.cpp:389  (skybox view)
virtual bool ShouldDrawPortals() { return false; }
```

`DrawPortalsUsingStencils` returns `true` if any portal actually rendered a view, and the caller
(`viewrender.cpp:4335`) then does `SetupVis()` + `BuildWorldRenderLists()` again, because the recursive
render clobbered the draw flags and the cached lists.

### Water + stencil interaction

Water reflection/refraction renders to its own target and must not inherit the stencil state:

```cpp
// PortalRender.cpp:281
void CPortalRender::WaterRenderingHandler_PreReflection() const
{
    if( (m_iViewRecursionLevel > 0) && ShouldUseStencilsToRenderPortals() )
        pRenderContext->SetStencilEnable( false );
}
// PostReflection / PreRefraction / PostRefraction toggle it back on
```

And any clear inside a recursive view must obey the stencil:

```cpp
// viewrender.cpp:5738
if( g_pPortalRender->ShouldObeyStencilForClears() )   // level > 0 && stencil mode
    m_ClearFlags |= VIEW_CLEAR_OBEY_STENCIL;
```

Water quality is also downgraded inside portals based on how much screen the portal covers
(`ShouldForceCheaperWaterLevel()`): `< 0.5%` → no reflection/refraction at all, `< 2%` → cheap,
`< 5%` → world, else full.

---

## 5. Frustum clipping through the portal (the culling optimisation)

`r_portal_use_complex_frustums` defaults to `1`. This is the single biggest perf win in the whole system:
instead of culling the far-side world with the camera's 6-plane frustum, it builds the **actual** frustum of
the cone of rays from the camera through the portal aperture.

`CPortalRenderable_FlatBasic::CalcFrustumThroughPortal()` (`portalrenderable_flatbasic.cpp:195`):

```cpp
bool CalcFrustumThroughPortal( const Vector &ptCurrentViewOrigin, Frustum OutputFrustum )
{
    if( !r_portal_use_complex_frustums.GetBool() ) return false;

    int iViewRecursionLevel     = g_pPortalRender->GetViewRecursionLevel();
    int iNextViewRecursionLevel = iViewRecursionLevel + 1;

    // Too close → the aperture is behind/around you, the cone math is useless
    if( (iViewRecursionLevel == 0) &&
        ((ptCurrentViewOrigin - m_ptOrigin).LengthSqr() < (PORTAL_HALF_HEIGHT * PORTAL_HALF_HEIGHT)) )
        return false;

    if( m_pLinkedPortal == NULL ) return false;
    if( m_vForward.Dot( ptCurrentViewOrigin ) <= m_InternallyMaintainedData.m_fPlaneDist )
        return false;   // looking at the backface

    VPlane *pInputFrustum         = g_pPortalRender->m_RecursiveViewComplexFrustums[iViewRecursionLevel].Base();
    int     iInputFrustumPlaneCount = g_pPortalRender->m_RecursiveViewComplexFrustums[iViewRecursionLevel].Count();

    // ---- 1. Sutherland–Hodgman: clip the 4 portal corners against the CURRENT frustum ----
    int iVertCount = ClipPolyToPlane( m_InternallyMaintainedData.m_ptCorners, 4, pInVerts,
                                      pInputFrustum[0].m_Normal, pInputFrustum[0].m_Dist, 0.01f );
    for( i = 1; i != iInputFrustumPlaneCount; ++i )
    {
        if( iVertCount < 3 ) return false;
        iVertCount = ClipPolyToPlane( pInVerts, iVertCount, pOutVerts,
                                      pInputFrustum[i].m_Normal, pInputFrustum[i].m_Dist, 0.01f );
        swap( pInVerts, pOutVerts );
    }
    if( iVertCount < 3 ) return false;

    // ---- 2. Build a plane per aperture edge: normal = (p1-cam) × (p2-cam), rotated into the far space ----
    g_pPortalRender->m_RecursiveViewComplexFrustums[iNextViewRecursionLevel].SetCount( iVertCount + 2 );
    Vector ptTransformedCamera = m_matrixThisToLinked * ptCurrentViewOrigin;

    for( i = 0; i != iVertCount; ++i )
    {
        Vector *p1 = &pInVerts[i], *p2 = &pInVerts[(i+1) % iVertCount];
        Vector vNormal = ( *p1 - ptCurrentViewOrigin ).Cross( *p2 - ptCurrentViewOrigin );
        vNormal.NormalizeInPlace();
        vNormal = m_matrixThisToLinked.ApplyRotation( vNormal );     // carry it through the portal
        m_RecursiveViewComplexFrustums[iNextViewRecursionLevel].Element(i)
            .Init( vNormal, vNormal.Dot( ptTransformedCamera ) );    // plane through the NEW camera
    }

    // ---- 3. Near plane = the exit portal's own plane. Far plane = transformed input far plane ----
    m_RecursiveViewComplexFrustums[iNext].Element(i).Init(
        m_pLinkedPortal->m_vForward, m_pLinkedPortal->m_InternallyMaintainedData.m_fPlaneDist );
    ++i;
    {
        VPlane far = pInputFrustum[iInputFrustumPlaneCount - 1];
        Vector vNormal   = m_matrixThisToLinked.ApplyRotation( far.m_Normal );
        Vector ptOnPlane = far.m_Dist * far.m_Normal;
        m_RecursiveViewComplexFrustums[iNext].Element(i)
            .Init( vNormal, vNormal.Dot( m_matrixThisToLinked * ptOnPlane ) );
    }

    // ---- 4. If clipping produced > 4 sides, collapse back down to 4 ----
    // Repeatedly find the shortest edge and merge its endpoint into the intersection of the
    // neighbouring edge lines, until iVertCount == 4. (Skipped if the edge is < 0.1 long.)

    // ---- 5. Emit ----
    for( i = 0; i != 4; ++i ) OutputFrustum[i] = Planes[i];
    OutputFrustum[FRUSTUM_NEARZ] = complex[iComplexCount-2];
    OutputFrustum[FRUSTUM_FARZ]  = complex[iComplexCount-1];
    return true;
}
```

The result is stored in a **per-recursion-level array** (`m_RecursiveViewComplexFrustums[MAX_PORTAL_RECURSIVE_VIEWS]`,
a `CUtlVector<VPlane>` — i.e. *variable plane counts*, not always 6) so that a level-2 portal culls against
the level-1 cone, not the raw camera frustum.

Note that a *complex* frustum is kept for culling, while a **reduced 4-side `Frustum`** is handed to the
renderer, because the engine's culling API expects exactly 4 sides + near + far.

### Portal visibility test (the cheap cull before all that)

```cpp
// portalrenderable_flatbasic.cpp:1224
bool CPortalRenderable_FlatBasic::ShouldUpdatePortalView_BasedOnView(
        const CViewSetup &currentView, CUtlVector<VPlane> &currentComplexFrustum )
{
    if( m_pLinkedPortal == NULL )  return false;
    if( m_fStaticAmount == 1.0f )  return false;

    Vector vCameraPos = currentView.origin;
    if( (g_pPortalRender->GetViewRecursionLevel() == 0) &&
        ((m_ptOrigin - vCameraPos).LengthSqr() < (PORTAL_HALF_HEIGHT * PORTAL_HALF_HEIGHT)) )
        return true;   // fudgery: player may not see the surface but can see the render fix

    if( m_vForward.Dot( vCameraPos ) <= m_InternallyMaintainedData.m_fPlaneDist )
        return false;  // backface

    // Sutherland–Hodgman the 4 corners against the complex frustum; visible iff ≥3 verts survive
    int iVertCount = ClipPolyToPlane( m_ptCorners, 4, pInVerts, currentFrustum[0].m_Normal, currentFrustum[0].m_Dist, 0.01f );
    for( i = 1; i != iCurrentFrustmPlanes; ++i ) {
        if( iVertCount < 3 ) return false;
        iVertCount = ClipPolyToPlane( ... );
        swap( pInVerts, pOutVerts );
    }
    return ( iVertCount >= 3 );
}
```

### The clipping routine itself

```cpp
// Portal_DynamicMeshRenderingUtils.cpp:15
int ClipPolyToPlane_LerpTexCoords( PortalMeshPoint_t *inVerts, int vertCount, PortalMeshPoint_t *outVerts,
                                   const Vector &normal, float dist, float fOnPlaneEpsilon )
{
    // classify each vertex FRONT / BACK / ON with a 0.01 epsilon
    // early-out: all BACK → return 0 ;  all FRONT-or-ON → memcpy and return vertCount
    // otherwise walk edges: keep FRONT/ON verts, and where an edge crosses,
    // emit lerp(p1,p2, d1/(d1-d2)) with the texture coordinate lerped the same way
}
```

Epsilon `0.01f` everywhere. Worth keeping — a zero epsilon produces degenerate slivers.

---

## 6. The render-fix mesh (near-plane poke-through)

When the camera is close to the portal, the near plane slices the portal quad and you can see the geometry
*behind* the wall through the gap. Source fixes this by drawing a screen-space polygon that covers the gap,
projected on the CPU and forced to depth ≈ 0.

```cpp
// portalrenderable_flatbasic.cpp:882
void CPortalRenderable_FlatBasic::DrawRenderFixMesh( const IMaterial *pMaterialOverride, float fFrontClipDistance )
{
    if( g_pPortalRender->GetViewRecursionLevel() != 0 ) return;   // only ever needed in the primary view

    Vector ptCameraOrigin = CurrentViewOrigin();
    Vector vPortalCenterToCamera = ptCameraOrigin - m_ptOrigin;
    if( vPortalCenterToCamera.Dot( m_vForward ) < -1.0f ) return; // camera coplanar or in FRONT of the plane

    if( vPortalCenterToCamera.LengthSqr() < (PORTAL_HALF_HEIGHT * PORTAL_HALF_HEIGHT) )  // < 54 units
    {
        m_fStaticAmount = 0.0f;    // that close, kill any static
        float fCameraDist = m_vForward.Dot( ptCameraOrigin - m_ptOrigin );
        if( fFrontClipDistance > fCameraDist ) fFrontClipDistance = fCameraDist;  // never clip past the camera
        // temporarily push the outer bounding plane in by fFrontClipDistance, draw, restore
    }
}
```

The mesh: a **80×80 unit quad centred on the view axis at `zNear + 0.05`**, then clipped.

```cpp
// Internal_DrawRenderFixMesh
vOrigin = CurrentViewOrigin() + vForward * (view->GetViewSetup()->zNear + 0.05f);
WorkVertices[0] = vOrigin + vRight*40 - vUp*40;
WorkVertices[1] = vOrigin + vRight*40 + vUp*40;
WorkVertices[2] = vOrigin - vRight*40 + vUp*40;
WorkVertices[3] = vOrigin - vRight*40 - vUp*40;
ClipFixToBoundingAreaAndDraw( WorkVertices, pMaterial );
```

`ClipFixToBoundingAreaAndDraw` does three things:

1. Clip against **12 side planes + 1 back plane** (the portal's "cone", built in `PortalMoved()`):
   ```cpp
   #define PORTALRENDERFIXMESH_OUTERBOUNDPLANES 12
   for( i = 0; i != 12; ++i ) {
       float fCirclePos  = i * (M_PI*2.0f / 12.0f);
       float fUpBlend    = cosf(fCirclePos), fRightBlend = sinf(fCirclePos);
       Vector vNormal    = -fUpBlend*m_vUp - fRightBlend*m_vRight;
       Vector ptOnPlane  = m_ptOrigin + m_vUp*(fUpBlend*PORTAL_HALF_HEIGHT*1.1f)
                                      + m_vRight*(fRightBlend*PORTAL_HALF_WIDTH*1.1f);
       m_BoundingPlanes[i].Init( vNormal, vNormal.Dot(ptOnPlane) );
   }
   m_BoundingPlanes[12].Init( -m_vForward, (-m_vForward).Dot( m_ptOrigin ) );                    // back
   m_BoundingPlanes[13].Init(  m_vForward,   m_vForward.Dot( m_ptOrigin - m_vForward*5.0f ) );    // front, 5" out
   ```
   Those 12 planes form a **prism extruded from a 12-gon inscribed around the portal ellipse**, scaled 1.1×.
2. Clip against the view frustum (6 planes).
3. **Project on the CPU and force `z = 0.00001`**, then render with identity model/view/projection and
   clipping disabled:
   ```cpp
   pInVerts[i].vWorldSpacePosition  = matViewProj * pInVerts[i].vWorldSpacePosition;
   pInVerts[i].vWorldSpacePosition *= 1.0f / W;
   pInVerts[i].vWorldSpacePosition.z = 0.00001f;   // "the primary reason we're projecting on the CPU"
   ```

---

## 7. Render path B — the texture path (`r_portal_use_stencils 0`)

Same maths, different destination.

```cpp
// portalrenderable_flatbasic.cpp:502
void CPortalRenderable_FlatBasic::RenderPortalViewToTexture( CViewRender *pViewRender, const CViewSetup &cameraView )
{
    ITexture *pRenderTarget = m_bIsPortal2 ? portalrendertargets->GetPortal2Texture()
                                           : portalrendertargets->GetPortal1Texture();
    // ... same origin/angle transform, same CalcFrustumThroughPortal, same clip plane ...
    portalView.width  = pRenderTarget->GetActualWidth();
    portalView.height = pRenderTarget->GetActualHeight();
    portalView.m_flAspectRatio = (float)cameraView.width / (float)cameraView.height;  // SCREEN aspect, not RT

    pRenderContext->PushCustomClipPlane( fCustomClipPlane );
    render->Push3DView( portalView, VIEW_CLEAR_DEPTH, pRenderTarget, pViewRender->GetFrustum() );
    {
        SetRemainingViewDepth( 0 );     // texture mode is NOT recursive — one level only
        SetViewRecursionLevel( 1 );
        Draw3dSkyboxworld_Portal( ... );
        pRenderContext->EnableUserClipTransformOverride( false );
        ViewDrawScene( ... );
    }
    render->PopView( ... );
    pRenderContext->PopCustomClipPlane();
}
```

Because the portal surface then samples a texture, it needs a **subdivided mesh** so the fixed-function
`vs11/ps11` shaders interpolate the projection correctly:

```cpp
#define PORTAL_PROJECTION_MESH_SUBDIVIDE_HEIGHTCHUNKS 8
#define PORTAL_PROJECTION_MESH_SUBDIVIDE_WIDTHCHUNKS  6
// DrawComplexPortalMesh() emits 8×6 = 48 sub-quads, each one clipped to the frustum
```

### Render targets (`portal_render_targets.cpp`)

| Name | Size | Notes |
|---|---|---|
| `_rt_Portal1` | `RT_SIZE_FULL_FRAME_BUFFER` | back-buffer format, `MATERIAL_RT_DEPTH_SHARED`, HDR |
| `_rt_Portal2` | `RT_SIZE_FULL_FRAME_BUFFER` | same |
| `_rt_DepthDoubler` | 512×512 `RT_SIZE_DEFAULT` | HDR, shared depth |
| `_rt_PortalWaterReflection_Depth1` | 512×512 `RT_SIZE_PICMIP` | separate depth, CLAMPS\|CLAMPT |
| `_rt_PortalWaterReflection_Depth2` | 256×256 `RT_SIZE_PICMIP` | separate depth |
| `_rt_PortalWaterRefraction_Depth1/2` | same pattern | |

Per-recursion water targets exist because `ViewDrawScene_PortalStencil()` **swaps** the primary water RT
contents with the level's spare (`SwapContents`) so a recursive view doesn't stomp the outer view's water.

---

## 8. Teleport logic

### Trigger volume

`prop_portal` is itself a trigger brush with the OBB from §2 (64 deep, 64 wide, 108 tall). `StartTouch` /
`Touch` / `EndTouch` drive everything.

```cpp
// prop_portal.cpp:1440
void CProp_Portal::StartTouch( CBaseEntity *pOther )
{
    BaseClass::StartTouch( pOther );
    pOther->StartTouch( this );                     // triggers don't send it back, so force it
    if( (m_hLinkedPortal == NULL) || (m_bActivated == false) ) return;

    if( CProp_Portal_Shared::IsEntityTeleportable( pOther ) )
    {
        // centre of the entity's world AABB
        Vector ptOtherCenter = (vWorldMins + vWorldMaxs) / 2.0f;

        if( m_plane_Origin.normal.Dot( ptOtherCenter ) > m_plane_Origin.dist )   // in FRONT of the plane
        {
            if( SharedEnvironmentCheck( pOther ) )   // are we a better caretaker than the current owner?
            {
                CPortalSimulator *pOwningSimulator = CPortalSimulator::GetSimulatorThatOwnsEntity( pOther );
                if( pOwningSimulator && (pOwningSimulator != &m_PortalSimulator) )
                    pOwningSimulator->ReleaseOwnershipOfEntity( pOther );
                m_PortalSimulator.TakeOwnershipOfEntity( pOther );
            }
        }
    }
}

void CProp_Portal::EndTouch( CBaseEntity *pOther )
{
    if( !m_bActivated ) return;
    if( ShouldTeleportTouchingEntity( pOther ) )     // crossed the plane AND left the box
        TeleportTouchingEntity( pOther );
    else if( /* player, portal facing mostly down, player behind the plane, duck-jumping */ )
    { /* player pulled their feet back up through the portal they fell out of — do nothing */ }
    else
        m_PortalSimulator.ReleaseOwnershipOfEntity( pOther );
}
```

`SharedEnvironmentCheck()` breaks ties between the two portals by **distance from the entity's centre to
each portal's centre** — nearer portal wins.

Ownership is what binds the player to a portal *environment*:

```cpp
void CProp_Portal::PortalSimulator_TookOwnershipOfEntity( CBaseEntity *pEntity )
{
    if( pEntity->IsPlayer() ) ((CPortal_Player*)pEntity)->m_hPortalEnvironment = this;
}
void CProp_Portal::PortalSimulator_ReleasedOwnershipOfEntity( CBaseEntity *pEntity )
{
    if( pEntity->IsPlayer() && (m_hPortalEnvironment.Get() == this) ) m_hPortalEnvironment = NULL;
}
```

`m_hPortalEnvironment` then makes *every* trace the player does run through that portal's simulated world
(§10).

### The teleport gate

```cpp
// prop_portal.cpp:804
bool CProp_Portal::ShouldTeleportTouchingEntity( CBaseEntity *pOther )
{
    if( !m_PortalSimulator.OwnsEntity( pOther ) )            return false;  // must be owned by THIS portal
    if( !CProp_Portal_Shared::IsEntityTeleportable( pOther ) ) return false;
    if( m_hLinkedPortal.Get() == NULL )                       return false;

    Vector ptOtherCenter = pOther->WorldSpaceCenter();

    // --- the actual trigger: centre has crossed to the back of the portal plane ---
    if( PortalPlane.m_Normal.Dot( ptOtherCenter ) < PortalPlane.m_Dist )
    {
        // ...and the entity's collision volume actually intersects the portal hole
        if( m_PortalSimulator.EntityIsInPortalHole( pOther ) )
            return true;
    }
    return false;
}
```

Two conditions, both required:
1. **the entity's world-space *centre* is behind the portal plane**, and
2. **the entity's collide actually intersects the portal hole** (a 6-plane convex solid built in
   `CPortalSimulator::MoveTo()` — front plane, back plane, and the 4 side planes of the aperture).

Non-teleportable classnames are hardcoded:

```cpp
static char *g_pszPortalNonTeleportable[] = {
    "func_door", "func_door_rotating", "prop_door_rotating",
    "func_tracktrain", "physicsshadowclone"
};
```

### The teleport itself

```cpp
// prop_portal.cpp:929  (abridged but complete in structure)
void CProp_Portal::TeleportTouchingEntity( CBaseEntity *pOther )
{
    if ( GetPortalCallQueue() ) {                       // re-entrancy guard
        GetPortalCallQueue()->QueueCall( this, &CProp_Portal::TeleportTouchingEntity, pOther );
        return;
    }

    Vector ptOtherOrigin = pOther->GetAbsOrigin();
    Vector ptOtherCenter = pOther->WorldSpaceCenter();
    bool   bPlayer       = pOther->IsPlayer();

    // ---- 1. get a trustworthy velocity ------------------------------------------
    // MOVETYPE_VPHYSICS → physics object velocity; else entity velocity;
    // if it comes back zero, fall back to IPhysicsObject::GetImplicitVelocity()
    // ("recorded velocity is sometimes zero under pushed or teleported movement")

    const PS_InternalData_t &Remote = m_hLinkedPortal->m_PortalSimulator.m_DataAccess;
    const PS_InternalData_t &Local  = m_PortalSimulator.m_DataAccess;

    // ---- 2. player special case: "curl up into a ball" --------------------------
    if( bPlayer )
    {
        qOtherAngles = pPlayer->EyeAngles();
        pPlayer->m_qPrePortalledViewAngles   = qOtherAngles;
        pPlayer->m_bFixEyeAnglesFromPortalling = true;
        pPlayer->m_matLastPortalled          = m_matrixThisToLinked;

        if( fabs( Local.Placement.vForward.z ) > 0.0f )
        {
            float fAbsLocalZ  = fabs( Local.Placement.vForward.z );
            float fAbsRemoteZ = fabs( Remote.Placement.vForward.z );
            if( !(fabs(fAbsLocalZ-1.0f) < 0.01f && fabs(fAbsRemoteZ-1.0f) < 0.01f) )
            {
                // portals are NOT both axis-aligned on Z → the player AABB can't be rotated,
                // so shrink them instead
                pPlayer->SetGroundEntity( NULL );
                if( !pPlayer->IsDucked() )
                {
                    pPlayer->ForceDuckThisFrame();
                    pPlayer->m_Local.m_bInDuckJump = true;
                    if( Local.Placement.vForward.z > 0.0f ) ptOtherCenter.z -= 16.0f;  // portal up → shrink down
                    else                                    ptOtherCenter.z += 16.0f;  // portal down → shrink up
                }
            }
        }
    }
    else { qOtherAngles = pOther->GetAbsAngles(); bNonPhysical = FClassnameIs(pOther,"prop_energy_ball"); }

    // ---- 3. THE TRANSFORM --------------------------------------------------------
    if( bPlayer ) {
        ptNewOrigin  = m_matrixThisToLinked * ptOtherCenter;   // transform the CENTRE...
        ptNewOrigin += ptOtherOrigin - ptOtherCenter;          // ...then re-apply the origin offset
    } else {
        ptNewOrigin  = m_matrixThisToLinked * ptOtherOrigin;
    }

    qNewAngles = TransformAnglesToWorldSpace( qOtherAngles, m_matrixThisToLinked.As3x4() );
    qNewAngles.x = AngleNormalizePositive( qNewAngles.x );   // (+y, +z likewise)
    vNewVelocity = m_matrixThisToLinked.ApplyRotation( vOtherVelocity );

    // ---- 4. camera reorientation mode (pitch vs roll) ---------------------------
    // chooses m_bPitchReorientation from: holding an object? entering a wall portal while
    // facing mostly into/away from it? floor↔floor while looking mostly up/down?
    // exiting a wedge portal (0.75 < forward.z ≤ 0.99) while facing toward the top edge?

    // ---- 5. velocity hacks ------------------------------------------------------
    if( Remote.Placement.vForward.z > 0.7071f )                     // exiting a FLOOR portal
    {
        if( bPlayer )  vNewVelocity.z = max( vNewVelocity.z, 300.0f );   // MINIMUM_FLOOR_PORTAL_EXIT_VELOCITY_PLAYER
        else if( Local.Placement.vForward.z > 0.7071f )
                       vNewVelocity.z = max( vNewVelocity.z,  50.0f );   // floor→floor
        else           vNewVelocity.z = max( vNewVelocity.z,  50.0f );
    }
    if( vNewVelocity.LengthSqr() > 1000.0f*1000.0f )                // MAXIMUM_PORTAL_EXIT_VELOCITY
        vNewVelocity *= 1000.0f / vNewVelocity.Length();

    // ---- 6. ownership handoff BEFORE the move -----------------------------------
    m_PortalSimulator.ReleaseOwnershipOfEntity( pOther, /*bMovingToLinked*/ true );
    PhysicsNotifyOtherOfUntouch( this, pOther );
    pOther->PhysicsNotifyOtherOfUntouch( pOther, this );
    m_hLinkedPortal->m_PortalSimulator.TakeOwnershipOfEntity( pOther );

    // ---- 7. do it ---------------------------------------------------------------
    pOther->SetGroundEntity( NULL );
    if( bPlayer )
    {
        QAngle qTransformedEyeAngles = TransformAnglesToWorldSpace( qPlayerEyeAngles, m_matrixThisToLinked.As3x4() );
        // normalize x/y/z to positive
        pPlayer->pl.v_angle = qTransformedEyeAngles;
        pPlayer->pl.fixangle = FIXANGLE_ABSOLUTE;
        pPlayer->UpdateVPhysicsPosition( ptNewOrigin, vNewVelocity, 0.0f );
        pPlayer->Teleport( &ptNewOrigin, &qNewAngles, &vNewVelocity );
    }
    else if( bNonPhysical )
    {
        pOther->Teleport( &ptNewOrigin, &qNewAngles, &vNewVelocity );
    }
    else
    {
        // two stages as a bug workaround: setting velocity to non-zero breaks how
        // objects rest on this entity afterwards
        pOther->Teleport( &ptNewOrigin, &qNewAngles, &vec3_origin );
        pOther->ApplyAbsVelocityImpulse( vNewVelocity );
    }

    // ---- 8. held-object bookkeeping, then force-touch the destination portal ----
    pOther->PhysicsMarkEntitiesAsTouching( m_hLinkedPortal.Get(), Trace );
    m_hLinkedPortal->PhysicsMarkEntitiesAsTouching( pOther, Trace );

    // ---- 9. notify --------------------------------------------------------------
    notify_teleport_params_t p; p.prevOrigin = ptOtherOrigin; p.prevAngles = qOtherAngles; p.physicsRotate = true;
    pOther->NotifySystemEvent( this, NOTIFY_EVENT_TELEPORT, notify_system_event_params_t(&p) );
    // + a reliable "EntityPortalled" user message to all clients
}
```

Constants (`prop_portal.cpp:42`):

```cpp
#define MINIMUM_FLOOR_PORTAL_EXIT_VELOCITY         50.0f
#define MINIMUM_FLOOR_PORTAL_EXIT_VELOCITY_PLAYER 300.0f
#define MAXIMUM_PORTAL_EXIT_VELOCITY             1000.0f
```

### Fixing up the view angles next tick

The client keeps sending pre-teleport angles for one tick. `CPortal_Player::PlayerRunCommand` fixes them:

```cpp
// server/portal/portal_player.cpp:988
if( m_bFixEyeAnglesFromPortalling )
{
    float fOldAngleDiff  = fabs( AngleDistance( ucmd->viewangles.x, m_qPrePortalledViewAngles.x ) );
    fOldAngleDiff       += fabs( AngleDistance( ucmd->viewangles.y, m_qPrePortalledViewAngles.y ) );
    fOldAngleDiff       += fabs( AngleDistance( ucmd->viewangles.z, m_qPrePortalledViewAngles.z ) );
    if ( /* the incoming angles still look like the old ones */ )
        ucmd->viewangles = TransformAnglesToWorldSpace( ucmd->viewangles, m_matLastPortalled.As3x4() );
    m_bFixEyeAnglesFromPortalling = false;
}
```

### Funnel-into-portal (air steering)

```cpp
// shared/portal/portal_gamemovement.cpp:35
#define PORTAL_FUNNEL_AMOUNT 6.0f

void CPortalGameMovement::FunnelIntoPortal( CProp_Portal *pPortal, Vector &wishdir )
{
    pPortal->GetVectors( &vPortalForward, &vPortalRight, &vPortalUp );
    if( vPortalForward.z < 0.8f ) return;              // only for upward-facing portals
    vPortalRight.z = 0; vPortalUp.z = 0;               // flatten to the XY plane
    VectorNormalize( vPortalRight ); VectorNormalize( vPortalUp );

    Vector vPlayerToPortal = pPortal->GetAbsOrigin() - vPlayerOrigin;

    // bail if the player is steering hard, not falling fast enough, or too far above
    if( fabsf(wishdir[0]) > 64.0f || fabsf(wishdir[1]) > 64.0f ||
        mv->m_vecVelocity[2] > -165.0f || vPlayerToPortal.z < -512.0f ) return;
    if( (vPlayerToPortal.Dot(vPortalRight) * vPortalRight).Length() > PORTAL_HALF_WIDTH  * 1.5f ) return;
    if( (vPlayerToPortal.Dot(vPortalUp)    * vPortalUp   ).Length() > PORTAL_HALF_HEIGHT * 1.5f ) return;
    if( vPlayerToPortal.z > -8.0f ) return;

    float fFunnelX = vPlayerToPortal.x * PORTAL_FUNNEL_AMOUNT - mv->m_vecVelocity[0];
    float fFunnelY = vPlayerToPortal.y * PORTAL_FUNNEL_AMOUNT - mv->m_vecVelocity[1];
    // add to velocity
}
```

---

## 9. "Slicing" — how a straddling object looks and feels correct

Valve never cuts a mesh. Two independent mechanisms cover the two halves of the problem.

### 9a. Visual: ghost renderables + render clip planes

`C_Prop_Portal::Simulate()` (`c_prop_portal.cpp:254`) picks the straddling entities and sets their clip planes.
(`C_Prop_Portal::UpdateGhostRenderables()` at `:841` only refreshes the ghosts' transform each frame.)

```cpp
CBaseEntity *pEntsNearPortal[1024];
int iEntsNearPortal = UTIL_EntitiesInSphere( pEntsNearPortal, 1024, GetNetworkOrigin(),
                                             PORTAL_HALF_HEIGHT, 0, PARTITION_CLIENT_NON_STATIC_EDICTS );

float fClipPlane[4];
fClipPlane[0] = m_plane_Origin.normal.x;
fClipPlane[1] = m_plane_Origin.normal.y;
fClipPlane[2] = m_plane_Origin.normal.z;
fClipPlane[3] = m_plane_Origin.dist - 0.3f;        // ← the REAL entity is clipped here

for each candidate:
    if (movetype chain is all MOVETYPE_NONE/MOVETYPE_PUSH) continue;   // doors/unmoveables can't straddle
    if (pEntity == pLocalPlayerViewModel) continue;                    // never ghost the viewmodel
    if (non-selected player weapons) continue;

    Vector ptEntCenter = pEntity->WorldSpaceCenter();
    if( (m_plane_Origin.normal.Dot(ptEntCenter) - m_plane_Origin.dist) < -5.0f )
        continue;                                  // already fully behind the portal wall

    if( !IsEntityTeleportable( pEntity ) ) continue;

    // the straddle test — players use the HITBOX extents, not the collision hull
    if( pEntity->IsPlayer() ) {
        if( !m_PortalSimulator.EntityHitBoxExtentIsInPortalHole( (C_BaseAnimating*)pEntity ) ) continue;
    } else {
        if( !m_PortalSimulator.EntityIsInPortalHole( pEntity ) ) continue;
    }

    pEntity->m_bEnableRenderingClipPlane = true;
    memcpy( pEntity->m_fRenderingClipPlane, fClipPlane, sizeof(float)*4 );
    m_hGhostingEntities.AddToTail( pEntity );

// and the shared clip plane for the ghosts (the LINKED portal's plane, 0.75" back)
m_fGhostRenderablesClip[0..2] = pLinkedPortal->m_plane_Origin.normal;
m_fGhostRenderablesClip[3]    = pLinkedPortal->m_plane_Origin.dist - 0.75f;
```

`C_PortalGhostRenderable` (`C_PortalGhostRenderable.cpp`) then re-draws the same model:

```cpp
virtual int   GetRenderClipPlane() { return m_pSharedRenderClipPlane; }   // the LINKED portal's plane

void PerFrameUpdate( void )
{
    SetModelName/ SetModelIndex / SetEffects( ... | EF_NOINTERP );
    SetCycle/ SetSequence / m_nBody / m_nSkin  = copied from the source entity;
    m_matGhostTransform = <owning portal's matrixThisToLinked>;
}

Vector const& GetRenderOrigin() { return m_matGhostTransform * m_pGhostedRenderable->GetRenderOrigin(); }
QAngle  const& GetRenderAngles(){ return TransformAnglesToWorldSpace( m_pGhostedRenderable->GetRenderAngles(),
                                                                      m_matGhostTransform.As3x4() ); }
bool SetupBones( matrix3x4_t *out, ... )
{
    m_pGhostedRenderable->SetupBones( out, ... );
    for( i = 0; i != nMaxBones; ++i )
        ConcatTransforms( m_matGhostTransform.As3x4(), out[i], out[i] );    // rebase the skeleton
}
const matrix3x4_t& RenderableToWorldTransform()
{
    ConcatTransforms( m_matGhostTransform.As3x4(), m_pGhostedRenderable->RenderableToWorldTransform(), out );
}
```

**Net result:** the real entity is clipped to the near side of this portal's plane; the ghost is the same
skeleton transformed through the portal and clipped to the far side of the linked portal's plane. Two halves,
one model, zero geometry surgery. The `-0.3f` / `-0.75f` offsets are anti-z-fighting bias so the two halves
overlap slightly instead of leaving a seam.

### 9b. Physical: portal environments + shadow clones

Each portal owns a **separate `IPhysicsEnvironment`** (`CPortalSimulator`). It contains:

* the local world's brushes and static props (clipped to a box around the portal),
* the **remote** portal's brushes and static props, transformed into local space by `ptaap_LinkedToThis`,
* a "holy wall" tube — collision that seals the sides of the portal so nothing slips through the wall,
* a shadow clone for every entity that straddles.

```cpp
// PortalSimulation.cpp:1291  CPortalSimulator::CreateLinkedPhysics()
// 1. remote world brushes, transformed
m_InternalData.Simulation.Static.Wall.RemoteTransformedToLocal.Brushes.pPhysicsObject =
    m_InternalData.Simulation.pPhysicsEnvironment->CreatePolyObjectStatic(
        RemoteSimulationStaticWorld.Brushes.pCollide,
        ...,
        m_InternalData.Placement.ptaap_LinkedToThis.ptOriginTransform,
        m_InternalData.Placement.ptaap_LinkedToThis.qAngleTransform,
        &params );

// 2. remote static props, transformed
for each Representation in RemoteSimulationStaticWorld.StaticProps.ClippedRepresentations:
    CreatePolyObjectStatic( Representation.pCollide, ..., ptaap_LinkedToThis.ptOriginTransform,
                            ptaap_LinkedToThis.qAngleTransform, &params );

// 3. shadow clones of every entity the LINKED portal owns
for each hEnt in RemoteOwnedEntities:
    CPhysicsShadowClone *pClone = CPhysicsShadowClone::CreateShadowClone(
        m_InternalData.Simulation.pPhysicsEnvironment, hEnt,
        "CPortalSimulator::CreateLinkedPhysics(): From Linked Portal",
        &m_InternalData.Placement.matLinkedToThis.As3x4() );
    MarkAsOwned( pClone );
    m_InternalData.Simulation.Dynamic.EntFlags[pClone->entindex()] |= PSEF_OWNS_PHYSICS;
    m_InternalData.Simulation.Dynamic.ShadowClones.FromLinkedPortal.AddToTail( pClone );
```

`CPhysicsShadowClone` (`server/portal/physicsshadowclone.h`) is a real entity whose physics objects are
driven by **shadow controllers** so they follow the original through the portal transform:

```cpp
EHANDLE m_hClonedEntity;             // the entity we're cloning the physics of
VMatrix m_matrixShadowTransform;     // all cloned coordinates run through this first
VMatrix m_matrixShadowTransform_Inverse;
CUtlVector<PhysicsObjectCloneLink_t> m_CloneLinks;   // { pSource, pShadowController, pClone }
bool m_bImmovable;                   // cloning a door/tracktrain — can't do it force-based
bool m_bInAssumedSyncState;

void FullSyncClonedPhysicsObjects( bool bTeleport );
void SyncEntity( bool bPullChanges );
void FullSync( bool bAllowAssumedSync = false );
void PartialSync( bool bPullChanges );  // true = clone follows source; false = clone pushes onto source
```

`#define FVPHYSICS_IS_SHADOWCLONE 0x4000` marks them, and `"physicsshadowclone"` is in the
non-teleportable list so a clone never teleports and starts an infinite chain.

Entity flags (`PortalSimulation.h`):

```cpp
enum PortalSimulationEntityFlags_t
{
    PSEF_OWNS_ENTITY             = (1 << 0),
    PSEF_OWNS_PHYSICS            = (1 << 1),
    PSEF_IS_IN_PORTAL_HOLE       = (1 << 2),   // updated per physics frame
    PSEF_CLONES_ENTITY_FROM_MAIN = (1 << 3),
};
```

### 9c. The straddle test

```cpp
// PortalSimulation.cpp:407
bool CPortalSimulator::EntityIsInPortalHole( CBaseEntity *pEntity ) const
{
    if( m_bLocalDataIsReady == false ) return false;
    // trace the entity's collide (vphysics vcollide, or its AABB/OBB) against
    // m_InternalData.Placement.pHoleShapeCollideable
}
```

The hole shape is a 6-plane convex solid rebuilt in `MoveTo()`:

```cpp
float fHolePlanes[6*4];
// planes 0 and 1 are always the forward and backward planes
fHolePlanes[0..2] = PortalPlane.m_Normal;  fHolePlanes[3] = PortalPlane.m_Dist;
// ...planes 2..5 are the four aperture side planes
```

Players use `EntityHitBoxExtentIsInPortalHole()` instead — hitboxes, not the collision hull — because the
player's AABB never rotates and would give wrong answers on angled portals.

---

## 10. Tracing through portals

`UTIL_Portal_TraceRay_With()` is the workhorse (`portal_util_shared.cpp:498`). It runs **two** traces and
takes the nearer hit:

```cpp
void UTIL_Portal_TraceRay_With( const CProp_Portal *pPortal, const Ray_t &ray, unsigned int fMask,
                                ITraceFilter *pTraceFilter, trace_t *pTrace, bool bTraceHolyWall )
{
    if( !pPortal || !pPortal->m_PortalSimulator.IsReadyToSimulate() )
    {
        enginetrace->TraceRay( ray, fMask, pTraceFilter, pTrace );     // no portal → plain trace
        return;
    }

    trace_t RealTrace;   enginetrace->TraceRay( ray, fMask, pTraceFilter, &RealTrace );
    trace_t PortalTrace; UTIL_Portal_TraceRay( pPortal, ray, fMask, pTraceFilter, &PortalTrace, bTraceHolyWall );

    if( !g_bForcePortalTrace && !RealTrace.startsolid && PortalTrace.fraction <= RealTrace.fraction )
    { *pTrace = RealTrace; return; }

    *pTrace = PortalTrace;

    // Only continue the ray ACROSS the portal if it's heading into it, and only for true rays
    // ("tracing extruded box rays across portals causes collision bugs")
    Vector vDirection = ray.m_Delta; VectorNormalize( vDirection );
    Vector vPortalForward; pPortal->GetVectors( &vPortalForward, 0, 0 );
    float flDot = ray.m_IsSwept ? vDirection.Dot( vPortalForward ) : -1.0f;

    if ( flDot < 0.0f && ray.m_IsRay ) { /* continue the trace out the far portal */ }
}
```

Ray vs portal surface — the aperture is tested as **two triangles**, and rays moving *away* from the front
face are rejected up front:

```cpp
// portal_util_shared.cpp:1512
float UTIL_IntersectRayWithPortal( const Ray_t &ray, const CProp_Portal *pPortal )
{
    if ( !pPortal || !pPortal->m_bActivated ) return -1.0f;

    Vector vForward; pPortal->GetVectors( &vForward, NULL, NULL );
    if ( DotProduct( vForward, ray.m_Delta ) > 0.0f ) return -1.0f;   // not coming from the front

    Vector pvTri1[3], pvTri2[3];
    UTIL_Portal_Triangles( pPortal, pvTri1, pvTri2 );

    float fT = IntersectRayWithTriangle( ray, pvTri1[0], pvTri1[1], pvTri1[2], false );
    if ( fT >= 0.0f ) return fT;
    return IntersectRayWithTriangle( ray, pvTri2[0], pvTri2[1], pvTri2[2], false );
}

// portal_util_shared.cpp:1290 — the aperture as two triangles
void UTIL_Portal_Triangles( const Vector &ptPortalCenter, const QAngle &qPortalAngles,
                            Vector pvTri1[3], Vector pvTri2[3] )
{
    AngleVectors( qPortalAngles, NULL, &vRight, &vUp );
    Vector vTopLeft     = ptPortalCenter + vUp*PORTAL_HALF_HEIGHT - vRight*PORTAL_HALF_WIDTH;
    Vector vTopRight    = ptPortalCenter + vUp*PORTAL_HALF_HEIGHT + vRight*PORTAL_HALF_WIDTH;
    Vector vBottomLeft  = ptPortalCenter - vUp*PORTAL_HALF_HEIGHT - vRight*PORTAL_HALF_WIDTH;
    Vector vBottomRight = ptPortalCenter - vUp*PORTAL_HALF_HEIGHT + vRight*PORTAL_HALF_WIDTH;
    pvTri1 = { vTopRight, vTopLeft,  vBottomLeft  };
    pvTri2 = { vTopRight, vBottomLeft, vBottomRight };
}
```

Box sweeps (bullets, entity hulls) fall back to `UTIL_IsBoxIntersectingPortal()` →
`IsBoxIntersectingTriangle()` against both triangles.

Other utilities worth porting:

```cpp
float UTIL_Portal_DistanceThroughPortal( const CProp_Portal*, const Vector &a, const Vector &b );
float UTIL_Portal_ShortestDistance( const Vector &a, const Vector &b, CProp_Portal **outPortal = NULL,
                                    bool bRequireStraightLine = false );   // used by AI hearing/LOS
bool  UTIL_IntersectRayWithPortalOBB( const CProp_Portal*, const Ray_t&, trace_t* );  // IntersectRayWithOBB
CProp_Portal* UTIL_Portal_FirstAlongRay( const Ray_t&, float &fMustBeCloserThan );
```

`UTIL_Portal_Trace_Beam()` shows the loop for a laser that can chain through many portals — capped at 16:

```cpp
int iNumLoops = 0;
while ( pPortal && iNumLoops < 16 ) { /* transform ray, find next portal */ }
```

---

## 11. Portal placement

```cpp
// server/portal/portal_placement.h
bool  FitPortalOnSurface( const CProp_Portal *pIgnorePortal, Vector &vOrigin, const Vector &vForward,
                          const Vector &vRight, const Vector &vTopEdge, const Vector &vBottomEdge,
                          const Vector &vRightEdge, const Vector &vLeftEdge,
                          int iPlacedBy, ITraceFilter *pTraceFilterPortalShot,
                          int iRecursions = 0, const CPortalCornerFitData *pPortalCornerFitData = 0,
                          const int *p_piIntersectionIndex = 0, const int *piIntersectionCount = 0 );
bool  IsPortalIntersectingNoPortalVolume( const Vector &vOrigin, const QAngle &qAngles, const Vector &vForward );
bool  IsPortalOverlappingOtherPortals( const CProp_Portal *pIgnorePortal, const Vector &vOrigin,
                                       const QAngle &qAngles, bool bFizzle = false );
float VerifyPortalPlacement( const CProp_Portal *pIgnorePortal, Vector &vOrigin, QAngle &qAngles,
                             int iPlacedBy, bool bTest = false );
```

The four edges are passed in separately because `FitPortalOnSurface` **traces each edge/corner** to snap the
portal onto geometry that isn't perfectly flat, and it recurses (`iRecursions`) when a corner lands on a
different surface. Return values are the `PORTAL_ANALOG_SUCCESS_*` floats from `portal_shareddefs.h`, which
double as the pitch/volume scale for the placement sound:

```cpp
#define PORTAL_ANALOG_SUCCESS_NO_BUMP                 1.0f
#define PORTAL_ANALOG_SUCCESS_BUMPED                  0.3f
#define PORTAL_ANALOG_SUCCESS_CANT_FIT                0.1f
#define PORTAL_ANALOG_SUCCESS_CLEANSER                0.028f
#define PORTAL_ANALOG_SUCCESS_OVERLAP_LINKED          0.027f
#define PORTAL_ANALOG_SUCCESS_NEAR                    0.0265f
#define PORTAL_ANALOG_SUCCESS_INVALID_VOLUME          0.026f
#define PORTAL_ANALOG_SUCCESS_INVALID_SURFACE         0.025f
#define PORTAL_ANALOG_SUCCESS_PASSTHROUGH_SURFACE     0.0f
```

Blocking volumes: `func_noportal_volume`, `func_allowportal_volume`, `trigger_portal_cleanser`
(dissolves anything passing through — the "fizzler").

---

## 12. What is **not** in this repository (so you don't go looking)

Verified by search, not by assumption:

| Thing | Status |
|---|---|
| Portal `.fx` / `.vsh` / `.psh` / `.fxc` shaders | **Absent.** `find . -iname '*portal*' \( -name '*.fx' -o -name '*.vsh' -o -name '*.psh' -o -name '*.fxc' \)` → 0 hits. `materialsystem/stdshaders/` has 87 `.cpp` shader files, none portal-related. |
| Portal `.vmt` materials (`models/portals/portal_1_dynamicmesh`, `portal_stencil_hole`, `portalstaticoverlay_1`, `portal_depthdoubler`, …) | **Absent.** These are content files, not source. |
| `shaderapidx9` implementation | **Absent** — the directory contains only `locald3dtypes.h`. So the clip-plane → GPU mapping isn't visible here. |
| Oblique projection | **Does not exist** in this codebase. |

What *is* available about the shaders:

```cpp
// game/client/portal/materialproxy_portalstatic.cpp
EXPOSE_INTERFACE( CPortalStaticProxy,       IMaterialProxy, "PortalStaticModel" );  // models
EXPOSE_INTERFACE( CPortalStaticPortalProxy, IMaterialProxy, "PortalStatic" );       // portals
EXPOSE_INTERFACE( CPortalOpenAmountProxy,   IMaterialProxy, "PortalOpenAmount" );
```

Each just does `m_StaticOutput->SetFloatValue( flStaticAmount )` into whatever `resultVar` the VMT named.
The static-amount resolution logic is worth keeping:

```cpp
float CPortalStaticProxy::ComputeStaticAmount( CPortalRenderable_FlatBasic *pFlatBasic )
{
    float flStaticAmount = pFlatBasic->m_fStaticAmount;

    if ( !pFlatBasic->GetLinkedPortal() )                    flStaticAmount = 1.0f;   // unlinked = pure static
    if ( pFlatBasic->WillUseDepthDoublerThisDraw() )         flStaticAmount = 0.0f;
    else if ( g_pPortalRender->GetRemainingPortalViewDepth() == 0 )
                                                             flStaticAmount = 1.0f;   // end of the chain
    else if ( (g_pPortalRender->GetRemainingPortalViewDepth() == 1) &&
              (pFlatBasic->m_fSecondaryStaticAmount > flStaticAmount) )
                                                             flStaticAmount = pFlatBasic->m_fSecondaryStaticAmount;
    return flStaticAmount;
}
```

Plus one custom material var for the mod's depth doubler:

```cpp
m_Materials.m_pDepthDoubleViewMatrixVar = m_Materials.m_PortalDepthDoubler->FindVar("$alternateviewmatrix", NULL, false);
```

And the material list that must exist (`portalrenderable_flatbasic.h`):

```
models/portals/portal_1_dynamicmesh          models/portals/portal_2_dynamicmesh
models/portals/portal_1_renderfix_dynamicmesh models/portals/portal_2_renderfix_dynamicmesh
models/portals/portal_depthdoubler
models/portals/portalstaticoverlay_1         models/portals/portalstaticoverlay_2
models/portals/portal_stencil_hole
models/portals/portal_refract_1              models/portals/portal_refract_2
engine/writez_model                          engine/TranslucentVertexColor
shadertest/wireframe
```

### The depth doubler (mod addition, but a good idea)

When recursion runs out but the two portals face each other, the *last* frame's back buffer is a decent
approximation of "one more level in".

```cpp
bool CPortalRenderable_FlatBasic::WillUseDepthDoublerThisDraw( void ) const
{
    return g_pPortalRender->ShouldUseStencilsToRenderPortals() &&
        m_InternallyMaintainedData.m_bUsableDepthDoublerConfiguration &&
        (g_pPortalRender->GetRemainingPortalViewDepth() == 0) &&
        (g_pPortalRender->GetViewRecursionLevel() > 1) &&
        (g_pPortalRender->GetCurrentViewExitPortal() != this);
}
```

Usability is decided per portal move:

```cpp
m_bUsableDepthDoublerConfiguration =
      m_pLinkedPortal
   && ( m_vForward.Dot( m_pLinkedPortal->m_ptOrigin - m_ptOrigin ) > 0.0f )   // looking toward the other portal
   && ( m_vForward.Dot( m_pLinkedPortal->m_vForward ) < -0.7071f );           // within 45° of facing each other
```

Update and draw:

```cpp
// PortalRender.cpp:964 — copy the current view rect into the RT, once per frame
pRenderContext->CopyRenderTargetToTextureEx( portalrendertargets->GetDepthDoublerTexture(), 0, &srcRect, NULL );

// portalrenderable_flatbasic.cpp:772 — draw it with the depth-1 view matrix
IMaterialVar *pDepthDoubleViewMatrixVar = m_Materials.m_PortalDepthDoubler->FindVar( "$alternateviewmatrix", NULL, false );
pDepthDoubleViewMatrixVar->SetMatrixValue( m_InternallyMaintainedData.m_DepthDoublerTextureView );
DrawSimplePortalMesh( m_Materials.m_PortalDepthDoubler, fForwardOffsetModifier );
```

---

## 13. Three.js blueprint

All API claims in this section were checked against `three@0.166.0` in this repo's `node_modules`.

### 13.1 Facts you need first

* **`WebGLRenderer` needs a stencil buffer.** Your `Game/renderer.js` already passes `stencil: true` to both
  the canvas context and the renderer. ✓
* **Stencil constants exist** (`three/src/constants.js:173-189`): `KeepStencilOp`, `ReplaceStencilOp`,
  `IncrementStencilOp`, `DecrementStencilOp`, `AlwaysStencilFunc`, `EqualStencilFunc`, `NeverStencilFunc`, …
* **Every `Material` has stencil state** (`Material.js:44-51`): `stencilWrite`, `stencilWriteMask`,
  `stencilFunc`, `stencilRef`, `stencilFuncMask`, `stencilFail`, `stencilZFail`, `stencilZPass`.
* **`WebGLState.setMaterial()` calls `stencilBuffer.setTest( material.stencilWrite )` for every material**
  (`WebGLState.js:729-736`). This is the trap: any material without `stencilWrite` **disables**
  `GL_STENCIL_TEST`. So you cannot leave raw `gl.stencilFunc(...)` state lying around and expect it to survive
  the next draw call.
* **`renderer.state.buffers.stencil`** is reachable (`WebGLRenderer.js:323` assigns `_this.state = state`;
  `WebGLState.js:1222` exposes `buffers: { color, depth, stencil }`) and has
  `setLocked(bool)`, `setTest`, `setMask`, `setFunc`, `setOp`. `setLocked(true)` makes three.js stop touching
  stencil state — this is exactly what you need around a `clearDepth()`. Undocumented, but present and stable.
* **`renderer.clippingPlanes`** (world-space, applied to everything) and **`material.clippingPlanes`**
  (needs `renderer.localClippingEnabled = true`) both exist (`WebGLRenderer.js:141-142`).
* **Clipping planes are re-projected to view space per camera every frame**
  (`clipping.setGlobalState(planes, camera)`), so you set them in world space and they just work inside
  recursive portal views.
* **`numClippingPlanes` is part of the shader program cache key** (`WebGLPrograms.js:331,461`). Changing the
  *number* of planes triggers a recompile; mutating `Plane.normal` / `Plane.constant` does not. Keep the
  count fixed and pre-allocate.

### 13.2 Portal class

```js
import * as THREE from 'three'

export class Portal extends THREE.Object3D {
  constructor(halfWidth = 0.32, halfHeight = 0.54) {   // Source: 32" x 54", scaled to metres
    super()
    this.halfWidth = halfWidth
    this.halfHeight = halfHeight
    this.pair = null
    this.isPortal2 = false

    // scratch
    this._thisBasis  = new THREE.Matrix4()
    this._linkBasis  = new THREE.Matrix4()
    this._rot180     = new THREE.Matrix4().makeRotationY(Math.PI)
    this._tmp        = new THREE.Matrix4()

    this.matrixThisToLinked = new THREE.Matrix4()
    this.planeNormal = new THREE.Vector3()
    this.planePoint  = new THREE.Vector3()
  }

  /** Source's localToWorld uses (forward, -right, up). In three.js (Y up, right-handed) the
   *  object's own matrixWorld already IS (right, up, forward-as-+Z). We build the equivalent
   *  basis explicitly so the math matches UpdatePortalTransformationMatrix() 1:1. */
  updateLinkMatrix() {
    if (!this.pair) { this.matrixThisToLinked.identity(); return }
    this.updateMatrixWorld(true); this.pair.updateMatrixWorld(true)

    // thisToLinked = remote * Rot180(up) * inverse(local)
    this._thisBasis.copy(this.matrixWorld)
    this._linkBasis.copy(this.pair.matrixWorld)
    this.matrixThisToLinked
      .copy(this._linkBasis)
      .multiply(this._rot180)
      .multiply(this._tmp.copy(this._thisBasis).invert())

    // plane in world space (Source: m_fPlaneDist = forward · origin)
    this.planeNormal.set(0, 0, 1).transformDirection(this.matrixWorld)
    this.planePoint.copy(this.position)
  }
}
```

> `makeRotationY(π)` is the three.js analogue of Source's `diag(-1,-1,1)` because three.js portals face
> `+Z` with `+Y` up, so a 180° turn about the portal's up axis flips both the normal and the right vector —
> exactly the same operation.

### 13.3 The stencil state machine

```js
const gl = renderer.getContext()
renderer.autoClear = false
renderer.localClippingEnabled = true

// one shared "clear depth inside the stencil region" helper
function clearDepthObeyStencil(renderer, ref) {
  const st = renderer.state.buffers.stencil       // verified: WebGLState.js:1222
  st.setLocked(true)                              // stop three.js toggling STENCIL_TEST per material
  st.setTest(true)
  st.setMask(0xff)
  st.setFunc(gl.EQUAL, ref, 0xff)
  st.setOp(gl.KEEP, gl.KEEP, gl.KEEP)
  renderer.clearDepth()                           // gl.clear(DEPTH_BUFFER_BIT) — obeys the stencil test
  st.setLocked(false)
}

function fullScreenStencilOp(renderer, ref, op) {
  // PerformFullScreenStencilOperation(): stencil op on every pixel, no colour/depth change
  const st = renderer.state.buffers.stencil
  st.setLocked(true)
  st.setTest(true); st.setMask(0xff)
  st.setFunc(gl.EQUAL, ref, 0xff)
  st.setOp(gl.KEEP, gl.KEEP, op)
  gl.drawArrays(gl.TRIANGLES, 0, 0)   // or: draw a fullscreen tri with a no-op material
  st.setLocked(false)
}
```

> If you'd rather not touch `renderer.state`, the pure-public-API equivalent of
> `clearDepthObeyStencil` is to draw a full-screen triangle with
> `{ colorWrite:false, depthWrite:true, depthTest:false, stencilWrite:true,
>    stencilRef: ref, stencilFunc: THREE.EqualStencilFunc }`
> and a vertex shader emitting `gl_Position = vec4(pos.xy, 1.0, 1.0)`. Writing window depth 1.0 is
> functionally the same as clearing depth.

The main loop, matching Source step for step:

```js
const MAX_DEPTH = 2   // r_portal_stencil_depth

function drawPortalsUsingStencils(renderer, scene, camera, portals, level = 0) {
  const gl = renderer.getContext()
  const st = renderer.state.buffers.stencil
  const parentRef = level
  const childRef  = level + 1

  const visible = portals.filter(p =>
    p.pair && p !== currentExitPortal && shouldUpdatePortalView(p, camera))
  if (!visible.length) return false

  if (level >= MAX_DEPTH) {
    for (const p of portals) drawPortalOverlay(p)     // static overlay at the end of the chain
    return false
  }

  if (level === 0) {
    st.setTest(true); st.setMask(0xff)
    st.setFunc(gl.ALWAYS, 0, 0xff)
    st.setOp(gl.KEEP, gl.KEEP, gl.REPLACE)
  }

  for (const portal of visible) {
    // STEP 0 — pre-stencil (opening animation only)
    if (portal.openAmount > 0 && portal.openAmount < 1) drawQuad(portal, refractMaterial)

    // STEP 1 — cut the hole: depth-tested, INCR on pass
    drawQuad(portal, holeMaterial)                    // { stencilWrite:true, stencilRef:parentRef,
                                                      //   stencilFunc:Equal, stencilZPass:Increment }
    drawRenderFixMesh(portal, camera, writeZMaterial)

    // STEP 2 — clear DEPTH only, inside the hole
    clearDepthObeyStencil(renderer, childRef)

    // STEP 3 — recurse
    renderPortalView(renderer, scene, camera, portal, level)

    // STEP 4 — restore depth + fog, colour untouched
    clearDepthObeyStencil(renderer, childRef)
    drawQuad(portal, writeZMaterial)
    drawRenderFixMesh(portal, camera, writeZMaterial)

    // STEP 5 — unwind
    fullScreenStencilOp(renderer, childRef, gl.DECR)
  }

  if (level === 0) { st.setTest(false); st.setFunc(gl.NEVER, 0, 0xff) }
  else             { st.setFunc(gl.EQUAL, parentRef, 0xff); st.setOp(gl.KEEP, gl.KEEP, gl.KEEP) }

  for (const p of portals) drawPortalOverlay(p)
  return true
}
```

`holeMaterial` — the exact three.js equivalent of Source's step-1 state:

```js
const holeMaterial = new THREE.MeshBasicMaterial({
  colorWrite:  false,
  depthWrite:  false,
  depthTest:   true,             // ← the wall in front must block the hole
  stencilWrite: true,
  stencilRef:  0,                // set per level before drawing
  stencilFunc: THREE.EqualStencilFunc,
  stencilFail: THREE.KeepStencilOp,
  stencilZFail: THREE.KeepStencilOp,
  stencilZPass: THREE.IncrementStencilOp,   // ← INCR is the PASS op in Source
})
```

### 13.4 The recursive view — clip plane, not oblique projection

```js
const CLIP_PLANE = new THREE.Plane()   // pre-allocated: don't change the ARRAY LENGTH

function renderPortalView(renderer, scene, camera, portal, level) {
  const M = portal.matrixThisToLinked

  // camera → far side.  Source: ptPOVOrigin = M * origin ; angles = TransformAnglesToWorldSpace(angles, M)
  virtualCamera.position.copy(camera.position).applyMatrix4(M)
  virtualCamera.quaternion.copy(camera.quaternion)
    .premultiply(new THREE.Quaternion().setFromRotationMatrix(M))
  virtualCamera.near = Math.max(camera.near, 0.0254)   // Source floors zNear at 1 inch
  virtualCamera.far  = camera.far
  virtualCamera.fov  = camera.fov
  virtualCamera.aspect = camera.aspect
  virtualCamera.updateProjectionMatrix()
  virtualCamera.updateMatrixWorld(true)

  // THE CLIP PLANE — the exit portal's plane, pushed back 0.5" (= 0.0127 m)
  const n = new THREE.Vector3(0, 0, 1).transformDirection(portal.pair.matrixWorld)
  const d = portal.pair.getWorldPosition(new THREE.Vector3()).addScaledVector(n, -0.0127)
  CLIP_PLANE.setFromNormalAndCoplanarPoint(n, d)

  renderer.clippingPlanes = [CLIP_PLANE]     // keep the length at 1 to avoid shader recompiles
  currentExitPortal = portal.pair            // so we skip the portal we're exiting from

  renderer.render(scene, virtualCamera)      // no clear — the stencil hole is the scissor

  renderer.clippingPlanes = []
  currentExitPortal = null
}
```

**Why a clip plane instead of your current oblique projection:** the oblique method replaces the near plane
with the portal plane, which (a) clips exactly *at* the plane so a cube halfway through vanishes instead of
poking out, (b) eats depth precision near the portal, and (c) still needs a separate near plane for the
render-fix mesh. Source's clip plane is offset 0.5" behind the portal precisely so half-in objects render on
both sides. In three.js `renderer.clippingPlanes` is a one-line replacement and composes correctly with
recursion because it's re-projected per camera.

If you do want to keep oblique projection, keep it — but add the 0.5" bias to the plane before you feed it
to Lengyel's `q` computation, and keep a separate real near plane.

### 13.5 The frustum cone (worth doing — it's the main perf win)

Port `CalcFrustumThroughPortal` directly. In three.js:

```js
// frustum planes of the CURRENT view, in world space
const frustum = new THREE.Frustum().setFromProjectionMatrix(
  new THREE.Matrix4().multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse))
const planes = frustum.planes   // Plane[6]

// 1. Sutherland–Hodgman the portal's 4 corners against `planes`
let poly = portalCorners(portal)                 // Vector3[4]
for (const plane of planes) poly = clipPolyToPlane(poly, plane, 0.01)
if (poly.length < 3) return null                 // portal not visible

// 2. one plane per aperture edge, through the camera, rotated through the portal
const camPos = camera.position.clone()
const farCam = camPos.clone().applyMatrix4(portal.matrixThisToLinked)
const rot = new THREE.Matrix4().extractRotation(portal.matrixThisToLinked)
const outPlanes = []
for (let i = 0; i < poly.length; i++) {
  const p1 = poly[i], p2 = poly[(i + 1) % poly.length]
  const n = new THREE.Vector3().subVectors(p1, camPos)
              .cross(new THREE.Vector3().subVectors(p2, camPos)).normalize()
              .applyMatrix4(rot)
  outPlanes.push(new THREE.Plane().setFromNormalAndCoplanarPoint(n, farCam))
}
// 3. near = the exit portal's plane; far = the current far plane rotated through the portal
// 4. if outPlanes.length > 4, merge the shortest edges until it's 4
```

`THREE.Frustum` only takes 4 side planes + near + far, so do the same reduction Source does.

### 13.6 Teleport

```js
function teleport(body, entryPortal) {
  const M = entryPortal.matrixThisToLinked
  const exit = entryPortal.pair

  const centre = body.position.clone()                       // WorldSpaceCenter()
  const origin = body.position.clone()

  // centre crosses the plane  AND  the body intersects the hole
  const n = entryPortal.planeNormal, d = n.dot(entryPortal.planePoint)
  if (n.dot(centre) >= d) return false
  if (!bodyIntersectsHole(body, entryPortal)) return false

  const newOrigin = centre.applyMatrix4(M).add(origin.sub(centre))   // Source's player branch
  const newQuat   = body.quaternion.clone().premultiply(new THREE.Quaternion().setFromRotationMatrix(M))
  const newVel    = body.velocity.clone().applyMatrix4(new THREE.Matrix4().extractRotation(M))

  // floor-portal exit velocity hack (Source: 300 for the player, 50 for props, cap 1000)
  const exitUp = new THREE.Vector3(0, 0, 1).transformDirection(exit.matrixWorld)
  if (exitUp.y > 0.7071) newVel.y = Math.max(newVel.y, 3)     // scaled to metres
  if (newVel.length() > 10) newVel.setLength(10)

  body.position.copy(newOrigin)
  body.quaternion.copy(newQuat)
  body.velocity.copy(newVel)

  // cannon: teleport the body out of any contact it's currently in
  body.wakeUp()
}
```

### 13.7 Visual "slicing"

Give every straddling object two materials — or clone the mesh:

```js
// real object: clipped to THIS portal's plane (biased 0.3" toward the near side)
mesh.material.clippingPlanes = [nearClipPlane]
mesh.material.clipShadows = true

// ghost: same geometry, transformed through the portal, clipped to the LINKED plane
const ghost = mesh.clone()
ghost.material = mesh.material.clone()
ghost.material.clippingPlanes = [farClipPlane]
ghost.applyMatrix4(entryPortal.matrixThisToLinked)
```

For a skinned/boned object, transform `skeleton.boneMatrices` or just apply
`matrixThisToLinked` to the ghost's root and copy the pose — that's what
`C_PortalGhostRenderable::SetupBones()` does with `ConcatTransforms`.

Straddle test (Source's): entity centre within ~5 units in front of the plane, and the entity's bounding box
intersects the aperture quad. For the player use the *render/hitbox* bounds, not the physics AABB — Source
uses `EntityHitBoxExtentIsInPortalHole()` for exactly that reason.

### 13.8 Physics "slicing" with cannon

cannon has no shadow controllers or multiple worlds. Two workable options:

1. **Ghost bodies (closest to Source).** For each straddling body, create a second `CANNON.Body` in the same
   world, positioned by `matrixThisToLinked`, and drive it kinematically from the real one each step. Give it
   a collision filter mask so it only collides with geometry on the far side of the portal. Delete it when the
   body stops straddling.
2. **One world + a "holy wall".** Simpler: keep a single world, and add four thin box bodies around each
   portal aperture (Source's `PSPOST_HOLYWALL_TUBE`) so nothing slides through the wall beside the portal.
   Then teleport on centre-crossing. This is what most web ports do, and it's fine for a player + a few cubes.

Either way, add the aperture as a **collision hole**: the wall mesh must have an actual hole, or you split the
wall into four boxes around it.

---

## 14. Deltas vs your current `Game/world.js`

Structural differences between your implementation and Source's. Stated as differences, not verdicts — I
didn't run your code.

| Area | Your `world.js` | Source |
|---|---|---|
| Stencil increment | `stencilFunc(NOTEQUAL, level)` + `stencilOp(INCR, KEEP, KEEP)` — INCR on **fail** | `stencilFunc(EQUAL, level)` + `stencilOp(KEEP, KEEP, INCR)` — INCR on **pass**, so the mask is depth-tested and occluded pixels get no hole |
| Depth clear | global: `depthFunc(ALWAYS)` then `renderer.clear(false, true, false)` | `ClearBuffersObeyStencil(false, true)` — depth cleared **only inside the hole** |
| Far-side clipping | oblique projection (Lengyel `q` vector) written into `projectionMatrix.elements[2,6,10,14]` | hardware user clip plane at the exit portal's plane, biased 0.5" back |
| View matrix | `srcToDst = inv(viewMat) * src.matrixWorld * RotY(π) * inv(dst.matrixWorld)`, then inverted | `thisToLinked = dstBasis * Rot180 * inv(srcBasis)`, applied to origin/quaternion/velocity separately |
| Recursion cap | `maxRecursion = 2`, hard return | `MIN(r_portal_stencil_depth, MIN(11, 2^stencilBits) - 1)`, plus a `remainingDepth` counter that drives the static overlay so the chain end looks intentional |
| Exit-portal skip | renders `[portal, portal.pair]` at depth | explicitly skips `pCurrentPortal == m_pRenderingViewExitPortal` |
| Culling | none | frustum cone through the portal + per-portal visibility test + PVS override from the exit portal's corners |
| Near-plane poke-through | not handled | render-fix mesh (§6) |
| Straddling objects | not handled | ghost renderables + render clip planes (§9a) |
| Depth restore after the hole | not done | `DrawPostStencilFixes()` — clear depth, redraw portal quad with Z-write, redraw fog |

---

## 15. Parity checklist

Copy these in order; each one is independently testable.

1. `matrixThisToLinked = dst * Rot180(up) * inv(src)`. Teleport a cube by hand and confirm orientation and
   velocity direction are right. (§3)
2. Stencil hole with depth-tested mask, INCR on pass, stencil value == recursion level. (§4)
3. Recursive render into the hole, **no clear**, exit portal skipped. (§4)
4. Clip plane at the exit portal's plane, biased 0.5" back. Put a cube halfway through and confirm you see
   both halves. (§4, §13.4)
5. `DrawPostStencilFixes`: clear depth in the hole, re-Z the portal quad. Walk up to a portal and confirm the
   wall behind doesn't show through. (§4, §6)
6. Render-fix mesh for near-plane poke-through. (§6)
7. Teleport on centre-crosses-plane + hole intersection, with the velocity hacks. (§8)
8. Frustum cone culling — watch the draw-call count drop. (§5)
9. Ghost renderables for straddling objects. (§9a)
10. Static overlay driven by `remainingViewDepth` so the end of the recursion chain fades rather than popping.
    (§12)
11. Physics ghosts or holy-wall tubes. (§13.8)
12. Placement: edge traces, `noportal` volumes, overlap rejection. (§11)

### Numbers to keep

```
portal half size          32 x 54 (Source units)
portal OBB depth          64 out the front
clip plane bias           0.5 behind the exit portal
real-entity clip bias     0.3
ghost clip bias           0.75
render-fix trigger dist   PORTAL_HALF_HEIGHT (54)
render-fix quad           80 x 80 at zNear + 0.05
render-fix bounding prism 12 side planes, aperture scaled 1.1x
render-fix forced depth   0.00001
polygon clip epsilon      0.01
min portal-view zNear     1.0
floor-exit min velocity   300 (player) / 50 (props)
max exit velocity         1000
max recursion             2 (default), hard ceiling 10
depth-doubler facing      dot(forward, otherForward) < -0.7071
water downgrade cutoffs   0.5% / 2% / 5% of screen
```
