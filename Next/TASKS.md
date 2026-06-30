# Stigespillet (Web) — Task backlog

The master to-do list. Check items off as they ship. Newest direction from Isak
is at the top of **Active**. When everything in Active is done, pull from Ideas.
See `LOG.md` for the running session history.

> Single source of truth lives in the DATA block of `index.html`. Tunables
> (chances, timings, distances) belong there, never as bare literals in logic.

---

## Active

### Animation polish (Isak's notes, 2026-06-24)
- [x] **Gun cutscene — rebuild to this exact vision (Isak, 2026-06-25).** Built +
      revised 2026-06-25 (tiny CSS revolver drawn on the shooter's own square, chamber
      spins without revealing the landed slot, fires at the leaders; blank /
      live-×3-knockdown / self-backfire). Tunables in the `GUN` DATA block.
      > ⚠ KEEP THIS DESCRIPTION FOREVER — do **not** delete it (even after it's built)
      > until Isak explicitly says so. It is the canonical spec for the gun cutscene.

      The **character pulls out a tiny revolver** (a real little gun, **not the 🔫 emoji**,
      **not** a big thing popping up in the centre of the screen). The **chamber spins** —
      but **don't reveal what it lands on**. Then it **tries firing generally towards those
      in the lead (that isn't itself)**. The hidden chamber decides what happens:
      - **Blank** → it just **clicks and twitches once**. Nothing happens.
      - **Live** → it **shoots three times**, **knocking them with a screen shake each**
        — but **no explosions**.
      - **Self** → you **just explode** as you try pulling the trigger.

      (Superseded earlier idea: a big centre-screen cylinder that showed the odds and
      revealed the landed chamber. Replaced per Isak's 2026-06-25 follow-up.)
- [x] **Leviathan cutscene — rebuild to this exact vision (Isak, 2026-06-25).** Built +
      reworked 2026-06-25 (serpent crosses → gulps in passing → exits → peeks back → rears
      → spits the player flying to the new tile). Tunables in the `LEVI` DATA block.
      > ⚠ KEEP THIS DESCRIPTION FOREVER — do **not** delete it even after the cutscene
      > is built. It is the canonical spec for how the leviathan should look.

      **Look (Isak, 2026-06-25 follow-up):** it must read **sideways / in profile** (a big
      open **maw**, **not** a round face smiling at the camera), with an **elegant tapering
      body**, and move **slowly** so it looks **majestic**.

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
- [x] **Lightning improved (2026-06-25).** Build-up now gathers clouds + rumble then
      distant pre-flickers; the bolt is a glow + bright core with branching forks that
      strikes several times in quick succession; the impact is an electric shockwave ring
      + sparks (replaced the old fiery `explode`). Tunables in the `LIGHTNING` DATA block.
      Still open to a precise art-direction pass from Isak if he wants one.

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

### 2026-06-30 — coordinate grid + ice spreads to neighbours (Isak request)
- [x] **Grid coordinate system** — single-source `cellRC`/`rcToCell`/`cellLabel`/
      `neighborCells`/`gridNear`; `cellCenter`+`tileBelow` refactored onto them (verified
      byte-identical for all 90 cells); A1…J9 badge rendered bottom-right of each tile.
      Completes the old `cellCenter()` coordinate-system TODO.
- [x] **Ice spreads to the 8 neighbours** — `spreadFreeze`: a newly-frozen player freezes
      anyone on the surrounding tiles (diagonals) + same tile; single ring, Shield blocks it.
      Reactive "moved next to a frozen player" check upgraded to real 8-way `gridNear`. The
      ice tile itself only freezes a direct landing (per Isak's clarification). `FREEZE.ADJ` = reach.

### 2026-06-26 — fish powers + secret square + smarter bots (Isak request batch)
- [x] **Bots vary their orange pick** — `BOT.ORANGE`/`ORANGE_WEIGHTS` reweighted to
      wheel:5 / gun:3 / support:2 so they no longer just spin the gun/roulette.
- [x] **Bot fishing odds by global catches** — new `FISH.BOT_LOSS_BY_CATCHES`
      `[.40,.60,.80,.90,.95]` keyed on `game.fishCaught` (total fish landed this game);
      first catch ~40% loss, escalating to 95%. (Removed the old streak-based `WIN_*`.)
- [x] **Secret square before tile 1** (`FEATURES.secretSquare`, `SECRET` DATA, viewBox
      widened left to `-96 0 1174 1040`). pos 0 + `p.onSecret`; not drawn until occupied
      (`showSecret`/`hideSecret`). Reached only via a backtrack below tile 1 — `setBackPos`
      routes lightning / pile-up knock-backs there instead of clamping to 1. `RULE_INFO.secret`.
- [x] **Fish powers** (`FEATURES.fishPowers`, tunables in `FISH`): +1 movement per 3 fish
      (`moveCurrent`); 2+ fish → ice escape on 3+ (`getupNeed`, used by HUD + `resolveGetUp`);
      2+ fish → 1-in-10 slip off a ladder (`applyLink`); 3+ fish + teleporter → shuffle
      everyone (`shuffleAllPositions`, `RULE_INFO.teleportshuffle`).
- [x] **Verified headless** — unit checks (setBackPos, getupNeed, shuffle multiset, bot-loss
      table, orange order, move-bonus formula) + targeted in-game paths (teleporter overload,
      fish-3 teleporter, secret-via-lightning) + 3 full autonomous games, **0 JS errors**;
      screenshot confirms the secret square reveals correctly.

### 2026-06-25
- [x] **Per-seat Player/Bot selection** — each setup row has a Player⇄Bot toggle, so a
      single game can mix humans and bots. `bot` flag on each roster/player; `game.autonomous`
      now tracks *the current seat* (set in `newGame` + `endTurn`), so a bot's turn auto-rolls
      while a human's waits for input. The *Autonomous mode* checkbox = "make every seat a bot."
      Bot seats marked 🤖 in the scoreboard. Verified headless: humans wait, bots self-roll,
      all-bot game finishes with a winner, 0 JS errors.

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
- Bots / smarter autonomous opponents. *(Started 2026-06-25: bots now take teleporter
  swaps only when beneficial and favour gun/wheel over altruistic support — `BOT` DATA
  block. Could go further: gun/wheel choice by position, dice/fishing strategy, etc.)*
- More variant rules from the design ladder (special squares, minigames).
- Sound polish, nicer token art.

## Known risks / watch-outs
- No JS runtime locally (no node) → can't auto-syntax-check; edit carefully.
- Cascading passive triggers must have a depth cap (ladder↔chute↔teleport loops).
- The "RANDOM" wheel slot can fire heavy effects (nuke); that's intended.
