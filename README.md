# Stigespillet (HTML)

A fresh, web-based rebuild of the Norwegian *stigespill* (snakes & ladders).
Goal: a clean basic game first, then build upon it.

## Run it
**Double-click `Play game.cmd`** — it opens the game in your browser (Edge/Chrome).
Use this if double-clicking `index.html` doesn't do anything (a Windows file-type
association quirk, not a problem with the game).

It's still one self-contained page: no install, no server, no build step, works
offline. To share it, send `index.html` (and optionally `Play game.cmd`). You can
also just drag `index.html` onto an open browser window.

## How to play
- **Title screen → Spill → Setup**: pick the player count (2–11) and type a name
  for each player, then **Start spillet**.
- 2–11 players, hotseat (share one device).
- Click the die (or press **SPACE / ENTER**) on your turn.
- **Stiger** (ladders) carry you up; **sklier** (slides) send you down.
- You must land **exactly** on 90 to win — overshoot **bounces back** (the
  Norwegian rule). First to 90 wins.

## How it's built (layering, like the rest of the project)
Everything lives in `index.html`, but in clearly separated layers:
- **DATA** — `BOARD`, `RULES`, `LADDERS`, `SLIDES`, colours, and Norwegian
  `TXT` strings. The board content (ladders/slides) lives only here.
- **ENGINE** — pure board maths: `cellCenter`, `walkPath` (bounce-aware),
  `linkAt`. No DOM.
- **RENDER** — builds the SVG board from the data; draws ladders, slides, tokens.
- **CONTROLLER** — turn flow, dice, animation, win.

Change a ladder or a colour in the DATA block and the whole game follows.

## Background / research
Stigespill descends from the Indian *Gyan Chaupar / Moksha Patam*. The classic
Norwegian (Damm/Egmont) board is **9×10 = 90 squares**, numbered 1 bottom-left →
90 top-left in a boustrophedon path, with bright cells, red ladders and tumbling
cartoon figures. This rebuild matches that colour language procedurally; the
original PNG board can be layered in later as an optional skin.

## Next (build upon this)
The live to-do list and session history now live in the **`Next/`** folder
(`Next/TASKS.md` + `Next/LOG.md`) — that's the source of truth for what's done and
what's next.

Recently shipped (2026-06-24): target-centred explosions; lightning / lucky-star /
nuke / gun / leviathan animations; a 6th **RANDOM** wheel slot with an accurate
pointer; swap/star/lightning made 3× rarer; easier+longer fishing; and tiles that
activate when you're knocked/moved onto them (even off-turn).
**Not yet play-tested in a browser — see the verify checklist in `Next/LOG.md`.**

Still ideas: PNG board skin, smarter bots, more variant rules, art/sound polish.
