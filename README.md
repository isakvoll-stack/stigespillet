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
- **RULE WIRING** — the registries every rule plugs into: `TILE_RULES` +
  `LANDING_ORDER` (what each special square does, on-turn and off-turn),
  `MOVE_BONUSES` (whatever adds steps to a roll), `RARE_EVENTS` (the rare
  turn-start strikes). Board painting derives from `TILE_RULES` too.
- **CONTROLLER** — turn flow, dice, animation, win. Generic: it loops the
  registries and never name-checks an individual rule.

Change a ladder or a colour in the DATA block and the whole game follows.
Adding a rule = a DATA block + a handler + one registry entry (see the
recipe in `CLAUDE.md`).

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

Recently shipped (2026-07-05, later): **⚙️ Advanced settings on the setup screen** —
a collapsible section under the player list with pull-down groups (`ADV_SECTIONS`
registry); the first group, **🛒 Items**, lists every `SHOP_CATALOG` entry with an
enable/disable checkbox (future items appear automatically; disabled items never hit
the shop or black-market shelf). Also: the Coffee card now reads "When used: +4 to
your next roll." and using an item no longer auto-reopens the inventory.

Before that (2026-07-05): **📯 War Horn** — a new 7-coin consumable, designed by
a guest co-designer: blow it and a brassy blast + shockwave rings sweep your row,
knocking flat every rival standing on it (armed Shields block it; 3+ felled triggers
the multi-kill announcer). Bots buy it and save it until a rival shares their row.
Tunables in `HORN`. Verified headless Edge: 15/15 checks + a full 4-bot game, 0 JS errors.

Before that (2026-07-04, later): **the 6-answer batch + 2 bonuses** —
- **Blue passive banners**: passive items (Shoes, Gloves) show as blue cards in the
  shop/black market instead of red (`--passive-blue`).
- **Embedded kill voice**: TRIPLE/QUAD KILL now play a gruff embedded voice clip
  (base64 WAV in `KILL_VOICE`, no sidecar files); the double-kill callout is retired
  (`KILLSTREAK.MIN` = 3), and only players knocked **standing→down** by the shot count.
- **Thieves' Gloves cost 6** (was 8).
- **Item flourish first, effect after**: using a consumable hovers the aura ~1s
  (`ITEM.FLOURISH_MS`), THEN applies; the inventory closes during it and reopens.
- **Graze follows the drawn snake curve** (not the straight head→tail line) via
  `distToSlideCurve`; the drawing and the check share `SLIDE_CURVE.SEG_PX`.
- **3 new rule cards**: kick-while-down is now just "SHAME on you, SHAME on you...";
  a card when someone's shame catches up (name templated); a card when a radiation
  survivor mutates immune. `RULE_INFO.text` may now be a function of a name.
- **Bonus — ↩ Back** on the support target pick returns to Wheel/Support/Gun.
- **Bonus — the dark-red setback square joins the 🌀 tile shuffle** — it can end up
  high on the board and become devastating.

Earlier (2026-07-04): **Isak's answers to the question batch** —
- **Coin tiers**: yellow pays 1 (ping only, no icon), blue pays 3 with a fanfare (three
  big 🪙 pops + three pings 100ms apart), a rolled 6 pays 1 silently (`COIN` +
  `COIN_FX` in DATA).
- **Bot orange odds fixed at wheel 4/7 · support 2/7 · gun 1/7**; support usually springs
  a trap when one exists (70%, `SUPPORT_TRAP_CHANCE`) but sometimes boosts a random rival
  for real.
- **Bigger**: pawns ×1.25, over-head popups ×2 — except the ❄️ freeze badge at ×3 (`TOKEN`).
- **Settings screen**: a Settings button under Play on the title screen; checkbox toggles
  the 🤖 bot decision popups. Popups are also ~30% faster (`BOT.THINK_MS`/`DECIDE_MS`).

Earlier (2026-07-03): **Isak's 4-point batch** —
- **Switchback up-arrows**: a white arrow on every 9→10 / 18→19 / … / 81→82 boundary
  shows where the path turns up a row (`SWITCHBACK` in DATA).
- **Smarter bots + visible decisions**: a scoring "bot brain" (kick vs bounce,
  leader-seeking sniper aim, value-based shopping, timed item use, threat-aware shields)
  and a 🤖 thought popup that shows each decision as it's made (`FEATURES.botThoughts`,
  tunables in `BOT`). Details in `RULES.md` → *Players & bots*.
- First coin/size pass (blue-only coins, pawns ×1.18) — superseded by the 2026-07-04 values.

Earlier (2026-07-02, later): **Shop freeze fixed — one self-contained file again** —
the shop catalog is back inline (`SHOP_CATALOG` DATA block; `shop-items.js` deleted), so a
downloaded `index.html` alone plays fully — landing on a shop no longer freezes single-file
copies. Plus an **error trap**: any uncaught error prints `💥 Something broke: …` in the
game log and releases the turn instead of soft-locking the die.

