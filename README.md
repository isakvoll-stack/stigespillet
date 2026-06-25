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
- **Title screen → Spill → Setup**: pick the player count (2–11), type a name for
  each player, and set each seat to **Player** or **Bot** (toggle button on the
  row), then **Start spillet**. The *Autonomous mode* checkbox makes **every** seat
  a bot (the whole game plays itself).
- 2–11 players, hotseat (share one device). Bots take their own turns automatically.
- Click the die (or press **SPACE / ENTER**) on your turn (human seats only).
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

Recently shipped (2026-06-26): a **fish-powers + secret-square + smarter-bots batch**:
- **Fish are now power-ups (with quirks).** Every **3 fish** = **+1 movement** each turn;
  **2+ fish** lets you **break out of ice on a 3+** but makes ladders slippery (**1-in-10
  slip**); **3+ fish** + a teleporter **overloads it and shuffles everyone** instead of a
  single swap. (`FEATURES.fishPowers`; tunables in the `FISH` DATA block.)
- **A hidden secret square before tile 1.** No one starts there and it isn't drawn at
  all — you only uncover it if something throws you back past the start (lightning, a
  pile-up). (`FEATURES.secretSquare`.)
- **Smarter bots.** On orange squares they no longer just spin the gun/roulette — they
  spread across wheel / gun / support. And bot **fishing odds** now get harder as more
  fish are landed in the game (≈40% loss on the first catch, then 60 / 80 / 90 / 95%).

Earlier (2026-06-25): **per-seat Player/Bot selection** — each setup row has a Player⇄Bot
toggle, so you can mix humans and bots in one game (bots auto-take only their own turns;
a 🤖 marks bot seats). The *Autonomous mode* checkbox now means "make every seat a bot."

Earlier (2026-06-25): the **gun cutscene** — the shooter draws a **tiny CSS
revolver** on their own square and **spins the chamber (no reveal)**, then fires at the
leaders (blank = a dud, live = three knock-down shots with no explosions, self = a backfire
that downs you); tunables in the `GUN` DATA block. Sniper hits also no longer explode. The
**leviathan** is now an **SVG profile dragon** — an elegant tapering body with a large maw
that opens to gulp, gliding slowly and majestically across the screen. (Earlier that day it
was first built as a blue serpentine
Chinese-dragon that undulates across the screen, gulps the player in passing, then peeks
back, rears up, and spits them flying to their new tile (tunables in the `LEVI` DATA
block). Earlier (2026-06-24): target-centred explosions; lightning / lucky-star / nuke /
gun animations; a 6th **RANDOM** wheel slot with an accurate pointer; swap/star/lightning
made 3× rarer; easier+longer fishing; and tiles that activate when you're knocked/moved
onto them (even off-turn).
**Cutscenes are machine-verified (headless Chrome) but still want a human eyeball for feel.**

Still ideas: PNG board skin, smarter bots, more variant rules, art/sound polish.
