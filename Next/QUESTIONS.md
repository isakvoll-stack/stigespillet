# Questions for Isak

Standing file: autonomous sessions log clarifications here instead of stopping to ask.
Answer whenever — each answer gets folded in and the question checked off.

## 2026-07-18 — Twist Direction v2 (party/replayability rework; see Next/TWIST_DIRECTION.md)

*(The 2026-07-17 Director/story questions were withdrawn — that whole direction
was rejected by Isak 2026-07-18 and is recorded as such in the doc.)*

- [ ] **Always-on core set**: which rules should NEVER sit out a draw? Default
  picked: exact finish, six-again, encounter. Everything else (sniper, freeze,
  fishing, orange, shops/coins, teleporters, trapdoor, warp, dizzy, secret
  square…) goes in the draw pool. Anything you'd promote to always-on (shops?)
  or demote?
- [ ] **Draw density**: ~60–75% of the optional pool live per game, item catalog
  ~12 of the full list. Chaotic enough? (The "🎪 Everything" preset keeps
  today's all-on game either way.)
- [ ] **Scrambled board default**: in drawn games the special-tile layout starts
  scrambled every game (so tile spots can't be memorised). OK as default, or
  keep classic spots and let 🌀 stay opt-in?
- [ ] **Twist of the Night odds** *(Phase 1 BUILT 2026-07-18 with these
  defaults — play a few games and say what's off)*: 1 in 3 Classic games
  carries one secret leg twist; announced on the suspense card at the start
  of a random round 2–5; toggle lives in Advanced → 🗺️ Board (ON by
  default); runs in Family mode too (the twists are gentle); KOTH/Tour/
  Mayhem never draw one; no twist repeats until all 10 have been seen
  (`TWIST_NIGHT`, `EXCLUDE` list empty). Right frequency/window? Any twist
  you'd exclude from Classic? Should KOTH games draw one too?
- [ ] **End-screen "Tonight's board" reveal**: full draw shown after the podium
  (what was live, what never existed). Keep, or should some things stay secret
  even then?
- [ ] **Pop-up count**: 2–4 per game guaranteed (tiles growing in, chests, rules
  waking mid-game). Feel right for a ~30–45 min game?

## 2026-07-17 — menus/coins/boss-tiles batch (defaults picked, say if wrong)

- [ ] **Weakpoint patterns**: three symmetrical defaults in
  `BOSS_MODE.WEAKPOINT_PATTERNS` — compass (4 points, wall middles), star
  (5, evenly spaced), lattice (8, flanking every corner) — one drawn at
  random per fight. Sizes differ, so difficulty swings a bit per draw.
  Want fixed pattern per boss instead? Other shapes? Same count for all?
- [ ] **Weakpoints never deplete now** (hit one → damage, it stays). With 8
  points a fight could get fast. Cap hits per point, or per-turn cooldown?
- [ ] **Void Maw's wander kept** — but instead of random respawns the WHOLE
  pattern rotates a random amount each boss turn (symmetry intact). After a
  drift a point can briefly overlap a coin/crate tile (weakpoint wins until
  the next drift). OK, or drop the wander gimmick entirely?
- [ ] **Seeker Charm** (🧿 crate item) still slides ONE weakpoint in front of
  an ally — that breaks the symmetry until the fight ends (or the Maw drifts).
  Keep, or retire the item now that points are static?
- [ ] **Full experience toggle** gates: mode picker (Play jumps straight to
  Classic setup) + all Advanced-settings groups except 🏁 Game. The Settings
  screen itself still shows RGB player / Family mode / Manual moves — hide
  any of those behind the unlock too?
- [ ] **Coin visibility**: balance now shows ONLY in the shop/black-market
  title. Removed from scoreboard, inventory title, and the "(N total)" tail
  on coin-earning log lines. The Midas Purse burst still announces how many
  coins scattered (it's the drama). OK?

## 2026-07-16/17 — the 9-point batch (defaults picked, say if wrong)

- [ ] **Gray-square timing changed**: it used to fire when you STARTED a turn
  there and last only your own turn. Per your "countdown after the roll
  finishes", it now fires when you STOP there (5s countdown → flip) and lasts
  until **your next turn starts** — so everyone in between plays flipped, you
  included on none of your own rolls. Want the flip shorter (e.g. just the
  next player's turn) or aimed back at the lander somehow?
- [ ] **Snake eyes with no snake ahead** (pos 88–89): you're pulled BACK to
  the last snake (87). Alternative: nothing happens up there. Which?
- [ ] **Giant-die story changed**: with Kong there are now SIX bosses on
  faces 1–6, and the Joker appears when the die "lands on its edge"
  (1-in-7, `BOSS_INTRO.JOKER_CHANCE`). OK, or should the Joker replace a face?
- [ ] **Lose-condition numbers unplaytested**: Dragon 20 rounds, Wyrm 16
  rounds, Kraken 12 team-hits, Kong 10 barrel-hits, Maw emberlight 6 (−1 per
  round, ✨ pays +2, 2 sparks live), Joker 20 rounds. All in `BOSSES[].lose`.
- [ ] **Boss crates ignore the bag cap** (like the pity box) and a lap pays
  🪙5 + one crate. Landing ON a rolling barrel's tile between boss turns is
  safe (barrels only hit while THEY move). OK?
- [ ] **Boss items are crate-only and bot-usable**; targeted ones use the
  simple pick-a-player list (not the on-board spotlight picker) — the ring
  board has no spotlight plumbing yet. Fine for now?
- [ ] **Wipe rule (Titan)** counts "iced" as players currently skipping turns
  (frozen/floored by strikes) — knocked-back-but-standing players don't count.
- [ ] **New-item numbers**: Boomerang knock 3 / Magnet pull 4 / Bell reach 2
  grid-tiles + 3 back / Rocket 7–12 fwd, 25% misfire 5 back / Sleep Dart
  range 8 / Treasure 3–8 coins / Piggy ×2 blue / Top Hat 3 per six. Socks
  block only tile/adjacency frost (snowballs still work). Tune freely.
- [ ] **Bonus-card pacing**: ~2.4s drumroll + ~1.8s winner hold per category
  (`BONUS_CARD`). Faster? Slower? Sound is the wheel-spin tick + win chime.
- [ ] **Kong's wheel slice** makes the wheel 9 slices (nuke odds diluted to
  1-in-9). Barrels knock ANY standing player they roll over, shields block.
  3 barrels per rampage (`KONG.BARRELS`). Feel right?

## 2026-07-14 (late evening) — the big build-out (defaults picked, tune freely)

Everything below was BUILT with sensible defaults per Isak's "build everything
and fill in the gaps" go-ahead. Flag anything that feels wrong:

- [ ] **Tour placement points 10/6/4/2/1** (`TOUR.POINTS`) + **2 bonus
  categories × 2 points** between legs. Feel right?
- [ ] **Boss leg scoring = damage dealt** (weakpoint hits), ties by coins.
- [ ] **"Slightly faster" legs** = tour KOTH legs at 0.75× rounds + the 5-round
  finish window on race legs. Different lever wanted?
- [ ] **Leader debuff** = half the 🪙6 per-leg stipend (leader gets 3). Crown is
  a scoreboard 👑 for now — want it drawn on the pawn itself?
- [ ] **Mayhem numbers**: event chance ×3, wheel bursts 1/2/3 at odds 3:2:1,
  plain-square replacement weights in `MAYHEM.REPLACE_WEIGHTS` (setback kept
  rare on purpose). All in the `MAYHEM` DATA block.
- [ ] **Ten leg twists shipped** (night, mirror, ice, opposite, flood, magnet,
  toll, musical, gold rush, pace) — all tunables in their `*_MOD` DATA consts.
  Any to cut, or new ones to seed?
- [ ] **First-pass boss stats** (hp 12-16, per-boss patterns/strikes in
  `BOSSES`) — balance session with Isak pending. Supers: 2× tiles, +1 charge
  turn, 2× power (`BOSS_SUPER`).
- [ ] **Two passives in Mayhem**: a third passive replaces the first non-candle
  slot. OK?

## 2026-07-14 (evening) — wheel chaos pool + Mayhem capture (defaults picked)

- [x] ~~"All the yellow tiles" in Mayhem — which yellow?~~ — ANSWERED
  2026-07-14: **the plain board squares**; built that way (every remaining
  plain square joins a special-tile role).
- [ ] **Chaos-pool weighting** — "conjure a random item" is ONE entry in the
  ~20-entry pool (the item is then sub-picked uniformly). Alternative: every
  item weighs in individually, making items ~half of all outcomes. Which feel?
- [ ] **Singularity Bomb is IN the conjured-item pool** (craft-only in the shop,
  but the wheel can hand it out — "everything" taken literally). Too brutal?
- [ ] **Chaos coin amounts** — windfall +8 / pickpocket −8 (`CHAOS` DATA block).
  Tune freely.
- [ ] **Crown timing detail** — it now pays 5 when you END your turn in sole
  first place (per your spec). It checks after the whole turn resolves (snakes,
  teleports, knock-backs included) — that's the intent, right?
- [ ] **1–3 simultaneous wheel spins** (Mayhem) — resolve one after another, or
  all telegraphed first, then resolved? And what odds for 1 vs 2 vs 3?

## 2026-07-14 (later) — The Grand Tour (design open points)

- [x] ~~Leg 5, the finale — is it the «mayhem» leg?~~ — ANSWERED 2026-07-14:
  **yes, leg 5 is always MAYHEM**; full spec captured in TASKS.md (way more
  chaos, yellow tiles → random specials, 1–3 simultaneous wheel spins, a
  wheel-style random event every round, two passives equipped at once).
- [x] ~~Placement points per leg~~ — BUILT with default **10/6/4/2/1** (see
  the late-evening section above).
- [x] ~~Scoring the Boss Battle leg~~ — BUILT: **points by damage dealt**.
- [x] ~~"Slightly faster" legs~~ — BUILT: KOTH legs 0.75× rounds + the finish
  window; other levers still on the table.
- [x] ~~Crown debuff value~~ — BUILT: leader gets **half the per-leg stipend**.
- [ ] **Night in Classic** — item, tile, or scenario set: which form first?
  (The Forever Night twist itself is built and tour legs can draw it.)
- [x] ~~The shields~~ — BUILT: same one-hit shield as the shop item.

## 2026-07-14 — Boss Battle foundation (defaults picked, say if wrong)

- [ ] **Lose condition** — you floated three directions: a turn-based timer,
  players having HP, or a **unique lose condition per boss**. The skeleton has
  NO lose condition yet (the team can only win), so this is the big open call.
  Per-boss lose conditions would fit the phases/gimmick design nicely.
- [ ] **Getting hit by a strike = knocked back 4 tiles** — pure placeholder
  until real boss attacks exist. OK as the baseline effect?
- [x] ~~Weakpoints deal 2 damage~~ — ANSWERED 2026-07-14: **1 damage**, for
  ease of reference (dummy HP rescaled 24→12). Still open: 5 live at a time,
  a hit one is consumed and respawns on a random free tile — or should they
  stay put / only refresh each phase?
- [x] ~~Ring locked at 40 tiles (12×10 hollow rectangle)~~ — ANSWERED
  2026-07-14: Isak reshaped it to an **11×11 hollow square** (still 40 tiles),
  clockwise laps.
- [ ] **Rolling a 6 still rolls again** in boss mode (kept the classic rule —
  it doubles as "dash out of danger"). Keep?
- [ ] **Boss roster count** — the giant die implies exactly **5 bosses + the
  Joker on 6**. Confirm 5 is the target when we author them?

## 2026-07-13 (later) — Manual/cheat mode (defaults picked, say if wrong)

- [x] ~~Call-out window = a 3-second pause~~ — REPLACED 2026-07-13 per Isak:
  no pause, no prompt; a move stays callable **until the next player's move
  begins** (their roll resolving into movement). Consequences of the new
  timing, say if wrong:
  - The move's effects (tiles, coins, shop visits) resolve immediately, so a
    late bust restores **position + cuffs** only — coins/items picked up on
    the cheated landing stay.
  - A cheated **finish** IS fully rolled back (win, standings, banked place,
    series point — call it from the game-over screen). A KOTH ending by round
    limit stands (only the cheated lap's trophies are clawed back).
  - While the next player is placing/walking, the previous move can no longer
    be called.
- [ ] **Snapping the cuffs ends the turn** — rolling the double/6 frees you
  but you don't also move that turn (mirrors how standing up works, minus the
  6-bonus). OK?
- [ ] **Bots move automatically in manual mode** — they never cheat, so
  there's nothing to call out on their turns. (Bots calling out human cheats
  would make cheating near-impossible, so they stay quiet.) OK?
- [ ] **The manual hop skips shop pass-by browsing** — the piece hops straight
  to the square instead of walking tile by tile. OK?
- [ ] **A busted cheater keeps the bonuses the move consumed** (a Coffee spent
  on an undone move is wasted). OK?

## 2026-07-13 — Family Mode / two dice / match play (defaults picked, say if wrong)

- [ ] **Two dice + forced rolls:** the Clover (forces a 6) and Loaded Dice
  (chosen face) bypass the two-dice throw — one known face, and a forced 6
  still rolls again the classic way (so the Clover keeps its chain). OK?
- [ ] **Two dice + get-up rolls:** stand-up/break-free rolls stay single-die,
  and getting up on a 6 still lets you roll to move (the doubles rule only
  replaces the 6 on movement rolls). OK?
- [ ] **Two dice + Everburning Heart:** the pact says "no bonus rolls, ever",
  so doubles don't re-roll for its holder either. OK?
- [ ] **Family Mode also turns off Singularity crafting** (Shield/Bomb/Fire Egg
  no longer fuse) — it wasn't on your keep-list, so it went with the black
  market. Say if you want it back.
- [ ] **Family Mode wheel:** the 🎲 random-event slices can no longer draw the
  gun or a fate swap (the other outcomes are untouched). OK?
- [x] **Landing preview shows the bare die walk** — RESOLVED 2026-07-13: Isak
  wanted the actual squares, so every move bonus now has a read-only `peek`
  and the preview (and the bots' die choice) counts them all.
- [ ] **Match play + "Play again":** after a match is decided, the banner
  button starts a fresh match with the same settings and roster. Mid-series,
  changing match settings only applies from the next fresh start. OK?

## 2026-07-12 (late night) — recovery (defaults picked, say if wrong)

- [ ] **Minecraft tiles are reverted and tabled** as you asked. The idea stays
  in git history (`2883179`) if you ever want another attempt — but a
  pixel-exact copy of the real textures stays off the table for the public
  repo (copyright), so any retry means better original pixel art or living
  with flat colours on the ⛏️ theme.
- [ ] **Chips are now static** (no animation in the picker/scoreboard chips —
  they show each skin's exact colours/pattern, frozen). This was the fix for
  the stutter; the pawns on the board still animate fully. If you'd rather
  have animated chips ONLY inside the colour popover (transient, mostly fine
  perf-wise), that's a small change — say the word.

## 2026-07-12 (night) — art pass (defaults picked, say if wrong)

- [ ] **"Down to the pixel" Minecraft textures**: Mojang's actual texture files
  are copyrighted game assets, so they can't be embedded in this public repo —
  that limit doesn't go away with a library. Instead every block now has its
  own structured pixel-art painter (bevelled gold, wavy water, planks with
  knots, blobby stone, ribs, shards…). If a specific block still reads wrong,
  name it and I'll redraw that one's painter/palette.
- [ ] **Fire & Water**: you offered "Ice & Fire OR more turbulent" — I kept
  Fire & Water and made it properly turbulent with fight-tempo. Want an
  Ice & Fire skin as well/instead? (one DATA entry.)
- [ ] **Blizzard rename**: saved picks of the old calm skin now load the NEW
  stormy Blizzard; the calm one is called Frost. Swap that mapping?
- [ ] **Yin-Yang orientation/dots**: eyeballed close to the classic; if the
  swirl direction or dot placement feels off in motion, say so.

## 2026-07-12 — Minecraft tiles + skins (defaults picked, say if wrong)

- [ ] **Minecraft scope**: only the 90 board tiles got block textures. The
  frame, START lane, snakes, ladders and secret square kept their normal art.
  Want more converted (e.g. ladders → wooden rails, snakes → vines, frame →
  planks)?
- [ ] **Block choices**: snake heads = netherrack, shop = gold block, freeze =
  packed ice, fallout = slime block, warp = stone, dizzy = birch planks, plain
  tiles = sand/water… any block you'd swap? (Each is one palette line in
  `MC.BLOCKS`.)
- [ ] **Real Minecraft textures**: I generate look-alike pixel textures in code
  because embedding Mojang's actual texture files in a public repo isn't
  allowed. Fine as-is?

## 2026-07-11 — from the 5-point batch: podium / colours / skins / end stats (defaults picked, say if wrong)

- [ ] **Climb/descent definition**: any non-walked jump of **2+ tiles** counts
  (`STATS.SKIP_MIN`) — ladders, snakes, stars, teleport swaps, knockbacks, drops,
  the banana slip. Walked moves (incl. dizzy/radiation backward walks) count as
  **steps** instead; a 1-tile bounce/kick-shove counts as neither. OK?
- [ ] **Player interactions counted**: same-square bounces/kicks + using an
  offensive item (snowball, banana, war horn, bomb, fire egg, singularity)
  + **sniper-rifle shots (added later the same day, per Isak)**. Still NOT
  counted: the orange gun/support, teleporter swaps, mirror deflects. Want
  any of those in too?
- [ ] **"Times immobilised" = the existing knock/freeze counter** — blocked hits
  (shield/mirror/stone hide) don't count, re-hitting someone already down doesn't
  either. OK?
- [ ] **Coins earned** counts every coin gained (incl. steals and 🔔 bell payouts),
  spending doesn't subtract. OK?
- [ ] **My 5 invented skins**: Nordlys (aurora), **Norge** (flag red/white/blue),
  Toxic (slime), Royal (gold & purple), Sunset. Swap any?
- [ ] **Pillar gradient** stays metal for the bottom 55% (`PODIUM.KEEP`) then blends
  to the player's colour. For fancy players the pillar-top/text colour is the skin's
  flat `base` tone (the pillar itself doesn't animate). Fine?
- [ ] **6th place and beyond** stay leaderboard-only (only 4th/5th get the side
  list, as asked). OK?
- [x] ~~Skins animate by flowing through their colours~~ **RESOLVED same day**:
  Isak asked for real per-skin looks — rebuilt as animated SVG gradients (yin-yang
  swirls, gold is marbled veins, fire stable-bottom/light-heart/flickering-top,
  void twinkles with stars, etc.). Each skin's vision is saved as a `desc` field
  in `FANCY_COLORS` (⚠ KEEP FOREVER block).
- [ ] **New-look details picked without asking** (say if wrong): Norge is a static
  banded flag (no animation); Blizzard/Sakura/Toxic got twinkle-deco (snow /
  petals / bubbles) like the Void's stars; the swatch CHIPS in the picker still
  use the simple flowing-gradient look (the real look shows on the pawn).

## 2026-07-11 — from the KOTH bonus-trophies build (defaults picked, say if wrong)

- [ ] **3 random categories of 5, +2 trophies each** (`KOTH.BONUS`) — Mario-Party
  style suspense over "always all 5". Prefer all categories to always pay, or a
  different trophy amount?
- [ ] **Categories built: coins / fish / laps / items used / times floored.**
  "Most kicks dealt" from your candidate list was SKIPPED — the knockdown funnel
  doesn't know who dealt the hit; wiring an attacker through every kick/bounce/
  bomb/horn path is a bigger change. Want it badly enough to build?
- [ ] **"Tiles travelled" also skipped** (would need a counter in every movement
  path). Fish and laps double-dip with their in-game trophies — Mario Party does
  the same, so it stayed. OK?
- [ ] **The reveal is log-lines + 🏆 pops, ~1.4s apart** (`BONUS.REVEAL_MS`) — no
  big banner/cutscene yet. Worth a dramatic full-screen reveal pass later?
- [ ] **A cancelled targeted item may still count as "used"** for 🎒 Gadget lover
  (the counter ticks when the item is activated, before target pick). Edge case,
  flag if it bothers you.

## 2026-07-11 — from the dizzy tile + Broken Gate batch (defaults picked, say if wrong)

- [ ] **Sealing a pact closes the whole market** — the moment feels final, so you
  don't get to browse the dealer's stall in the same visit (leaving the gate open
  to tab over IS allowed before you seal). Prefer the stall to stay open after?
- [ ] **A gate-greeted visit still counts toward the dealer's markup** — every
  secret-square audience bumps `marketVisits`, whichever section you use. Should
  gate-only visits leave his prices alone?
- [ ] **Landing on the tan square with a 6 skips the dizziness** — house rule: tiles
  only fire on the square you END your turn on, and a 6 means you're rolling again.
  Want the ride to catch 6-landers too?
- [ ] **Dizzy backwards = the whole net move** (roll + bonuses, so Stormstride/coffee
  soften it and a big roll hurts). Alternative: exactly the die face, bonuses ignored?
- [ ] **Pact numbers unplaytested** — all ten live in the `CURSE` DATA block for easy
  tuning; a balance sweep like B1–B5 can follow once you've felt them in play.
- [ ] **Bots seal an offered pact 50% blind** (`GATE.BOT_TAKE`) — they don't weigh
  which pact or their position. Worth a smarter bot rule later?

## 2026-07-11 — from the kick-etiquette batch (defaults picked, say if wrong)

- [ ] **"Almost never" = a −31 score penalty** — a bot only kicks a downed man when
  bouncing would be catastrophic (e.g. the bounce lands on the late-game setback
  square). In 60 measured trials it happened 0 times. Want it literally NEVER
  (drop the escape hatch), or a small % chance instead?
- [ ] **The frozen glide is a straight 3 back** — path-wise (toward tile 1), in one
  smooth slide; the block stays frozen, tile effects fire where it stops (a chute
  head sends the ice block riding down the snake!), below tile 1 it lands on the
  secret square, and it can share a tile with whoever stands there. Any of that
  different — e.g. glide FORWARD, or shatter the ice on a chute ride?
- [ ] **Bots now love punting frozen players** (`BOT.KICK_FROZEN_BONUS:12`) — it's
  shameless, knocks the block 3 back, and slides the frost off the bot's own
  square before the freeze check runs (same trick works for humans: kick the
  block away and you don't freeze). 60/60 in trials. Too eager?

## 2026-07-10 — from the 8-point batch (defaults picked, say if wrong)

- [ ] **Finish-line details** — a finisher gets NO bonus roll on a 6 (their race is
  run), stays parked on tile 90 (finished players are already immune to snipers,
  encounters, rare events), and when only ONE racer remains they auto-take the
  last place and the game ends (nobody rolls alone). The slider goes 1–11 and is
  clamped to the seat count at start. Any of that feel wrong?
- [ ] **Gun wobble = 1 slot** — each draw starts from the exact 3 blank / 2 live /
  1 self and re-rolls ONE random slot on those same odds, so a draw is at most one
  chamber off the classic mix (e.g. 3/3/0 or 2/2/2 happen; 6 live can't). Want it
  wilder (`GUN.MIX_WOBBLE` is one number)?
- [ ] **Gray warp square** — ONE tile, at 44 (mid-board, plain-looking gray); the
  flip lasts exactly the flipped player's turn and rights itself when the next
  turn starts; it also wanders with the 🌀 scramble/shuffle like the other
  specials. Landing on it does nothing (no coin either — it's a special tile).
  Want more tiles, a longer-lasting flip, or a chance-based trigger instead?
- [ ] **RGB is exclusive** — the rainbow counts as one colour: if someone claims it
  in the picker, the 11th seat falls back to a normal free colour. Should RGB be
  stackable (several rainbow players) instead?
- [ ] **Theme scope** — themes only redress the page (sky, drifting glyphs, clouds,
  tagline); the board, tiles and cutscenes are untouched so rule colours stay
  readable. Happy, or should themes also reskin the board frame / flakes-on-board?
  (A Minecraft BOARD skin would live better in the skins task.)
- [ ] **Boss battle + skins** — both logged as design tasks in TASKS.md Active with
  open directions listed; neither built. Pick a direction when you want them.

## 2026-07-10 — from the Singularity Bomb build (defaults picked, say if wrong)

- [ ] **The recipe pieces** — the game had a Shield but no bomb and no fire egg, so I
  built both as NEW normal shop consumables (your "equivalent" hint): **💣 Bomb, 6
  coins** (lob at a tile within 8 — floors everyone on/beside it, shield-aware) and
  **🔥 Fire Egg, 5 coins** (singe a rival within 8 — their next roll is 2 shorter).
  Recipe = Shield + Bomb + Fire Egg. Different equivalents in mind?
- [x] **Scattered players land on their feet** — the vortex flings everyone 3–10
  tiles but nobody is knocked down by it (the ride IS the punishment). Should the
  landing floor them too?
  **✔ Answered 2026-07-10: floor them — everyone slams down flat on landing (normal
  get-up; the ride also shatters ice, so frozen riders land merely downed). Built.**
- [ ] **Nothing resists the vortex** — armed Shields and Mirrors don't help; downed
  and frozen players are dragged along as well. Feels right for an ultimate; say if
  Shields should hold.
- [ ] **Suction odds between your waypoints** — within 3 = 95%, within 5 = 55%,
  within 7 = 25%, farther = 10% (`SING.SELF_PULL`). Tweak freely.
- [ ] **The secret stays secret** — casing + singularity are hidden from the
  Advanced-settings Items list (they'd spoil the recipe); disabling any ingredient
  item blocks the craft naturally. There's also NO rule-card popup for it — the fuse
  announces itself in the log with a flash. Want a vague reveal card anyway?
- [ ] **No cheap wins** — you can't aim the vortex at tile 90, and outbound flights
  past the summit fold back down (a flight can still land someone on a ladder that
  resolves normally). OK?

## 2026-07-10 — from the 4-point batch (defaults picked, say if wrong)

- [ ] **Get-up on a 6 + the dealer** — standing up on the secret square with a 6
  opens the black market FIRST, then you still get your bonus roll. Felt right
  (deal done, then off you go); say if the roll should come first.
- [x] **Balance sweep picks** — six player-count findings live in SUGGESTIONS.md
  ("2026-07-10 balance sweep", B1–B6) with proposed one-place fixes. B1 (rare-event
  density) and B3 (global fishing curves) are the ones I'd fix first. Pick what to
  build, or say "all of B1–B5".
  **✔ Answered 2026-07-10: "work on all the suggestions" — B1–B5 all built (B6
  stays watch-only). Defaults below.**

## 2026-07-10 — from the balance-sweep build (defaults picked, say if wrong)

- [ ] **B2 sniper cadence: every 18 turns** (`SNIPER.EVERY_TURNS`). The old rule
  (every 5th round) at a 4-player table meant a rifle every 20 turns, first one
  after 16; 18 splits the difference, per the sweep's "18-ish". Duels now see a
  rifle every 9 rounds instead of every 5 — say if the pace feels off either way.
- [ ] **B4 market markup anchored, not flattened** — the markup is
  `floor(visits × 4 / players)` (`BALANCE.REF_PLAYERS`), so the 4-player feel is
  EXACTLY as before (+1 per visit); duels inflate faster per visit (visits are
  rarer), 6-player tables slower. The sweep's alternative was a plain
  `floor(visits / players)`, which would have slowed 4-player inflation 4× too.
  No `MARKUP_MAX` cap added — say the word if the dealer should have a ceiling.
- [ ] **B5 KOTH rounds table** `{2:20, 3:24, 4:26, 5:30, 6:32}` (+2 per seat past
  6) — the sweep's starting-point numbers, unreviewed by you. The slider still
  overrides. **NOT built:** making `TROPHY_LEAD` worth more at big tables — a
  test KOTH duel ended 19–0 in trophies (the sole-1st fountain is real in duels
  even at 20 rounds), so if duels still feel lopsided that's the next lever.
- [ ] **B3 is fully per-player** — both the minigame difficulty curve AND the bot
  loss table now ride the individual player's own catches; a miss resets only
  YOUR streak (before, anyone's miss reset the shared pond and everyone's catch
  soured it). Global "the pond remembers" flavour is gone — say if you want a
  small global component back.
- [ ] **B1 duels get double chaos-chance per turn** — chances are anchored to a
  4-player table, so 2 players ⇒ ×2 per turn (same strikes per round). RULES.md
  now quotes the odds "at a 4-player table". If duels feel stormy, the anchor is
  one number (`BALANCE.REF_PLAYERS`).

## 2026-07-06 — from the King of the Hill build (defaults picked, say if wrong)

- [ ] **First-place trophy needs SOLE 1st** — you earn the trophy at the start of
  your turn only when you're strictly ahead of everyone; a tie for the lead pays
  nobody (same rule the 👑 Crown uses). Should a shared lead pay everyone tied?
- [ ] **Downed/frozen leaders still collect** — position is position: starting your
  turn in 1st pays even while lying down or frozen. Or should the trophy require
  standing?
- [ ] **Tie at the final whistle** — equal trophies is broken by who's furthest up
  the board (then it's just standings order). Prefer a shared win, or a sudden-death
  extra round?
- [ ] **Reaching 90 on a rolled 6** — you bank the 10 trophies, walk back to start,
  AND the 6 still gives another roll (from the start lane). Keep, or should a lap
  always end the turn?
- [ ] **Default rounds = 6 × players** (clamped 5–60): 5 players → 30, matching
  your "25–30 for a group of 5". Slider on the setup screen adjusts freely. Happy
  with the formula? (2 players → 12 might feel short.)
- [ ] **All chaos rules stay on in KOTH** — sniper, lightning, items, everything
  plays exactly as in Classic; only the goal changes. Anything you'd switch off in
  this mode? (Family mode will get its own rule pass with you.)
- [x] **Balance observation from a 40-round 4-bot test game**: laps landed in rounds
  22 and 27, final trophies 15/14/13/12 — holding the lead pays about as well as
  lapping. At 25–30 rounds a lap weighs relatively more. Feels right, or should
  the lap pay more than 10?
  **✔ Answered 2026-07-10: the opposite — Isak set the lap to 8 trophies
  (`KOTH.TROPHY_WIN:8`). Built.**

## 2026-07-06 — from the gold-rain + shop pass-by session (defaults picked, say if wrong)

- [ ] **Gold rain from the second-to-bottom row** — you specced "two rows down, and
  on the bottom row you're knocked over". One row up from the bottom, only ONE row
  of falling exists: today you fall that one row and stay upright. Should the
  short fall knock you over too (took the full weight, less distance)?
- [ ] **Bots browse on pass-by too** — every pass triggers the same shop for bots
  (their usual auto-shopping-spree), so they'll snack on items far more often now.
  Same rule for everyone felt fair; say if bots should only shop when they LAND.

## 2026-07-06 — from the 9-item + QoL batch (defaults picked, say if wrong)

- [ ] **"The QoL idea"** — you said to add *"the QoL idea"* (singular); the
  suggestions doc had five. I built the three concrete in-game ones: remembered
  settings (localStorage), the volume slider, and ⏩ fast-forward for bot turns.
  The **discovered-rules codex** and the **phone/touch pass** are still un-built —
  say the word if either of those was the one you meant.
- [ ] **Mystery Box contents** — consumables only today (a surprise passive would
  silently replace the one you're wearing, which felt too nasty for 3 coins).
  Want passives in the pool anyway?
- [ ] **Banana peel is visible** — the 🍌 sits on the tile for everyone to see
  (people land where they land, so it still catches plenty). Want it invisible to
  the other players instead (only the owner sees it)?
- [ ] **Mirror target** — a deflected hit goes to the **nearest standing rival**,
  not back at the attacker. Felt more chaotic/fun and always has a valid target.
  Prefer "reflect back at whoever fired"?
- [ ] **Loaded Dice curse bites get-up rolls too** — three 1s can keep you on the
  floor for three turns if you're downed while cursed. Intended cruelty, or should
  get-up rolls be exempt?
- [ ] **Monkey's Paw can't wish you onto tile 90** — a direct wish-to-win felt
  cheap (and the board-scramble hook would never matter). It CAN wish you onto 89…
  where the trapdoor may be waiting. OK?
- [ ] **Exotic prices are fixed** — the dealer's trailing-discount/visit-markup
  only flexes the 1 normal item on his shelf now; the 3 exotics cost what they
  say. Should exotics flex too?
- [ ] **Bots and the Paw** — bots never buy the Monkey's Paw (`ITEM_VALUE 0`) and
  only use a gifted one when their bag is full (they wish themselves just past the
  leader). Teach them to buy + wish properly?

## 2026-07-05 (evening) — from the scrambled-board build (defaults picked, say if wrong)

- [ ] **Scramble scope** — the scrambled start moves every special tile the wheel's 🌀
  shuffle moves (teleporters, orange, freeze, shops, fishing, setback). Ladders and
  snakes stay fixed (your standing rule), and the tile-89 trapdoor stays at 89. Want
  any of that different (e.g. ladders scrambled too as a separate toggle)?
- [ ] **Behaviour change to know about** — with the option OFF, every new game now
  resets the classic tile layout. Before, a mid-game 🌀 wheel shuffle silently carried
  over into "Play again". I treated that as a bug; shout if you liked it.

## 2026-07-05 — from the advanced-settings build (defaults picked, say if wrong)

- [ ] **Toggle scope** — disabling an item stops it appearing on the shop/black-market
  shelf from then on; items already sitting in a player's bag still work. If you
  reopen setup MID-game and untick something, that also takes effect immediately for
  the running game's future shop visits. Right call, or should toggles only apply to
  the next new game?
- [x] **No saving** — the toggles reset to "all enabled" every page reload (the game
  keeps zero saved state today). Want them remembered between sessions (localStorage —
  still one self-contained file, no sidecar)?
  **✔ Answered 2026-07-06 by Isak picking "the QoL idea": built — all toggles +
  volume + fast-forward persist via localStorage (`stigespillet.settings.v1`).**

## 2026-07-04 — from the 6-answer batch build

- [ ] **Voice-clip source** — the only TTS voice installed on this PC is Zira (female);
  the gruff clips are Zira pitched way down + distortion, which lands more "demonic
  announcer" than "COD soldier". If it's not gruff enough in-game, options: crank the
  distortion, or you record/download a real clip once and I embed it the same way.
  (There's also a Norwegian male voice, Jon — want a Norwegian-accented announcer?)
- [x] **Inventory during flourish** — using an item now closes the bag, plays the ~1s
  hover over your pawn, applies the effect, then reopens the bag so you can use more.
  Feels right, or should the bag stay closed after?
  **✔ Answered 2026-07-05: stay closed — using an item no longer auto-reopens the
  inventory. Built.**
- [ ] **Wandering setback edge case** — the shuffled dark-red square can land on tile 89
  (the disguised trapdoor's square). Both rules on one tile is rare and resolves by
  priority, but say the word if 89 should be off-limits to it.

## 2026-07-03 (later) — the 4-point batch

- [x] **Rolled-6 coin** — yellow tiles no longer pay, but **rolling a 6 still earns
  1 coin** (with the 🪙 pop). Keep that, or make coins 100% blue-tile-only?
  **✔ Answered 2026-07-04: both yellow and a rolled 6 pay 1 coin — but the 6 shows
  NOTHING, yellow is sound-only, and blue gets the big 3-pop/3-ping fanfare. Built.**
- [x] **"Into gunfire" support traps** — bot support-as-a-weapon targets rivals whose
  +5 lands on freeze / setback / fallout / a chute / the revealed trapdoor. Literal
  "into gunfire" (boosting someone into a sniper's line or into gun-target lead) isn't
  modelled — want that too?
  **✔ Answered 2026-07-04: ignore "into gunfire"; trap targeting removed entirely —
  support is a genuine random boost. Orange odds: wheel 4/7, support 2/7, gun 1/7. Built.**
- [x] **Sizes** — pawns ×1.18, over-head icons ×1.5 felt right headlessly; both are
  one number each in `TOKEN` (DATA) if you want them bigger/smaller.
  **✔ Answered 2026-07-04: pawns ×1.5, popups ×3. Built.**
- [x] **Bot popup pacing** — ~1.0s thinking + ~0.9s verdict per decision
  (`BOT.THINK_MS`/`DECIDE_MS`), and `FEATURES.botThoughts:false` turns them off
  entirely. Faster? Slower? Off for all-bot games?
  **✔ Answered 2026-07-04: a bit faster (0.7s/0.65s) + a Settings screen on the title
  menu (under Play) with a checkbox to turn the popups on/off. Built.**

## 2026-07-03 — the 11-point batch

- [x] **Coin pop scope** — the ping + 🪙 pop now plays for EVERY coin gain (blue 3,
  yellow 1, rolled-6 bonus), not just 3-coin blue tiles. Want it blue-only?
  **✔ Answered 2026-07-03: blue-only — built (yellow pays 0 now, no pop).**
- [x] **Multi-kill voice** — uses the browser's built-in speech voice pitched way down
  ("gruff-ish"). A properly gruff COD-style voice needs a recorded audio asset, which
  breaks the one-file/no-sidecar rule unless embedded as base64 (~50–200 KB). Good
  enough, or embed a real voice clip?
  **✔ Answered 2026-07-04: embed a clip; double kill retired (triple+ only); only
  players actually knocked standing→down count. Built (~60 KB embedded).**
- [x] **Thieves' Gloves** — costs 8 (Shoes are 10); steals on both kick AND bounce, one
  coin from one victim. It also steals when you kick a man while he's down. Keep all that?
  **✔ Answered 2026-07-04: cost 6 now, everything else kept. Built.**
- [x] **Item flourish timing** — the aura plays WHILE the effect applies (~1s,
  non-blocking). A true "hover first, THEN apply" needs the item flow made async — say
  the word if you want the pause.
  **✔ Answered 2026-07-04: do it — hover first, then apply. Built (async item flow).**
- [ ] **Black market v1 scope** — dealer currently sells the NORMAL catalog (2 items) at
  dynamic prices; the powerful/delayed-cost exotics await the v2 design (TASKS.md).
  Also: bots can buy there too (cheapest affordable) — should they be locked out?
  *(2026-07-04: Isak skipped this one for now — still open.)*
- [x] **Graze definition** — "in the chute's path" = standing within `GRAZE.RADIUS`
  (40 px) of the straight line from chute head to tail. The drawn snake curves, so a
  token near a big bend might escape a hit the art implies. Strict-curve check instead?
  **✔ Answered 2026-07-04: "if very easy" — it was (the curve is a pure function).
  Built: graze now measures distance to the drawn curve.**
- [x] **Vague cards** — all 18 rule cards rewritten vague (why clear, details fuzzy);
  RULES.md keeps the full numbers. Confirm that split is what you meant.
  **✔ Answered 2026-07-04: confirmed. Plus 3 new cards built: kickdown is now just
  "SHAME on you, SHAME on you...", a shame-catches-up card, and a mutant-immunity card.**
