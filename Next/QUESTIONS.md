# Questions for Isak

Standing file: autonomous sessions log clarifications here instead of stopping to ask.
Answer whenever — each answer gets folded in and the question checked off.

## 2026-07-10 — from the 4-point batch (defaults picked, say if wrong)

- [ ] **Get-up on a 6 + the dealer** — standing up on the secret square with a 6
  opens the black market FIRST, then you still get your bonus roll. Felt right
  (deal done, then off you go); say if the roll should come first.
- [ ] **Balance sweep picks** — six player-count findings live in SUGGESTIONS.md
  ("2026-07-10 balance sweep", B1–B6) with proposed one-place fixes. B1 (rare-event
  density) and B3 (global fishing curves) are the ones I'd fix first. Pick what to
  build, or say "all of B1–B5".

## 2026-07-06 — from the King of the Hill build (defaults picked, say if wrong)

- [ ] **First-place trophy needs SOLE 1st** — you earn the trophy at the start of
  your turn only when you're strictly ahead of everyone; a tie for the lead pays
  nobody (same rule the 👑 Crown uses). Should a shared lead pay everyone tied?
- [ ] **Downed/frozen leaders still collect** — position is position: starting your
  turn in 1st pays even while lying down or frozen. Or should the trophy require
  standing?
- [ ] **Tie at the final whistle** — equal trophies is broken by who's furthest up
  the board (then it's just standings order). Prefer a shared win, or a sudden-death
  extra round?
- [ ] **Reaching 90 on a rolled 6** — you bank the 10 trophies, walk back to start,
  AND the 6 still gives another roll (from the start lane). Keep, or should a lap
  always end the turn?
- [ ] **Default rounds = 6 × players** (clamped 5–60): 5 players → 30, matching
  your "25–30 for a group of 5". Slider on the setup screen adjusts freely. Happy
  with the formula? (2 players → 12 might feel short.)
- [ ] **All chaos rules stay on in KOTH** — sniper, lightning, items, everything
  plays exactly as in Classic; only the goal changes. Anything you'd switch off in
  this mode? (Family mode will get its own rule pass with you.)
- [x] **Balance observation from a 40-round 4-bot test game**: laps landed in rounds
  22 and 27, final trophies 15/14/13/12 — holding the lead pays about as well as
  lapping. At 25–30 rounds a lap weighs relatively more. Feels right, or should
  the lap pay more than 10?
  **✔ Answered 2026-07-10: the opposite — Isak set the lap to 8 trophies
  (`KOTH.TROPHY_WIN:8`). Built.**

## 2026-07-06 — from the gold-rain + shop pass-by session (defaults picked, say if wrong)

- [ ] **Gold rain from the second-to-bottom row** — you specced "two rows down, and
  on the bottom row you're knocked over". One row up from the bottom, only ONE row
  of falling exists: today you fall that one row and stay upright. Should the
  short fall knock you over too (took the full weight, less distance)?
- [ ] **Bots browse on pass-by too** — every pass triggers the same shop for bots
  (their usual auto-shopping-spree), so they'll snack on items far more often now.
  Same rule for everyone felt fair; say if bots should only shop when they LAND.

## 2026-07-06 — from the 9-item + QoL batch (defaults picked, say if wrong)

- [ ] **"The QoL idea"** — you said to add *"the QoL idea"* (singular); the
  suggestions doc had five. I built the three concrete in-game ones: remembered
  settings (localStorage), the volume slider, and ⏩ fast-forward for bot turns.
  The **discovered-rules codex** and the **phone/touch pass** are still un-built —
  say the word if either of those was the one you meant.
- [ ] **Mystery Box contents** — consumables only today (a surprise passive would
  silently replace the one you're wearing, which felt too nasty for 3 coins).
  Want passives in the pool anyway?
- [ ] **Banana peel is visible** — the 🍌 sits on the tile for everyone to see
  (people land where they land, so it still catches plenty). Want it invisible to
  the other players instead (only the owner sees it)?
- [ ] **Mirror target** — a deflected hit goes to the **nearest standing rival**,
  not back at the attacker. Felt more chaotic/fun and always has a valid target.
  Prefer "reflect back at whoever fired"?
- [ ] **Loaded Dice curse bites get-up rolls too** — three 1s can keep you on the
  floor for three turns if you're downed while cursed. Intended cruelty, or should
  get-up rolls be exempt?
- [ ] **Monkey's Paw can't wish you onto tile 90** — a direct wish-to-win felt
  cheap (and the board-scramble hook would never matter). It CAN wish you onto 89…
  where the trapdoor may be waiting. OK?
- [ ] **Exotic prices are fixed** — the dealer's trailing-discount/visit-markup
  only flexes the 1 normal item on his shelf now; the 3 exotics cost what they
  say. Should exotics flex too?
- [ ] **Bots and the Paw** — bots never buy the Monkey's Paw (`ITEM_VALUE 0`) and
  only use a gifted one when their bag is full (they wish themselves just past the
  leader). Teach them to buy + wish properly?

## 2026-07-05 (evening) — from the scrambled-board build (defaults picked, say if wrong)

- [ ] **Scramble scope** — the scrambled start moves every special tile the wheel's 🌀
  shuffle moves (teleporters, orange, freeze, shops, fishing, setback). Ladders and
  snakes stay fixed (your standing rule), and the tile-89 trapdoor stays at 89. Want
  any of that different (e.g. ladders scrambled too as a separate toggle)?
- [ ] **Behaviour change to know about** — with the option OFF, every new game now
  resets the classic tile layout. Before, a mid-game 🌀 wheel shuffle silently carried
  over into "Play again". I treated that as a bug; shout if you liked it.

## 2026-07-05 — from the advanced-settings build (defaults picked, say if wrong)

- [ ] **Toggle scope** — disabling an item stops it appearing on the shop/black-market
  shelf from then on; items already sitting in a player's bag still work. If you
  reopen setup MID-game and untick something, that also takes effect immediately for
  the running game's future shop visits. Right call, or should toggles only apply to
  the next new game?
- [x] **No saving** — the toggles reset to "all enabled" every page reload (the game
  keeps zero saved state today). Want them remembered between sessions (localStorage —
  still one self-contained file, no sidecar)?
  **✔ Answered 2026-07-06 by Isak picking "the QoL idea": built — all toggles +
  volume + fast-forward persist via localStorage (`stigespillet.settings.v1`).**

## 2026-07-04 — from the 6-answer batch build

- [ ] **Voice-clip source** — the only TTS voice installed on this PC is Zira (female);
  the gruff clips are Zira pitched way down + distortion, which lands more "demonic
  announcer" than "COD soldier". If it's not gruff enough in-game, options: crank the
  distortion, or you record/download a real clip once and I embed it the same way.
  (There's also a Norwegian male voice, Jon — want a Norwegian-accented announcer?)
- [x] **Inventory during flourish** — using an item now closes the bag, plays the ~1s
  hover over your pawn, applies the effect, then reopens the bag so you can use more.
  Feels right, or should the bag stay closed after?
  **✔ Answered 2026-07-05: stay closed — using an item no longer auto-reopens the
  inventory. Built.**
- [ ] **Wandering setback edge case** — the shuffled dark-red square can land on tile 89
  (the disguised trapdoor's square). Both rules on one tile is rare and resolves by
  priority, but say the word if 89 should be off-limits to it.

## 2026-07-03 (later) — the 4-point batch

- [x] **Rolled-6 coin** — yellow tiles no longer pay, but **rolling a 6 still earns
  1 coin** (with the 🪙 pop). Keep that, or make coins 100% blue-tile-only?
  **✔ Answered 2026-07-04: both yellow and a rolled 6 pay 1 coin — but the 6 shows
  NOTHING, yellow is sound-only, and blue gets the big 3-pop/3-ping fanfare. Built.**
- [x] **"Into gunfire" support traps** — bot support-as-a-weapon targets rivals whose
  +5 lands on freeze / setback / fallout / a chute / the revealed trapdoor. Literal
  "into gunfire" (boosting someone into a sniper's line or into gun-target lead) isn't
  modelled — want that too?
  **✔ Answered 2026-07-04: ignore "into gunfire"; trap targeting removed entirely —
  support is a genuine random boost. Orange odds: wheel 4/7, support 2/7, gun 1/7. Built.**
- [x] **Sizes** — pawns ×1.18, over-head icons ×1.5 felt right headlessly; both are
  one number each in `TOKEN` (DATA) if you want them bigger/smaller.
  **✔ Answered 2026-07-04: pawns ×1.5, popups ×3. Built.**
- [x] **Bot popup pacing** — ~1.0s thinking + ~0.9s verdict per decision
  (`BOT.THINK_MS`/`DECIDE_MS`), and `FEATURES.botThoughts:false` turns them off
  entirely. Faster? Slower? Off for all-bot games?
  **✔ Answered 2026-07-04: a bit faster (0.7s/0.65s) + a Settings screen on the title
  menu (under Play) with a checkbox to turn the popups on/off. Built.**

## 2026-07-03 — the 11-point batch

- [x] **Coin pop scope** — the ping + 🪙 pop now plays for EVERY coin gain (blue 3,
  yellow 1, rolled-6 bonus), not just 3-coin blue tiles. Want it blue-only?
  **✔ Answered 2026-07-03: blue-only — built (yellow pays 0 now, no pop).**
- [x] **Multi-kill voice** — uses the browser's built-in speech voice pitched way down
  ("gruff-ish"). A properly gruff COD-style voice needs a recorded audio asset, which
  breaks the one-file/no-sidecar rule unless embedded as base64 (~50–200 KB). Good
  enough, or embed a real voice clip?
  **✔ Answered 2026-07-04: embed a clip; double kill retired (triple+ only); only
  players actually knocked standing→down count. Built (~60 KB embedded).**
- [x] **Thieves' Gloves** — costs 8 (Shoes are 10); steals on both kick AND bounce, one
  coin from one victim. It also steals when you kick a man while he's down. Keep all that?
  **✔ Answered 2026-07-04: cost 6 now, everything else kept. Built.**
- [x] **Item flourish timing** — the aura plays WHILE the effect applies (~1s,
  non-blocking). A true "hover first, THEN apply" needs the item flow made async — say
  the word if you want the pause.
  **✔ Answered 2026-07-04: do it — hover first, then apply. Built (async item flow).**
- [ ] **Black market v1 scope** — dealer currently sells the NORMAL catalog (2 items) at
  dynamic prices; the powerful/delayed-cost exotics await the v2 design (TASKS.md).
  Also: bots can buy there too (cheapest affordable) — should they be locked out?
  *(2026-07-04: Isak skipped this one for now — still open.)*
- [x] **Graze definition** — "in the chute's path" = standing within `GRAZE.RADIUS`
  (40 px) of the straight line from chute head to tail. The drawn snake curves, so a
  token near a big bend might escape a hit the art implies. Strict-curve check instead?
  **✔ Answered 2026-07-04: "if very easy" — it was (the curve is a pure function).
  Built: graze now measures distance to the drawn curve.**
- [x] **Vague cards** — all 18 rule cards rewritten vague (why clear, details fuzzy);
  RULES.md keeps the full numbers. Confirm that split is what you meant.
  **✔ Answered 2026-07-04: confirmed. Plus 3 new cards built: kickdown is now just
  "SHAME on you, SHAME on you...", a shame-catches-up card, and a mutant-immunity card.**
