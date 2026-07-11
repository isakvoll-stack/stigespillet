# Session log

Newest first. One entry per working session; note what shipped and what's next.

---
## 2026-07-11 (later) — tan dizzy tile + the Broken Gate (Isak's 2-point batch)

1. **The tan dizzy square** (tile 56, `DIZZY_TILES`/`DIZZY_COLOR`) — end a move
   there (own roll or thrown on) and `p.dizzy` sets; the next move made FROM the
   square walks **backwards** via a new `MOVE_BONUSES` entry returning `-2*roll`.
   The registry's `amount()` now receives the die face — `amount(p, roll)` — and
   moveCurrent's backwards log is now cause-neutral (the bonus notes carry the
   flavor; radiation keeps its own note). Knocked off the square → dizziness fades;
   landing on a 6 skips it (house tile rule); scramble/shuffle carry the tile.
2. **The black market got two sections** — tabs between the dealer's stall and the
   **Broken Gate** (`FEATURES.brokenGate`): ONE free cursed pact offered per visit
   (never one you hold), take it or leave it. First-ever market visitor is always
   gated; then 50/50 (`GATE`). Ten pacts in `CURSED` + numbers in `CURSE`:
   Stormstride Boots, Serpent Pact, Midas Purse, Everburning Heart, Stone Hide,
   Phantom Step, Vampire Fangs, Gravedigger's Bell, Blood Dice, Toll Keeper's
   Ledger — each a strong permanent gift with a permanent price, wired through
   the existing hooks (MOVE_BONUSES, RARE_EVENTS `when(p)`, downPlayer/freezePlayer,
   stealCoin, applyLink, buyItem/priceFor, strikeLightning marked pool). Pacts show
   on the scoreboard (⛓️+icons), in the bag panel, and have their own Advanced
   settings group + localStorage persistence.

Verified headless (Edge `--headless --virtual-time-budget`, rAF stubbed): 22/22
unit checks on every new mechanic + 6/6 three-bot games to completion, 0 JS errors;
dizzy fired organically in 4 games. RULES.md (two new sections), README Next,
CLAUDE.md recipe (`amount(p, roll)`) synced. Open defaults in QUESTIONS.md.

---
## 2026-07-11 — kick etiquette + purse (Isak's 3-point batch)

1. **Bots almost never kick a downed man** — `BOT.KICK_DOWNED_PENALTY` 8 → 40
   (net −31 per downed share; the escape hatch survives only for catastrophic
   bounce alternatives). Downed-share now counts `downed && !frozen`.
2. **Kicking a frozen player: no shame, and it GLIDES** — new branch ahead of the
   kick-while-down path: the ice block slides `FREEZE.KICK_GLIDE:3` tiles back in
   one smooth `glideFrozen` slide (still frozen; secret-square routing below
   tile 1; the landing tile resolves — a chute head means the block rides the
   snake). Kicker keeps the square, and since the encounter resolves before tile
   rules, punting the block away also saves the kicker from the freeze check.
   New `BOT.KICK_FROZEN_BONUS:12` — bots punt eagerly.
3. **Opening purse 5 → 10 coins** (`COIN.START`).

RULES.md synced (kick-while-down exception, deep-freeze glide, purse, bot-brain
bullet). **Verified headless Edge 12/12, 0 JS errors**: purse; glides 46→43 and
13→10 (still frozen, no shame, kicker keeps square); below-1 → secret square;
downed kick still row-drops + shames; bot trials ×60 — downed 0/60, frozen
60/60, plain 52/60. Open defaults in QUESTIONS.md (penalty size, glide
direction/chute interaction, bot punt eagerness).

---
## 2026-07-10 (fifth push today) — Isak's 8-point batch: finish line · gun RNG · colour picker · RGB · themes · gray warp tile

Six features built + two design tasks logged, all in one pass:

1. **🏁 Adjustable finish line** — Advanced settings → new 🏁 Game group with a
   slider: Classic now ends after `FINISH.NEED` finishers (1 = the old rule).
   `finishPlayer` banks places/medals and lets the field race on; `endClassic`
   blows the whistle; a lone last racer auto-places; finishers get no 6-bonus roll.
2. **🔫 Gun chamber RNG** — `rollChambers()`: exact `GUN.MIX` (3/2/1) counts, ONE
   slot re-rolled on the same odds (`MIX_WOBBLE`), shuffled; the big cylinder
   shows the real draw. `GUN.LAYOUT` retired.
3. **🎨 Colour picker** — click a seat's swatch on the setup screen → palette
   popover; taken colours dimmed; roster carries `color`; `p.color` now drives
   tokens + leviathan fliers (seat-index colouring gone).
4. **🌈 RGB player** — Settings toggle; 11th seat defaults to the rainbow, any one
   seat can claim it; `.rgbflash` hue-rotate animation on pawn + every swatch.
5. **🎨 Themes** — title-menu button cycles Summer/Christmas/World Cup/Sakura/
   Minecraft from a `THEMES` DATA table (sky CSS vars + glyphs + clouds + tagline).
6. **🌫️ Gray warp square (NEW RULE)** — tile 44: start your turn on it → board
   flips 90/180/270° + full colour inversion for that turn, rights itself next
   turn. Registry-built: TILE_RULES paints it; RARE_EVENTS gained an optional
   deterministic `when(p)` trigger (startTurn honours it; chance entries
   unchanged). `svgPoint`/`cellToScreen` now ride `getScreenCTM`, so sniper aim,
   tile picks and cutscene anchors stay correct on a flipped board. Warp tile
   scrambles/shuffles with the other specials.
