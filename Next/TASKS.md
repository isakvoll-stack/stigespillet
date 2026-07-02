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
### 2026-07-02 — sniper-shield fix + tile-89 trapdoor (Isak)
- [x] Sniper hits now go through `downPlayer` — an ARMED shield blocks the shot
      (was setting `.downed` directly, bypassing the shield).
- [x] NEW: tile-89 trapdoor (`FEATURES.trapdoor`, registry rule `trap89`): disguised as
      plain yellow; FIRST landing = dramatic arc-plunge back to tile 1, then the tile is
      normal for the rest of the game (re-armed each newGame; fallout also cleared now).
- [x] Smoke 7/7, 0 errors.

### 2026-07-02 — shield is now tactical + blue tiles pay 3 (Isak)
- [x] Shield no longer guards from the bag: USE it from the inventory to arm it
      (`p.shieldOn`, bubble shows only when armed, blocks once). Bots arm theirs.
- [x] Plain BLUE tiles award 3 coins (yellow still 1); `COIN.PLAIN/BLUE`, `awardCoin(p,r,n)`.
- [x] Smoke 7/7, 0 errors.

### 2026-07-02 — lightning clouds, nuke rework, radioactive fallout rule, freeze fix (Isak)
- [x] **Lightning v3** (`CUTS.lightning:3`): clouds roll in from BOTH sides at the top, meet
      in the middle, sky darkens slowly; the strike itself unchanged.
- [x] **Nuke v3** (`CUTS.nuke:3`, timings kept): drawn nose-down warhead (fins + hazard band
      + trefoil) replaces 💣; slow rise-and-fall air-raid wail (`SFX.airraid`); fireball
      blooms then is swallowed by the white; flashbang ear-ring (`SFX.earring`) with the
      white void; knockdowns land BEHIND the white (via `nukeSequence(onWhiteout)`).
- [x] **NEW RULE: Radioactive fallout** (`FEATURES.radioactive`, first rule built via the
      registry recipe): each nuke converts 2 plain tiles to radioactive green (`RAD_TILES`,
      dynamic); landing infects: −1/turn stacking to −5 over 5 turns, then +1/turn back to 0,
      then cured + permanent +1 (immune). Re-exposure resets recovery to −5. Roll ≤ sickness
      = too weak to move. ☢️ badge in scoreboard. `MOVE_BONUSES` now supports negatives.
- [x] **Freeze fix (Isak)**: freezing NO LONGER spreads to players already standing nearby
      (`spreadFreeze` removed); you only freeze by LANDING on/next to a frozen player.
- [x] Verified: 13/13 targeted (freeze bystander safe, fallout paint/infect/curve/immunity,
      too-weak turn, re-exposure, v3 cutscenes clean) + suite 25/25.

### 2026-07-02 — radiation walks you backwards + wheel gets twin dice (Isak)
- [x] **Radioactive rework**: roll + debuff < 0 now hops you BACKWARDS that many tiles
      (`walkBackPath` in ENGINE, normal landing rules apply, floor at tile 1); exactly 0
      is still "too weak to move".
- [x] **Wheel**: both random slots now show 🎲 (the 🎯 dart board is gone); logs updated.
- [x] Confirmed the 🌀 tile-shuffle slot IS reachable (uniform 1/7 pick); fixed the stale
      "1/6" comment.

### 2026-07-02 — leviathan: V3 rejected (Isak: old is much better), V4 from-scratch redo
- [x] Live game reverted to the ORIGINAL leviathan (`CUTS.leviathan:1`).
- [x] V4 built from scratch, no code shared with V1/V3: body = scale-banded segment chain
      following the head's real swim trail; damped-spring steering (cruise sway, swoop to
      the gulp, S-curl rear-up); fresh head (mane/horn/whisker/jaw). Tunables `LEVI4`.
- [x] Preview can force a version: `#preview=leviathan4` (digit = CUTS version). Suite 25/25.

### 2026-07-02 — leviathan V3 redo + cutscene preview mode (Isak)
- [x] Leviathan V3 (`CUTS.leviathan:3`): dorsal fins + spine ridge rebuilt per frame from
      the same spine, faint second ripple in the glide, blink at the gulp. `2` = splash
      polish, `1` = original — flip back if V3 is worse. Spec choreography untouched.
- [x] Preview mode: open `index.html#preview=leviathan` (or lightning|star|nuke|gun) to
      watch a cutscene without playing; SPACE/click replays. Suite 25/25.
- [ ] ⚠ Isak has given precise visions for lightning/star/nuke that were LOST — re-capture
      them verbatim (KEEP FOREVER) next time he dictates them.

### 2026-07-02 — cutscene polish pass, individually revertible (Isak)
- [x] New `CUTS` DATA block: per-cutscene version switch (`{gun, leviathan, lightning, star, nuke}`,
      2 = polished, 1 = previous look) — flip any single one back if it feels worse.
