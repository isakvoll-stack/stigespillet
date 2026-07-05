# Questions for Isak

Standing file: autonomous sessions log clarifications here instead of stopping to ask.
Answer whenever — each answer gets folded in and the question checked off.

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
- [ ] **No saving** — the toggles reset to "all enabled" every page reload (the game
  keeps zero saved state today). Want them remembered between sessions (localStorage —
  still one self-contained file, no sidecar)?

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
