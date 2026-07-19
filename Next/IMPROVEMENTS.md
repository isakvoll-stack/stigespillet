# Intuition & clarity audit — improvements list (2026-07-17)

> **2026-07-18 — first batch BUILT** (Isak: "keep on working"): **A1** 📖
> Discovered-rules journal (button under Inventory; this-game discoveries in
> order, vague text; title-screen version waits for A2 persistence) + **B2**
> growing legend (a colour swatch + name per discovered tile rule, gated on
> `rulesSeen` — B4 respected automatically: trap 89 only shows once sprung).
>
> **2026-07-19 — B1 + B4 BUILT.** Discovered rules now also mark their squares:
> a small faint corner glyph (the card's emoji) on every tile of a rule whose
> card you've seen, from one generic pass over `TILE_RULES` (`paintTileMarks`,
> tunables in `TILE_MARK`). It's repainted through a debounced `queueTileMarks`
> hooked into `repaintCell`/`renderLegend`/`buildBoard`, so scrambles, pop-up
> tiles growing in, nuke fallout and fresh discoveries all stay in sync, and it
> skips the boss arena. **B4 is now an explicit `noMark:true` on the trap89
> registry entry** rather than an accident of ordering — tile 89 never wears a
> glyph, because being indistinguishable IS that rule.
>
> **2026-07-19 — F1 + F2 BUILT.** Every mode now introduces itself once per
> sitting in the same card voice as everything else (`MODE_INTRO` DATA table —
> goal / how you score / how it ends — shown by `maybeModeIntro` from the new
> `beginGame` start path, which covers a fresh game, "Play again" and every tour
> leg). KOTH, Mayhem and the Grand Tour have entries; Classic needs none and
> Boss Battle keeps its richer per-boss card. Replaying the same mode stays
> quiet (`modeIntroSeen`, per page load — a reminder for the table, not a nag;
> see QUESTIONS if you'd rather it were once-ever or every game). **F2**: a
> permanent telegraph key under the boss HP bar — *🟥 strikes next turn ·
> 🟨 charging something big*.
>
> Everything else below is still open — pick by number as before.
> Next in the suggested order: **C2 + G2** (status badges on a STATUS registry).

Isak's brief: the joy of the game is discovering arbitrary rules ONE AT A
TIME — that surprise must not drown in confusion. This is a written audit of
the whole game against that goal. **Nothing here is implemented** — pick
items by number ("build A1+B2") and they become a batch.

Guiding principle used throughout: **mystery before discovery, clarity
after.** Never explain a rule the player hasn't met; never make them
re-guess one they have.

---

## A. The discovery loop itself (Rule+ cards)

- **A1 — Rule journal.** A revealed card vanishes forever; if you forget
  what the teal square does, the game never tells you again. Add a
  **📖 Discovered rules** book (button by the Inventory + on the title
  screen): every revealed card, in discovery order, same vague text.
  Only what you've found — zero spoilers, total recall. (`rulesSeen` +
  `RULE_INFO` already hold everything needed.)
- **A2 — Remember discoveries per browser.** `rulesSeen` resets every game,
  so veterans get every card again each game — which dulls the reveals that
  ARE new. Persist to localStorage (like settings), with a Settings button
  "🔄 Forget all discoveries" for a fresh-eyes night.
- **A3 — Toast tier for repeats.** Full-screen card the FIRST time ever;
  on later triggers a small 1.5s corner toast ("🌀 Teleporter") as a
  reminder. Keeps pacing snappy while still labelling what just happened.
- **A4 — Card before consequence, always.** Audit every `revealRuleOnce`
  call site: the card should interrupt BEFORE the effect animates (a few
  fire after the chaos has already played out). The card is the answer to
  "what was THAT" — it must land first.
- **A5 — Tease the depth.** Cards are numbered "Rule+ #7"; add a subtitle
  like "the board keeps its secrets" — hints there are more without saying
  how many. Fuels the collecting instinct.
- **A6 — Rule families.** Teleporter has three separate cards (teleport /
  overload / malfunction). Title them "Teleporter", "Teleporter II", … so
  they read as one rule deepening, not random extra noise.

## B. The board's visual language

