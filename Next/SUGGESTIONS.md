# Suggestions & shop-item idea pool — 2026-07-05

Written on Isak's request: what to work on next + a pool of item ideas for the shop.
Nothing here is built. Pick what you like, strike what you don't; picked items get
curated into `TASKS.md` → Active. Costs are suggestions on today's 4–10 coin scale.

---

## Part 1 — What we should work on

### Already queued (my suggested order)

1. **Game-mode selection screen + King of the Hill** — biggest new-fun-per-effort in
   the queue. The mode screen is the enabler for every future mode, and KotH gives
   trailing players a reason to fight rounds they can't win outright.
2. **Black market v2** — the dealer currently sells normal stock, which wastes the
   mystique. A concrete exotic pool is drafted in Part 3 below (Isak's idea pool:
   debt, cursed items, un-removable passives).
3. **Polish pass** (SFX/animation on everything + QoL) — keep last, as planned; it
   gets cheaper the fewer systems are still moving.

### New suggestions — gameplay & balance

4. **Coin-economy tuning pass.** The shop keeps growing (6 items, more below) but
   income is still blue-tiles + rolled 6s. Run headless bot-game batches, measure
   average coins earned/spent per game, and tune `COIN`/costs so a mid-game player
   can realistically afford ~2–3 items. Data-driven, no design decisions needed.
5. **End-of-game recap screen.** After the win: knockdowns dealt/taken, coins
   earned, fish caught, ladders climbed, snakes ridden, longest time in the lead +
   a couple of superlatives ("Most shameful", "Human punching bag"). Cheap to build
   (counters already mostly exist in game state), big payoff with friends at the table.
6. **Placeable traps as a system.** One generic mechanic — "put a token on a tile,
   first rival landing triggers it" — unlocks a whole item family (Banana Peel,
   Bear Trap, …). Fits the registry style: a `TRAPS` table + one `TILE_RULES`-like
   check in landing. Build the system once with a single item (Banana Peel), then
   new traps are data entries.
7. **New special tiles via the registry** (each is one `TILE_RULES` entry, per the
   CLAUDE.md recipe — cheap to trial, easy to remove):
   - 🎰 **Casino tile** — wager any amount of coins on a coin-flip, double or nothing.
   - 🕸️ **Spider-web tile** — sticky: your next roll is halved (rounded down, min 1).
   - 👻 **Haunted tile** — a ghost latches on: −1 per roll until you pass someone,
     then it jumps to them. (A moving debuff — the fun is passing it around.)
