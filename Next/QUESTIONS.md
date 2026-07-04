# Questions for Isak

Standing file: autonomous sessions log clarifications here instead of stopping to ask.
Answer whenever — each answer gets folded in and the question checked off.

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
- [ ] **Multi-kill voice** — uses the browser's built-in speech voice pitched way down
  ("gruff-ish"). A properly gruff COD-style voice needs a recorded audio asset, which
  breaks the one-file/no-sidecar rule unless embedded as base64 (~50–200 KB). Good
  enough, or embed a real voice clip?
- [ ] **Thieves' Gloves** — costs 8 (Shoes are 10); steals on both kick AND bounce, one
  coin from one victim. It also steals when you kick a man while he's down. Keep all that?
- [ ] **Item flourish timing** — the aura plays WHILE the effect applies (~1s,
  non-blocking). A true "hover first, THEN apply" needs the item flow made async — say
  the word if you want the pause.
- [ ] **Black market v1 scope** — dealer currently sells the NORMAL catalog (2 items) at
  dynamic prices; the powerful/delayed-cost exotics await the v2 design (TASKS.md).
  Also: bots can buy there too (cheapest affordable) — should they be locked out?
- [ ] **Graze definition** — "in the chute's path" = standing within `GRAZE.RADIUS`
  (40 px) of the straight line from chute head to tail. The drawn snake curves, so a
  token near a big bend might escape a hit the art implies. Strict-curve check instead?
- [ ] **Vague cards** — all 18 rule cards rewritten vague (why clear, details fuzzy);
  RULES.md keeps the full numbers. Confirm that split is what you meant.
