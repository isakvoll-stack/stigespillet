# The Twist Direction — instructions to future Claude sessions

> **Origin (Isak, 2026-07-17):** *"I need the game to be this unexpected twist on the
> SS, but it does NOT achieve that yet. Deep dive, figure out how, write the
> instructions to yourself."* This doc is that deep dive + the build plan. Read it in
> full before building anything from it. It is a DIRECTION doc like `BOSS_DESIGN.md`
> — the canonical why/what; task checkboxes live in `TASKS.md`.

---

## 1. Diagnosis — why the game isn't a "twist" yet

The game has enormous content (20+ hidden rules, 25+ items, exotics, pacts, 5 modes)
but content volume is not a twist. A twist is a **recontextualization**: the player
holds a confident expectation, and the game breaks it in a way that snaps into a new
understanding. Measured against that, four honest problems:

1. **The surprise is spent in minutes, then plateaus.** Everything is live from turn
   1, so within 2–3 minutes (first shop, first orange square, first Rule+ card) the
   player's model updates once — *"ah, wacky chaos S&L"* — and never has to update
   again. Rule #14 lands the same as rule #4. There is no normalcy established, so
   there is nothing to subvert.
2. **Chaos density is flat.** Rare-event chances are constant %/turn from the first
   roll. The game has no arc — classic S&L's natural shape (calm middle, tense
   finish) is never harnessed. Uniform noise reads as a *style*, not a *twist*.