Earlier (2026-07-02): **Rules-engine refactor (extensibility pass)** —
the turn flow is now generic and every rule plugs into a registry, so adding a rule
is a table entry instead of edits scattered through the controller:
- **`TILE_RULES` + `LANDING_ORDER`** — one entry per special square (fishing, teleporter,
  orange, shop, setback, freeze) with `onLand`/`offLand` handlers; the same table drives
  board painting and plain-tile detection (the old duplicate if-chains in `moveCurrent` /
  `resolveLanding` / `cellColor` / `isPlainTile` are gone, and the wheel's 🌀 tile shuffle
  no longer needs a colour re-sync step).
- **`MOVE_BONUSES`** — fish/coffee/shoes step bonuses as entries; new modifiers are one line.
- **`RARE_EVENTS`** — lightning / lucky star / fate swap as entries.
- **No gameplay change intended or observed**: tile colours verified byte-identical for all
  90 squares, 25/25 headless checks ×3 runs, 3 full autonomous games, 0 JS errors.
- New **“Adding a new rule (the recipe)”** section in `CLAUDE.md`.

Earlier (2026-06-30): **Inventory + items rework** —
- **🎒 Inventory**: on your turn, before rolling, open your inventory and *use* items,
  then roll. You carry **3 consumables + 1 passive**. Items now **cost coins** and are
  bought at the gold shop. **☕ Coffee** (4 — +4 next roll), **🛡️ Shield** (6 —
  auto-blocks the next knockdown/freeze and shows a blue bubble while held), **🍀
  Four-leaf Clover** (10 — guaranteed 6 next roll), **👟 Running Shoes** (10 — passive
  +1 to every roll; a new passive replaces the old one). (`FEATURES.shop`; bag size
  `INV`, bonuses `ITEM`; catalog in the `SHOP_CATALOG` DATA block.)
- Also: the **encounter (bounce/kick) choice now happens before tile events**, and the
  on-tile A1…J9 coordinate labels were removed (the coord system stays in code).

Earlier (2026-06-30): **Coordinate grid + ice that spreads** —
- **🗺️ Grid coordinates**: a single-source 2D address system — rows lettered **A–J
  top→bottom**, columns **1–9 left→right** (top-left = **A1**). The grid helpers
  (`cellRC` / `rcToCell` / `cellLabel` / `neighborCells` / `gridNear`) back `cellCenter`
  and `tileBelow`. (The on-tile labels were later removed; the system stays in code.)
- **🧊 Ice spreads to neighbours**: the icy tile still only freezes whoever *lands* on
  it, but a frozen player now freezes anyone on the **8 surrounding tiles** (diagonals
  included) and anyone sharing their tile — one ring, no runaway cascade; Shield still
  blocks it. Adjacency uses real grid distance now, not cell-number distance. (`spreadFreeze`;
  reach = `FREEZE.ADJ`.)

Earlier (2026-06-27): **Coins, setback tile, coordinate-system TODO** —
- **🪙 Coins**: two independent triggers per turn — rolling a 6 awards a coin, and landing on
  any plain (no-effect) tile awards a coin. Both can fire on the same turn. Coin count shown
  in the scoreboard as 🪙N. (`FEATURES.coins`; `awardCoin()` helper.)
- **🔴 Back to start tile**: tile 7 is now a dark-red penalty square — landing on it (by roll,
  kick, or bounce) sends you straight to tile 1. Reveals a hidden-rule popup the first time.
  Protected from the 🌀 tile-shuffle. (`FEATURES.setback`; `SETBACK_TILES = [7]`.)
- **TODO comment**: `cellCenter()` now has a note flagging the future grid-based coordinate
  refactor (row/col addresses in DATA instead of boustrophedon arithmetic).

Earlier (2026-06-27): **Fishing + gun animation polish** — fishing minigame lasts
~1.5× longer (drain/fill rates reduced) and the catch zone is 20% wider (`ZONE_BASE`/`ZONE_MIN`).
Gun roulette now opens with a **large chamber display** (all 6 chambers colour-coded blank/live/self
so you can read the odds), the cylinder spins to completion before fading out, then the revolver
appears and fires. The gun model is ~1.7× larger and better proportioned. The `gunFx` spin (random
"picked off" effect) also plays to completion cleanly. Tunables: `FISH.ZONE_BASE`, `FISH.ZONE_MIN`,
`FISH.DRAIN`, `FISH.FILL`, `GUN.SPIN_ROT_MS`.

Earlier (2026-06-27): **Wheel of fortune restored to 7 slots** — the plain
🎲 random event (fires game-state events: lightning → leader, star → trailer, fate →
swap leader/last) is back alongside the 🎯 player-targeted random (all effects aimed at
the spinner). A brand-new 🌀 **tile shuffle** slot places every on-board player on a
fresh random neutral tile (skipping all snake/ladder squares).

Earlier (2026-06-27): **Shop tiles** — four **gold squares** (tiles 6, 28, 52, 75)
open a cabin shop when you land on them. Pick one item: **👟 Speed Boots** (+4 to your
next roll), **🛡️ Shield** (blocks the next knockdown or freeze), or **🍀 Lucky Charm**
(roll again immediately). Item shown as an icon in the scoreboard; one item at a time.
(`FEATURES.shop`; tunables in `SHOP` / `SHOP_ITEMS` DATA block.)

Earlier (2026-06-26): a **fish-powers + secret-square + smarter-bots batch**:
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