- **B1 — Post-discovery tile marks.** Before a rule is discovered its tiles
  are pure mystery colour (keep!). AFTER the card is revealed, its tiles
  gain a small faint corner glyph (the card's emoji). One generic RENDER
  pass over `TILE_RULES`; instantly answers "which square was the gray one
  again?" without ever spoiling an unmet rule.
- **B2 — Legend that grows with you.** The legend card lists only
  Ladder/Chute. Add one swatch+name row per DISCOVERED rule (same
  `rulesSeen` gate). The legend becomes a trophy shelf of what you've
  uncovered — reinforces the collection feeling AND cures colour amnesia.
- **B3 — The four blues.** Light-blue pays coins, dark-blue is fishing,
  teal teleports, pale-ice freezes. After B1/B2 they're learnable, but
  consider nudging hues apart (or giving teleport a subtle pattern) for
  at-a-glance and colour-blind reading.
- **B4 — Trap 89 stays disguised.** It's yellow ON PURPOSE — exempt it from
  B1 until sprung once (bots already learn it via `rulesSeen.trapdoor`;
  humans deserve the same memory).
- **B5 — Coin tiles join the economy visually.** Once the Shop card is
  revealed, blue plain tiles could show a faint 🪙 — connects board → purse
  → shelf into one visible loop (extends the new shop hint box).

## C. Moment-to-moment feedback (log, HUD, statuses)

- **C1 — Log rounds & colours.** The log is one undifferentiated white
  stream; in bot games it floods. Insert a "— Round 4 —" divider each
  round and tint by category via the existing `cls` param (coins gold,
  damage red, rule reveals purple, movement default). Skimmable history.
- **C2 — Named status badges for the current player.** Today "why did my
  piece walk BACKWARDS?" is answered by one 😵‍💫 emoji buried in the
  scoreboard. Under the turn line, show worded badges for the player to
  move ("😵‍💫 Dizzy — next roll walks backwards"); click → its rule card.
  Driven by a STATUS registry table (see G3).
- **C3 — Scoreboard emoji overflow.** Items + curses + fish + radiation +
  … can become a 12-glyph ribbon per row. Cap at ~4 with "+3", full list
  on click. Rows stay readable at a glance.
- **C4 — One toast for big moments.** Sniper, lightning, reversal etc. live
  mostly in the log; the table should gasp together. A single shared
  center-screen flash helper ("🌩️ Lightning finds the leader!") — the
  CHEATER! shout already proves the pattern; generalize it.
- **C5 — Show the destination early.** On roll, briefly highlight the
  landing square before the token walks — eyes know where to look, and
  ladder/snake surprises still play out on arrival.

## D. Choices & overlays — one consistent system

- **D1 — One choice bar.** Bounce/kick, teleport Y/N and orange W/S/G are
  three hand-written HTML bars with three resolver globals. Replace with
  one generic bar built from data `{text, options:[{ico,label,key}]}` —
  consistent look, consistent keyboard hints, and every future choice is
  one data entry.
- **D2 — Overlay stack.** reveal / picker / inventory / banner / bonus
  card / fishing each manage their own `.show` plus a branch in the big
  keydown chain. A small overlay-stack manager (top layer owns keys,
  uniform dismiss policy) prevents click-through bugs and shrinks the
  keydown if-chain.
- **D3 — Same dismiss language everywhere.** Every popup should accept the
  same keys and SAY so ("Press Enter to continue" style, like the reveal
  card already does).

## E. Menus & onboarding

- **E1 — Group the Settings screen.** It currently mixes rules variants,
  bot behaviour, looks and volume in one flat list. Three tiny headers:
  *Game* (Family, Manual), *Table* (bot popups, fast-forward, volume),
  *Looks* (RGB, theme) — plus 🔓 Full experience at the bottom.
- **E2 — "Applies to new games" once.** Family and Manual each carry the
  parenthetical; say it once as a caption under the *Game* group.
- **E3 — One vague line per Advanced group.** "🕯️ Black market — things
  best bought in the dark." Orients without spoiling contents.
- **E4 — Unlock flourish.** The first time 🔓 Full experience is switched
  on, a small card: "The cabin has more rooms than it lets on…" — makes the
  unlock itself a discovery beat.

## F. Modes presented consistently

- **F1 — Mode intro cards (reuse the boss card!).** Boss Battle now opens
  with who/gimmick/how-you-lose. KOTH, Mayhem and the Grand Tour deserve the
  same: first-ever play of a mode → one card (goal / how to score / how it
  ends). KOTH needs it most — trophy sources are invisible until they fire.
- **F2 — Boss telegraph legend line.** Under the HP bar, ambient text:
  "🟥 strikes next turn · 🟨 charging". The intro card explains once; this
  keeps it explained.
- **F3 — Tour leg twists as cards.** Between legs, present the drawn twist
  in the same card visual as everything else — one voice for "here is a new
  rule of reality".

## G. Under the hood (structural soundness)

- **G1 — One registry entry per rule.** A rule currently touches FEATURES +
  its DATA block + TILE_RULES/RARE_EVENTS + RULE_INFO + RULES.md. Fold the
  card text, legend label and B1 glyph INTO the rule's registry entry so
  one rule = one object (plus RULES.md prose). Kills drift between the
  five places; A1/B1/B2 all read straight from it.
- **G2 — STATUS registry.** `renderScoreboard` hand-concatenates ~12
  status emojis in one expression. A table `{when(p), ico, label, cardKey}`
  drives the scoreboard marks AND the C2 badges — add a status once, it
  shows everywhere.
- **G3 — Keydown chain → overlay stack** (same work as D2).
- **G4 — TXT coverage decision.** Half the player-facing strings live in
  `TXT`, half are inline English in `log()` calls. Either route all through
  TXT (mechanical, enables a Norwegian pass) or officially decide the game
  is English — currently it's neither.
- **G5 — Sanity audit pass.** Check every RULE_INFO key has a live trigger
  and every feature flag has a card; orphans on either side are latent
  confusion (a rule that fires with no card = exactly the bad experience
  this file exists to prevent).

## H. Suggested order (Claude's pick)

1. **A1 + B2** — journal + growing legend (same data, biggest confusion
   cut, zero spoiler cost)
2. **B1** — post-discovery tile marks (+B4 exemption)
3. **F1** — mode intro cards, KOTH first
4. **C2 + G2** — status badges on a registry
5. **A2 + A3** — remembered discoveries + toast tier
6. **C1** — log rounds & colours
7. **D1 + D2** — choice/overlay unification (structural enabler)
8. **G1** — registry merge, done opportunistically while touching rules

Everything above preserves the one-at-a-time surprise: nothing is explained
before it's met; everything stays explained after.
