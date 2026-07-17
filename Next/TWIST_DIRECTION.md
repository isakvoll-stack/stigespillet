# The Twist Direction v2 — instructions to future Claude sessions

> **Origin (Isak, 2026-07-17):** the game must be an *unexpected twist* on snakes &
> ladders, and isn't yet.
>
> **v1 REJECTED (Isak, 2026-07-18) — do not re-propose it.** v1 was a dramaturgy
> engine: Director acts, an innocent scripted opening, a storyline ("something under
> the board"), one-per-game narrative finales. Isak's ruling, near-verbatim:
> *replayability is the game's biggest strength and a staged arc hurts it; a
> storyline hurts the all-around-friendly, many-kinds-of-people quality. It's NOT a
> dramatic game — it's a party game where you play and laugh together as more and
> more things pop up to mess with the game. And it must never become a burden — no
> memorising, no thinking in chess moves.* Any future idea that trades replay value
> for a first-play wow, or that gives the game a plot/persona, is off-direction.
>
> **The reframed goal:** the "twist" is not one reveal — it's that **the game keeps
> being able to surprise the table, game after game**. Design for game 20, not game 1.

---

## 1. Diagnosis (updated for the party-game lens)

- **The surprise pool is static.** Every Classic game runs the same rules on the
  same board with the same items. RNG shuffles *order*, never *contents* — so after
  enough games the table has seen everything, knows every tile, and surprise decays
  toward zero. Replayability today survives on chaos variance alone.
- **"Things pop up" is only half-true.** Rules *reveal* as you trip them, but they
  were all silently there from turn 1. Nothing new actually *enters* the game while
  you play — a veteran is never surprised, only reminded.
- **Cognitive load is quietly creeping.** ~20 rules + ~25 items + exotics + 9 pacts
  are all potentially in play at once, every game. Nobody must study, but the pile
  grows with every content batch and one day it WILL feel like homework. Volume of
  simultaneous content is now a cost, not a feature.

**Thesis: same content, different slice every night.** Make each game a different
random *subset* + a few things that visibly pop up mid-game. Smaller per-game
surface (less to track), bigger across-games variety (more to discover) — surprise
and anti-burden come from the same mechanism.

---

## 2. The design — four pillars

### Pillar 1 — The Nightly Draw (each game is a secret hand)
Every new Classic game secretly draws its configuration:

- **Rules:** a small always-on core (exact finish, six-again, encounter — final
  membership is Isak's call, see QUESTIONS.md) + a random selection from the
  optional hidden-rule pool (e.g. 60–75% of them live per game). Is the sniper out
  tonight? Is tile 89 trapped? Nobody knows until it bites — including veterans.
- **Board:** scrambled special-tile layout by default in drawn games (machinery
  exists — `scrambledLayout`), so tile knowledge can't be memorised either. Ladders
  and snakes NEVER move (standing rule, 2026-06-22).
- **Items:** the catalog itself is a per-game subset (e.g. ~12 of the pool). The
  shop feels different every night ("this game has snowballs?!") and the item list
  stays digestible.
- **The end-screen reveal:** after the podium, a "🃏 Tonight's board" card lists
  the full draw — what was live, what never existed. This is the party payoff
  ("THAT'S why nobody froze!"), it teaches the pool without study, and it makes
  the *next* draw an event.

Draw = a `DRAW` DATA block (pool entries with weights + `requires` dependencies —
e.g. black market requires shop/coins; fish powers require fishing). Advanced
settings toggles become tri-state in spirit: forced-on / forced-off / in-the-draw.
The current everything-on game is preserved as an "🎪 Everything" preset. Bots need
nothing new — they already read FEATURES-style gates.

### Pillar 2 — Pop-ups (things enter the game mid-play)
Isak's own words are the spec: *"more and more things pop up to mess with the
game."* Make that literally true. Each game guarantees a handful of **pop-up
moments** (e.g. 2–4, count in DATA) at random rounds, drawn from a pop-up pool:

- a **new special tile grows onto the board** on a random plain square (orange,
  freeze, shop, fishing, warp, setback… — grow-in morph animation; salvage this
  tech idea from v1, it's the one piece worth keeping),
- an **item chest drops** on a tile — first player to land there gets it (works
  even in games where shops didn't make the draw),
- a **dormant rule wakes up** mid-game with its Rule+ card,
- a **one-off strike** from the existing chaos pool hits a random player.

Pop-ups are announced with a short fun card/jingle when they happen — never before.
Random timing + random content + random placement = replayable by construction; no
acts, no script, no story. This also means a game that drew a quiet hand still gets
its "wait, WHAT?" moments.

### Pillar 3 — Twist of the Night (recycle the leg twists)
The 10 `LEG_MODS` (Mirror World, Opposite Day, Musical Squares, Troll Toll…) are
already built, already party-toned, and currently locked inside Grand Tour legs
2–3 — most tables will never see them. Give Classic an optional draw slot: some
games (say 1 in 3, tunable) secretly carry ONE twist of the night, which announces
itself with a card at a random early-mid round and lasts the game. No repeats
until the pool cycles. This is the cheapest big win in the whole plan: ten
game-changers, zero new mechanics to build or learn.

### Pillar 4 — Party guardrails (the anti-burden law)
Codify these as standing design rules — check every new feature against them:

1. **Everything explains itself at the moment it happens** — never before, never
   requiring the manual. (Rule+ cards stay vague & atmospheric — standing rule.)
2. **No hidden state you must track to play well.** Anything persistent shows a
   visible marker on the board/scoreboard (shame badge, ice, bubbles — keep it so).
3. **Choices stay small and flavour-first:** 2–3 obvious options, pickable on gut
   feeling in 3 seconds. If a choice rewards calculating, redesign it.
4. **Naive play must stay competitive.** Chaos is the equaliser; optimal play
   should only ever be a nudge better than laughing and rolling.
5. **Per-game surface must shrink or hold, never grow.** New content lands in the
   pools, not in the always-on set. The Draw is the budget that keeps game night
   light no matter how big the game gets.

### Freshness memory (thread through all pillars)
Draws, pop-ups and twists are weighted toward what the table has seen *least
recently* (localStorage, like settings). A rule that sat out three games is due.
Never lets the same twist-of-the-night repeat back-to-back. This is what keeps
game 20 surprising — the game quietly rations its own novelty.

---

## 3. Scope decisions (defaults picked — Isak overrides in QUESTIONS.md)

- **Rollout:** build behind a single setup toggle ("🃏 Nightly Draw", default OFF
  until playtested), then flip to default Classic with Isak's sign-off.
  "🎪 Everything" preset keeps today's behaviour forever.
- **Family mode composes:** the draw pool is simply pre-filtered by `FAMILY.OFF`.
- **Mayhem / Boss Battle / KOTH / Tour untouched.** (Tour already owns the leg
  twists; twist-of-the-night just shares the same registry.)
- **No narrative, no persona, no acts, no finales.** The finish line stays the
  finish line — a won race is never taken away.
- **No new rules/items as part of this direction.** It's a variety-and-pacing
  layer over existing content. New content ideas go to IDEAS.md as usual (and
  future content instantly enriches the pools — the direction scales for free).

---

## 4. Build plan (phased; each ships alone; registry recipe as always)

**Phase 1 — Twist of the Night.** Smallest, biggest payoff, everything exists.
`TWIST_NIGHT` DATA (chance, announce-round window, no-repeat memory) reusing the
`LEG_MODS` registry + the suspense-card presentation. Headless: full games with
each twist forced terminate cleanly outside Tour. **Isak playtest gate.**

**Phase 2 — The Nightly Draw.** `DRAW` block (rule pool w/ weights + `requires`,
item-subset size, scrambled-board default), applied as a per-game overlay — never
mutate base FEATURES/`SHOP_CATALOG`. End-screen "Tonight's board" card. Headless:
100 random draws → no dependency violations, all games terminate.

**Phase 3 — Pop-ups.** `POPUPS` DATA (pool, per-game count, round windows) +
tile grow-in animation + chest item. Guaranteed-count scheduler (windows, not
scripted rounds). **Isak playtest gate before default-on.**

**Phase 4 — Freshness + flip.** localStorage recency weighting across all three
systems; defaults flipped per Isak's answers; RULES.md updated (keep the draw
pools spoiler-light — list that pools exist, not their exact contents).

---

## 5. What NOT to do

- No acts, no story, no voice/persona, no scripted first-play experience (v1 is
  rejected — see header).
- Don't move ladders/snakes, ever.
- Don't put anything strategic behind the draw (no draft screens, no picking your
  rules — the DRAW is secret and automatic; choosing rules is what Advanced
  settings is for).
- Don't let pop-ups interrupt or slow a turn — they ride between turns.
- Don't grow the always-on set. Ever. (Guardrail 5.)