3. **The surprises are additive, not subversive.** Almost every rule operates inside
   the S&L frame: move more/less, knock down, coins. They subvert *balance*, never
   *premise*. The genuinely subversive seeds already in the game — the trapdoor
   (the board lies), the secret square (the board has places that don't exist), the
   gray warp (the board fights back), the leviathan (something lives under it), the
   Broken Gate (something is wrong behind the board) — are scattered, mutually
   unaware, and drowned in item noise. There's no coherent second identity being
   revealed.
4. **RNG owns the pacing.** Whether a first game is a mind-blower or a plain dice
   race is dice luck. The most important beats (the first crack, the first big
   reveal) are the ones least under control. The twist is above all a **first-play
   phenomenon**, and nothing protects the first play.

**Thesis: keep all the content — change WHEN and WHY it appears, and give the
strangeness one identity.** Nothing gets thrown away; the existing chaos becomes the
*middle* of an arc instead of the whole game.

---

## 2. The design — three pillars

### Pillar A — The Innocent Opening
The game must open convincingly as the game everyone remembers. Plain board, dice,
ladders, snakes, polite boardgame-manual tone. No shops, no items, no orange, no
coins visible, nothing. Slightly *too* tidy and nostalgic on purpose. Players must
have time (a few rounds) to settle into "I know this game" — that confidence is the
raw material the twist spends. The existing `UNLOCKS.full`-off presentation (plain
classic, no mode picker) is the seed of this and shows it already works.

### Pillar B — The Director (a dramaturgy engine)
A new DATA-driven layer that stages the game in **acts**, keyed to real progress
(leader's tile + round count), not raw RNG. The director decides when rules wake up,
schedules the first crack instead of praying for it, and ramps chaos density on a
curve. Acts:

- **Act 0 — "The game you remember."** Pure classic. Plus *anomalies*: tiny,
  non-mechanical wrongnesses drawn from a pool — a snake's eye blinks once; the die
  flashes a 7 for a single frame before settling on a real face; one tile flickers
  the wrong colour for 100 ms; a log line that's slightly off ("Anna rolls 4. The
  board approves."). Deniable. Players argue about whether they saw it. This is
  foreshadowing, and it's what makes the later reveals a *twist* rather than a
  feature list.
- **Act 1 — "Cracks."** The quiet rules wake, and they wake **visibly**: the first
  shop tile *grows onto the board* mid-game (tile morph animation) rather than
  having been printed there all along — the board changing during play IS the
  message. First Rule+ card fires here, director-scheduled (guaranteed within a
  round window, e.g. rounds 3–5, triggered by whoever lands it first — rig the
  opportunity, not the dice).
- **Act 2 — "The board is alive."** The loud pool wakes: orange squares surface,
  warp square arms, sniper cadence starts, rare events begin rolling and their
  chances now scale with a `chaosCurve()` multiplier that rises with leader
  progress. The tone of Rule+ cards and log lines starts slipping (see Pillar D).
- **Act 3 — "It knows."** Leader enters the top rows: chaos at full curve, and the
  game's one guaranteed set-piece — the finale — arms (Pillar C).

Design rules for the director:
- **It stages, it doesn't add.** Every rule it wakes is an existing FEATURES rule.
  The director is a gate schedule + chaos multiplier + anomaly scheduler, nothing
  more. All existing rule logic stays untouched behind its FEATURES flag.
- **Guaranteed beats, flexible actors.** The director guarantees THAT a beat
  happens in a window, never WHO triggers it or the dice that do it.
- **Acts advance on leader-tile thresholds OR round-count fallbacks** (whichever
  comes first) so a slow game still escalates and a lucky sprint doesn't skip the
  arc entirely.

### Pillar C — The Undertow (one coherent secret + a real finale)
Give all the strangeness a single hidden identity: **there is something under the
board.** The game already believes this — the leviathan lives under the fishing
squares, the secret square is *off* the board's edge, the Broken Gate is *behind*
the dealer, tile 89 drops *through* the floor. The twist that recontextualizes:
the anomalies, the cracks, the dealer, the warp — they were all the same thing
stirring underneath, and **reaching tile 90 wakes it.**

Concretely: in a director game, the first player to reach 90 does NOT simply win.
The board shudders, tiles ripple — and one **finale** fires, drawn secretly at game
start from a `FINALES` pool (so replays differ; no-repeat until the pool is
exhausted, remembered in localStorage like settings). Finale concepts to seed the
pool (build 1–2 first, not all):

1. **🌊 The Breach** — the leviathan erupts through the middle of the board
   (reuses Boss-mode arena/telegraph tech): a short final phase where remaining
   players scramble for surfacing weakpoint tiles to drive it down; the "winner"
   who woke it is in the arena too. Winner = classic finisher unless the beast
   swallows them; team performance decides the rest of the podium.
2. **🪜 The Tenth Row** — tile 90 sinks; a new row of 10 never-seen tiles rises
   above row A (the board was never 90 tiles — you just couldn't see the rest).
   Everyone in the top third races the true finish while the board sheds tiles
   below them, floor-is-lava style.
3. **🔃 The Turn** — the board flips (gray-warp tech) and stays flipped: the
   finish is now tile 1, the ladders now carry DOWN toward it, snakes carry up
   and away, and the near-winners are suddenly furthest from home.
- Every finale must be **short** (2–4 rounds), end in a normal podium, and be
  skippable in spirit — the finisher who "won" the race keeps a guaranteed podium
  spot in any finale, so the race still mattered (exact guarantee per finale;
  default: worst case 2nd).
- ⚠ **Set-piece visions are Isak's lane.** These three are concept seeds for him
  to react to — treat them like the leviathan/nuke cutscenes: if Isak dictates a
  finale vision, capture it VERBATIM in `TASKS.md` as a KEEP-FOREVER block and
  build his, not mine.

### Pillar D — The Voice (cheap, huge payoff)
The twist needs a narrator to betray. All player-facing prose — Rule+ cards, log
lines, the win banner — gets an act-aware tone: Act 0 is boardgame-manual polite;
Act 1 slips occasionally; Act 2 is watching ("You climb quickly. It notices.");
Act 3 drops the mask. Implementation is one `voice(act, key)` lookup over a `VOICE`
DATA table with per-act variants — no new systems. Existing embedded-audio tech
(kill announcer, CHEATER) proves a single low rumble/whisper sting is affordable
for the finale moment.

---

## 3. Scope decisions (defaults picked — Isak can override, see QUESTIONS.md)

- **Where it lives:** Director mode becomes the DEFAULT Classic experience once it
  ships and survives playtesting. The current everything-on-from-turn-1 game stays
  fully intact as **🎪 Party** (a Board/Game toggle: "director off"). Mayhem is
  explicitly the anti-director (chaos from turn 1 is its identity) — never gate it.
  KOTH/Tour: director off in v1; revisit after Classic proves it.
- **Family mode** composes: director on, finale pool filtered to gentle ones,
  anomaly pool unchanged (anomalies are free spookiness with zero mechanics).
- **Repeat players:** localStorage remembers games played; veterans get a tighter
  Act 0 (fewer innocent rounds) and fresh anomaly/finale draws. A "first game at
  the table" feel matters more than veteran pacing — when in doubt, protect the
  newcomer experience (hotseat means new guests join veterans' tables).
- **Bots** need no new brain: acts only gate which rules exist at a given moment,
  and bots already handle every rule. Finales that reuse boss tech reuse the boss
  bot logic.

---

## 4. Build plan (phased; each phase ships alone, registry recipe as always)

**Phase 1 — DIRECTOR core.** `DIRECTOR` DATA block: `ACTS` table (per act:
`featureSet` = FEATURES overrides, `chaosMult`, `anomalyRate`, advance thresholds
`leaderTile`/`roundCap`), `directorAdvance()` checked at round start, and a
`chaosCurve()` consulted by `RARE_EVENTS` chance() (multiplier, seat-scaling
untouched). Feature gating: director holds a per-game overlay over FEATURES —
never mutate the FEATURES const (Party mode = overlay absent). Acts logged.
No visuals yet. Headless-verifiable: acts advance, gated rules never fire early,
full director game terminates.
⚠ Headless harness: pre-seed the director to the final act (or Party mode) in
existing test suites so old checks still exercise every rule from turn 1.

**Phase 2 — Staged awakening.** Wire existing tiles/rules into acts. Tile
*grow-in*: special tiles absent from the painted board until their act (needs
`setSpecialTiles`-era machinery + a morph animation on `cellColor` change). First
Rule+ card scheduling. Coins/scoreboard elements appear only when shops wake.
**Playtest gate: give Isak an act-length feel pass here before building further.**

**Phase 3 — Anomalies + Voice.** `ANOMALIES` pool (each = `run()` + rarity + act
range; all purely cosmetic, ~1 per 1–2 rounds in Act 0) and the `VOICE` table
threaded through Rule+ cards/log/banner. Anomalies must never block input or slow
a turn — they ride existing animations.

**Phase 4 — First finale.** Build ONE (recommend 🌊 The Breach — biggest tech
reuse, ties directly to the leviathan lore). `FINALES` registry (`id`, `arm()`,
`run()`, `podiumRule`, `familySafe`), secret draw at `newGame`, no-repeat memory.
The finisher-keeps-podium guarantee. Then stop and playtest with Isak before
finale #2.

**Phase 5 — Polish + default flip.** Veteran pacing, Family filtering, Party
toggle UI, RULES.md (spoiler-light! see below), then flip Director to default
Classic with Isak's sign-off.

**RULES.md handling:** the twist must not be spoiled by the manual. Document
Director mode vaguely ("the game reveals itself as you climb") and put full
mechanical detail in a clearly marked spoiler section at the bottom. Rule+ cards
stay vague as always (standing rule, 2026-07-03).

---

## 5. What NOT to do

- Don't add new rules/items as part of this direction — the game is content-rich
  and pacing-poor; this direction is pacing work. New content ideas go to
  `IDEAS.md`/`SUGGESTIONS.md` as usual.
- Don't let the director touch Mayhem, Boss Battle, or a mid-series Match game.
- Don't reveal the undertow fiction in Act 0/1 text — the words "leviathan",
  "under", "awake" never appear before Act 2.
- Don't build more than one finale before Isak has played one.
- Don't gate bug-fix or verify sessions on this doc — it changes the default game
  only at Phase 5.
