# The Ladder Game — Rules

A summer-themed Norwegian *stigespill* (snakes & ladders). Single self-contained
`index.html` — double-click to play. 2–11 players, hotseat (share one device).

---

## Goal
Be the **first** player to land **exactly** on the final square (**tile 90**) —
that player **wins**. The game then ends and everyone is ranked: 1st is the
winner, and the rest are ordered by how far up the board they are. The end screen
shows a **podium** (1st 🥇 in the centre, 2nd 🥈 and 3rd 🥉 either side, with 4th
and 5th on the sides when there are enough players) followed by a full
**leaderboard**.

## The board
- **9 × 10 = 90 tiles**, numbered 1 (bottom-left) → 90 (top-left) in a
  boustrophedon (snaking) path.
- Every tile also has a **grid coordinate** shown in its bottom-right corner:
  rows are lettered **A–J top to bottom**, columns numbered **1–9 left to right**,
  so the top-left tile is **A1** and the bottom-right is **J9**. The number tells
  you path order; the coordinate tells you who is physically next to whom.
- **Ladders** carry you up; **chutes** slide you down. The set is balanced:
  ladders skip **124 tiles up** in total and chutes skip **124 down**, so over
  the whole board they cancel out.

## A turn
1. The current player (shown by the **bobbing arrow** above their pawn) taps the
   die or presses **SPACE / ENTER**.
2. The pawn steps forward that many tiles.
3. If it ends on a ladder or chute, it climbs / slides.
4. Then any optional rules below resolve, and play passes to the next player.

Multiple pawns share a tile **symmetrically** (centred when alone, fanned out in
a ring when crowded). Each pawn shows the player's name above it (long names are
clipped).

---

## Core rule

### Exact finish (bounce-back)
You must land **exactly** on tile 90. If a roll would overshoot, you bounce back
the leftover steps (e.g. on 88, a roll of 5 goes 89 → 90 → 89 → 88).
*Toggle: `FEATURES.exactFinish`. Off = any overshoot just reaches 90 and wins.*

---

## Optional rules (each can be toggled in code)

### Roll a 6 → roll again
Rolling a 6 lets the same player roll again (with a little celebration effect).
Chains if you keep rolling 6s.

**Priority:** a square you land on *because of a 6* is not your final stop, so its
choice/minigame effect does **not** fire — you simply roll again from it. Special tiles
(orange wheel/support/gun, gold shop, fishing, teleporter, setback, freeze) only activate on
the square you **finish** your turn on (a non-6 landing). Ladders and slides still apply on
every landing, since they're movement rather than a choice.

*Toggle: `FEATURES.sixRollsAgain`.*

### Encounter — bounce or kick (hidden rule)
Only **past tile 10** (the first 10 tiles are a safe zone). If you land on a tile
that already has another player on it, you choose:
- **Bounce over** — hop **+1 forward**. If you land on *another* occupied tile,
  you choose again (it can chain down a row, and can even bounce onto tile 90 to
  win).
- **Kick back** — knock **one random** occupant of that tile **−1 back**. If they
  land on another occupied tile they are **auto-kicked further back**, cascading
  until they reach a free tile or the safe first-10 tiles.