- [x] Gun: no longer turns upside down aiming left (`gunPose` mirrors vertically past 90°);
      muzzle smoke puff per shot. Lightning: fading scorch mark + bolt afterglow fade-out.
      Star: drawn spinning gold star (not emoji) + landing shimmer ring. Nuke: bomb sways
      falling, blast shockwave ring, ash drifts down after the white-out. Leviathan: fades in,
      water spray at the gulp and the crash-landing.
- [x] Verified: all five fire clean in BOTH versions + gunPose flip check + suite 25/25.
      Harness note: gunFx waits on CSS animationend — dispatch it manually under virtual time.

### 2026-07-02 — movement feel pass (Isak)
- [x] Walking steps are hop arcs (`hopToken`: arc + landing squash, height `ANIM.HOP`);
      slides ride the drawn snake curve (`snakePoint` shared with `drawSlide`, ease-in).
      First move out of the START lane still glides. Suite 25/25, 0 errors.


### 2026-07-02 — shop shelf: 3 random items, one buy each per visit (Isak)
- [x] `shopStock()` draws `SHOP.STOCK` (3) random enabled items per visit; a per-visit
      `bought` set marks purchases "sold out" (disabled). Bots buy from the same shelf.
      Verified headless 5/5, 0 errors.

### 2026-07-02 — shop freeze fixed: catalog inlined (self-contained again) + error trap (Isak bug report)
- [x] Root cause: downloaded single-file copies lack `shop-items.js` → `SHOP_CATALOG`
      undefined on shop landing → turn chain dies → `busy` stuck. Catalog now inline
      (`SHOP_CATALOG` DATA block), `shop-items.js` deleted; `reportCrash` error trap logs
      `💥 Something broke: …` + releases `busy`. Verified: single-file + error-trap +
      full suite 25/25. (See LOG.md for details; harness note: stub rAF under virtual time.)

### 2026-07-02 — rules-engine refactor: registries for tiles / bonuses / rare events (Isak)
- [x] **`TILE_RULES` registry + `LANDING_ORDER`** — every special tile is one entry
      (`feature`, `tiles`, `color`, `onLand`/`offLand`, optional `matches`); a single
      generic `runTileRules(p, ctx)` replaces the duplicate if-chains in `moveCurrent`
      (on-turn) and `resolveLanding` (off-turn). Order per path is explicit
      (`LANDING_ORDER.turn` / `.offTurn` — freeze last on-turn, before teleport off-turn,
      exactly as before).
- [x] **Painting + plainness derive from the registry** — `cellColor` and `isPlainTile`
      read `TILE_RULES` via `specialTileColor`; `SPECIAL_TILES` dissolved into
      `FISH_COLOR`/`ORANGE_COLOR` DATA consts; `shuffleTiles` no longer re-syncs a
      colour map (it splices the tile arrays and everything follows).
- [x] **`MOVE_BONUSES` pipeline** — fish (+1 per 3), coffee (+4 one-shot, consumed),
      shoes (+1 passive) as entries; `moveBonusTotal(p)` sums them in `moveCurrent`.
- [x] **`RARE_EVENTS` table** — lightning / lucky star / fate swap; `startTurn` loops it.
- [x] **CLAUDE.md cookbook** — "Adding a new rule (the recipe)": DATA + handler +
      registry entry (+ FEATURES flag, RULE_INFO card, RULES.md note).
- [x] **Verified headless ×3 runs** — cellColor + isPlainTile byte-identical to the
      pre-refactor baseline for all 90 tiles; on/off-turn dispatch for all six tile rules
      (incl. feature-flag gating, skipTeleport guard, freeze-by-adjacency, interactive
      tiles inert off-turn); bonus math; 3 full autonomous 4-bot games to a winner.
      **25/25 checks per run, 0 JS errors.** No gameplay change intended.

### 2026-06-30 — inventory + items rework, coord labels off, encounter priority (Isak)
- [x] **Removed on-tile A1…J9 labels** — the coord *system* stays in code for
      programming; tiles no longer draw the grid label (1–90 number stays).
- [x] **Encounter before tile events** — `moveCurrent` resolves bounce/kick *before*
      fishing/teleport/orange/shop/setback/freeze, so hopping forward dodges an event
      tile and kicking lets you claim it. Plain landings unchanged.
- [x] **Inventory + items** — 🎒 Inventory button (use consumables before rolling);
      bag = 3 consumables + 1 passive (`INV`); items cost coins, bought at the gold shop.
      Coffee (4, +4 next roll), Shield (6, auto-block + blue bubble), Four-leaf Clover
      (10, guaranteed 6), Running Shoes (10, passive +1/roll, replaces old passive).
      `items[]`/`passive`/`rollBonus`/`forceSix` replace `shopItem`; catalog is data in
      `shop-items.js`, effects keyed by id. Bots buy + auto-use. **47/47 headless checks,
      0 JS errors.**

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
