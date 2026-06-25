# Session log

Newest first. One entry per working session; note what shipped and what's next.

---

## 2026-06-25 (hourly loop #1) — integrity pass + lightning polish

Autonomous "improve the game / fix integrity" tick.
- **Integrity:** clean page load (0 JS errors) and a **full autonomous 4-player game played
  to a winner with 0 errors** (headless, rAF→setTimeout under virtual time). Nothing to fix.
- **Lightning polish** (was the top open Active item): rebuilt `lightningFx` — clouds
  gather + rumble → **distant pre-flickers** for tension → a **forked bolt** (soft glow +
  bright white core + branches) that **strikes several times** in quick succession → an
  **electric impact** (shockwave ring + sparks). Dropped the old fiery `explode` on the
  victim (didn't fit lightning). New tunables in the `LIGHTNING` DATA block
  (`GATHER_MS/FLICKERS/STRIKES/FORKS/SPARKS`). Verified headless: runs clean, 0 DOM leaks;
  screenshot shows the gathered storm + glowing forked bolt.

## 2026-06-25 (evening) — leviathan reworked (SVG profile dragon) + tiny-revolver gun

Isak's feedback on the two new cutscenes:

**Leviathan** — didn't look good; wanted it **sideways (profile)** with a **large maw**
and an **elegant body**, and **much slower / majestic** (not a round face smiling at the
camera). Rebuilt it as an **SVG overlay**: the body is now a **tapering ribbon** through a
travelling-sine spine (smooth head→tail taper), and the head is a **side-profile dragon**
with a hinged **maw that opens to gulp**, one eye, a swept horn and a whisker. Slowed the
glide to ~5.4 s and lowered/lengthened the wave for grace. Verified headless: runs clean,
token lands + restores, 0 leaks; screenshots show the profile head, the dip-and-gulp, the
rear-up and the spit.

**Gun** — the 🔫 emoji "doesn't look like a gun" and shouldn't pop up centre-screen;
wanted the **character to pull out a tiny revolver** and to **spin the chamber without
revealing what it lands on**. Replaced the big centre cylinder + emoji with a **small CSS
revolver** (barrel + 6-hole spinning cylinder + grip) drawn **on the shooter's own square**,
aimed at the leaders. The chamber **spins and stops with no reveal**; the hidden outcome
still resolves blank / live-×3-knockdown / self-backfire. Muzzle flash is now a CSS burst
(no emoji). Verified headless: blank/live/self all correct, 0 errors, 0 leaks; a zoomed
screenshot confirms it reads as a revolver.

## 2026-06-25 (later) — gun cutscene rebuilt (revolver roulette) + sniper de-explosioned

Rebuilt the gun set-piece to Isak's spec (kept in `TASKS.md`):
- Open the **6-chamber cylinder** so you **see the odds** (brass = live round, skull =
  self, dark hole = blank), **spin** it (lands a random chamber under the top notch),
  **flip it shut**, then draw a little **metal gun** aimed at the leaders. The landed
  chamber decides:
  - **blank** → a dud: one click + a single twitch, nothing happens.
  - **live** → **three shots**, knocking the leaders down with a **screen-shake each**,
    and crucially **no explosions** (replaced the old impact booms with shake + collapse).
  - **self** → the trigger backfires and the **shooter explodes** (the only gun explosion
    left).
- All tunables (chamber `LAYOUT`/odds, shot count, spin turns, every beat length) live in
  a new **`GUN` DATA block**. Factored shared `aimMark` + `gunShot` helpers; `gunFx`
  (the RANDOM "picked off" shot) no longer explodes either.
- **Sniper fix:** sniper hits no longer `explode()` — now a thud + screen shake + the
  target collapses, matching "no explosions for those it hits".

Verified in **headless Chrome** (rAF→setTimeout under virtual time): drove all three
chambers — blank downs no one, live downs exactly the three leaders, self downs only the
shooter — plus a sniper hit (target downed, no explosion). **0 JS errors, 0 DOM leaks.**
Screenshots confirmed the odds-cylinder and the metal gun firing with crosshairs/tracers.

## 2026-06-25 — leviathan cutscene rebuilt (blue Chinese-dragon serpent)

Replaced the old placeholder leviathan (gloom + water + tentacles + 🐙 + token dunk)
with the serpent Isak specced in `TASKS.md`:
- A **blue serpentine Chinese-dragon** — a tapering chain of segments following a
  travelling sine wave — **undulates across the screen**. As the head passes the
  victim's column it **dips to gulp them** (casual, opportunistic), then **exits the far
  side**. The head then **peeks back in from the edge, rears up, and spits the victim
  flying** on an arc to their new tile; the real token lands there and `resolveLanding`
  fires as before.
- All tunables (segment count/spacing/taper, wave amplitude/length, slither speed, every
  phase duration, spit arc/spin) live in a new **`LEVI` DATA block** — no magic numbers
  in the animation logic.
- `leviathanFx(fromCell, toCell, victim)` now takes the destination, so `runFishing`
  picks the spit tile first and the cutscene delivers the player there.
- Pure-JS rAF tween driver (`leviTween`); no new dependencies. CSS for the serpent
  segments/head (eyes, horns, whiskers) and the spat-out flier.

Verified in **headless Chrome** (rAF→setTimeout under virtual time): the full cutscene
runs with **0 JS errors**, the token's opacity is restored and it lands on the
destination tile, and **no DOM elements leak**. Screenshots confirmed the serpent shape,
the head rearing back in, and the player arcing out. Temp harness/screenshots deleted.

Still worth a human eyeball in the browser for *feel* (pacing/looks).

## 2026-06-24 (later) — verification + launcher + wheel fixes

Isak couldn't open the game by double-clicking `index.html`. Diagnosed + verified
the whole game using **headless Chrome** (`--dump-dom`, fast-timer harness):
- The page loads and the startup script runs with **no JS errors** — double-click
  failure was just the Windows `.html` file association, not the game.
- Added **`Play game.cmd`** — a one-click launcher (Edge→Chrome→default fallback).
- Drove **every new effect** (wheel incl. RANDOM, lightning/star/fate/gun/support,
  12 random-effects, and all four knock-onto-tile cascades): **0 errors**.
- Ran a **full autonomous game to completion**: winner reached tile 90, 0 errors.

Fixed two real bugs found during verification:
- The global `svg{ width:min(94vh,1030px) }` board rule was also sizing the **wheel
  SVG to ~795px** (overflowing its 240px box) — almost certainly the original
  "arrow not accurate" cause. Scoped it to `#board`; wheel is back to 240px.
- Made the wheel rotate about its true centre (`transform-box:fill-box;
  transform-origin:center`). Geometry test: all 6 slots now land centred under the
  pointer (≤2px off). Removed the dead `.wheelpointer` CSS.

Test harness files (`__test.html`, `__inject.html`) were temporary and deleted.

## 2026-06-24 — autonomous effects/wheel/fishing build

Isak asked me to write down the backlog (see `TASKS.md`) then work autonomously
through it without supervision until the token limit. Scope: explosions follow
the target, lightning/star/nuke/gun/leviathan animations, a 6th "RANDOM" wheel
slot + pointer fix, swap/star/lightning made 3× rarer, fishing easier+longer,
and passive tile activation when players are knocked around (off-turn too).

No local JS runtime (node missing), so changes are hand-verified + brace-checked.

Progress is tracked by the checkboxes in `TASKS.md`. Commits are pushed to
`main` after each working chunk (GitHub Pages serves from main, repo is private).

### Shipped this session (3 commits, all pushed to main)
1. **Explosions follow target + passive tile activation + 3× rarer events.**
   `explode(cell)`/`cellToScreen()`; `resolveLanding()` makes ladders/chutes/ice/
   teleporters fire when a player is knocked/moved onto them off-turn (depth-capped);
   lightning/star/swap chances ÷ 3.
2. **Animations + wheel + fishing.** Lightning (clouds/rumble/bolt+crack), lucky star
   (~4s carry), nuke set-piece (siren→5s→3s drop→blast→4s white-out), gun + leviathan
   visuals at the target tile, wheel RANDOM 6th slot + SVG-baked accurate pointer,
   fishing made easier/longer.
3. **Docs.** TASKS.md/LOG.md updated.

### Verify next session (IMPORTANT — not yet play-tested)
No local JS runtime here, so this was hand-written + brace-balanced only. Open
`index.html` in a browser and check:
- Wheel: all 6 slots land exactly under the pointer; RANDOM fires varied effects.
- Lightning/star/nuke/gun/leviathan all read well and target the right tile.
- Knock-around triggers: get someone bumped onto a ladder/chute/ice/teleporter on
  another player's turn and confirm it activates (and that nothing loops/freezes).
- Nuke timing feels right (~5s siren, ~3s drop, ~4s white-out).
- Fishing feels a little easier + longer.

### Next when resumed
- Do the play-test above; fix anything off. Then pull from Ideas in `TASKS.md`.
