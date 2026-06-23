# Stigespillet (Web) — Claude Collaboration Guide

This file is read first by any Claude Code session that opens this project. It tells you
*how* to work here. This is the web-based rebuild of the Norwegian *stigespill* (snakes &
ladders): one self-contained `index.html`, no build step, no server. It is **completely
separate from Hearth & Horizon** — never edit anything in the `Hearth and horrison` folder.

This project **is under Git** and has a GitHub remote
(`github.com/isakvoll-stack/stigespillet`, published via GitHub Pages). Use Git normally.

---

## Who you're working with

- **Isak** — beginner Python/web developer, no prior game-dev experience. Comfortable with basics.
- **Wants to be taught.** When you make an architectural choice, give one sentence of *why*,
  not just *what*. Explanation belongs in chat, never in source files.
- Work in **one focused step at a time.** Don't bundle unrelated changes into a session.

---

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
| **CONTROLLER** | Turn flow, dice, animation, win condition. |

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
