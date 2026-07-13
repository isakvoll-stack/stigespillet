# The Ladder Game — Rules

A summer-themed Norwegian *stigespill* (snakes & ladders). Single self-contained
`index.html` — double-click to play. 2–11 players, hotseat (share one device).

---

## Game modes
Pressing **Play** first asks which mode to play (the *Game mode* screen; modes
live in the `GAME_MODES` DATA table):

- **🏁 Classic** — the original race, described under *Goal* below.
- **🏆 King of the Hill** — a trophy hunt over a fixed number of rounds. The
  setup screen gains a **Rounds slider** (5–60; the default comes from a
  per-count table — **2 players → 20, 3 → 24, 4 → 26, 5 → 30, 6 → 32** (+2 per
  extra seat past 6) — and follows the player count until you move it).
  Every other rule plays exactly as Classic; only the goal changes. Trophies:
  - **+1** for starting your turn in **sole 1st place** (ties pay nobody; the
    start lane doesn't count).
  - **+1** for every **fish you catch**.
  - **+8** for reaching **tile 90** — you celebrate a *lap* and walk back to
    the **start lane**. The game rolls on; landing there on a rolled 6 still
    grants the extra roll.
  - When the rounds run out, a **Mario-Party-style bonus round** fires first:
    **3 categories** are drawn at random from 5 — 🪙 Fattest purse (most coins),
    🐟 Master angler (most fish), 🏔️ Peak bagger (most laps), 🎒 Gadget lover
    (most items used), 💀 Hardest knocks (knocked down/frozen the most) — and
    every leader of a drawn category earns **+2 trophies** (ties pay everyone
    tied; a category nobody scored in is never drawn).
  - Then **most trophies takes the hill**. A tie is broken
    by whoever is **furthest up the board**. The podium and leaderboard show
    everyone's 🏆 count, and the HUD shows *Round X of Y* all game.
  *(All payouts + the rounds formula are tunables in the `KOTH` DATA block.)*

## Game variants (Advanced settings → 🏁 Game)

- **👨‍👩‍👧 Family mode** — the calmer, more skill-based race. Most rules stay in
  play, but the chaos meta-layer switches off for the game: **no reversal of
  fortune**, **no gray warp square**, **no secret square / black market /
  Broken Gate pacts**, **no Singularity crafting**, and the orange square offers
  only **Wheel or Support** (the gun is retired — the wheel's 🎲 random slices
  can't draw the gun or a fate swap either). Radioactive fallout runs a
  **sharper but shorter** sickness: −1, −3, −5, −4, −2, then recovered (+1
  hardened as usual — `RAD.FAMILY_CURVE`). Everything else — sniper, shame,
  teleporters, fish rules, freeze, the rotten plank, the dizzy square, pile-ups,
  lightning, the lucky star, all shop items — plays exactly as normal.
  *(Toggle list in `FAMILY.OFF` / `FAMILY.WHEEL_SKIP`.)*

- **🎲 Two dice (experimental)** — every movement roll throws **two dice** and
  you **walk the one you pick** (click it, or press **1 / 2**; bots weigh both
  landings). **Doubles grant the extra roll** — rolling a 6 no longer does, and
  the doubles coin replaces the 6 coin. Only movement rolls are doubled:
  get-up/break-free rolls stay single-die (a 6 there still stands you up with a
  move), and forced rolls — Clover, Loaded Dice, cursed 1s — bypass the choice
  and keep the classic 6 rule. The Everburning Heart still allows no bonus
  rolls at all.

- **🥇 Match play** — play a **series**: *best of N* (3/5/7/9) or *first to N
  wins* (2–9), default **off**. The winner of each game banks a win; the HUD
  shows the series score, the end screen shows the running tally with a
  **▶ Next game** button, and the first to the target takes the match. A new
  match with the same settings starts from *Play again* or the setup screen.
  *(Settings in `MATCH`; live state in `series`.)*

## Goal
Be the **first** player to land **exactly** on the final square (**tile 90**) —
that player **wins**. By default the game then ends and everyone is ranked: 1st is
the winner, and the rest are ordered by how far up the board they are. The end screen
shows a **podium** for the top 3 only (1st 🥇 in the centre on a **gold** pillar, 2nd 🥈
on **silver**, 3rd 🥉 on **bronze** — each pillar blending into the player's own colour
at the very top), with **4th and 5th listed beside the podium** on the left, followed by
a full **leaderboard**. *(In King of the Hill the same podium ranks by trophies instead.)*

**Every leaderboard row shows the player's game stats**, with a **⭐ beside the best**
and a **⚫ beside the worst** in each category (ties mark everyone tied; a category
where everyone is equal marks no one): 👣 steps taken (⭐ most) · 🪙 coins earned
(⭐ most) · 🎒 items used (⭐ most) · 💫 times immobilised — knocked down or frozen
(⭐ fewest) · 🪜 times climbed — ladders, stars, teleports, any jump of 2+ tiles up
(⭐ most) · 🐍 times descended — snakes, knockbacks, drops of 2+ tiles (⭐ fewest) ·
🤝 player interactions — bounces, kicks and items aimed at others (⭐ most).
*(Walked moves — including backward walks from dizziness or radiation — count as
steps, not climbs/descents; the registry lives in `END_STATS`, tunables in `STATS`.)*

**The finish line is adjustable** (Advanced settings → 🏁 Game): a slider sets **how
many players must finish before the game ends** (1 = the classic first-past-the-post).
With a higher number, a finisher banks their medal and sits on tile 90 while the rest
race on for the remaining places; the game ends when enough are home — or when only
one racer is left, who then takes the last place automatically. A finisher gets **no
bonus roll on a 6** — their race is run. *(Setting: `FINISH.NEED`, clamped to the seat
count when a game starts.)*

## The board
- **9 × 10 = 90 tiles**, numbered 1 (bottom-left) → 90 (top-left) in a
  boustrophedon (snaking) path.
- Every tile also has a **grid coordinate** (used internally, not drawn):
  rows are lettered **A–J top to bottom**, columns numbered **1–9 left to right**,
  so the top-left tile is **A1** and the bottom-right is **J9**. The number tells
  you path order; the coordinate tells you who is physically next to whom.
- A white **up-arrow** sits on every switchback (9→10, 18→19 … 81→82) showing
  where the path turns up to the next row. *(Size/colour in `SWITCHBACK`.)*
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
Every **18th turn** (counting everyone's turns, so the pace is the same whether
2 or 6 are playing — roughly every 5th round at a 4-player table) the player in
**last place** gets a **one-shot sniper rifle**. On their turn, before rolling, a **red laser** follows
the mouse — **click to fire**. Every player on the beam is **knocked down**
(aim at empty space to skip the shot).

**Multi-kill announcer:** fell **3 or more** players with one shot and a gruff
voice calls it out — **TRIPLE KILL** / **QUAD KILL** (embedded voice clips; the
double-kill callout is retired). Only players knocked from **standing to down** by
the shot count — frozen or already-lying players in the beam don't add to the
streak. *(Threshold + labels in `KILLSTREAK`, clips in `KILL_VOICE`.)*

A knocked-down player, on their next turn, rolls to **get up** instead of moving:
- **3 or more** → they stand up. Their turn then ends with no move — **unless they
  rolled a 6**, in which case they stand and roll again to move.
- **2 or less** → they stay down and try again next turn.

*Toggle: `FEATURES.sniper`. Cadence = `SNIPER.EVERY_TURNS`.*

### Kick a man while he's down (hidden rule)
If, on a **kick**, the player you kick is **already lying down**:
- They are kicked **straight to the tile directly below them** (one row down). Any
  ladder / chute on that tile still applies.
- **Shame** follows you: the word **"SHAME"** hovers over you for **3 of your
  turns**, and then **you collapse** too — and getting up now needs **4 or more**
  (instead of 3).

**Exception — a frozen victim is furniture, not a man.** Kicking someone who is
**frozen solid** carries **no shame**: the ice block **glides 3 tiles back** in one
smooth slide (still frozen; tile effects fire where it stops, and a slide below
tile 1 lands it on the secret square). Booting the block away also clears the
frost off your square before the freeze check runs.

*Toggle: `FEATURES.kickWhileDown`; the frozen glide rides `FEATURES.freeze`
(`FREEZE.KICK_GLIDE`).*

### Fishing (hidden rule)
Land on the **dark-blue square** and you play a quick **fishing minigame**. Like
all minigames it opens with a **"Get into position, NAME"** screen — press
**Enter** once the right player is at the keyboard. Then **hold the ↑ Up arrow**
to lift the green bar and keep it over the fish until the meter fills (a **catch**:
you keep a 🐟 and stay put). Let the meter empty and a **leviathan** swallows you
and spits you onto a **random tile near the start (1–30)**.

It's tricky even the first time, and **every catch in a row makes YOUR next one
harder** (a 3rd straight attempt is brutal); a miss resets it to the base
difficulty. The pond keeps score **per angler** — someone else's hot streak
doesn't sour your fishing. *Controls: only the **↑ Up arrow** — no mouse /
space / enter.*

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
**4 or higher** to break free. The cold **lingers** around a frozen player: **land**
on any of the **8 tiles around them** (orthogonal **and diagonal**) — by a roll, a
kick, a swap, anything that moves you there — and you freeze too. Players **already
standing** next to someone when they freeze are safe; only a **new landing** catches
the frost. A **Shield** absorbs a freeze. **Kick a frozen player** and the ice block
**glides 3 tiles back** — shamelessly (see *Kick a man while he's down*).

*Toggle: `FEATURES.freeze`. Icy tiles = `FREEZE_TILES` (29 & 63). Reach of the frost
= `FREEZE.ADJ` (1 grid-tile = the 8 neighbours); break-free roll = `FREEZE.GETUP_MIN`;
kicked-glide distance = `FREEZE.KICK_GLIDE`.*

### The rotten plank (hidden rule)
Tile **89** — one square from the finish — looks like any plain tile, but the **first**
player to land on it (by roll, kick, swap, anything) **falls straight through** and
plummets all the way back to **tile 1** in one dramatic arc. After that single use the
trapdoor is patched: tile 89 is a completely normal tile for the rest of the game.

*Toggle: `FEATURES.trapdoor`. Tile/arc tunables in `TRAP89`.*

### The gray warp square (hidden rule)
One **gray square** (tile 44) doesn't like being stood on. Landing on it does nothing —
but **start your turn** still standing there and the whole board **flips 90, 180 or
270 degrees** (picked at random) with **every colour inverted**, and you have to play
your turn like that. Aiming, clicking and cutscenes all still work on the flipped
board — only your head struggles. The board rights itself when the next player's turn
begins (unless they, too, woke up on the gray square).

*Toggle: `FEATURES.warp`. Tile in `WARP_TILES` (44), angles/spin timing in `WARP`.*

### The tan dizzy square (hidden rule)
One **tan square** (tile 56) spins like a fairground ride. **End your movement there**
(your own roll, or thrown onto it by a kick, swap, star, pile-up …) and you turn
**very dizzy**: the **next move you make from that square goes BACKWARDS** — the full
roll, bonuses included (a big roll suddenly isn't a blessing). The walk back stops at
tile 1 at worst; slides, ladders and tile effects apply where you stagger to a halt.
The spinning is a property of the square: get **knocked off it** before your turn and
the dizziness **fades** — you move normally. Land there on a **6** and you're moving
straight on, so the ride never gets you. Frozen solid ON the square? The dizziness
patiently waits for the move you eventually make.

*Toggle: `FEATURES.dizzy`. Tile in `DIZZY_TILES` (56), colour in `DIZZY_COLOR`.*

### Radioactive fallout (hidden rule)
A **nuke** leaves scars: after the blast, **two plain tiles turn radioactive green**.
Land on one (or get thrown onto one) and you become **radioactive**: your rolls take
**−1, worsening by 1 more each of your turns for 5 turns** (down to −5), then you
**recover by +1 per turn** back to ±0. Roll exactly the sickness away and you're **too
weak to move** that turn; roll *less* than the sickness and you **hop backwards** the
difference (slides, ladders and tile effects apply where you land, but you never drop
below tile 1). Landing in fallout again while sick **knocks your recovery
back** to the worst point. Survive the whole sickness and you emerge **hardened: a
permanent +1 to every roll** — and immune to fallout forever.

*Toggle: `FEATURES.radioactive`. Tiles per nuke / reward in `RAD`; the sickness
follows `RAD.CURVE` (−1…−5 then back up), or the shorter `RAD.FAMILY_CURVE`
(−1, −3, −5, −4, −2) in Family mode.*

### Lightning (very rare)
Once in a blue moon (about **0.75% of turns**) a storm strikes the player in the
**lead** — knocking them **down** and **back** down the board, with a flash of
lightning and a clap of thunder. Mercifully rare.

*Toggle: `FEATURES.lightning` (chance/distance in `LIGHTNING`).*

### Lucky star (very rare)
The flip side of lightning: once in a while (about **0.8% of turns**) a shooting
star favours whoever is **in last place**, sweeping them a good way up the board
(never far enough to win outright). A rare comeback for the underdog.

*Toggle: `FEATURES.luckyStar` (chance/distance in `LUCKY`).*

### Reversal of fortune (very rare)
About **0.5% of turns**, fate flips on a whim and the player **in the lead** trades
places with the player **in last** — an instant, dramatic shake-up of the order.

*Toggle: `FEATURES.fateSwap` (chance in `FATE`).*

**A note on the "very rare" odds:** the percentages above are per *turn* at a
**4-player table**. The game scales them by seat count (`BALANCE.REF_PLAYERS`),
so a 2-player duel and a 6-player party see the same number of strikes per
*round* — chaos density doesn't grow with the crowd.

### Orange choice — Wheel / Support / Gun (hidden rule)
Land on an **orange square** and pick one of three:
- **🎡 Wheel** — spin the wheel of fortune; each slice is **1-in-8**: **Nuke**
  (knocks down everyone *not* standing on a blue tile), **back to start**,
  **forward one square**, **forward 15 squares**, **🎲 Random event** (fires a game
  event based on the current board state — lightning hits the leader, star carries
  the trailer, fate swaps leader and last; may also do nothing), **🎲 Random (targets
  you)** (same pool of effects but all aimed at the spinner), **🌀 Tile shuffle**
  (every special tile — teleporters, orange, freeze, shops, fishing **and the dark-red
  setback square and the gray warp square** — moves to a fresh random spot, avoiding snake and ladder squares.
  A setback square reshuffled high up the board is devastating), or **💰 Gold rain**
  (a shower of **30 coins** — but the sheer weight of the falling gold hammers you
  **two rows straight down** the board: same column, *not* back along the path.
  If the floor is closer you fall as far as it goes; ladders, chutes and tile effects
  fire where you land. On the **bottom row** there's nowhere to fall — you're simply
  **knocked flat** where you stand. Amounts in `GOLD_RAIN`).
- **🤝 Support** — pick another player and move **them** forward 5. Picking happens
  **on the board**: a light veil falls with spotlights on every candidate; hovering a
  player highlights them and previews **where they'd land** (dotted trail, plus the
  ladder/chute it would trigger); **click** to choose — or hit the **↩ Back** button
  by the prompt to return to the Wheel/Support/Gun choice.
- **🔫 Gun** — Russian roulette with a **six-slot chamber**. The load-out is drawn
  fresh each time around an average of **3 blank / 2 live / 1 self** — one random
  slot is re-rolled on those same odds per draw (`GUN.MIX` / `MIX_WOBBLE`), so most
  chambers look classic but some run a shot hotter or kinder. The big cylinder
  display shows **this draw's** true counts before the spin. **Live** → three shots
  knock the frontrunners down; **self** → the trigger backfires and you go down;
  **blank** → a click and nothing more.

*Toggle: `FEATURES.orange`. Orange tiles = `ORANGE_TILES` (12, 46, 77).* The Wheel
shows a real wheel that spins for ~5 seconds (fast, then slowing) before landing.

### Pile-up (hidden rule)
**Slide down a chute into other players** and you bowl them over. Whoever waits at
the **very bottom** takes the full hit: knocked **down** and **5 back**. Anyone merely
standing **in the chute's path** on the way down is **clipped**: knocked **1–3 back**
with only a **10% chance** of being floored. "In the path" follows the **drawn snake
curve** — a token tucked inside a big bend is safe, exactly as the art implies.

*Toggle: `FEATURES.snakeCollision`. Graze tunables in `GRAZE` (`BACK_MIN/MAX`,
`DOWN_CHANCE`, `RADIUS` = distance from the drawn curve that counts as "in the path").*

### The secret square (hidden rule)
There is a **hidden square before tile 1**. **No one starts on it**, and it isn't even
drawn on the board — so you'll never see it in a normal game. The only way to find it
is to be **thrown back past the start** (e.g. a low-tile **lightning** strike or a
**pile-up**): instead of stopping at tile 1, you land on the secret square, which then
**reveals itself**. From there you roll back onto the board as if starting again.

**The black market** also trades here: the secret square hides a **shady dealer** —
but he only shows himself **on your own turn**. Knocked here flat on your back
(lightning, pile-up), you meet him **after you successfully stand up**; thrown here
on your feet, he appears **at the start of your next turn** (or immediately, if you
slipped here mid-turn on your own roll). One audience per arrival — so when several
players get blasted off the board at once, each gets their own quiet word with the
dealer instead of a pile of popups. His shelf holds **2 exotics** (drawn from the
dealer-only `EXOTICS` stock, purple in the UI, tagged *· exotic*) plus **1 normal
catalog item**. Only the normal item's price flexes — cheaper the further you trail
the pack's average position, and marked up as earlier visits (by anyone, all
game) pile up — the markup is normalized to the seat count, so a full table
doesn't inflate the dealer's shelf faster per player than a duel does. Exotic
deals are exactly what they say.

**The exotics** — every one is powerful, and every one has a hook:

- **🐒 Monkey's Paw** — **8 coins**, consumable. When used: **teleport to ANY tile
  you point at** (except the finish). The moment you land, **the whole board
  scrambles** — every special tile jumps to a new random spot, and only THEN does
  your landing tile resolve. Wish carefully.
- **🎲 Loaded Dice** — **12 coins**, consumable with **3 charges**. Each use lets you
  **choose your exact next roll** (1–6; a chosen 6 still rolls again). When the last
  charge is spent the dice crumble — and the real dice remember: your **next 3 rolls
  are all 1s** (yes, including get-up rolls). One set at a time.
- **🕯️ Soul Candle** — **9 coins**, passive. **+2 to every roll, forever** — and it
  can **never be removed or replaced** (the passive slot is locked for the rest of
  the game). The hook: **lightning only ever strikes a candle holder** while one is
  in play, no matter who leads — and the bolt feeds on the flame, hurling the holder
  **twice as far back** as a normal strike (multiplier in `CANDLE.LIGHTNING_MULT`).

*Toggles: `FEATURES.secretSquare`, `FEATURES.blackMarket`. Shelf + pricing in `MARKET`
(`EXOTIC_STOCK`, `NORMAL_STOCK`, `BEHIND_PER`, `MAX_DISCOUNT`, `VISIT_MARKUP`); the
exotics live in the `EXOTICS` DATA block (own toggle group in Advanced settings).*

### The Broken Gate — cursed pacts (hidden rule)
The black market has **two sections**, with tabs to switch freely between them: the
**dealer's stall** (the market above) and the **Broken Gate** — a gate behind the
stall that no longer locks. The **first player ever to reach the secret square is
always greeted by the gate**; after that, which section greets an arriving visitor
is a **coin flip** (`GATE.RANDOM_GATE`). Bots offered the gate first seal the pact
about half the time (`GATE.BOT_TAKE`).

Through the bars, **ONE pact is offered per visit** — drawn at random from the pacts
you don't already carry — and it costs **no coins**: take it or leave it. A sealed
pact is **permanent**: it never occupies a bag or passive slot, can never be removed,
and its price is always paid. All ten (numbers in the `CURSE` DATA block):

- **🥾 Stormstride Boots** — **+2 to every roll, forever.** But lightning **only ever
  strikes a marked player** while one is in play — and your boots mark you exactly
  like a Soul Candle does.
- **🐍 Serpent Pact** — **snake heads never swallow you**; stand on them like plain
  ground. But **ladders refuse to carry you** — you climb nothing, ever again.
- **💰 Midas Purse** — **+2 coins at the start of every one of your turns.** But get
  **knocked down once** and the purse bursts: **every coin you own scatters, gone.**
- **🔥 Everburning Heart** — **you can never be frozen** (icy tiles, frost auras,
  snowballs — nothing). But the flame eats your luck: **every 6 you roll becomes
  a 5** — no more bonus rolls, ever.
- **🗿 Stone Hide** — **no blow can knock you down** (kicks, horns, bombs, snipers,
  pile-ups — all shrugged off; lightning and shame still floor you). But stone is
  heavy: **−1 to every roll, forever.**
- **👻 Phantom Step** — **nobody can bounce on or kick you** — landing rivals drift
  straight through you, and you through them. But **you can't kick or bounce anyone
  either**: you share squares like smoke, and never collect kick coins.
- **🧛 Vampire Fangs** — every kick or bounce you land **drains 3 coins** from the
  victim (on top of Thieves' Gloves). But **start a turn in sole first place** and
  the sun **scorches you 3 tiles back** — every single leading turn.
- **🔔 Gravedigger's Bell** — **+2 coins every time any rival is knocked flat** by a
  blow. But when **you** fall, the bell tolls for you: **you need a 5+ to get up.**
- **🎲 Blood Dice** — **your dice never land below 3** (get-up rolls included). But
  **every movement roll drinks 1 coin** — and when your purse is dry, the dice
  drink **2 tiles of stride** instead.
- **📒 Toll Keeper's Ledger** — **1 coin lands in your pocket every time a rival buys
  anything** (shop or market). But **every price YOU pay is doubled** — the dealer's
  too.

*Toggles: `FEATURES.brokenGate` (whole gate), per-pact in the `CURSED` DATA block
(own "⛓️ Broken Gate" group in Advanced settings, saved like the other toggles).
Gate odds in `GATE`, all pact numbers in `CURSE`.*

### The Shop, inventory &amp; items (hidden rule)
Four **gold squares** are cabin shops (tiles **6, 28, 52, 75**). Land on one and you
**spend your coins** on items — everyone starts the game with a **10-coin purse**
(`COIN.START`). The shelf shows **3 items drawn at random** from the
full catalog each visit, and each item can be **bought only once per visit** (it shows
as *sold out* after). You carry a small inventory: **up to 3 consumables plus 1
passive** at a time. *(Shelf size = `SHOP.STOCK`.)*

You don't even have to stop: **walking past** a shop square mid-move pauses your
token at the shop door to browse (each pause is a fresh shelf), then the move
carries on to where your roll was taking you. This fires on *every* pass — your
own roll, wheel and support moves, even being dragged backwards. *(Toggle:
`FEATURES.shopPassby`.)*

**Item toggles:** on the *Choose players* screen, open **⚙️ Advanced settings → 🛒
Items** to enable or disable any item. Disabled items never appear on the shop or
black-market shelf (items already in someone's bag keep working). Every item in the
catalog — current and future — shows up in this list automatically. Item cards
follow one convention: consumables read **"When used: …"**, passives read
**"Passive: …"**.

**Board options:** **⚙️ Advanced settings → 🗺️ Board** holds board toggles
(`BOARD_OPTIONS` DATA). **🌀 Scrambled board**: every special tile — teleporters,
orange, freeze, shops, fishing and the dark-red setback — starts at a random
eligible spot each new game (never on a ladder/snake tile, tile 1 or 90; ladders
and snakes themselves never move). With it off, every new game uses the classic
fixed layout — so a mid-game 🌀 wheel shuffle no longer carries over into the
next game.

**Consumables** (held in your bag; *used* from the inventory **before** you roll):

- **☕ Coffee** — **4 coins.** +4 to your next roll.
- **🛡️ Shield** — **6 coins.** *Use it* from your inventory to raise a guard that
  absorbs the next hit: a sniper shot, a kick, a pile-up knockdown, or a freeze. While
  raised, a small **transparent blue bubble** shows around your pawn; the hit is negated
  and the shield is then gone. A shield still sitting in your bag does **nothing** —
  timing it is the strategy.
- **🍀 Four-leaf Clover** — **10 coins.** Guarantees a **6** on your next roll (and a 6
  rolls again, so it chains nicely).
- **📯 War Horn** — **7 coins.** Blow it and a blast wave sweeps **your row**: every
  rival **standing on the same row** as you is **knocked flat** (an armed Shield blocks
  it). Rivals already down or frozen, on the start lane or on the secret square are
  untouched. Flattening 3+ rivals with one blast triggers the multi-kill announcer.
  *(Tunables in `HORN`.)*
- **📦 Mystery Box** — **5 coins.** Pops open into a **random enabled consumable**
  from the catalog (never another box). A cheap gamble — most of what's inside costs
  more than the box. *(Fallback payout `MYSTERY.FALLBACK_COINS` if nothing can pop.)*
- **❄️ Snowball** — **6 coins.** Throw it at a rival within **8 tiles** (either
  direction): they **freeze solid on the spot** — normal thaw rules (roll
  `FREEZE.GETUP_MIN`+ to break free), an armed Shield blocks it. Humans pick the
  target by clicking their pawn; there must be someone in range or the ball is kept.
  *(Range = `SNOWBALL.RANGE`.)*
- **🍌 Banana Peel** — **5 coins.** Drop it on a **plain tile up to 6 ahead** of you
  (click the tile). The **first RIVAL to land there slips 5 tiles back** — the peel
  shows on the board, but people land where they land. You never slip on your own
  peel. A slip below tile 1 uncovers the secret square, like any knock-back.
  *(Tunables in `BANANA`; one peel per tile.)*
- **🪞 Mirror** — **7 coins.** *Use it* to raise a mirror (🪞 shows in the
  scoreboard): the **next hit or freeze aimed at you deflects onto the nearest
  standing rival** instead — sniper shots, the gun, a War Horn blast, a snowball,
  lightning's knockdown, anything that goes through a knockdown/freeze. The new
  victim's own Shield can still block it, and *their* Mirror can bounce it onward
  (every bounce burns a mirror, so it always lands somewhere).
- **💣 Bomb** — **6 coins.** Lob it at **any tile within 8** (either direction, never
  your own square): the blast **floors everyone standing on it or beside it** (the 8
  surrounding grid squares). Shields block, Mirrors deflect; the thrower ducks their
  own blast. *(Tunables in `BOMB`.)*
- **🔥 Fire Egg** — **5 coins.** Hurl it at a **rival within 8**: they're **singed**
  — their **next roll burns 2 steps shorter** (`FIRE_EGG.SINGE`; a low roll can shrink
  to nothing, or even drag them backwards like radiation).

**Passive** (1 slot, always on while equipped):

- **👟 Running Shoes** — **10 coins.** +1 to *every* roll while worn. Buying or
  receiving any new passive **immediately replaces** the one you have, which is **lost
  forever**.
- **🧤 Thieves' Gloves** — **6 coins.** Steal **1 coin** from the victim every time you
  **kick** or **bounce off** a player.
- **🪖 Helmet** — **8 coins.** Knockdowns barely faze you: you get back up (and break
  out of ice) on **any roll** (`HELMET_GETUP`). The sniper, the gun, shame collapses —
  none of it keeps you on the floor for more than a turn.
- **👑 Crown** — **5 coins.** **+1 coin at the start of every turn you begin in sole
  1st place** on the board (`CROWN_COINS`). Wealth flows to the front-runner.

### Crafting — the Singularity Bomb (hidden rule)
Some items don't want to stay apart. Carry **any two** of **🛡️ Shield, 💣 Bomb and
🔥 Fire Egg** in your bag at the same time and they **fuse by themselves** into a
**🌑 Singularity Casing** — it can't be used, it just hums, and it remembers which
piece is missing (a *second* copy of something you already fed it won't do). Gain
that last piece and the casing **snaps shut**: you now carry the **🕳️ SINGULARITY
BOMB** — the only item in the game that can't be bought anywhere.

Use it and **pick any tile**: reality gives way. The sky darkens, a hole tears open,
and **every player on the map** — all of them, any distance, downed or frozen, no
Shield or Mirror can refuse it — **spirals into the vortex**. A beat of dead
silence… then it **detonates**, hurling everyone back out **3–10 tiles from the
epicenter** in a semi-random spread — and every rider **slams down flat on landing**
(knocked down, normal get-up roll; a frozen player's **ice is shattered** by the ride,
they land merely floored). Flights past the summit fold back; flights past tile 1
crash onto the **secret square** — where the dealer, as always, waits for you to
stand up. Ladders, chutes and tile effects fire where they land.

**The thrower is not safe.** Stand close and the vortex takes you too: within **3
tiles it almost certainly does (95%)**, at **5 it's a coin flip (55%)**, at **7 it
probably passes you by (25%)**, and beyond that it only rarely reaches (10%).
Players on the start lane or the secret square are off the map — out of its reach.
*(All numbers in `SING`; recipes in `CRAFT`; crafting rides `FEATURES.crafting` —
off in Family mode. Preview: `index.html#preview=singularity`.)*

**Using items:** on your turn, before rolling, press the **🎒 Inventory** button next
to the die. Use any consumable, then roll. Using one
plays a short **hover flourish over your pawn first**, and the effect applies when it
ends (~1s, `ITEM.FLOURISH_MS`); the inventory closes and **stays closed** (reopen it
yourself to use another item). Bots spend
their items automatically before they roll. **Plain yellow tiles pay 1 coin** — you
hear the coin ping but see no icon. **Plain blue tiles pay 3 coins** with a fanfare:
**three big 🪙 pops and three pings in quick succession** — that's the "EXTRA money"
moment. **Rolling a 6 earns 1 bonus coin silently** — no sound, no icon; it just shows
up on the scoreboard (`COIN` payouts + `COIN_FX` presentation, both in DATA).
Your held items appear as icons in the scoreboard next to your name.

*Toggle: `FEATURES.shop`. Shop tiles = `SHOP_TILES` (6, 28, 52, 75). Bag size =
`INV` (`CONSUMABLES` 3, `PASSIVES` 1). Bonuses = `ITEM.COFFEE_BONUS` (4) and
`ITEM.SHOES_BONUS` (1). Item catalog (id, emoji, name, desc, kind, cost) lives in
the `SHOP_CATALOG` DATA block; what each id does is keyed by id in the item logic.*

---

## Sound &amp; spectacle
Light **synthesised sound effects** throughout (dice, steps, ladders/chutes,
bounce/kick, sniper, fishing, teleporter, wins …) — no audio files, so it stays one
self-contained page. Toggle with `FEATURES.sound`. On the big dramatic moments
(nukes, the gun, lightning, the leviathan, sniper hits, pile-ups) you also get
**explosions, screen flashes and shakes**, and **confetti** rains down on the win.

**The Settings screen** (button under *Play* on the title menu) holds: the **🤖 bot
decision popups** toggle, **⏩ Fast-forward bot turns** (bot turns run at 3× —
`SPEED.FF_DIV` — human turns are untouched), the **🌈 RGB player** toggle (see
*Players & bots*), and a **🔊 master volume slider** (0 = mute; covers all effects
and the kill-announcer voice, `SOUND.VOLUME`). All settings — including the Advanced
item/exotic/board/finish-line toggles on the setup screen, the RGB toggle and the
chosen theme — are **remembered between sessions** (browser `localStorage`; still one
self-contained file, clearing browser data resets them).

**Themes** — the **🎨 Theme** button on the title menu cycles the page's dressing:
**Summer** (the original), **Christmas**, **World Cup**, **Sakura** and **Minecraft**.
A theme swaps the sky gradient, the drifting glyphs (leaves / snow / footballs /
petals / blocks), the clouds and the title tagline — the board and its tile colours
are untouched, so nothing about the game reads differently. *(Data: the `THEMES`
table — a new theme is one entry.)*

---

## Players &amp; bots
On the setup screen each seat shows its **colour swatch — click it to pick a colour**
from the palette: the 11 seat defaults plus **10 extra colours** (burgundy, navy,
forest, sky, lilac, brown, mint, coral, magenta, olive). A colour another seat already
holds is dimmed and can't be taken. With the **🌈 RGB player** setting on (Settings
screen), the **11th seat naturally gets RGB** — a pawn that flashes through the whole
rainbow forever — and the whole **fancy-colour family joins the palette**: 18 animated
skins, **each drawn to its own theme** rather than just cycling colours — Yin & Yang
swirls, Midas Marble crawls with gold veins, Inferno burns stable at the base with a
light heart and flickering tips, The Void twinkles with hints of stars, Blizzard whips
snow past, Norge flies the flag (plus Rainbow, Thunder Reef, Neon Night, Fire & Water,
Sakura, Blood Night, Versus, Candyfloss, Nordlys, Toxic, Royal, Sunset). Each fancy
colour counts as a single colour — one holder per game (`FANCY_COLORS` — a new skin is
one `look` entry; each skin's canonical description lives in its `desc`).

Each seat also has a **Player / Bot** toggle, so you can mix humans and
bots in one game — bots take **only their own turns** automatically (a 🤖 marks them in
the scoreboard). The **Autonomous mode** checkbox is a shortcut that makes **every** seat
a bot, so the whole game **plays itself** — auto-rolls, auto-resolves every choice, and
auto-dismisses popups. Good for a hands-off / streamed game.

**Bot decisions (the bot brain):** bots weigh their options like a competitive player
would — every landing is scored in "tiles" (progress + ladders/chutes + how nasty the
tile you settle on is), with a dash of random jitter so they stay beatable:

- **Bounce or kick** — a bot bounces when the next square looks better (a ladder foot!)
  and kicks to deny a rival and keep a good square; kicking grows more tempting later
  in the race. Bots **almost never kick a downed player** — the shame collapse isn't
  worth it (only a truly catastrophic bounce changes their mind) — but they **gladly
  punt a frozen one**: it's shameless and slides the frost safely away.
- **Orange square** — fixed odds: **wheel 4/7, support 2/7, gun 1/7**
  (`BOT.ORANGE_WEIGHTS`). When a bot supports, it usually **springs a trap** if one
  exists — a rival whose +5 would dump them on a freeze, the setback, fallout or a
  big chute (`SUPPORT_TRAP_CHANCE`, 70%) — but sometimes (and always when no trap
  exists) it's **genuine goodwill**: a random rival gets the boost.
- **Sniper** — bots aim at the **front-runner** and won't waste the shot on an armed
  shield.
- **Teleporter** — swap only when trailing the pack average (as before).
- **Shopping** — items are bought by value for the situation (shoes first, a clover is
  worth extra near the finish, no doubled-up shields), and bots keep buying while it's
  worth the coins.
- **Item timing** — coffee is held near the finish (overshoot!), the clover waits for a
  roll that lands clean (or the exact win), the shield is armed only when fire is
  incoming (a rifle on the board, a sniper round next, or holding a big lead).
- Bots **don't know the tile-89 trapdoor** until someone has sprung it — they fall for
  it like everyone else.

While a bot decides, a **🤖 thought popup** shows what it's weighing and its verdict
(deliberately slows bot turns a touch so you can watch them play — turn off with
`FEATURES.botThoughts`). At the **fishing** square a bot's odds get **harder the
more fish that bot has already caught itself** — roughly a 40% loss on its first
catch, then 60% / 80% / 90% / 95% (other players' catches don't count against it).
*(Tunables: the `BOT` DATA block — scores/weights/popup timing — and
`FISH.BOT_LOSS_BY_CATCHES`.)*

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
  sniper:        true,   // every 18th turn, last place gets a one-shot sniper
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