8. **Bot difficulty presets.** The `BOT` brain is all tunables already — expose
   Easy / Normal / Cunning presets per seat in setup (Easy = noisy scoring + no
   item timing; Cunning = today's brain). Helps mixed games with the friend group.
9. **Turn-order fairness check.** Quick headless study: does seat 1 win more than
   seat 4 over ~500 bot games? If the edge is real, compensate (e.g. later seats
   start with +1/+2 coins). Snakes-and-ladders classically favours the first mover.

### New suggestions — UX / QoL

10. **Remember settings in `localStorage`** — already an open question in
    QUESTIONS.md; recommending YES. One self-contained file still (no sidecars);
    advanced-settings toggles + bot-popup choice survive a reload.
11. **Volume / mute control in Settings.** SFX count is getting high (coins, horn,
    air-raid, kill voice…); one master volume slider + mute, stored with #10.
12. **Fast-forward for bot turns.** A ⏩ toggle that cuts bot think-popups, hop
    animation time and cutscene lengths ~3× when only bots are playing. Makes
    balance-watching (and Isak spectating) painless. All the values are already in
    DATA — this is one speed multiplier.
13. **Discovered-rules codex.** A "Rules you've uncovered" screen listing every
    `RULE_INFO` card seen so far (still in their vague wording). Fits the
    mystery-style rules: you collect the lore instead of re-triggering it to reread.
14. **Phone/touch check.** The game is a downloaded single file — it *could* travel
    to phones. One pass: viewport scaling, tap targets, no hover-dependent UI
    (support preview uses hover today). Worth a look before building more UI.

---

## Part 2 — Shop item ideas (normal catalog)

Today: ☕4 · 🛡️6 · 🍀10 · 📯7 consumables; 👟10 · 🧤6 passives.
Descriptions follow the convention: consumables "When used: …", passives "Passive: …".

### Consumables

| | Item | Cost | Effect |
|---|---|---|---|
| 🧃 | **Energy Drink** | 5 | When used: roll twice next turn, move with the higher. (Dice manipulation that isn't just "+N" — different feel from Coffee.) |
| 🪃 | **Boomerang** | 8 | When used: knocks down the nearest standing rival within 10 tiles. (Ranged single-target; War Horn stays the row-AoE. Goes through `downPlayer`, so Shields block.) |
| 🍌 | **Banana Peel** | 5 | When used: drop it on a plain tile within 6 tiles; the first rival landing there slips 5 tiles back. (Needs the trap system, suggestion #6.) |
| ❄️ | **Snowball** | 6 | When used: throw at a rival within 8 tiles — they freeze on the spot (normal thaw rules, Shield blocks). |
| 🧲 | **Magnet** | 7 | When used: drag the nearest rival ahead of you 3 tiles backwards. (Sets up kicks, War Horn rows, trap tiles — a combo enabler.) |
| 🎣 | **Lucky Bait** | 4 | When used: your next fishing attempt cannot fail. (First item that touches the minigame.) |
| 💊 | **Iodine Pills** | 5 | When used: instantly cured of radiation sickness. (No mutant +1 — that stays earned the hard way.) |
| 🪜 | **Rope Ladder** | 8 | When used: skip rolling this turn and climb exactly 5 tiles instead (normal landing rules apply). Guaranteed movement — strong near a chute-field, weak vs a good roll. |
| 📦 | **Mystery Box** | 3 | When used: pops open into a random catalog item. (Cheap gamble; average value > 3. If the bag is full, it's coins instead.) |
| ⚡ | **Lightning Rod** | 6 | When used: armed like the Shield — the next lightning bolt that picks *anyone* strikes the current leader instead, then the rod is spent. |

### Passives (they compete for the one slot — that's the interesting part)

| | Item | Cost | Effect |
|---|---|---|---|
| 🪖 | **Helmet** | 8 | Passive: you shake off knockdowns — get up on any roll (getup min becomes 1). |
| 🛷 | **Sled** | 9 | Passive: snakes only drag you halfway down (rounded in your favour). |
| 👑 | **Crown** | 10 | Passive: +1 coin every round you start in 1st place. (Natural King-of-the-Hill synergy later.) |
| 🎒 | **Duffel Bag** | 7 | Passive: your bag holds 4 consumables instead of 3. (A passive that's *about* consumables — spicy slot choice.) |
| 🧪 | **Hazmat Vest** | 6 | Passive: radioactive tiles can't infect you — but you can never mutate for the permanent +1 either. |

---

## Part 3 — Black-market exotic pool (v2 design, Isak's brief: powerful + a hook)

Dealer-only, never on the normal shelf. Each is strong with a delayed cost, a curse,
or a deal — per Isak's idea pool (debt, un-removable passives, horrible side effects,
cursed items, pity items).

| | Item | Price | The power | The hook |
|---|---|---|---|---|
| 📜 | **Dealer's Credit** | free | Take 10 coins on the spot. | You owe 15. Next time you meet the dealer he collects — can't pay = knocked down + dragged back 10 tiles, debt stays. |
| 🎲 | **Loaded Dice** | 12 | 3 charges: choose your exact roll. | When the last charge is spent, your next 3 rolls are all 1s. |
| ⚰️ | **Phylactery** | 10 | You cannot be knocked down — ever. | Every time it saves you, you lose ALL your coins. Can never be replaced or dropped. |
| 🕯️ | **Soul Candle** | 9 | Permanent +2 to every roll. | Lightning only ever targets you now. Can never be removed. |
| 🐒 | **Monkey's Paw** | 8 | When used: teleport to ANY tile you choose. | The moment you land, the whole board scrambles (`scrambledLayout` already exists — this is nearly free to build). |
| 🧿 | **Cursed Eye** | 7 | Passive: you see everything hidden — the trapdoor, the secret square, disguised tiles glow for you. | Every shop and dealer charges you +2 on everything. |
| 🩹 | **Pity Wrap** | 2 | When used while in last place: advance to 5 tiles behind the player in front of you. | Does nothing unless you're truly last — the dealer's charity. |

Design note: exotics should *read* scary in the dealer UI — show the power in big
text and the hook in small print, in the vague-cards voice.

---

## My top-5 if Isak asks "just pick"

1. Game-mode screen + King of the Hill (queued, biggest fun unlock)
2. Black market v2 using the Part 3 pool (the dealer finally earns his atmosphere)
3. End-of-game recap screen (#5 — cheap, great with friends)
4. Trap system + Banana Peel (#6 — one system, many future items)
5. Coin-economy tuning pass (#4 — keeps the growing shop honest)
