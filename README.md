# Stigespillet (HTML)

A fresh, web-based rebuild of the Norwegian *stigespill* (snakes & ladders).
Goal: a clean basic game first, then build upon it.

## Run it
Just **double-click `index.html`** — it's one self-contained file (no install, no
server, no build step). Works offline; send the single file to anyone.

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
- Optional **PNG board skin** to match the photo exactly (secondary).
- **Bots** (auto-play opponents) + a proper home/setup screen.
- Variant rules from the design ladder (Bump, special squares, minigames).
- Sound, nicer token art, board polish.
