# Stigespillet (Web) — Claude Collaboration Guide

This file is read first by any Claude Code session that opens this project. It tells you
*how* to work here. This is the web-based rebuild of the Norwegian *stigespill* (snakes &
ladders): one self-contained `index.html`, no build step, no server. It is **completely
separate from Hearth & Horizon** — never edit anything in the `Hearth and horrison` folder.

This project **is under Git** and has a private GitHub remote (run `git remote -v` to see
it). Use Git normally.

---

## Who you're working with

- **Isak** — beginner Python/web developer, no prior game-dev experience. Comfortable with basics.
- **Wants to be taught.** When you make an architectural choice, give one sentence of *why*,
  not just *what*. Explanation belongs in chat, never in source files.
- Work in **one focused step at a time.** Don't bundle unrelated changes into a session.

---

## Ideas inbox (phone capture)

`IDEAS.md` is Isak's quick-capture inbox for ideas he sends on the go (often by phone). When
he says *"add idea: …"*, append it to the top of the Unsorted list in `IDEAS.md` and commit +
push — capture only, don't build it. Curate into `Next/TASKS.md` later.

## Session-start protocol (do this first, every session)

1. Read this file, `README.md`, and `RULES.md`.
2. Check the **Next** section of `README.md` for current build state and the next planned step.
3. `git status` / `git log -1` to see where things stand.
4. Confirm scope with Isak before coding if the next step isn't already nailed down. Offer
   2–3 framed options when there's a real tradeoff; ask one clear question when there's a
   real decision. For local reversible edits, just proceed and report.

## Session-end protocol (do this every time, without being asked)

1. Update the **Next** section of `README.md` (and `RULES.md` if rules changed) with what
   changed and what's next.
2. **Always commit and push to the remote** — never leave a finished session local only:
   ```powershell
   git add -A
   git commit -m "<concise summary of the change>"
   git push
   ```
3. Confirm the push succeeded (GitHub Pages serves straight from `main`).

---

## The architecture principle: separate data from logic ("layering")

This is the default architecture — apply it to every system unless there's a stated reason
not to. Build each system in two conceptual layers: **data** (the *what* — content and
tunable values) and **logic** (the *how* — generic code that reads the data and acts on it).
Keep them apart.

Everything lives in `index.html`, but in clearly separated, labelled blocks:

| Layer | What's in it |
|---|---|
| **DATA** | `BOARD`, `RULES`, `LADDERS`, `SLIDES`, colours, Norwegian `TXT` strings. Board content (ladders/slides) lives **only** here. |
| **ENGINE** | Pure board maths: `cellCenter`, `walkPath` (bounce-aware), `linkAt`. No DOM. |
| **RENDER** | Builds the SVG board from the data; draws ladders, slides, tokens. |
| **RULE WIRING** | The registries that plug rules into the turn flow: `TILE_RULES` + `LANDING_ORDER` (special tiles), `MOVE_BONUSES` (step modifiers), `RARE_EVENTS` (turn-start strikes). |
| **CONTROLLER** | Turn flow, dice, animation, win condition. Generic — it consults the registries; it never name-checks individual rules. |

The goal is that any value Isak might want to change lives in exactly **one labelled place**
you can point him to.

Concrete rules:

1. **No magic numbers in logic.** Every tunable — a speed, count, duration, threshold, font
   size, colour — is a named value in the DATA block, never a bare literal buried in ENGINE,
   RENDER, or CONTROLLER code.
2. **Content lives in data tables, not code branches.** A *set* of things (the ladders,
   slides, future event cards) is a declarative object/array that generic code iterates —
   not an `if`-chain.
3. **Relationships are declared as data.** "this cell sends you to that cell" is a `LADDERS`/
   `SLIDES` entry, not a hard-coded branch.
4. **Single source of truth.** Each value lives in exactly one authoritative place.

**Design the data first.** Decide the data shape before writing the logic. Don't over-apply
it (YAGNI) — a genuine one-off value doesn't need a data system wrapped around it.

**Smell test (run before finishing a step):** if changing a number, a label, or an ordering
would mean editing ENGINE/RENDER/CONTROLLER code instead of a labelled DATA line, the layers
are tangled — pull the data out.

---

## Adding a new rule (the recipe)

New rules plug into the **RULE WIRING** registries — never into `moveCurrent`,
`resolveLanding`, or `startTurn` directly. Those loops are generic and finished.

**A new special tile** (a square that does something when landed on):
1. **DATA**: a tiles array + a colour const + any tunables (e.g. `const BOG_TILES=[…]; const BOG_COLOR="…";`).
2. Write the handler function (e.g. `runBog(p)`), near the other rule handlers.
3. Add one entry to `TILE_RULES` — `tiles`, `color`, `feature`, and `onLand` (your own roll)
   and/or `offLand` (moved here by a kick/swap/star; omit it for interactive tiles).
   Return `true` when the tile consumed the landing.
4. Add its id to `LANDING_ORDER.turn` (and `.offTurn` if it has `offLand`) — position = priority.
5. A `FEATURES` flag, a `RULE_INFO` card (call `revealRuleOnce` in the handler), and a `RULES.md` entry.

Painting and plain-tile detection are automatic — `cellColor` and `isPlainTile` read `TILE_RULES`,
so the board follows the registry (even through the wheel's 🌀 tile shuffle).

**A new movement modifier** (anything that adds steps to a roll): one entry in `MOVE_BONUSES`
(`feature`, `amount(p, roll)`, optional `note`). If `amount` mutates state (consumes a charge,
takes a coin), also give the entry a pure `peek(p, roll)` — `moveBonusPeek` uses it for the
two-dice landing preview and bot die choices; without it the preview consumes the resource. `roll` is the die face, so a modifier
can scale with or invert the roll (the tan dizzy tile returns `-2*roll` to walk the
whole move backwards); a net-negative total makes moveCurrent walk backwards generically.

**A new rare turn-start event**: one entry in `RARE_EVENTS` (`feature`, `chance()`, `run`),
with its chance tunable in a DATA block. For a **deterministic** turn-start trigger
(fires on a condition, not a dice roll — e.g. the gray warp square), give the entry
`when(p)` instead of `chance()`: it fires exactly when the predicate is true for the
current player, unscaled by seat count.

**Rule reveal cards stay vague (Isak, 2026-07-03).** Every `RULE_INFO` card — current and
future — keeps the *why* clear but the details (numbers, exact consequences, what happens
next) fuzzy and atmospheric. The full mechanical detail belongs in `RULES.md` only.

**Autonomous batches & questions (Isak, 2026-07-03).** When working through a task batch
autonomously, never stop to ask: pick a sensible default, build it, and log the open
question in `Next/QUESTIONS.md` for Isak to answer later.

---

## Code style

- **No explanatory comments in code.** Names carry the meaning. The block-header comments
  marking DATA / ENGINE / RENDER / CONTROLLER are fine; skip per-function comments unless a
  contract is non-obvious.
- **Named values in the DATA block** for every tunable.
- Keep ENGINE free of DOM access so the board maths stays simple and self-contained.

---

## Running it

Just **double-click `index.html`** — one self-contained file, no install, no server, no
build. Works offline; the same single file is what GitHub Pages serves live.

---

## Things to never do

1. **Never** edit anything inside the `Hearth and horrison` folder.
2. **Never** end a finished session without committing **and pushing** to the remote.
3. **Never** put a tunable number as a bare literal in ENGINE/RENDER/CONTROLLER code — it
   goes in the DATA block.
4. **Never** put board content (ladders/slides) anywhere but the DATA block.
5. **Never** bundle a second feature into the current step "while you're in there."
