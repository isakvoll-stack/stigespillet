# Stigespillet (Web) — Task backlog

The master to-do list. Check items off as they ship. Newest direction from Isak
is at the top of **Active**. When everything in Active is done, pull from Ideas.
See `LOG.md` for the running session history.

> Single source of truth lives in the DATA block of `index.html`. Tunables
> (chances, timings, distances) belong there, never as bare literals in logic.

---

## Active

### Animation polish (Isak's notes, 2026-06-24)
- [ ] **Gun cutscene needs a LOT of work.** The revolver + muzzle-flash + boom is
      placeholder-tier. Wants a proper sequence (draw/aim/cock/fire, real recoil,
      bullet/impact, reaction on the victims) — rethink, don't just tweak.
- [ ] **Leviathan cutscene — rebuild to this exact vision (Isak, 2026-06-25).**
      > ⚠ KEEP THIS DESCRIPTION FOREVER — do **not** delete it even after the cutscene
      > is built. It is the canonical spec for how the leviathan should look.

      A **blue serpentine leviathan** — long snake-like body, styled like a **Chinese
      dragon** — flies/undulates **across the screen**. As it passes the targeted
      player it **swallows them**, and then **exits off the other side of the screen**.
      The feel: the leviathan didn't come *for* the player — it just happened to be
      passing, the player happened to be in its way, and it **took the chance** (casual,
      opportunistic gulp on the way through).

      Then, once it's gone, it **peeks its head back in** from the edge, **rears up**,
      and **spits the player back out** — the player goes **flying** to the new square
      they're sent to (the spit-out tile). Land them there, then the usual
      `resolveLanding` on the new tile.

      (Current placeholder = gloom + water + tentacles + 🐙 + token dunk. Replace it.)
- [ ] **Lightning needs some work.** Decent base (clouds/rumble/bolt/crack) but not
      there yet — improve the storm build-up, the bolt itself, and the impact.

### Other
- [x] **Wheel reworked (2026-06-24)** — removed the "nothing" slot (now 5 slots); RANDOM
      is a distinct magenta. RANDOM effects now all target the spinner ("you"): lightning
      hits you, the star carries you, the swap trades you with the leader or trailer,
      plus a "you get picked off" down. Pointer still accurate; verified headless, 0 errors.
- [x] **Teleport chain bug fixed (2026-06-24)** — choosing to teleport no longer makes
      the swapped-in player re-teleport off the teal tile (and so on). A swap now does
      exactly one swap; `resolveLanding(..., skipTeleport)` stops the cascade. Verified.

---

## Done

### 2026-06-24 autonomous build
- [x] **Explosions follow the target** — `explode(cell)` + `cellToScreen()`; centred on
      the victim's tile (where they stood before being moved). All call sites updated.
- [x] **Lightning animation** — clouds roll in, rumble, jagged bolt + crack on the
      leader's tile, then the knock-back.
- [x] **Lucky star animation (~4s)** — star flies in, scoops the trailing player,
      carries them to the destination tile with a sparkle trail.
- [x] **Nuke sequence** — air-raid siren → ~5s → ~3s descent → giant blast → 4s
      white-out → board revealed.
- [x] **Gun animation** — revolver draws/cocks, muzzle flash + explosion on each victim.
- [x] **Leviathan animation** — waves + sea-monster rise at the player's tile on a miss.
- [x] **Wheel RANDOM slot (6th)** — fires any effect in the game (wheel outcomes, gun,
      support, lightning, gain-fish, freeze, star, swap, random teleport).
- [x] **Wheel pointer accuracy** — pointer baked into the SVG; spin math generalised to
      N slots so it lands exactly under the pointer.
- [x] **Swap / star / lightning ~3× rarer** — per-turn chances ÷ 3 in the DATA block.
- [x] **Fishing easier + longer** — bigger zone, calmer fish, gentler drain, slower fill.
- [x] **Passive tile activation** — `resolveLanding()`: ladders/chutes/ice/teleporters
      fire when a player is moved onto them off-turn (kick, pile-up, swap, teleport,
      lightning, star, wheel/support). Fishing + orange stay manual. Depth-capped (6).

### Earlier
- [x] Project privacy pass (repo→private, username de-hardcoded, no-reply commit email).
- [x] `CLAUDE.md` collaboration guide created (layering + commit/push-at-session-end).

### 2026-06-24 verification + fixes
- [x] **Verified via headless Chrome** — page loads with no JS errors; every new
      effect path runs clean; a full autonomous game completes with a winner, 0 errors.
- [x] **`Play game.cmd` launcher** — fixes the "can't open by double-click" problem.
- [x] **Wheel size bug fixed** — a global `svg{}` rule was blowing the wheel up to
      ~795px (the real cause of the inaccurate-arrow feeling); scoped to `#board`.
- [x] **Wheel rotates about true centre** — `transform-box:fill-box`; all 6 slots
      land centred under the pointer (geometry-tested). Dead `.wheelpointer` CSS removed.

> Still worth a human eyeball in the browser for *feel* (animation pacing/looks),
> but correctness is now machine-verified.

## Ideas / later
- Optional PNG board skin to match the classic photo.
- Bots / smarter autonomous opponents.
- More variant rules from the design ladder (special squares, minigames).
- Sound polish, nicer token art.

## Known risks / watch-outs
- No JS runtime locally (no node) → can't auto-syntax-check; edit carefully.
- Cascading passive triggers must have a depth cap (ladder↔chute↔teleport loops).
- The "RANDOM" wheel slot can fire heavy effects (nuke); that's intended.