A bounce or a kick that ends on a ladder or chute **triggers it** (climb / slide).
The first time this rule fires, a popup explains it (**Enter** to continue —
Space won't skip it).
*Toggle: `FEATURES.encounter`.*

### Sniper (hidden rule)
Every **5th round** (round 5, 10, 15 …) the player in **last place** gets a
**one-shot sniper rifle**. On their turn, before rolling, a **red laser** follows
the mouse — **click to fire**. Every player on the beam is **knocked down**
(aim at empty space to skip the shot).

A knocked-down player, on their next turn, rolls to **get up** instead of moving:
- **3 or more** → they stand up. Their turn then ends with no move — **unless they
  rolled a 6**, in which case they stand and roll again to move.
- **2 or less** → they stay down and try again next turn.

*Toggle: `FEATURES.sniper`. (A round = one full pass through the players still in play.)*

### Kick a man while he's down (hidden rule)
If, on a **kick**, the player you kick is **already lying down**:
- They are kicked **straight to the tile directly below them** (one row down). Any
  ladder / chute on that tile still applies.
- **Shame** follows you: the word **"SHAME"** hovers over you for **3 of your
  turns**, and then **you collapse** too — and getting up now needs **4 or more**
  (instead of 3).

*Toggle: `FEATURES.kickWhileDown`.*

### Fishing (hidden rule)
Land on the **dark-blue square** and you play a quick **fishing minigame**. Like
all minigames it opens with a **"Get into position, NAME"** screen — press
**Enter** once the right player is at the keyboard. Then **hold the ↑ Up arrow**
to lift the green bar and keep it over the fish until the meter fills (a **catch**:
you keep a 🐟 and stay put). Let the meter empty and a **leviathan** swallows you
and spits you onto a **random tile near the start (1–30)**.

It's tricky even the first time, and **every catch in a row makes the next one
harder** (a 3rd straight attempt is brutal); a miss resets it to the base
difficulty. *Controls: only the **↑ Up arrow** — no mouse / space / enter.*

*Toggle: `FEATURES.fishing`. Trigger tiles = `FISH.TILES` (35, 49 & 70 — the dark-blue squares).*

### Fish powers (hidden rule)
The fish you catch aren't just trophies — carrying them changes how you play, with
both upsides and a catch:
- **Every 3 fish → +1 movement** on each of your turns (6 fish = +2, and so on). The
  die's face is unchanged — the bonus is added to how far you walk.
- **2 or more fish → break out of ice on a 3+** (instead of the usual 4+) …
- … but **2 or more fish also make ladders slippery**: a **1-in-10** chance to **slip
  right off** a ladder you would have climbed (you stay at its foot).
- **3 or more fish + a teleporter → overload!** Instead of a single swap, **everyone on
  the board is shuffled** to each other's tiles at random.

*Toggle: `FEATURES.fishPowers`. Tunables (`MOVE_PER_FISH`, `ICE_FISH`/`ICE_GETUP`,
`SLIP_FISH`/`SLIP_CHANCE`, `SHUFFLE_FISH`) live in the `FISH` DATA block.*

### Teleporter (hidden rule)
Two **teal squares** are teleporters. Land on one and you may **teleport — swapping
places with another player at random** (**Y** to do it, **N** to stay put).

### Faulty teleporter (hidden rule)
Step onto a teleporter **while carrying a fish** and it **misfires**: you're swapped
whether you want it or not, and it's **more likely to fling you toward a player
further up the board**.

*Toggles: `FEATURES.teleport`, `FEATURES.teleportMalfunction`. Teleporter tiles =
`TELEPORTERS` (22 & 66).*

### Deep freeze (hidden rule)
Land on an **icy square** and you **freeze solid** — you can't move until you roll
**4 or higher** to break free. The ice tile itself only freezes whoever lands on it,
but a **frozen player is contagious**: the frost reaches the **8 tiles around them**
(orthogonal **and diagonal**, plus anyone sharing their tile), so anyone caught in
that ring freezes too. The spread is **one ring** — a player frozen by the spread
doesn't pass it on again. A **Shield** absorbs a freeze. Being thrown next to a
still-frozen player later (by a knock-back, kick, etc.) can freeze you as well.

*Toggle: `FEATURES.freeze`. Icy tiles = `FREEZE_TILES` (29 & 63). Reach of the spread
= `FREEZE.ADJ` (1 grid-tile = the 8 neighbours); break-free roll = `FREEZE.GETUP_MIN`.*

### Lightning (very rare)
Once in a blue moon (about **1.5% of turns**) a storm strikes the player in the
**lead** — knocking them **down** and **back** down the board, with a flash of
lightning and a clap of thunder. Mercifully rare.

*Toggle: `FEATURES.lightning` (chance/distance in `LIGHTNING`).*

### Lucky star (very rare)
The flip side of lightning: once in a while (about **1.2% of turns**) a shooting
star favours whoever is **in last place**, sweeping them a good way up the board
(never far enough to win outright). A rare comeback for the underdog.

*Toggle: `FEATURES.luckyStar` (chance/distance in `LUCKY`).*

### Reversal of fortune (very rare)
About **1% of turns**, fate flips on a whim and the player **in the lead** trades
places with the player **in last** — an instant, dramatic shake-up of the order.

*Toggle: `FEATURES.fateSwap` (chance in `FATE`).*

### Orange choice — Wheel / Support / Gun (hidden rule)
Land on an **orange square** and pick one of three:
- **🎡 Wheel** — spin the wheel of fortune; each slice is **1-in-7**: **Nuke**
  (knocks down everyone *not* standing on a blue tile), **back to start**,
  **forward one square**, **forward 15 squares**, **🎲 Random event** (fires a game
  event based on the current board state — lightning hits the leader, star carries
  the trailer, fate swaps leader and last; may also do nothing), **🎯 Random (targets
  you)** (same pool of effects but all aimed at the spinner), or **🌀 Tile shuffle**
  (everyone on the board is sent to a fresh random tile, avoiding all snake and ladder
  squares).
- **🤝 Support** — choose another player and move **them** forward 5.
- **🔫 Gun** — Russian roulette: **1-in-6** the three frontrunners go down,
  **2-in-6** you shoot yourself down, otherwise **nothing**.

*Toggle: `FEATURES.orange`. Orange tiles = `ORANGE_TILES` (12, 46, 77).* The Wheel
shows a real wheel that spins for ~5 seconds (fast, then slowing) before landing.

### Pile-up (hidden rule)
**Slide down a chute into other players** and you bowl them over: anyone in the
chute's path is knocked **down** and back a space, and whoever sits at the **very
bottom** of the chute is hit the hardest (knocked further back).

*Toggle: `FEATURES.snakeCollision`.*

### The secret square (hidden rule)
There is a **hidden square before tile 1**. **No one starts on it**, and it isn't even
drawn on the board — so you'll never see it in a normal game. The only way to find it
is to be **thrown back past the start** (e.g. a low-tile **lightning** strike or a
**pile-up**): instead of stopping at tile 1, you land on the secret square, which then
**reveals itself**. From there you roll back onto the board as if starting again.

*Toggle: `FEATURES.secretSquare`.*

### The Shop, inventory &amp; items (hidden rule)
Four **gold squares** are cabin shops (tiles **6, 28, 52, 75**). Land on one and you
**spend your coins** on items. You carry a small inventory: **up to 3 consumables
plus 1 passive** at a time.

**Consumables** (held in your bag; *used* from the inventory **before** you roll):

- **☕ Coffee** — **4 coins.** +4 to your next roll.
- **🛡️ Shield** — **6 coins.** Absorbs the next hit: a sniper shot, a kick, a pile-up
  knockdown, or a freeze. While you hold it, a small **transparent blue bubble** shows
  around your pawn; the hit is negated and the shield is then gone.
- **🍀 Four-leaf Clover** — **10 coins.** Guarantees a **6** on your next roll (and a 6
  rolls again, so it chains nicely).

**Passive** (1 slot, always on while equipped):

- **👟 Running Shoes** — **10 coins.** +1 to *every* roll while worn. Buying or
  receiving any new passive **immediately replaces** the one you have, which is **lost
  forever**.

**Using items:** on your turn, before rolling, press the **🎒 Inventory** button next
to the die. Use Coffee or the Clover (Shield guards automatically), then roll. Bots
spend their Coffee/Clover automatically before they roll. Your held items appear as
icons in the scoreboard next to your name.

*Toggle: `FEATURES.shop`. Shop tiles = `SHOP_TILES` (6, 28, 52, 75). Bag size =
`INV` (`CONSUMABLES` 3, `PASSIVES` 1). Bonuses = `ITEM.COFFEE_BONUS` (4) and
`ITEM.SHOES_BONUS` (1). Item catalog (id, emoji, name, desc, kind, cost) lives in
`shop-items.js`; what each id does is keyed by id in the item logic in `index.html`.*

---

## Sound &amp; spectacle
Light **synthesised sound effects** throughout (dice, steps, ladders/chutes,
bounce/kick, sniper, fishing, teleporter, wins …) — no audio files, so it stays one
self-contained page. Toggle with `FEATURES.sound`. On the big dramatic moments
(nukes, the gun, lightning, the leviathan, sniper hits, pile-ups) you also get
**explosions, screen flashes and shakes**, and **confetti** rains down on the win.

---

## Players &amp; bots
On the setup screen each seat has a **Player / Bot** toggle, so you can mix humans and
bots in one game — bots take **only their own turns** automatically (a 🤖 marks them in
the scoreboard). The **Autonomous mode** checkbox is a shortcut that makes **every** seat
a bot, so the whole game **plays itself** — auto-rolls, auto-resolves every choice, and
auto-dismisses popups. Good for a hands-off / streamed game.

**Bot decisions:** on an **orange square** a bot spreads its pick across the wheel, gun
and support (it won't just spin the gun every time). At the **fishing** square a bot's
odds get **harder the more fish have already been caught in the game** — roughly a 40%
loss on the very first catch of the game, then 60% / 80% / 90% / 95% as the catches pile
up. *(Tunables: `BOT.ORANGE`/`ORANGE_WEIGHTS`, `FISH.BOT_LOSS_BY_CATCHES`.)*

---

## Toggling rules from code (the rule "layers")
All rules are layered so you can switch them on/off, or combine them into "game
modes" later. Edit the `FEATURES` block near the top of the `<script>` in
`index.html`:

```js
const FEATURES = {
  exactFinish:   true,   // exact landing on 90 (overshoot bounces back)
  sixRollsAgain: true,   // a 6 grants another roll
  encounter:     true,   // bounce / kick on an occupied tile past tile 10
  sniper:        true,   // every 5th round, last place gets a one-shot sniper
  kickWhileDown: true,   // kicking a downed player drops them a row & shames the kicker
};
```

The plain race (move → ladders/chutes → win) always works regardless of what is
turned off. Other tunables live nearby: `RULES` (dice sides, safe-zone size),
`SNIPER` (how often, hit radius, get-up threshold), `LADDERS` / `SLIDES`
(board content), and `ANIM` (timing).

## Controls
- **SPACE / ENTER** or click the die — roll.
- **B / K** — bounce / kick when the choice bar is up.
- **Enter** — dismiss a hidden-rule popup.
- **Mouse + click** — aim and fire the sniper.
