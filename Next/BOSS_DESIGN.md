# Boss gimmicks & loss conditions — proposals for Isak (2026-07-17)

Isak asked to PLAN each boss's gimmick + loss condition together before
implementing. These are Claude's proposals to react to — nothing below is
built yet. What IS built: each boss already has a distinct attack style
(`BOSS_PATTERNS`), a loss condition (`BOSSES[].lose`), and an intro card
that presents name + gimmick + loss condition at fight start.

A **gimmick** here = one extra twist that changes how you PLAY the fight,
on top of the attack shapes. Rule of thumb: one gimmick per boss, readable
in one sentence.

## 🐉 Ember Dragon — *the arena heats up*
- **Current**: flame-cone attacks; hit = knockback 3 + singed roll. Lose: 20 rounds.
- **Proposed gimmick**: **Scorched tiles** — every tile a flame strike hits
  stays burning for 2 rounds (painted ember-orange); stopping there singes
  you (−2 next roll). The ring slowly becomes a minefield of your own dodges.
- **Proposed loss condition**: keep **20 rounds** ("the arena burns down"),
  it matches the escalating-heat fantasy.

## 🐙 Deep Kraken — *the ring itself is prey*
- **Current**: tentacle slams + grabs; hit = dragged 6 back. Lose: 12 team hits.
- **Proposed gimmick**: **Grip tiles** — after each phase change one tentacle
  stays wrapped around a random wall (2–3 tiles): walking THROUGH costs your
  whole remaining move (you stop there, gripped). Landing a weakpoint hit
  frees that wall. Movement puzzle: plan around the arms.
- **Proposed loss condition**: keep **12 strikes on the team** — the Kraken
  wants you worn down, not out of time.

## 🧊 Frost Titan — *momentum is survival*
- **Current**: freezes whole walls; hit = frozen a turn. Lose: full team wipe.
- **Proposed gimmick**: **Creeping ice** — every round one more ring tile
  (from the wall it last froze) stays permanently icy: stopping there = slip
  1 tile onward. The safe ring shrinks all fight; late-game every landing is
  a calculation.
- **Proposed loss condition**: keep **team wipe** — creeping ice + wipe is a
  natural slow-strangle pairing.

## ⚡ Storm Wyrm — *never stand still*
- **Current**: 1-turn charges right in front of runners. Lose: 16 rounds.
- **Proposed gimmick**: **Static charge** — end a turn on the SAME tile you
  started it (frozen, gripped, tiny roll…) and the storm finds you: instant
  zap. Constant pressure to keep moving; makes freezes/knockbacks scary.
- **Proposed loss condition**: keep **16 rounds**, it's the "outlast the
  storm" fight and its zaps already cost turns.

## 🕳️ Void Maw — *the board is lying to you*
- **Current**: mirrored rifts, scatter on hit, weakpoints drift, emberlight meter.
- **Proposed gimmick**: keep the **drifting weakpoints** (whole pattern
  rotates — already live) as its gimmick; it IS the twist.
- **Proposed loss condition**: keep **✨ emberlight** (fades 1/round, sparks
  +2). It's the most original lose in the roster — worth keeping unique to
  the Maw.

## 🦍 Kong — *the ring is a conveyor of pain*
- **Current**: no telegraphs, barrels roll backwards around the ring. Lose: 10 hits.
- **Proposed gimmick**: **Rage meter** — every weakpoint hit adds a pip;
  at 3 pips Kong beats his chest and the NEXT boss turn throws double
  barrels, then the meter resets. You choose when to push damage.
- **Proposed loss condition**: keep **10 barrel hits** — simple, readable,
  fits the slapstick.

## 🃏 The Joker — *you never fight the same fight twice*
- **Current**: mimics a random boss's style, reshuffles each phase. Lose: 20 rounds.
- **Proposed gimmick**: **Wild card** — on every phase change he ALSO
  shuffles the weakpoint pattern to a different symmetric layout and swaps
  two ring roles (e.g. a coin tile ↔ a crate). The mask changes and so does
  the stage.
- **Proposed loss condition**: **"The last laugh"** — 20 rounds, but every
  5th round he steals 1 HP BACK if no one damaged him that round. Time
  pressure with teeth, still readable.

---
**How to answer**: per boss, "yes / tweak X / different idea". Once locked,
implementation order suggestion: Dragon → Titan → Kraken (board-state
gimmicks share plumbing), then Wyrm, Kong, Joker.