7. + 8. **Boss-battle mode** and **skins** logged in TASKS.md Active as design
   tasks (Isak's call on direction before building).

Settings persistence extended (theme, RGB, finish need). RULES.md updated (goal,
gun odds — also fixed the doc's inverted 1/6 vs 2/6 live/self claim — warp rule,
themes, colour picker/RGB).

**Verified headless Edge, 0 JS errors across three harnesses**: 37 statics/
deterministic checks (chamber distribution over 300 draws + variance, warp
paint/plainness/scramble, multi-finish need-3 + need-all incl. standings order,
RGB flag→swatch→pawn, theme apply, seatColor defaults, adv UI); 4 integration
checks running the REAL `startTurn` loop (warp fires on 44, clears next turn,
inert with the flag off); full 4-bot classic with `FINISH.NEED:2` — ended in
round 32 when the SECOND racer got home, standings B/A/C/D. Full-game harness
note: `showScreen("game")` first, or `roll()` sits behind the title screen.

Open defaults for Isak in QUESTIONS.md (finish-line details, wobble size, warp
tile placement/duration, RGB exclusivity, theme scope).

---
## 2026-07-10 (fourth push today) — ⚖️ balance sweep B1–B5 built ("work on all the suggestions")

Isak green-lit the whole morning sweep. One new DATA anchor — `BALANCE =
{ REF_PLAYERS:4 }` — and five one-place fixes, exactly per the sweep's recipes:

- **B1**: `startTurn` scales each `RARE_EVENTS` chance by `REF_PLAYERS/players`
  — chaos per ROUND is now flat across seat counts (duel turns roll ×2, 6-player
  turns ×⅔; RULES.md quotes the odds "at a 4-player table").
- **B2**: sniper rifle every `SNIPER.EVERY_TURNS:18` total turns via a new
  `game.turnCount` (was every 5th round — rifle-saturated duels, starved big
  tables). Bot shield-threat check rides the same clock.
- **B3**: fishing per-player — `p.fishStreak` drives the minigame curve,
  `p.fishCaught` the bot loss table; the shared `game.fishStreak/fishCaught`
  pair is gone. Your miss resets only your streak.
- **B4**: dealer markup = `floor(visits × REF_PLAYERS / players)` — byte-same
  at 4 seats, normalized elsewhere; no cap added.
- **B5**: KOTH default rounds from `ROUNDS_BY_PLAYERS {2:20,3:24,4:26,5:30,6:32}`
  (+2/seat past 6); slider unchanged. `TROPHY_LEAD` scaling deliberately NOT
  built — a verification KOTH duel ended 19–0 (the sole-1st fountain is real),
  flagged in QUESTIONS.md as the next lever if duels feel lopsided.

**Verified 18/18 headless Edge, 0 JS errors**: statics, defaultRounds ladder
(20/24/26/30/32/36/42 for 2..6/8/11), B1 measured statistically with a 0.25
probe event over 300 startTurns (135 fires @2p, 51 @6p ≈ the 150/50 expected),
B2 grants at turn 18 but not 16/19 + threat window near/far, B3 win + own-curve
escalation + loss isolation + `game.*` state gone, B4 prices 18/26/15 at
4/2/6 seats, full 4-bot classic to a winner (23 rounds, 88 turns) and a full
2-bot KOTH on the new 20-round default. Defaults + open feel-questions logged
in QUESTIONS.md (B2 pace, B4 no-cap, B5 numbers, B3 no global component, B1
duel storminess).

---
## 2026-07-10 (latest, third push today) — 🕳️ Singularity Bomb: crafting + 2 items + vortex cutscene

Isak's friend's idea (Rain World Gourmand homage), built live. The game had a Shield
but no bomb/fire egg, so both were built as NEW cheap shop consumables (each useful
alone): **💣 Bomb 6c** (lob within 8, blast floors on/adjacent, shield-aware) and
**🔥 Fire Egg 5c** (singe within 8: next roll −2 via a `MOVE_BONUSES` entry).
**Recipe = Shield + Bomb + Fire Egg** in the new `CRAFT` registry: any 2 pieces
auto-fuse into the unusable **🌑 Casing** (`p.craftNeed` remembers the missing piece;
duplicates don't count), the last piece completes the **🕳️ Singularity Bomb** —
`craftOnly` entries: no shelf, no Mystery Box, hidden from the toggle list, hooked
once in `giveItem`.

**The vortex** (`SING`): aim at any tile (not 90); EVERYONE on the map spirals in
(nothing resists — shields, mirrors, downed, frozen all come along), implosion, then
a 3–10 tile semi-random scatter (past-90 folds back; below-1 = the secret square,
dealer queued per the own-turn rule). Thrower suction by distance: ≤3 95% / ≤5 55% /
≤7 25% / else 10% (Isak's "almost guaranteed / maybe / probably not" curve).
Cutscene: gloom → black hole + rotating accretion ring → accelerating spiral pull
(tokens shrink into it) → dead-still beat → megaboom/ear-ring/shockwave rings/shake
→ staggered arc fly-outs. `#preview=singularity` added; two headless screenshots
eyeballed (pull + implosion frames look properly ominous).

Bots buy the pieces, bomb clusters, singe the leader, and only detonate from ≥7
tiles away (`BOT.SING_SAFE_DIST`). **Verified 24/24 headless** (fuse both orders,
duplicate guard, casing unusable, bomb shield-block/thrower-ducks, singe math,
deterministic blast: pull-all / fold-back / secret-crash + own-turn dealer, full
4-bot game to a winner, 0 JS errors). Defaults in QUESTIONS.md — biggest one: the
invented Bomb/Fire Egg equivalents.

**Follow-up same session (Isak):** scattered players now **slam down flat on
landing** (normal get-up; the ride shatters ice — frozen riders land merely downed).
Nice composition: a thrower flung onto the secret square lands downed, so the dealer
waits for their get-up, exactly per today's own-turn market rule. Re-verified 27/27
(added: all-downed on landing, ice-shatter, dealer-after-get-up chain).

---
## 2026-07-10 (second push today) — 4-point batch + player-count balance sweep

Isak's picks, built live: **Mystery Box 5 coins** (was 3); **5-coin starting purse**
(`COIN.START`, factory reads it); **rule cards no longer auto-dismiss when a human
is playing** (the 3.8s timer now requires every seat to be a bot); and the **black
market moved to your own turn** — arriving on the secret square sets `marketDue`,
consumed after a successful get-up (`resolveGetUp`), at your next turn start
(`startTurn`) if you arrived standing, or immediately via `arriveAtSecret` when you
slip there mid-move on your own roll. Off-turn `visitSecret` calls removed
(lightning, snake collision). `marketDue` cleared everywhere `onSecret` clears.

**Balance sweep** (Isak's ask: how does balance shift with player count) delivered
as SUGGESTIONS.md "2026-07-10" section — six grounded findings: rare events are
per-turn so chaos density scales with seats (B1, biggest); sniper grants are
per-round so duels are rifle-saturated (B2); fishing difficulty curves are GLOBAL
so full tables sour the pond ~3× faster per person (B3); black-market markup
inflates with anyone's visits (B4); KOTH sole-1st trophy is a fountain in duels,
scarce at 6 (B5); AoE/trapdoor/crown observations (B6). Proposed one-place fixes
per finding + a `BALANCE.REF_PLAYERS` DATA recipe. Nothing built — Isak picks.

**Verified 15/15 headless Edge** (statics, purse, card held in mixed / auto-closed
in all-bot, market deferred off-turn + opens on get-up / turn start / own-turn
slip, full 4-bot game to a winner in 27 rounds, 0 JS errors). Harness notes for
next time: stub rAF, auto-fire `animationend`, and call `showScreen("game")`
before `startTurn()` — `roll()` refuses while any `.screen.show` is up (that cost
one debug loop).

---
## 2026-07-10 — balance tuning pass (Isak, live)

Five DATA-only tweaks, no logic touched:
- **KOTH lap** pays **8** trophies, was 10 (`KOTH.TROPHY_WIN`) — also answers the
  open balance question in QUESTIONS.md.
- **💰 Gold rain** pays **30** coins, was 50 (`GOLD_RAIN.COINS`).
- **👑 Crown** costs **5**, was 10 (`SHOP_CATALOG`).
- **⭐ Lucky star** ×2 as likely: `LUCKY.CHANCE` 0.004 → 0.008.
- **⚡ Lightning + 🔄 fate swap** ×1.5: `LIGHTNING.CHANCE` 0.005 → 0.0075,
  `FATE.CHANCE` 0.0033 → 0.005.

RULES.md synced (it still carried the pre-"3× rarer" percentages for the rare
events — now shows the true new odds). Verified: headless Edge load renders the
full UI with the new constants, no boot errors.

---
## 2026-07-06 — 🏆 King of the Hill mode + game-mode select screen (autonomous)

Isak's spec, built start-to-finish autonomously: game modes pop up on Play, and
King of the Hill = collect the most trophies inside a chosen number of rounds.

**Mode screen**: new `screenMode` between title and setup (Play → mode → players;
Back walks the chain in reverse; the in-game "New game" button starts at the mode
screen too). Modes are a `GAME_MODES` DATA table — id/ico/name/desc — so a future
mode (Family mode is queued) is one entry + its rules. `game.mode` carries the
pick; "Play again" replays the same mode + rounds.

**Rounds slider** (KOTH only, on the setup screen): `<input type=range>` 5–60
with a live label; default **6 × players** (`KOTH.ROUNDS_PER_PLAYER`, clamped) —
5 players → 30, straight from Isak's "25–30 sounds reasonable for a group of 5".
It re-follows the seat count until the player drags it (`chosenRounds` 0 =
untouched).

**The mode itself** (all tunables in `KOTH`): `awardTrophy` (mode-gated no-op in
Classic) + `iconPopup` (generalised from `coinPopup`, 🏆 pops staggered like the
blue-coin fanfare, capped at `FX_MAX_POPS`). Sources: start-of-turn **sole-1st**
check in `startTurn` (same predicate as the Crown, pos > 0 so the start lane
never pays); **fish catch** in `runFishing`; **tile 90** in `finishPlayer`, which
is now async + mode-aware — the KOTH branch banks `TROPHY_WIN`, bumps `p.laps`,
confettis, and walks the runner back to `pos 0`. `afterKothLap` gives the post-lap
turn its ending (a rolled 6 still re-rolls, from the start lane); the
mid-encounter bounce-onto-90 case is caught by a `p.laps` delta in `moveCurrent`.
`endTurn` checks the round cap and calls `finishKoth`: sort by trophies (tie →
board position), same podium/leaderboard with 🏆 counts appended. Scoreboard
shows 🏆N; HUD gained a "Round X of Y" line. Classic paths behave exactly as
before (the classic branch of `finishPlayer` is untouched; all 4 call sites
awaited).

**Verified headless Edge** (`--headless=new --virtual-time-budget`, rAF shim +
an animationend shim for the gun cutscene): **29/29 checks** — mode screen,
slider defaults/range/hidden-in-classic, classic regression (fields, finish,
banner without 🏆, awardTrophy no-op), KOTH defaults/explicit rounds/HUD line,
lap via direct call / rolled 5 / rolled 6 (keeps turn) / bounce mid-encounter /
off-turn `resolveLanding`, sole-1st + tie + start-lane guards, fish trophy,
round-cap end with trophy-then-position tie-break — plus a full **40-round
4-bot KOTH game** (organic laps in rounds 22 & 27; final 15/14/13/12 — lead-
holding and lapping pay comparably at 40 rounds) and a full classic 4-bot game.
0 JS errors. Harness note: full bot games need `SPEED.fastForward` + botThoughts
off to fit the virtual-time budget.

**Queued** (Isak's asks): Mario-Party-style **end-of-game bonus trophies**
(needs a category list — candidates logged in TASKS.md) and the **Family mode**
rule walkthrough (explicitly a WITH-Isak session, not autonomous). Defaults
logged in QUESTIONS.md (sole-1st, downed leaders collect, tie rule, 6-re-roll
after a lap, rounds formula, all-chaos-rules-on).

---
## 2026-07-06 (later) — 💰 Gold-rain wheel slice + shop pass-by + candle-lightning

Three rule edits Isak asked for directly:

**🕯️→🌩️ Soul Candle lightning penalty**: a candle holder struck by lightning is
hurled `CANDLE.LIGHTNING_MULT` (2×) times as far back — `lightningStrike` scales
`LIGHTNING.BACK` when `victim.passive === "soulcandle"`, with its own log line
(dynamic distance, no hardcoded "twice"). Applies to every strike path (rare event,
which already homes in on candle holders, and the 🎲 random-target wheel effect).
Item card stays atmospheric ("the sky takes notice"); detail in RULES.md.
Verified in the same harness (14/14 now): plain strike 30→23 (7 back), candle
strike 60→46 (14 back), both downed.

**💰 Gold rain (8th wheel slice)**: pays `GOLD_RAIN.COINS` (50) with a new `gold`
coin-shower FX, then the weight hammers the spinner **two rows straight down** the
board — same column via `cellRC`/`rcToCell`, *not* back along the path. Falls fewer
rows if the floor is closer; on the bottom row there's nowhere to fall, so
`downPlayer` flattens them in place. Ladders/chutes/tile rules fire on the landing
square (`resolveLanding`). Tunables in `GOLD_RAIN`; handler `goldRain` next to the
other wheel effects; slice added to the three `WHEEL_*` data arrays (odds now 1/8).

**Shop pass-by** (`FEATURES.shopPassby`): stepping onto a gold square mid-move —
without landing on it — pauses the walk and opens the shop (`shopPassby` helper →
`runShop`; bots auto-spree as usual), then the move carries on. Wired into the step
loops of BOTH `moveCurrent` and `advancePlayer` (indexed loops; the final path cell
is excluded — landing is still the tile rule's job). Covers backwards radiation
hops too.

Machine-verified headless (10/10 checks, 0 errors): mid-board drop 43→25 +50 coins,
bottom-row flatten, one-row fall 16→3, pass-by fires once passing tile 6, continues
to landing square, and does NOT fire when landing on the shop. (Headless note:
`requestAnimationFrame` needs a setTimeout shim under Edge `--headless=new
--virtual-time-budget`, or every token tween hangs.)

Open judgment call: from the second-to-bottom row the gold rain drops the single
available row (still upright) rather than knocking over — flagged in QUESTIONS.md.

## 2026-07-06 — 9 new items + black market v2-lite + QoL batch (Isak's picks)

Isak picked from `Next/SUGGESTIONS.md`: Monkey's Paw, Loaded Dice, Helmet, Crown,
Mystery Box, Snowball, Banana Peel, Soul Candle, "the QoL idea", plus a NEW item
that redirects an effect onto another player (became the **🪞 Mirror**).

**Normal catalog** (now 12 entries): 📦 Mystery Box (3, random consumable, never a
box), ❄️ Snowball (6, freeze-at-range via `freezePlayer` so Shield/Mirror apply),
🍌 Banana Peel (5, first placeable trap — `game.traps` + `springBanana` wired into
BOTH landing paths before the tile rules; new generic `pickTileOnBoard` click-a-tile
picker), 🪞 Mirror (7, `deflectHit` at the top of `downPlayer`/`freezePlayer` —
covers sniper/gun/horn/snowball/lightning; deflects to the NEAREST standing rival,
target's Shield still blocks, mirror chains bounce until someone takes it),
🪖 Helmet (8, passive, `getupNeed` → 1), 👑 Crown (10, passive, +1 coin per
turn started in sole 1st, `startTurn` hook).

**Black market v2-lite**: new dealer-only `EXOTICS` DATA table + purple `.btn.exotic`
styling; the shelf is now 2 exotics (fixed prices) + 1 normal item (old dynamic
price); exotics get their own 🕯️ toggle group in Advanced settings. The three
exotics: 🐒 Monkey's Paw (teleport anywhere except 90, THEN the board scrambles via
`shuffleTiles(msg)`, THEN the landing resolves), 🎲 Loaded Dice (3 pick-your-roll
charges tracked on `p.diceCharges`, shown in the bag; last charge → `p.curseRolls=3`
forced 1s, get-up rolls included), 🕯️ Soul Candle (permanent +2 `MOVE_BONUSES`
entry; `canBuy` locks the passive slot forever; `strikeLightning` retargets to a
candle holder over the leader).

**QoL** ("the QoL idea" — built the 3 concrete ones, logged the ambiguity):
settings persist in localStorage (`saveSettings`/`loadSettings`, saved on every
change, loaded before `buildAdvanced()`); 🔊 master volume slider (all SFX now route
through a master `GainNode`, kill-voice `Audio.volume` follows, 0 = mute); ⏩
fast-forward bot turns (`ffms()` divides `sleep`/`tweenToken`/dice-spin/auto-roll
waits by `SPEED.FF_DIV` ONLY while the current player is a bot).

Bots got values + timing for every new item (`BOT.ITEM_VALUE`, `botMaybeUseItem`);
`canBuy` also refuses a second Loaded Dice while one is held.

Verified headless Edge (`--virtual-time-budget`, rAF + animationend stubs): 29/29
targeted checks (toggle rows ×16, exotic lookups, candle slot-lock, dice dup-block,
helmet/fish getup, settings roundtrip, ffms bot-only, crown lead-only, mirror
deflect/chain/vs-shield, snowball in/out-of-range/vs-shield, 8× box pops all valid,
banana place/spring/owner-immunity, loaded-dice crumble→curse, candle +2 +
lightning retarget, scoreboard 🪞, dealer exotic styling, forced-face + cursed-1
roll flow, paw scramble, rich bot buys an exotic) + a full 4-bot game to a winner
(87 rounds, popups AND fast-forward on), **0 JS errors**. Harness gotcha for next
time: `roll()` refuses while any `.screen.show` is up — call `showScreen("game")`
after a scripted `newGame` or nothing moves.

---
## 2026-07-05 (evening) — scrambled-board option + item-text clarity pass

Isak: (1) an advanced-settings option to start with a scrambled board, (2) check the
other items are clear about on-use vs not. Built: new **🗺️ Board** group via a
`BOARD_OPTIONS` DATA table (key/ico/name/desc/enabled + `boardOpt(key)`); the
`ADV_SECTIONS` registry generalised — each group now declares an `entries` table and
one generic `buildToggleRows` renders all groups. The wheel's 🌀 shuffle was factored
into `scrambledLayout()` (pool → Fisher-Yates → per-type slices) + `setSpecialTiles()`
(in-place splices, TILE_RULES follows) + `DEFAULT_SPECIALS` (canonical layout captured
at load); `shuffleTiles()` keeps only the repaint + fx. `newGame` now calls
`setSpecialTiles(boardOpt("scrambledStart") ? scrambledLayout() : DEFAULT_SPECIALS)`
BEFORE `buildBoard()` (no repaint needed — buildBoard paints from the arrays).
Side-effect fix: with the option off, every new game resets the canonical layout, so
a mid-game 🌀 wheel shuffle no longer leaks into "Play again". Item descs: all
consumables standardised to "When used: …" (Shield/Clover/War Horn rewritten — Clover
was the genuinely unclear one), passives already read "Passive: …".

Verified headless Edge: 13/13 targeted (2 groups, board toggle off by default,
checkbox→flag, 10 scrambled newGames all valid — counts kept, tiles distinct, never
on ladders/snakes/1/90 — and actually moved, scrambled shop paints gold, toggle-off
restores canonical, wheel-shuffle leak fixed, desc convention) + a full 4-bot game on
a scrambled board to a winner (24 rounds). Harness notes: stub rAF AND auto-fire
`animationend`/`transitionend` via an EventTarget.addEventListener patch, or bot
games crawl (~60 virtual s/turn) and never finish inside the budget; the embedded
kill-voice `audio.play()` throws NotAllowedError headlessly (no user gesture) —
ignore it. Screenshot eyeballed: both groups render correctly.

---
## 2026-07-05 (later) — advanced settings + item toggles + inventory QoL

Three-task batch from Isak. (1) **⚙️ Advanced settings** on the setup screen: a
styled `<details>` block under the Autonomous-mode toggle; groups are pull-down
`<details>` built from a new `ADV_SECTIONS` registry (`buildAdvanced()`, run once at
init so checkbox + open/closed state persist across visits to the screen). First
group **🛒 Items** (`buildItemToggles`) renders one checkbox row per `SHOP_CATALOG`
entry — icon, name, dimmed desc — writing `item.enabled` directly; `shopStock()`
already filters on `enabled`, and the black market draws through `shopStock()` too,
so disabling covers both shelves with zero new game logic. Future catalog items
appear in the list automatically. All items disabled = empty shelf; `renderShop`
just offers "Leave shop" and `botShopSpree` breaks immediately — safe. (2) Coffee
desc → "When used: +4 to your next roll." (3) `renderInventory`'s Use button no
longer calls `openInventory()` after the item resolves — the panel stays closed.

Verified headless Edge (`--dump-dom`, virtual time): script runs to the end
(`buildAdvanced` is last before `showScreen`), exactly 6 `class="adv-item"` rows +
1 `adv-group` in the DOM, new coffee text present. Docs: RULES.md (item-toggles
paragraph + stays-closed note), README Next, TASKS.md. Open defaults logged in
QUESTIONS.md (mid-game toggling scope, no localStorage persistence).

---
## 2026-07-05 — 📯 War Horn (guest idea, live session with Isak + a friend)

New consumable designed by a visiting friend: **War Horn** (7 coins) — blow it and a
blast wave sweeps the blower's row, knocking flat every rival *standing* on it.
Implementation: `HORN` DATA block (ring look/timing), catalog entry, `hornTargets`
(row via `cellRC`, excludes self/finished/off-board), `hornBlast` (flourish first like
other consumables, then `SFX.horn` — a 3-oscillator brassy swell — plus expanding
shockwave rings with a CSS `r` transition, then `downPlayer` per standing target so
armed Shields block, screen shake, `announceKill` at 3+ felled). Already-down/frozen
players are untouched (their `getupMin` is never reset — deliberate difference from
the sniper, which re-hits everyone in the beam). Bots: `ITEM_VALUE.warhorn:3`, blow
only when a standing unshielded rival shares the row, bag-full forces it. RULES.md +
README updated.

Verified headless Edge (rAF + animationend stubbed, virtual time): 15/15 — catalog,
row targeting (incl. start-lane blower hits nobody, finished immune), shield
block+spend, down-rival getupMin preserved, horn consumed, triple blast → announcer
called with 3, bot hold/blow decisions, full 4-bot game to a winner (19 rounds),
0 JS errors. Harness note: a full popups-on 4-bot game needs a virtual-time budget
well past 400s (~18 virtual s/round) — 2 500 000 worked.

---
## 2026-07-04 (evening) — the 6-answer batch + 2 bonuses

Blue passive banners in the shop (`.btn.passive`, `--passive-blue`). Embedded gruff
kill voice: SAPI (Zira, pitch −10) → trimmed, tanh-distorted, 8-bit, header-rate
0.62 → two ~30 KB base64 WAVs in `KILL_VOICE`; double kill retired
(`KILLSTREAK.MIN:3`, `LABELS` keyed 3/4) and `fireSniper` counts only players
knocked standing→down (frozen/lying in the beam don't add). Gloves 8→6. Item
flourish is now awaited: hover ~1s (`ITEM.FLOURISH_MS`) THEN the effect applies
(useItem/botMaybeUseItem async; inventory closes during it and reopens). Graze
follows the drawn snake curve (`distToSlideCurve`; `SLIDE_CURVE.SEG_PX` shared with
drawSlide). Rule cards: kickdown text is now just the SHAME line; new `shamefall` +
`mutation` cards with name templating (`RULE_INFO.text` may be a function,
`revealRuleOnce(key, arg)`). Bonuses: ↩ Back on the support pick (returns to the
orange choice; `runOrange` loops), and `SETBACK_TILES` joins `shuffleTiles()`.

Verified headless Edge: 18/19 checks (data, cards, staged 3-scenario sniper counting,
setback shuffle legality/movement, on-curve graze proof) + full first bot turn,
0 JS errors. The 19th (full bot game to a winner) stalls mid-roll under
`--virtual-time-budget` on the PRE-batch baseline too — harness artifact
(perf.now/rAF vs virtual time), not a regression. Patch `performance.now = () =>
Date.now()` in the iframe realm to get the dice loop through virtual time.

---
## 2026-07-04 (later) — Isak's tuning pass on the morning batch

Pawns ×1.25, over-head popups ×2 with the ❄️ freeze badge kept at ×3 (new
`TOKEN.FREEZE_ICON_SCALE`); blue-coin fanfare pings 100ms apart (was 200);
`botSupportTrap` restored — a supporting bot springs an available trap 70% of the
time (`BOT.SUPPORT_TRAP_CHANCE`), otherwise (and always when no trap exists) boosts
a random rival. Orange pick odds stay fixed at 4/7·2/7·1/7. Verified headless Edge
×3 — 25/25 checks (trap vs random split measured 98/22 over 120 supports, safe-board
pure-random confirmed) + full games, 0 JS errors.

---
## 2026-07-04 — question answers folded in: coin fx tiers, genuine bot support, ×1.5/×3 sizes, settings screen

Isak answered 4 of the open questions; all built this session. (1) **Coin tiers** — new
`COIN_FX` DATA block: a rolled 6 pays 1 coin with NO sound/icon (scoreboard only), yellow
pays 1 with the ping only, blue pays 3 with a fanfare (three big pops + three pings,
200ms apart, ×1.5 scale — `awardCoin` gained an `fx` arg, `coinPopup` a scale arg).
(2) **Bot support is genuine** — `botSupportTrap` + trap/trailing tunables deleted;
`botSupportTarget` picks a random rival; orange odds pinned to wheel 4/7 · support 2/7 ·
gun 1/7. (3) **Pawns ×1.5, over-head popups ×3** (`TOKEN`). (4) **Popups faster**
(700/650ms) + a **Settings screen** off the title menu (button under Play) with a
checkbox → `FEATURES.botThoughts`. RULES.md/README updated; questions checked off.
Verified headless Edge ×3 — 23/23 checks each + full 4-bot games to a winner
(45/20/26 rounds), 0 JS errors. Harness notes: `const` DATA isn't on `window` — use
`eval` in the iframe realm; open `showScreen("game")` before `startTurn()` or bots
won't roll (keydown/auto gates on `.screen.show`).

---
## 2026-07-03 (later) — Isak's 4-point batch: blue-only coins, bigger pawns/icons, switchback arrows, bot brain

All four built + pushed. (1) Plain yellow tiles pay nothing now — `COIN.PLAIN:0` and
`awardCoin` skips 0-coin awards, so the 🪙 pop only appears on blue (3) and rolled-6.
(2) Pawns ×1.18 via a scale wrapper in `makePawn`; every over-head icon (coin pop, item
flourish, ❄️, SHAME, turn arrow) ×1.5 and the shield bubble follows the pawn — all from
the new `TOKEN` DATA const. (3) White up-arrows across all nine switchback boundaries
(9→10 … 81→82) — `SWITCHBACK` DATA + `drawUpArrow`, drawn under ladders/slides.
(4) The queued "smarter bots" task: new BOT BRAIN section — `tileScore`/`landingScore`
value every landing in tiles; scored kick-vs-bounce (+ jitter), support weaponised onto
freeze/setback/fallout/chutes (`botSupportTrap`), sniper aims at the front-runner and
skips armed shields, value-based shopping sprees (`botItemValue`), timed consumables
(coffee held near the finish, clover waits for a clean landing/exact win, shield armed
on real threats), and bots don't know the trapdoor until it's sprung. Every decision
shows a 🤖 thought popup then the verdict (`botThink`/`botDecide`, `.botthink` CSS,
`FEATURES.botThoughts` to disable, timings in `BOT.THINK_MS/DECIDE_MS`).

Verified headless Chrome (`--headless=new`, virtual time, rAF + animationend stubbed):
19/19 targeted checks ×3 runs and full 4-bot games to a winner with popups on, 0 JS
errors; staged screenshot eyeballed (arrows alternate edges correctly, pawn/icon sizes
read well, popup renders). Harness gotchas for next time: a driver must call
`showScreen("game")` + `startTurn()` after `newGame()` or `roll()` silently refuses
(title screen's `.screen.show` blocks it), and compose harness copies with UTF-8 reads
(PS 5.1 `Get-Content -Raw` mangles emoji → cosmetic only). Open questions logged
(rolled-6 coin, "into gunfire" support, exact sizes, popup pacing).

---
## 2026-07-02 (evening) — animation + rules batch

Isak-directed, all pushed. Cutscenes now per-version switchable (`CUTS`) with a
`#preview=<name>` viewer. Leviathan: two redos REJECTED, live = original (v1).
Lightning v3: cloud fronts from both sides meet mid-sky. Nuke v3: drawn warhead
(straight fall), air-raid wail, fireball swallowed by the white, soft ear-ring,
knockdowns behind the white. NEW radioactive fallout rule (2 green tiles per nuke,
stacking −1..−5 sickness → recovery → permanent +1) via the registry recipe.
Freeze no longer spreads on contact — only landing adjacent freezes. Shield must be
USED to guard; plain blue tiles pay 3 coins. ⚠ Isak's original visions for
lightning/star/nuke were lost — capture animation specs verbatim in the future.

---


## 2026-07-02 (later) — shop fatal-error fix: self-contained again + error trap

Isak: landing on a shop tile froze the game (can't roll, can't do anything). Root cause
found in his **Downloads folder**: he plays downloaded single copies of `index.html`
(6 there, incl. one from today), and since 2026-06-30 the game silently depended on a
sidecar `shop-items.js` — missing next to a downloaded copy → `SHOP_CATALOG is not
defined` on shop landing → the turn's promise chain died → `busy` stuck true forever.
Reproduced headless (single-file copy), NOT reproducible with the full repo folder
(25/25 checks, real-Chrome click-driver sessions all clean — the registry refactor was
innocent).

- **Fix 1:** `SHOP_CATALOG` moved back **inline** as a labelled DATA block; `shop-items.js`
  deleted. The game is truly one self-contained file again (README's "send index.html to
  share it" is true again). README/RULES.md references updated.
- **Fix 2:** **error trap** (`reportCrash` + window `error`/`unhandledrejection` listeners):
  any uncaught error now prints `💥 Something broke: …` into the game log and releases
  `game.busy`, so a future bug can never silently soft-lock the game.
- Copied `shop-items.js` into Isak's Downloads so his existing copies work immediately.
- **Verified:** single-file scenario (land, buy, leave, next turn) 4/4; error-trap test
  (throwing rule → visible log + unstuck) 2/2; full suite 25/25. One harness-only gotcha
  found: bot fishing-loss → leviathan cutscene is rAF-driven and stalls under headless
  virtual time — stub `requestAnimationFrame` with `setTimeout(cb,16)` in harnesses
  (game itself unaffected in real browsers).

---

## 2026-07-02 — rules-engine refactor (extensibility pass)

Isak's direction: *"improve SS2 and make it optimally suited for adding in more and
more rules and details."* Refactor only — no gameplay change intended. Pushed.

- **The problem:** ~20 rules in, adding one meant touching 5–6 scattered places — the
  on-turn tile chain in `moveCurrent`, the off-turn chain in `resolveLanding`,
  `cellColor`, `isPlainTile`, plus tile consts. The two chains had already drifted
  (different order, subtle guards), and `shuffleTiles` had to re-sync a colour map with
  hard-coded hex literals.
- **The fix — a RULE WIRING layer** (new labelled block at the top of CONTROLLER):
  - `TILE_RULES` — one entry per special tile (fishing/teleport/orange/shop/setback/
    freeze) with `tiles`, `color`, `feature`, `onLand(p,ctx)` / `offLand(p,ctx)`
    (return `true` = consumed the landing), optional `matches` override (freeze reaches
    beyond its own tiles; teleport honours `skipTeleport`).
  - `LANDING_ORDER.turn` / `.offTurn` — explicit priority per path, preserving the old
    semantics exactly (freeze checked last on-turn; setback → freeze → teleport
    off-turn; fishing/orange/shop have no `offLand`, so they stay inert off-turn).
  - `runTileRules(p, ctx)` — the one generic loop both `moveCurrent` and
    `resolveLanding` now call.
  - `cellColor` + `isPlainTile` derive from the registry (`specialTileColor`), so paint
    and plain-tile coins can never drift from the wiring again; `SPECIAL_TILES` became
    `FISH_COLOR`/`ORANGE_COLOR` DATA consts and `shuffleTiles` lost its sync step.
  - `MOVE_BONUSES` (fish/coffee/shoes) + `moveBonusTotal` replace inline bonus math;
    `RARE_EVENTS` (lightning/star/fate) + a loop replace the `startTurn` if-chain.
- **Docs:** CLAUDE.md gained the RULE WIRING layer row + an "Adding a new rule (the
  recipe)" cookbook; README's How-it's-built updated.
- **Verified (headless Chrome, virtual time, ×3 runs):** pre-refactor baseline captured
  first — `cellColor`/`isPlainTile` byte-identical for all 90 tiles after the refactor;
  dispatch tests for all six tile rules on-turn + off-turn (feature-flag gating,
  skipTeleport guard, freeze-by-adjacency, plain tile fires nothing); bonus pipeline
  math; 3 full autonomous 4-bot games each reached a winner. **25/25 checks per run,
  0 JS errors.**
- **Next:** build the next rule *through* the registry to prove the recipe (good
  candidates from the DATA TODOs: the black-market tile at the secret square, or
  randomised special-tile placement at game start). A quick human eyeball in the
  browser is still worth it, though no visual change is expected.

---

## 2026-06-30 — inventory + items rework, coord labels removed, encounter priority fix

Isak requests (three in one session). Pushed.
- **Removed the on-tile A1…J9 coordinate labels.** The grid coord *system*
  (`cellRC`/`rcToCell`/`cellLabel`/`neighborCells`/`tileBelow`) stays in code for
  programming; nothing is drawn on the tiles now (the 1–90 number stays).
- **Encounter resolved before tile events.** In `moveCurrent`, the bounce/kick choice
  now runs *before* fishing/teleporter/orange/shop/setback/freeze. Hop forward → you
  leave the tile, its event never fires; kick the occupant back → you keep the tile and
  the event triggers. Plain (unoccupied) landings unchanged.
- **Inventory + item rework.** New **🎒 Inventory** button by the die: on your turn,
  before rolling, open it and *use* consumables, then roll. Bag = **3 consumables + 1
  passive** (`INV`). Items now **cost coins** and are bought at the gold shop (full
  catalog with prices + a Leave button; re-renders per purchase).
  - **☕ Coffee** (4, was Speed Boots) — +4 next roll.
  - **🛡️ Shield** (6) — auto-blocks the next knockdown/freeze; shows a translucent
    **blue bubble** around the pawn while held (`updateShield`/`.shieldbubble`).
  - **🍀 Four-leaf Clover** (10, was Lucky Charm) — guarantees a **6** next roll
    (`forceSix`; consumed in `roll()`).
  - **👟 Running Shoes** (10, NEW passive) — +1 every roll; a new passive replaces the
    old one (lost forever).
  - Per-player `items[]`/`passive`/`rollBonus`/`forceSix` replace the old single
    `shopItem`. Catalog (id/ico/name/desc/kind/cost) is data in `shop-items.js`; effects
    are keyed by id in `index.html`. Bots buy + auto-use Coffee/Clover.
  - **Verified**: headless-Chrome harness, 47/47 checks pass, 0 JS errors (catalog
    costs, bag limits, passive replace, shield bubble add/pop, use→modifier wiring,
    inventory/shop builders, bot auto-use).

---

## 2026-06-30 — coordinate grid + ice spreads to neighbours

Isak request. Pushed.
- **Grid coordinate system.** Added the single-source grid mapping the long-standing
  `cellCenter` TODO asked for: `cellRC(cell)→{row,col}` (row 0 = top, col 0 = left),
  `rcToCell`, `cellLabel` (A1…J9), `neighborCells(cell,radius)` (the 8 around at radius 1,
  diagonals included, off-board dropped), and `gridNear(a,b,radius)` (Chebyshev distance).
  `cellCenter` and `tileBelow` now read these instead of repeating boustrophedon math —
  verified byte-identical to the old formulas for all 90 cells, so rendering/movement is
  unchanged. Each tile renders an **A1…J9 badge** bottom-right (the 1–90 number stays
  top-left, since the whole game addresses tiles by number).
- **Ice spreads.** Per Isak's clarification, the ice *tile* still only freezes a direct
  landing — but a newly-frozen player now freezes anyone on the 8 surrounding tiles
  (diagonals) + anyone on their tile via new `spreadFreeze`. **Single ring** (caught
  players don't re-spread), Shield absorbs it. The existing "moved next to a frozen player
  → freeze" reactive check was upgraded from cell-number distance to real `gridNear`
  8-way adjacency. `FREEZE.ADJ` is the reach knob; rule popup + RULES.md updated.
- **Verified headless (Chrome --dump-dom):** 0 load errors; cellCenter/tileBelow ==
  old formula for all 90 cells; full grid round-trip/label/adjacency checks; freeze
  catches orthogonal + diagonal + same-tile neighbours, spares far players, the ice tile
  alone gives no aura, and a Shield blocks the spread. Screenshot confirms the coordinate
  badges are legible and well-placed.
- **Next:** human play-test for feel — is the freeze spread too punishing in a crowd? Are
  the coordinate badges helpful or cluttered (could become a toggle, or replace the number)?

## 2026-06-30 — six-roll priority fix + gun rework

Isak request batch. Pushed.
- **Roll-again priority bug fixed.** Rolling a 6 then landing on a choice/minigame tile
  (orange, gold shop, fishing, teleporter, setback, freeze) used to fire that tile's effect
  immediately and end the turn — cancelling the extra roll. Now `moveCurrent` computes
  `rolledSix` and gates each of those special-tile branches on `!rolledSix`: on a 6 the
  square you land on does nothing and you roll again. Special tiles only activate on the
  square you FINISH your turn on (a non-6 landing). Ladders/slides still apply on every
  landing (movement, not a choice). Verified headless: a 6 onto an orange tile leaves the
  player on it, turn not handed off, no choice bar, no hang; full autonomous game still
  terminates with 0 JS errors.
- **Gun cutscene slowed + reshaped.** Timing: chamber-read-before-spin 1.0s→2.4s,
  gun-drawn-but-not-fired 0.26s→1.1s, `SPIN_MS` 1.2s→2.0s, `SHOT_GAP` 0.24s→0.43s, plus
  longer self/blank/final beats. Visual: the tiny revolver's fat 32px round cylinder (which
  read as an upside-down cannon) replaced with a simple flat-gray blocky pixel pistol
  (slide + barrel + small chamber + angled grip, 1.5px hard outlines) in the `.tg-*` CSS.

### Next when resumed
- Eyeball the new pixel gun in-browser (silhouette can't be verified headlessly); tweak the
  `.tg-*` block sizes/positions if it reads off, esp. aiming left (the sprite rotates, so the
  grip can point up — add a vertical flip if that bothers you).
- Decide whether the hidden encounter (bounce/kick) should also defer on a 6 (left firing for
  now — it's a positional rule, not a tile effect).

---

## 2026-06-26 — fish powers + secret square + smarter bots

Isak request batch (one message, several asks). Pushed.
- **Smarter bots, two ways.** (1) On orange squares they no longer just spin the
  gun/roulette — `BOT.ORANGE` reweighted to wheel:5 / gun:3 / support:2. (2) Bot fishing
  odds now scale with how many fish have already been caught in the *game* (new global
  `game.fishCaught`): `FISH.BOT_LOSS_BY_CATCHES = [.40,.60,.80,.90,.95]` — ~40% loss on the
  first catch, climbing to 95%. Replaced the old streak-based `WIN_BASE/WIN_STREAK_DROP/WIN_MIN`.
- **Secret square before tile 1** (`FEATURES.secretSquare`). Logical pos 0 distinguished
  from the start lane by `p.onSecret`; not drawn until someone stands on it (`showSecret`/
  `hideSecret`, viewBox widened left to make room). Discovered only by being thrown back
  past the start: new `setBackPos` helper routes lightning + pile-up knock-backs onto it
  instead of clamping to tile 1. New `RULE_INFO.secret`.
- **Fish powers** (`FEATURES.fishPowers`, all tunables in the `FISH` DATA block): every
  3 fish = +1 movement/turn; 2+ fish = break out of ice on a 3+ (new `getupNeed`, shared
  by the HUD hint and `resolveGetUp`); 2+ fish = 1-in-10 slip off a ladder (`applyLink`);
  3+ fish + a teleporter = overload that shuffles everyone (`shuffleAllPositions`, new
  `RULE_INFO.teleportshuffle`).
- **Verified headless (Chrome):** pure-logic unit checks + targeted in-game paths
  (teleporter overload, fish-3 teleporter, secret-via-lightning) + 3 full autonomous
  games, **0 JS errors**; a screenshot confirms the secret square reveals with the pawn on
  it and the scoreboard reading "secret 🚪".
- **Next:** human play-test for *feel* (fish-power balance, slip frequency, how often the
  secret square actually shows up); maybe a small reveal animation when the secret square
  first appears.

## 2026-06-25 — per-seat Player/Bot selection (+ repo back to public)

Isak's request: be able to choose, per player, whether a seat is an active (human) player
or a bot — and make the GitHub repo public again.
- **Per-seat Player/Bot toggle** in the setup screen (one button per row, Player⇄Bot).
  Added a `bot` flag to each roster entry / player object. Reworked the old whole-game
  `autonomousMode` global into a per-turn signal: `game.autonomous` now tracks **the current
  seat** (set in `newGame` and on every `endTurn` hand-off). All the existing autonomous
  helpers (auto-roll via `maybeAuto`, auto-bounce, auto-target, reveal auto-dismiss) already
  key off `game.autonomous`, so a bot's turn drives itself while a human's waits for input —
  no other logic changed. The *Autonomous mode* checkbox now means "make every seat a bot."
  Bot seats show a 🤖 in the scoreboard; the replay/“change players” paths keep each seat's
  bot flag.
- **Verified headless (Chrome --dump-dom):** all-bot game finishes with a winner; a mixed
  game stalls on the human until input then plays through once the human rolls (bots take only
  their own turns); 0 JS errors in every scenario.
- **Repo made public again** and committed/pushed (see session-end protocol).
- **Next:** human eyeball for feel; smarter bot decision policies; PNG board skin.

## 2026-06-25 (hourly loop #4, final) — integrity pass + move-amounts → DATA

Last autonomous tick before Isak stopped the loop (cron `f5b0d03e` cancelled).
- **Integrity:** clean load + a full autonomous game to a winner, 0 JS errors.
- **Layering cleanup:** the fixed move/knock amounts were bare literals in logic — support
  `+5`, the wheel/RANDOM "next" `+1` and "+15", and the chute pile-up knock-back `-5`.
  Moved them into a new `MOVE` DATA block (`SUPPORT/WHEEL_NEXT/WHEEL_BIG/PILEUP_BACK`);
  numbers unchanged so play is identical. Also removed a dead `count` local in
  `moveCurrent`. Verified a full game still completes clean (0 errors).
- **Loop stopped** at Isak's request after finishing this change.

## 2026-06-25 (hourly loop #3) — integrity pass + smarter autonomous opponents

Autonomous tick.
- **Integrity:** clean load + a full autonomous game to a winner, 0 JS errors.
- **Smarter bots** (the "smarter autonomous opponents" Ideas item; only affects self-play
  demo mode): the autonomous players used to pick blindly — a flat 60% to accept a
  teleporter swap, and a uniform 1/3 on the orange square. Two issues fixed: a teleporter
  swap lands on a **random** rival, so accepting only pays off when you're behind the field
  — bots now accept only when the swap **improves their average position** (else rarely);
  and **support moves a *rival* +5** (bad for a self-interested bot), so the orange pick is
  now **weighted toward gun/wheel over support**. New `BOT` DATA block holds the knobs
  (`TELEPORT_GOOD/BAD`, `ORANGE`/`ORANGE_WEIGHTS`). Verified 3 full games complete clean
  (rounds 17/21/25, 0 errors) — the pickier teleport logic doesn't stall games.

## 2026-06-25 (hourly loop #2) — integrity pass + fishing tunables → DATA (layering)

Autonomous tick.
- **Integrity:** clean load + a **full autonomous game to a winner, 0 JS errors**. Nothing
  to fix.
- **Layering cleanup:** the fishing difficulty was a pile of bare literals buried in logic
  (`fishParams`, the bar physics in `fishingGame`, and the self-play catch-odds formula).
  Pulled them **all into the `FISH` DATA block** as named values — catch-zone curve, fish
  speed, retarget interval, drain/fill, bar gravity/reel/start, and the autonomous
  `WIN_BASE/WIN_STREAK_DROP/WIN_MIN`. **Numbers unchanged**, so play is identical; now
  fishing difficulty lives in exactly one labelled place (per the CLAUDE.md layering rule).
  Verified `fishParams` outputs match the old formula at streaks 0/2/5, and a full game
  still completes clean. Next obvious same-category cleanup: the bot's `0.6` teleport
  chance + orange choice still sit as literals in logic.

## 2026-06-25 (hourly loop #1) — integrity pass + lightning polish

Autonomous "improve the game / fix integrity" tick.
- **Integrity:** clean page load (0 JS errors) and a **full autonomous 4-player game played
  to a winner with 0 errors** (headless, rAF→setTimeout under virtual time). Nothing to fix.
- **Lightning polish** (was the top open Active item): rebuilt `lightningFx` — clouds
  gather + rumble → **distant pre-flickers** for tension → a **forked bolt** (soft glow +
  bright white core + branches) that **strikes several times** in quick succession → an
  **electric impact** (shockwave ring + sparks). Dropped the old fiery `explode` on the
  victim (didn't fit lightning). New tunables in the `LIGHTNING` DATA block
  (`GATHER_MS/FLICKERS/STRIKES/FORKS/SPARKS`). Verified headless: runs clean, 0 DOM leaks;
  screenshot shows the gathered storm + glowing forked bolt.

## 2026-06-25 (evening) — leviathan reworked (SVG profile dragon) + tiny-revolver gun

Isak's feedback on the two new cutscenes:

**Leviathan** — didn't look good; wanted it **sideways (profile)** with a **large maw**
and an **elegant body**, and **much slower / majestic** (not a round face smiling at the
camera). Rebuilt it as an **SVG overlay**: the body is now a **tapering ribbon** through a
travelling-sine spine (smooth head→tail taper), and the head is a **side-profile dragon**
with a hinged **maw that opens to gulp**, one eye, a swept horn and a whisker. Slowed the
glide to ~5.4 s and lowered/lengthened the wave for grace. Verified headless: runs clean,
token lands + restores, 0 leaks; screenshots show the profile head, the dip-and-gulp, the
rear-up and the spit.

**Gun** — the 🔫 emoji "doesn't look like a gun" and shouldn't pop up centre-screen;
wanted the **character to pull out a tiny revolver** and to **spin the chamber without
revealing what it lands on**. Replaced the big centre cylinder + emoji with a **small CSS
revolver** (barrel + 6-hole spinning cylinder + grip) drawn **on the shooter's own square**,
aimed at the leaders. The chamber **spins and stops with no reveal**; the hidden outcome
still resolves blank / live-×3-knockdown / self-backfire. Muzzle flash is now a CSS burst
(no emoji). Verified headless: blank/live/self all correct, 0 errors, 0 leaks; a zoomed
screenshot confirms it reads as a revolver.

## 2026-06-25 (later) — gun cutscene rebuilt (revolver roulette) + sniper de-explosioned

Rebuilt the gun set-piece to Isak's spec (kept in `TASKS.md`):
- Open the **6-chamber cylinder** so you **see the odds** (brass = live round, skull =
  self, dark hole = blank), **spin** it (lands a random chamber under the top notch),
  **flip it shut**, then draw a little **metal gun** aimed at the leaders. The landed
  chamber decides:
  - **blank** → a dud: one click + a single twitch, nothing happens.
  - **live** → **three shots**, knocking the leaders down with a **screen-shake each**,
    and crucially **no explosions** (replaced the old impact booms with shake + collapse).
  - **self** → the trigger backfires and the **shooter explodes** (the only gun explosion
    left).
- All tunables (chamber `LAYOUT`/odds, shot count, spin turns, every beat length) live in
  a new **`GUN` DATA block**. Factored shared `aimMark` + `gunShot` helpers; `gunFx`
  (the RANDOM "picked off" shot) no longer explodes either.
- **Sniper fix:** sniper hits no longer `explode()` — now a thud + screen shake + the
  target collapses, matching "no explosions for those it hits".

Verified in **headless Chrome** (rAF→setTimeout under virtual time): drove all three
chambers — blank downs no one, live downs exactly the three leaders, self downs only the
shooter — plus a sniper hit (target downed, no explosion). **0 JS errors, 0 DOM leaks.**
Screenshots confirmed the odds-cylinder and the metal gun firing with crosshairs/tracers.

## 2026-06-25 — leviathan cutscene rebuilt (blue Chinese-dragon serpent)

Replaced the old placeholder leviathan (gloom + water + tentacles + 🐙 + token dunk)
with the serpent Isak specced in `TASKS.md`:
- A **blue serpentine Chinese-dragon** — a tapering chain of segments following a
  travelling sine wave — **undulates across the screen**. As the head passes the
  victim's column it **dips to gulp them** (casual, opportunistic), then **exits the far
  side**. The head then **peeks back in from the edge, rears up, and spits the victim
  flying** on an arc to their new tile; the real token lands there and `resolveLanding`
  fires as before.
- All tunables (segment count/spacing/taper, wave amplitude/length, slither speed, every
  phase duration, spit arc/spin) live in a new **`LEVI` DATA block** — no magic numbers
  in the animation logic.
- `leviathanFx(fromCell, toCell, victim)` now takes the destination, so `runFishing`
  picks the spit tile first and the cutscene delivers the player there.
- Pure-JS rAF tween driver (`leviTween`); no new dependencies. CSS for the serpent
  segments/head (eyes, horns, whiskers) and the spat-out flier.

Verified in **headless Chrome** (rAF→setTimeout under virtual time): the full cutscene
runs with **0 JS errors**, the token's opacity is restored and it lands on the
destination tile, and **no DOM elements leak**. Screenshots confirmed the serpent shape,
the head rearing back in, and the player arcing out. Temp harness/screenshots deleted.

Still worth a human eyeball in the browser for *feel* (pacing/looks).

## 2026-06-24 (later) — verification + launcher + wheel fixes

Isak couldn't open the game by double-clicking `index.html`. Diagnosed + verified
the whole game using **headless Chrome** (`--dump-dom`, fast-timer harness):
- The page loads and the startup script runs with **no JS errors** — double-click
  failure was just the Windows `.html` file association, not the game.
- Added **`Play game.cmd`** — a one-click launcher (Edge→Chrome→default fallback).
- Drove **every new effect** (wheel incl. RANDOM, lightning/star/fate/gun/support,
  12 random-effects, and all four knock-onto-tile cascades): **0 errors**.
- Ran a **full autonomous game to completion**: winner reached tile 90, 0 errors.

Fixed two real bugs found during verification:
- The global `svg{ width:min(94vh,1030px) }` board rule was also sizing the **wheel
  SVG to ~795px** (overflowing its 240px box) — almost certainly the original
  "arrow not accurate" cause. Scoped it to `#board`; wheel is back to 240px.
- Made the wheel rotate about its true centre (`transform-box:fill-box;
  transform-origin:center`). Geometry test: all 6 slots now land centred under the
  pointer (≤2px off). Removed the dead `.wheelpointer` CSS.

Test harness files (`__test.html`, `__inject.html`) were temporary and deleted.

## 2026-06-24 — autonomous effects/wheel/fishing build

Isak asked me to write down the backlog (see `TASKS.md`) then work autonomously
through it without supervision until the token limit. Scope: explosions follow
the target, lightning/star/nuke/gun/leviathan animations, a 6th "RANDOM" wheel
slot + pointer fix, swap/star/lightning made 3× rarer, fishing easier+longer,
and passive tile activation when players are knocked around (off-turn too).

No local JS runtime (node missing), so changes are hand-verified + brace-checked.

Progress is tracked by the checkboxes in `TASKS.md`. Commits are pushed to
`main` after each working chunk (GitHub Pages serves from main, repo is private).

### Shipped this session (3 commits, all pushed to main)
1. **Explosions follow target + passive tile activation + 3× rarer events.**
   `explode(cell)`/`cellToScreen()`; `resolveLanding()` makes ladders/chutes/ice/
   teleporters fire when a player is knocked/moved onto them off-turn (depth-capped);
   lightning/star/swap chances ÷ 3.
2. **Animations + wheel + fishing.** Lightning (clouds/rumble/bolt+crack), lucky star
   (~4s carry), nuke set-piece (siren→5s→3s drop→blast→4s white-out), gun + leviathan
   visuals at the target tile, wheel RANDOM 6th slot + SVG-baked accurate pointer,
   fishing made easier/longer.
3. **Docs.** TASKS.md/LOG.md updated.

### Verify next session (IMPORTANT — not yet play-tested)
No local JS runtime here, so this was hand-written + brace-balanced only. Open
`index.html` in a browser and check:
- Wheel: all 6 slots land exactly under the pointer; RANDOM fires varied effects.
- Lightning/star/nuke/gun/leviathan all read well and target the right tile.
- Knock-around triggers: get someone bumped onto a ladder/chute/ice/teleporter on
  another player's turn and confirm it activates (and that nothing loops/freezes).
- Nuke timing feels right (~5s siren, ~3s drop, ~4s white-out).
- Fishing feels a little easier + longer.

### Next when resumed
- Do the play-test above; fix anything off. Then pull from Ideas in `TASKS.md`.
