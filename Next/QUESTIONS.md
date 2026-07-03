# Questions for Isak

Standing file: autonomous sessions log clarifications here instead of stopping to ask.
Answer whenever — each answer gets folded in and the question checked off.

## 2026-07-03 — the 11-point batch

- [ ] **Coin pop scope** — the ping + 🪙 pop now plays for EVERY coin gain (blue 3,
  yellow 1, rolled-6 bonus), not just 3-coin blue tiles. Want it blue-only?
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
