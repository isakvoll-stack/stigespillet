# Stigespillet (Web) — Task backlog

The master to-do list. Check items off as they ship. Newest direction from Isak
is at the top of **Active**. When everything in Active is done, pull from Ideas.
See `LOG.md` for the running session history.

> Single source of truth lives in the DATA block of `index.html`. Tunables
> (chances, timings, distances) belong there, never as bare literals in logic.

---

## Active

### The Twist Direction v2 (Isak, 2026-07-17; reworked per his 2026-07-18 ruling)
- [ ] **Make the game the "unexpected twist" on S&L it's meant to be** — full
      plan in **`Next/TWIST_DIRECTION.md`** (READ IT FIRST — it also records the
      REJECTED v1 story/Director direction; never re-propose that). v2 in short:
      it's a party game — surprise must return EVERY game, with zero
      memorisation burden. Four pillars: **Nightly Draw** (each game secretly
      runs a random subset of rules/tiles/items + end-screen "Tonight's board"
      reveal) · **Pop-ups** (2–4 things visibly enter the game mid-play: tiles
      grow in, chests drop, rules wake) · **Twist of the Night** (reuse the 10
      Grand Tour `LEG_MODS` in Classic, one secret twist some games) · **Party
      guardrails** (anti-burden law, in the doc). Build order: Phase 1 = Twist
      of the Night (cheapest big win, playtest gate) → Draw → Pop-ups → freshness
      weighting + default flip. Questions in QUESTIONS.md (2026-07-18 section).
      - [x] **Phase 1 — Twist of the Night** shipped 2026-07-18 (1-in-3 Classic
            games, suspense-card announce round 2–5, no-repeat memory, 🗺️ Board
            toggle ON; headless-verified 13 games / 0 errors). Isak's feel pass
            still open (card feel, odds, window).
      - [x] **Phase 2 — The Nightly Draw** shipped 2026-07-18 (same session,
            behind its own toggle so Phase 1's gate isn't jumped): 🎴 Nightly
            draw board option (OFF by default until playtested) — `DRAW` DATA
            (24-rule pool with `req` dependencies, 60–75% live per game, shop
            slice 12 + exotics 4, scrambled board forced), per-game FEATURES
            overlay in `newGame` (family composes; base/`FEATURE_BASE` never
            mutated), `itemInPlay` filter on shop/mystery/black-market pools,
            end-screen **🎴 Tonight's board** reveal (live chips + "never
            existed" ghosts, incl. a drawn twist that never woke).
            Headless-verified 31/31, two full bot games, 0 errors. Defaults in
            QUESTIONS.md (2026-07-18).
      - [x] **Phase 3 — Pop-ups** shipped 2026-07-18 (same session): 🎈 board
            option (OFF by default until playtested) — `POPUPS` DATA, 2–4
            guaranteed moments per Classic game scheduled in a round window
            (3–14, min 2 apart), fired on the round wrap: a special tile
            **grows in** (8 growable rules, scale-in FX), a **🎁 chest drops**
            (new `chest` registry tile rule — first lander loots it, pity-box
            cap rule; bots value it), a **dormant rule wakes** (drawn-out
            rules re-enter; ghost list updated), or a **stray chaos strike**
            (reuses `randomBoardEvent`). Quick announce card at fire time,
            never before; moments listed on 🎴 Tonight's board (which now also
            shows for popup-only games). Headless-verified 25/25 incl. a full
            game where all 4 fired organically, 0 errors.
      - [x] **Phase 4 — Freshness memory** shipped 2026-07-18 (same session):
            `FRESH` store (`stigespillet.freshness.v1`) + `weightedSample` —
            nightly-draw rules & items, pop-up kinds & grow roles, and the
            twist-of-the-night pick all weight toward what the table has seen
            least recently (age-capped linear weights; live→0 / out→+1 per
            draw). Headless-verified 17/17 incl. bias stats (aged rule back
            98% vs 53% field; aged twist ~4× uniform), 0 errors.
            **⚠ The default FLIPS are NOT done** — TWIST_DIRECTION.md gates
            them on Isak's playtest sign-off: 🎴 Nightly draw and 🎈 Pop-ups
            are still OFF by default. When Isak signs off, flip `enabled` in
            `BOARD_OPTIONS` (and consider the "🎪 Everything" preset naming).

### Queued from Isak's 8-point batch (2026-07-10)
- [x] **Design game mode — «Boss battle»** (Isak, 2026-07-10) — design locked in
      the 2026-07-14 brainstorm (canonical spec below); foundation skeleton
      shipped the same day.
- [ ] **Boss Battle — build it out** (Isak, 2026-07-14)
      > ⚠ KEEP THIS SPEC — Isak's canonical vision for the mode; don't delete
      > it even as pieces ship, until Isak says so.

      The board is a **hollow rectangle with 40 squares going around** and the
      **boss in the middle**. At the start a **giant die rolls in the middle of
      the screen** and the face picks the boss — faces **1–5 are five distinct
      bosses**, face **6 is the Joker**, who **mimics another boss at random
      each phase**. The boss's **HP falls every time someone lands on a
      weakpoint tile** placed across the board. **At the beginning of every
      round the boss gets a turn**: it **charges attacks** — tiles it will
      strike **next turn get a red border**, tiles **two turns out get
      yellow** — and the team navigates **obstacles and objectives** around the
      ring while dodging the incoming strikes and chasing weakpoints. Bosses
      **escalate in phases** (~⅔ / ~⅓ HP). There should be **new items that
      help OTHER players** in this mode, in addition to the rest. Undecided
      (see QUESTIONS.md): turn-based timer vs. player HP vs. a **unique lose
      condition per boss**.

      **Closing rulings (Isak, 2026-07-14 later — fold in when the mode work
      resumes; these supersede the spec above where they overlap):**
      - **Lap rewards**: completing a lap pays coins and/or an item box (or
        both). Anti-abuse: a lap only counts once the player has **crossed the
        far side of the board** since their last lap credit — getting knocked
        back over START and re-crossing it must not pay again.
      - **Boss move variety**: the boss should have *different things it can
        do* every round (a move deck), not just tile strikes.
      - **Telegraph rework**: normal attacks use **red borders only** (marked
        on the boss's turn → strike next boss turn). **Yellow is reserved for
        "super-powerful" attacks**: yellow marks first; next boss turn the
        boss does nothing except progress yellow → red; it strikes the turn
        after that.
      - **Weakpoints deal exactly 1 damage** (ease of reference) — already
        applied to the skeleton (`WEAKPOINT_DAMAGE`, dummy HP rescaled 24→12).

      Foundation shipped 2026-07-14 (mode entry, ring board + arena render,
      boss round-turn with telegraphs, weakpoints/HP/phases, headless-verified).
      **2026-07-14 evening build-out ("fill in the gaps"):**
      - [x] Five real bosses + the Joker (`BOSSES` DATA: Ember Dragon 🐉 arc
            burns + singe, Deep Kraken 🐙 scatter pulls, Frost Titan 🧊 slow
            huge arcs that freeze a turn, Storm Wyrm ⚡ 1-turn fast strikes
            that floor you, Void Maw 🕳️ void-teleports + wandering weakpoints;
            Joker 🃏 mimics a style and reshuffles each phase) — first-pass
            stats, tune with Isak
      - [x] Giant-die boss-select intro (icon-cycling reveal; a fancier
            cutscene can replace it)
      - [x] Telegraph rework per the ruling (red = normal for whole charge,
            yellow = SUPER until its final turn)
      - [x] SUPER attacks: every phase change winds one up (2× tiles, +1
            charge turn, 2× power)
      **2026-07-16/17 build-out (Isak's 9-point batch — see the Done entry):**
      - [x] Boss move deck — per-boss `moves` per phase, drawn each boss turn
            (`BOSS_PATTERNS` shapes; every boss visibly fights its own way)
      - [x] Lap rewards + far-side-crossing lap checkpoint (🪙5 + a crate)
      - [x] Objectives on the ring: blue coin tiles + 🎁 support crates
            (+ the Maw's ✨ emberlight sparks); true obstacles still open
      - [x] Lose conditions — UNIQUE PER BOSS per Isak 2026-07-16: Dragon/
            Wyrm/Joker = round limits, Kraken/Kong = team-hit limits, Titan =
            full-team wipe, Maw = the fading ✨ emberlight (collect to survive)
      - [x] Co-op support items — 10-piece `BOSS_ITEMS` kit from ring crates;
            road items sleep in the arena, the kit never leaves it
      - [x] Strike/hit FX (per-boss flash+sound+lunge), phase-change moment
      - [x] 🦍 KONG — 6th boss, rolls barrels BACKWARDS around the ring
      - [x] ⚠️ danger signs + clearer red/yellow telegraph outlines + wash
      - [~] Bot brain for ring play — nothing to build yet: boss turns have
            no decisions (single die, no choices); bots DO use the support
            kit sensibly (`botMaybeUseBossItem`). Revisit if dual-dice or
            choice tiles come to the ring.
- [x] **«The Grand Tour» — campaign mode** — **BUILT 2026-07-14 evening**
      (Isak: "build everything and fill in the gaps"). Playable from the mode
      picker; `TOUR` DATA block + tour controller; full bot tour verified
      headless. Defaults picked where the spec was open (see QUESTIONS.md):
      placement points **10/6/4/2/1**, boss leg scored by **damage dealt**,
      "slightly faster" = KOTH legs at **0.75× rounds** + the finish window,
      leader debuff = **half the per-leg coin stipend**, catch-up/leg-1
      shields = the normal one-hit shield. Mayhem also exists as its own
      standalone mode. Spec kept below for reference/tuning:
      > ⚠ KEEP THIS SPEC — Isak's canonical vision so far ("that is what I
      > have for now"); more design sessions to come.

      A tour of **5 legs standard** (longer/shorter tour variants maybe
      later). Points carry across legs — F1-style placement points accepted
      from the brainstorm (exact values TBD) — and the **between-leg bonus
      points reuse the KOTH end-of-game bonus categories** (two birds, one
      stone). Persistent inventory + coins across legs (accepted).
      - **Leg 1 — always a normal classic leg**, no twist, but everyone starts
        with a ☕ coffee in inventory and an **active shield**.
      - **Legs 2–3 — 50/50 whether the base is Classic or King of the Hill**,
        with a board-modifier twist layered on top (ice / jungle / casino /
        night-style modifiers, accepted from the brainstorm).
      - **Leg 4 — Boss Battle** (the second-to-last leg, always).
      - **Leg 5 — always «MAYHEM»** (locked by Isak 2026-07-14). Mayhem is
        its own mode: **Classic, but WAY more chaotic**:
        - Chances of **any random event are way higher**.
        - **All the yellow tiles are replaced with a random special tile**
          (which "yellow" — QUESTIONS.md).
        - Choosing things like the **wheel has a chance to spin 1 to 3 of
          them simultaneously**.
        - **Every round a random event fires**, exactly like the wheel's 🎲
          would — it draws from the `WHEEL_CHAOS` everything-pool that now
          exists in the live game (built 2026-07-14).
        - **Two passive items can be equipped at once** (Mayhem only —
          needs a second passive slot in inventory + scoreboard UI).
      - **Pacing**: legs should play *slightly faster* in general, balanced so
        no one wins WAAAY before anyone else (mechanism open).
      - **Leg finish**: once first place finishes a leg, everyone else gets
        **5 turns** to climb as high as they can or reach 90 — and during
        those turns **overshoot does NOT bounce back**.
      - **Catch-up shield**: last place *in total points* gets a shield if
        they are BOTH **≥10 points behind first** AND **under half of first
        place's total**.
      - **Loser box**: each leg's loser gets a **mystery box that only gives
        consumables**, added to their inventory **even past the bag cap** —
        they just can't buy more items until they're back under it (down to 2).
      - **Leader pressure**: first place in total points wears a visible
        **crown on their token**, and takes a very slight debuff — e.g. only
        **half the starting coins** the others get each leg (value TBD).
- [ ] **Night in Classic** (Isak, 2026-07-14): the Grand Tour «night» modifier
      (tiles ahead hidden until someone lands nearby) is loved enough to also
      exist in Classic — as **an item, a tile, or a set of scenarios** that
      switches night on for a period of time. Form TBD (QUESTIONS.md); design
      before building. **Design proposal delivered 2026-07-18** →
      `SUGGESTIONS.md` §N (N1 Snuffer item / N2 dark square / N3 nightfall
      pop-up; note: 🌙 Forever Night already reaches Classic via the Twist of
      the Night). Awaiting Isak's pick before building.
- [ ] **Skins system** (Isak, 2026-07-10): proper pawn *skins*, not just colours —
      the colour picker built today is the stepping stone. Direction: a `SKINS`
      DATA table (id/name/how the pawn is drawn), `makePawn` reads the seat's
      skin, picker UI beside the colour popover. Could tie into themes
      (christmas hat pawn…), shop-bought cosmetics, or the old "PNG board skin"
      idea. Design with Isak before building.

### Animation polish (Isak's notes, 2026-06-24)
- [x] **Gun cutscene — rebuild to this exact vision (Isak, 2026-06-25).** Built +
      revised 2026-06-25 (tiny CSS revolver drawn on the shooter's own square, chamber
      spins without revealing the landed slot, fires at the leaders; blank /
      live-×3-knockdown / self-backfire). Tunables in the `GUN` DATA block.
      > ⚠ KEEP THIS DESCRIPTION FOREVER — do **not** delete it (even after it's built)
      > until Isak explicitly says so. It is the canonical spec for the gun cutscene.

      The **character pulls out a tiny revolver** (a real little gun, **not the 🔫 emoji**,
      **not** a big thing popping up in the centre of the screen). The **chamber spins** —
      but **don't reveal what it lands on**. Then it **tries firing generally towards those
      in the lead (that isn't itself)**. The hidden chamber decides what happens:
      - **Blank** → it just **clicks and twitches once**. Nothing happens.
      - **Live** → it **shoots three times**, **knocking them with a screen shake each**
        — but **no explosions**.
      - **Self** → you **just explode** as you try pulling the trigger.

      (Superseded earlier idea: a big centre-screen cylinder that showed the odds and
      revealed the landed chamber. Replaced per Isak's 2026-06-25 follow-up.)
- [x] **Leviathan cutscene — rebuild to this exact vision (Isak, 2026-06-25).** Built +
      reworked 2026-06-25 (serpent crosses → gulps in passing → exits → peeks back → rears
      → spits the player flying to the new tile). Tunables in the `LEVI` DATA block.
      > ⚠ KEEP THIS DESCRIPTION FOREVER — do **not** delete it even after the cutscene
      > is built. It is the canonical spec for how the leviathan should look.

      **Look (Isak, 2026-06-25 follow-up):** it must read **sideways / in profile** (a big
      open **maw**, **not** a round face smiling at the camera), with an **elegant tapering
      body**, and move **slowly** so it looks **majestic**.

      A **blue serpentine leviathan** — long snake-like body, styled like a **Chinese
      dragon** — flies/undulates **across the screen**. As it passes the targeted
      player it **swallows them**, and then **exits off the other side of the screen**.
      The feel: the leviathan didn't come *for* the player — it just happened to be
      passing, the player happened to be in its way, and it **took the chance** (casual,
      opportunistic gulp on the way through).

      Then, once it's gone, it **peeks its head back in** from the edge, **rears up**,
      and **spits the player back out** — the player goes **flying** to the new square
      they're sent to (the spit-out tile). Land them there, then the usual
      `resolveLanding` on the new tile.

      (Current placeholder = gloom + water + tentacles + 🐙 + token dunk. Replace it.)
- [x] **Lightning improved (2026-06-25).** Build-up now gathers clouds + rumble then
      distant pre-flickers; the bolt is a glow + bright core with branching forks that
      strikes several times in quick succession; the impact is an electric shockwave ring
      + sparks (replaced the old fiery `explode`). Tunables in the `LIGHTNING` DATA block.
      Still open to a precise art-direction pass from Isak if he wants one.

### Other
- [x] **Wheel reworked (2026-06-24)** — removed the "nothing" slot (now 5 slots); RANDOM
      is a distinct magenta. RANDOM effects now all target the spinner ("you"): lightning
      hits you, the star carries you, the swap trades you with the leader or trailer,
      plus a "you get picked off" down. Pointer still accurate; verified headless, 0 errors.
- [x] **Teleport chain bug fixed (2026-06-24)** — choosing to teleport no longer makes
      the swapped-in player re-teleport off the teal tile (and so on). A swap now does
      exactly one swap; `resolveLanding(..., skipTeleport)` stops the cascade. Verified.

---

## Done
### 2026-07-16/17 — Isak's 9-point batch + mid-session extras (autonomous)
- [x] **1. 🎁 Bonus points on a stage**: full-screen suspense card for every
      bonus category — category shown first, drumroll dots, THEN the winners
      (`BONUS_CARD` + `bonusCardReveal`); wired into BOTH the KOTH end bonus
      round and the tour's between-leg bonuses.
- [x] **2. Boss patterns + FX**: `BOSS_PATTERNS` move-deck engine (see the
      spec entry above) — recognisable per-boss shapes, player-aware small
      attacks, per-boss strike flash/sound/lunge, phase-change flash.
- [x] **3. Boss build-out**: ring coin tiles + 🎁 crates ("normal squares"),
      lap rewards + far-side checkpoint, per-boss lose conditions incl.
      collect-to-survive (Maw's ✨), doom line under the HP bar.
- [x] **4. 🦍 KONG**: 6th boss (barrels roll backwards, telegraphed path,
      hits cap = lose) + new 9th wheel slice — Kong on top of the classic
      board bowling 3 barrels down the path, riding ladders down; also in
      the `WHEEL_CHAOS` pool. Giant die now 1–6 = six bosses, Joker on an
      edge-landing (`BOSS_INTRO.JOKER_CHANCE`).
- [x] **5. 🐍 Snake eyes** (dual dice): double 1s carry you to the next snake
      head ahead (wraps to the last snake if none ahead); doubles bonus roll
      kept; `FEATURES.snakeEyes` + vague rule card.
- [x] **6. 🌫️ Gray square countdown**: fires on STOPPING there now — big 5s
      countdown (5→1 with ticks), then the flip; lasts until the lander's
      next turn starts (a full round). One twist at a time.
- [x] **7. Nuke alarm quieter** (`SFX.airraid` gain 0.17 → 0.07).
- [x] **8. Fishing card rewritten enthusiastic** ("GRAB A ROD! …").
- [x] **9. 🏁 Finish-window explainer**: tour finish window now also pops a
      clear rule card — no bounce-back, any roll that reaches 90 gets you in.
- [x] **+10 general shop items** (mid-session request): 🪃 Boomerang 🧲 Magnet
      🔔 Alarm Bell 🚀 Pocket Rocket 💤 Sleep Dart 🧯 Extinguisher 🗺️ Treasure
      Map + passives 🐷 Piggy Bank (blue ×2) 🧦 Wool Socks (tile-freeze
      immunity) 🎩 Top Hat (6s pay 3) — bot values + use timing for all.
- [x] **+10 boss support items** (mid-session request): `BOSS_ITEMS` co-op kit
      (bandage/banner/rally/grapple/seeker/flare/warpaint/decoy/gust/elixir)
      from ring crates; bots use them; kit stripped from tour carry-over.
- [x] **+⚠️ danger signs & clearer telegraphs** (mid-session request): fat
      red/yellow outlines (10px/8px), colour wash, ⚠️ on red tiles.
- [x] RULES.md synced (boss mode rewrite, new items, snake eyes, warp rework,
      9-slice wheel, bonus cards); defaults logged in QUESTIONS.md.
### 2026-07-11 — skins rework to Isak's visions + sniper interactions (follow-up)
- [x] **Sniper shots count as player interactions** (`fireSniper` hook).
- [x] **Fancy skins rebuilt as per-theme animated SVG gradients** (was uniform
      colour-cycling): `FANCY_COLORS[].look` = declarative gradient (stops with
      optional offset-flicker `wob`, `spin` rotation, `drift` for moving bands/
      veins, `deco` twinkle dots); `buildFancyDefs` generates one SMIL-animated
      `<linearGradient>` per skin into a hidden svg (board rebuilds can't wipe
      it); pawns fill with `url(#fancy-id)`. **Yin & Yang swirls** (rotating hard
      split), **Midas Marble has crawling gold veins**, **Inferno is stable at
      the base with a light heart + flickering top**, **The Void twinkles with
      stars**, Fire & Water sloshes a steam line, Versus trembles on its clash
      line, Blizzard/Sakura/Toxic get snow/petals/bubbles, Norge is a proper
      banded flag, aurora/sheen/dusk treatments for the rest.
- [x] **⚠ KEEP FOREVER: each skin's canonical vision saved as `desc`** in the
      FANCY_COLORS table (Isak's words) — skins must look like their desc.
- [x] **Verified headless Edge 7/7, 0 JS errors**: table statics (light heart at
      the bottom stop, swirl spin, marble reflect-drift, 6 void stars), 17
      generated gradients w/ flicker/rotate/translate SMIL nodes, pawn fill
      urls + deco counts + rgb class intact, sniper interaction hook, full
      4-bot game with the new skins. Screenshot eyeballed: marble veins, flame
      gradient, swirl split and void fade all read correctly.

### 2026-07-11 — Isak's 5-point batch: podium rework + colours + fancy skins + end-screen stats
- [x] **Podium rework**: pillars for the **top 3 only** — **gold/silver/bronze**
      bases blending to the player's own colour at the very top (`PODIUM.METALS`
      + `KEEP:55%`); **4th and 5th listed beside the podium** on the left
      (`.sideplaces`); 6th+ stay leaderboard-only.
- [x] **10 extra normal colours** in the picker (`EXTRA_COLORS` — picker-only,
      never seat defaults, so MAX_PLAYERS is untouched).
- [x] **18 fancy flowing colours** behind the same 🌈 RGB setting
      (`FANCY_COLORS` — one entry per skin, CSS generated at boot by
      `buildFancyStyles`): Rainbow (kept), Yin & Yang, Thunder Reef, Neon Night,
      Midas Marble, Blizzard, Inferno, Fire & Water, Sakura, Blood Night, Versus,
      The Void, Candyfloss + own picks Nordlys, Norge, Toxic, Royal, Sunset.
      `p.rgb` generalised to `p.fancy` (pawn class, swatches, scoreboard, replay,
      picker all fancy-aware via `paintSwatchEl`/`swatchHtml`); each skin =
      one colour, one holder.
- [x] **End-screen stats per player** (`END_STATS` registry): 👣 steps · 🪙 coins
      earned · 🎒 items used · 💫 times immobilised · 🪜 climbed · 🐍 descended ·
      🤝 interactions — **⭐ best / ⚫ worst** per category (ties mark all,
      all-equal marks none). New counters: `p.steps`, `p.coinsEarned`,
      `p.climbs`/`p.descents` (via `noteSkip`, 2+ tile non-walked jumps —
      `setBackPos` covers every knockback funnel), `p.interactions` (encounters +
      `STATS.SOCIAL_ITEMS`).
- [x] RULES.md synced (podium, stats, palette); defaults + skipped edge cases in
      QUESTIONS.md.
- [x] **Verified headless Edge 25/25, 0 JS errors**: statics, generated skin CSS,
      roster mapping + token classes, every counter funnel (steps, ladder climb,
      swap both-ways, secret-square knock, social item, encounter), fabricated
      standings (3 pillars + side list, metal gradient, star/dot/tie/flat rules),
      5-player side list, full 4-bot game with fancy skins to a winner with the
      stats strip on the end screen.

### 2026-07-11 — 🏆 KOTH Mario-Party bonus trophies (queued 2026-07-06 follow-up)
- [x] **Bonus round at the final whistle** (`KOTH.BONUS {COUNT:3, TROPHIES:2,
      REVEAL_MS:1400}` + `KOTH_BONUS_CATS` registry — a new category is one
      entry): 3 categories drawn at random from 5 — 🪙 most coins, 🐟 most fish,
      🏔️ most laps, 🎒 most items used, 💀 most times floored — every tied
      leader gets +2 🏆 (staggered log + pop reveal), THEN most trophies takes
      the hill. Zero-score categories never enter the draw.
- [x] **New per-player counters**: `p.downs` (ticks once in `downPlayer` +
      `freezePlayer` on a real floor — shield/mirror/stonehide blocks don't
      count, re-hitting a downed man doesn't either) and `p.itemsUsed`
      (`useItem` entry). Coins/fish/laps reuse existing stats.
- [x] `finishKoth` now async (awaits the bonus round); sole call site awaited.
- [x] RULES.md synced; skipped categories + defaults logged in QUESTIONS.md.
- [x] **Verified headless Edge 13/13, 0 JS errors**: tunables + registry statics,
      counters (down-once guard, shield no-count, freeze counts, useItem),
      deterministic 3-category payout incl. a tie paying both, all-zero pool
      pays nothing, full 8-round 4-bot KOTH game ends at the whistle with the
      bonus round fired and the trophy sort crowning the winner.

### 2026-07-11 — kick etiquette + purse (Isak's 3-point batch)
- [x] **Bots almost never kick a downed man**: `BOT.KICK_DOWNED_PENALTY` 8 → 40
      (net −31 per downed share) — only a catastrophic bounce option changes their
      mind. Downed-share now counts `downed && !frozen` only.
- [x] **Kicking a FROZEN player is shameless + a glide**: new branch before the
      kick-while-down path — the ice block **glides `FREEZE.KICK_GLIDE:3` tiles
      back** in one smooth slide (`glideFrozen`, still frozen, secret-square
      routing via `setBackPos`, landing tile resolves), **no shame** for the
      kicker. Bots value it: new `BOT.KICK_FROZEN_BONUS:12` (shameless + slides
      the frost off their own square before `tryFreeze` runs).
- [x] **Opening purse 5 → 10 coins** (`COIN.START`).
- [x] RULES.md synced (kick-while-down exception, deep-freeze glide, purse, bot
      brain bullet).
- [x] **Verified headless Edge 12/12, 0 JS errors**: purse 10; frozen kick glides
      46→43 / 13→10 still-frozen no-shame kicker-keeps-square; glide below tile 1
      → secret square; downed kick still row-drops + shames; bot stats over 60
      trials each — downed 0/60 kicked, frozen 60/60 punted, plain 52/60 (unchanged).

### 2026-07-10 — Isak's 8-point batch: finish line, gun RNG, colours/RGB, themes, gray warp tile
- [x] **🏁 Adjustable finish line** (`FINISH.NEED`, new ⚙️ Advanced → 🏁 Game slider,
      persisted): Classic ends after N finishers (1 = classic). Finishers bank a
      place + medal, sit on 90, get no bonus roll on a 6; the field races on
      (`finishPlayer` multi-finish + `endClassic`); a lone last racer auto-places.
- [x] **🔫 Gun chamber randomised around the odds** (`GUN.MIX {3,2,1}` +
      `MIX_WOBBLE:1`): each roulette draws its load-out fresh — exact MIX counts,
      then 1 random slot re-rolled on the same odds, shuffled (`rollChambers`).
      The big cylinder display shows the actual draw's counts.
- [x] **🎨 Player colour picker** on the setup screen: click a seat's swatch →
      palette popover (fixed-positioned so the name list can't clip it); colours
      other seats hold are dimmed/unclickable; default collisions fall back to a
      free colour at start. Roster now carries `color`; tokens/cutscenes read
      `p.color` (not the seat index).
- [x] **🌈 RGB player** (Settings toggle, persisted; `RGB` DATA): the 11th seat's
      natural colour, claimable by any one seat via the picker (counts as one
      colour). Pawn + all swatches flash the full rainbow forever (CSS
      `hue-rotate` animation, `.rgbflash`).
- [x] **🎨 Theme button** on the title menu (persisted): cycles Summer / Christmas /
      World Cup / Sakura / Minecraft — sky vars + drifting glyphs + clouds +
      tagline from the `THEMES` DATA table (a new theme = one entry). Board
      colours untouched.
- [x] **NEW RULE: 🌫️ gray warp square** (`FEATURES.warp`, tile 44): START your turn
      on it → the board flips 90/180/270° with colours inverted for that whole
      turn; rights itself next turn. Built via the registries (TILE_RULES paints
      it + a `RARE_EVENTS` entry with the new deterministic `when(p)` trigger —
      the registry contract now supports condition-fired turn-start events).
      Scrambles/shuffles along with the other specials. `svgPoint`/`cellToScreen`
      rebuilt on `getScreenCTM` so aiming + cutscenes stay accurate while flipped.
- [x] **Boss-battle mode + skins logged** as design tasks (see Active).
- [x] **Verified headless Edge 41/41 + full game**: chamber stats (μ 3.05/1.90/1.05,
      varies per draw), warp statics + fire/clear via the real `startTurn` loop +
      flag-off inert + newGame reset, multi-finish need-3 and need-all paths,
      RGB flag/swatch/pawn, theme apply, colour-picker internals, adv Game group;
      full 4-bot classic with `FINISH.NEED:2` ended round 32 on the 2nd finisher,
      places B1/A2/C3/D4, 0 JS errors. Defaults in QUESTIONS.md.

### 2026-07-10 — ⚖️ Balance sweep B1–B5 ALL BUILT (Isak: "work on all the suggestions")
- [x] **`BALANCE = { REF_PLAYERS:4 }`** DATA anchor — count-aware spots scale
      from it; current numbers now officially mean "tuned for a 4-player table".
- [x] **B1 — rare events normalized**: `startTurn` scales every `RARE_EVENTS`
      chance by `REF_PLAYERS / players` — same lightning/star/swap density per
      ROUND at any seat count (duels ×2 per turn, 6-player ×⅔).
- [x] **B2 — sniper by total turns**: new `game.turnCount` (bumped in `endTurn`);
      rifle to last place every `SNIPER.EVERY_TURNS:18` turns (was every 5th
      round = 20 turns at 4 seats). Bot shield-threat check updated to the same
      clock (rifle lands within the coming round).
- [x] **B3 — fishing fully per-player**: `p.fishStreak` (minigame curve) +
      `p.fishCaught` (bot loss table) replace the global `game.*` pair; your
      streak is yours, a full table no longer sours the pond ~3× faster.
- [x] **B4 — market markup normalized**: `floor(visits × REF_PLAYERS / players)`
      — identical to before at 4 seats, no more runaway inflation at 6.
- [x] **B5 — KOTH default rounds table** `ROUNDS_BY_PLAYERS {2:20, 3:24, 4:26,
      5:30, 6:32}` (+`ROUNDS_EXTRA:2` per seat past 6, slider still overrides).
      `TROPHY_LEAD` scaling NOT built (needs Isak's feel-pass — see QUESTIONS).
- [x] **B6 — no change** (watch-only observations, per the sweep).
- [x] RULES.md synced (sniper cadence, per-angler pond, dealer markup, KOTH
      table, "odds quoted for a 4-player table" note).
- [x] **Verified headless Edge 18/18**: statics + defaultRounds ladder, B1
      density measured statistically (300 turns: 135 fires @2p vs 51 @6p with a
      0.25 probe — ~matches 0.5/0.167 expected), B2 grant at turn 18 only (not
      16/19) + threat window, B3 win/loss isolation + own-curve escalation +
      global state gone, B4 prices 18/26/15 at 4/2/6 seats, full 4-bot classic
      (23 rounds) + full 2-bot KOTH on the new 20-round default, 0 JS errors.

### 2026-07-10 — 🕳️ SINGULARITY BOMB: crafting system + 2 new items (Isak + friend's idea)
- [x] **Crafting system** (`CRAFT` registry — a future recipe is one entry): holding
      any 2 of the recipe's `needs` auto-fuses them into `mid`; gaining the last
      missing piece (tracked in `p.craftNeed` — spare duplicates don't count)
      completes `out`. Hooked centrally in `giveItem`, so shop, black market and
      Mystery Box gains all trigger it.
- [x] **NEW ITEM: 💣 Bomb (6)** — lob at any tile within 8 (`BOMB`): blast floors
      everyone on/beside it (`gridNear`), shield/mirror-aware via `downPlayer`,
      thrower ducks. **NEW ITEM: 🔥 Fire Egg (5)** — singe a rival within 8
      (`FIRE_EGG`): next roll −2 via a `MOVE_BONUSES` entry (can sap a roll to
      nothing / backwards, same pipeline as radiation).
- [x] **🌑 Singularity Casing + 🕳️ Singularity Bomb** — `craftOnly` catalog entries:
      never on any shelf, never in the Mystery Box, hidden from the settings toggle
      list (secret preserved). Casing is unusable (it hums). Recipe: Shield + Bomb +
      Fire Egg.
- [x] **The vortex** (`SING`): pick any tile (not 90) — EVERY player on the map
      (any distance, downed/frozen too, nothing blocks it) spirals into a black
      hole there, dead-still beat, then implosion + shockwave rings hurl everyone
      3–10 tiles out in a semi-random spread — every rider slams down FLAT on
      landing (Isak's follow-up; ice shatters in the ride); past-90 folds back,
      below-1 lands on the secret square (dealer queues per the own-turn rule).
      Thrower suction by distance: ≤3 95% · ≤5 55% · ≤7 25% · else 10% (`SELF_PULL`).
- [x] **Dramatic cutscene**: sky-gloom, growing hole + rotating accretion ring +
      pulsing glow, accelerating spiral pull (tokens shrink + vanish), silence,
      megaboom + flashbang ear-ring + 3 shockwave rings + screen shake, staggered
      arc fly-outs. Preview: `#preview=singularity`. Screenshots eyeballed.
- [x] **Bots**: buy the pieces (`ITEM_VALUE` bomb 3 / fireegg 2), throw bombs at the
      juiciest cluster, singe the leader, and detonate the singularity aimed at the
      leader only from ≥7 tiles away (`BOT.SING_SAFE_DIST`).
- [x] **Verified headless Edge 24/24**: catalog/filter statics, both fuse orders,
      spare-duplicate guard, casing unusable, bomb shield-block + thrower immunity,
      singe math, deterministic blast (pull-all, fold-back at 90, secret-square
      crash + own-turn dealer), full 4-bot game to a winner (27 rounds), 0 JS errors.
      Defaults logged in QUESTIONS.md.

### 2026-07-10 — Isak's 4-point batch + player-count balance sweep (live session)
- [x] **📦 Mystery Box costs 5** (was 3, `SHOP_CATALOG`).
- [x] **Everyone starts with 5 coins** (`COIN.START`, player factory reads it).
- [x] **Rule cards wait for a click in games with real players** — auto-dismiss
      (3.8s) now only fires when EVERY seat is a bot; a bot discovering a rule
      mid-game holds the card up until a human dismisses it.
- [x] **Black-market dealer only appears on your own turn** — arriving on the
      secret square sets `p.marketDue`; knocked there flat, you meet the dealer
      **after you successfully stand up** (`resolveGetUp`); thrown there on your
      feet, at your **next turn start** (`startTurn`); slipping there mid-move on
      your own roll, immediately (`arriveAtSecret`). One audience per arrival —
      no more off-turn popup pile-ups when several players get blasted back at
      once. Off-turn `visitSecret` calls removed from lightning + snake-collision.
- [x] **Balance sweep delivered** → `SUGGESTIONS.md` "2026-07-10 balance sweep":
      six findings on how the game shifts with player count (rare-event density,
      sniper cadence, global fishing curves, market inflation, KOTH trophy
      economy, AoE scaling) + a `BALANCE.REF_PLAYERS` recipe. Awaiting Isak's picks.
- [x] **Verified headless Edge 15/15**: statics, start purse, mixed-game card
      held ≥5s + click dismiss, all-bot auto-dismiss, off-turn secret arrival
      deferred, market on get-up / turn-start / own-turn slip, full 4-bot game
      to a winner (27 rounds), 0 JS errors.

### 2026-07-06 — 🏆 King of the Hill game mode + mode-select screen (Isak's spec)
- [x] **Game-mode screen**: Play → **Game mode** → Choose players (Back buttons walk
      the chain in reverse; the in-game "New game" button also starts at the mode
      screen). Modes come from the `GAME_MODES` DATA table — a future mode is one
      new entry. `game.mode` carries the pick; "Play again" replays the same mode.
- [x] **🏆 Rounds slider** on the setup screen (KOTH only): range 5–60, default
      **6 × players** (5 players → 30, per Isak's "25–30 for a group of 5"),
      follows the seat count until touched. Tunables in `KOTH`.
- [x] **King of the Hill rules**: +1 trophy for starting your turn in **sole 1st**
      (pos > 0); +1 per **fish caught**; **+10 for reaching tile 90**, then back
      to the START lane (a lap — `p.laps`). A lap ends the move but a rolled 6
      still re-rolls; all other rules play exactly as Classic. After the set
      rounds, **most trophies wins** (tie → furthest up the board);
      `finishKoth` podium + leaderboard show 🏆 counts.
- [x] **Plumbing**: `finishPlayer` is now async and mode-aware (classic branch
      untouched); all 4 win call-sites awaited; `afterKothLap` handles the
      post-lap turn; round cap checked in `endTurn`; `awardTrophy` +
      `iconPopup` (generalised `coinPopup`); 🏆 in scoreboard; "Round X of Y"
      HUD line.
- [x] **Verified headless Edge**: 29/29 checks ×2 runs (mode screen, slider
      defaults/range/visibility, classic regression incl. a full bot game,
      trophy sources incl. tie/start-lane guards, lap via roll / rolled-6 /
      bounce / off-turn, round cap + tie-break, banner/scoreboard 🏆) + a full
      **40-round 4-bot KOTH game** with organic laps in rounds 22 & 27, final
      trophies 15/14/13/12, 0 JS errors. Defaults logged in QUESTIONS.md.
- [ ] Queued follow-up: **Mario-Party end-of-game bonus trophies** (see Active).

### 2026-07-06 — 9-item batch + QoL from SUGGESTIONS.md (Isak's picks)
- [x] **📦 Mystery Box (3)** — pops into a random enabled consumable (never another
      box); coins fallback if the pool is empty (`MYSTERY`).
- [x] **❄️ Snowball (6)** — throw at a rival within 8 tiles (`SNOWBALL.RANGE`),
      freezes them on the spot via `freezePlayer` (Shield/Mirror get their say);
      human targeting via `pickPlayerOnBoard`, bots aim at the furthest-ahead rival.
- [x] **🍌 Banana Peel (5) + trap system** — `game.traps` + generic spring check in
      BOTH landing paths (own roll before tile rules; off-turn in `resolveLanding`);
      plant on a plain tile ≤6 ahead (new `pickTileOnBoard` click-a-tile UI); first
      rival landing slips 5 back (secret-square routing via `setBackPos`); owner
      immune; 🍌 marker drawn on the board (`BANANA`).
- [x] **🪞 Mirror (7)** — THE "redirect an effect" item: arm it and the next
      knockdown/freeze aimed at you deflects to the NEAREST standing rival
      (`deflectHit` at the top of `downPlayer`/`freezePlayer`, so it covers sniper,
      gun, horn, snowball, lightning, everything); target's Shield still blocks,
      chained Mirrors bounce on (finite — each bounce burns one); 🪞 scoreboard mark.
- [x] **🪖 Helmet (8, passive)** — get up / break ice on any roll (`HELMET_GETUP`
      in `getupNeed`, HUD hint follows automatically).
- [x] **👑 Crown (10, passive)** — +1 coin at the start of every turn begun in sole
      1st (`CROWN_COINS`, startTurn hook).
- [x] **Black market v2-lite + EXOTICS table** — dealer now shelves 2 exotics
      (purple `.btn.exotic`, "· exotic" tag, fixed prices) + 1 normal item at the
      old dynamic price (`MARKET.EXOTIC_STOCK/NORMAL_STOCK`); exotics get their own
      🕯️ toggle group in Advanced settings.
- [x] **🐒 Monkey's Paw (8, exotic)** — teleport to ANY tile except the finish
      (click it), then the whole board scrambles (reuses `scrambledLayout` via
      `shuffleTiles(msg)`) and only THEN does the landing resolve.
- [x] **🎲 Loaded Dice (12, exotic)** — 3 charges of pick-your-exact-roll
      (`p.forceRoll`, charge count shown in the bag); last charge → next 3 rolls
      are cursed 1s (`p.curseRolls`, applies to get-up rolls too; `LOADED`).
- [x] **🕯️ Soul Candle (9, exotic passive)** — permanent +2 (`MOVE_BONUSES` entry),
      passive slot locked forever (`canBuy`), lightning retargets to a candle
      holder (`strikeLightning`).
- [x] **QoL batch**: settings persist in `localStorage`
      (`saveSettings`/`loadSettings`, key `stigespillet.settings.v1` — answers the
      open QUESTIONS item with YES); 🔊 master-volume slider (SFX gain node + kill
      voice, `SOUND.VOLUME`); ⏩ fast-forward toggle (bot turns ÷3 via `ffms` in
      sleep/tweens/auto-roll, humans untouched, `SPEED`).
- [x] **Bots** know every new item: values in `BOT.ITEM_VALUE`, timing in
      `botMaybeUseItem` (box always pops, mirror on threat, snowball at a standing
      unshielded leader in range, banana ahead of chasers, dice like the clover;
      paw valued 0 — bots don't wish).
- [x] **Verified headless Edge**: 29/29 targeted checks + a full 4-bot game to a
      winner (87 rounds, ff on, popups on), 0 JS errors. New defaults logged in
      QUESTIONS.md.

### 2026-07-05 (evening) — scrambled-board option + item-text clarity pass (Isak)
- [x] **🌀 Scrambled board** toggle in a new **🗺️ Board** advanced-settings group
      (`BOARD_OPTIONS` DATA table + `boardOpt(key)` accessor): when on, `newGame`
      places every special tile (teleporters/orange/freeze/shops/fishing/setback) at
      a random eligible spot — never on a ladder/snake tile, tile 1 or 90; ladders
      and snakes stay fixed (standing rule).
- [x] **Wheel-shuffle refactor**: the 🌀 slot's scramble logic split into
      `scrambledLayout()` + `setSpecialTiles(lay)` + `DEFAULT_SPECIALS` (canonical
      layout captured at load); `shuffleTiles()` is now a thin fx wrapper. `newGame`
      restores the canonical layout when the option is off — fixes a quiet leak where
      a mid-game wheel shuffle carried into "Play again".
- [x] **Advanced settings generalised**: `ADV_SECTIONS` entries now declare an
      `entries` data table; one generic `buildToggleRows` renders every group
      (Items + Board share it).
- [x] **Item desc convention** (Isak: "check the other items are clear if they are
      on use or not"): every consumable now reads **"When used: …"** (Shield, Clover,
      War Horn rewritten), passives keep **"Passive: …"** — kind is scannable at a
      glance in shop, bag and toggles list.
- [x] Verified headless Edge: 13/13 targeted checks (2 groups render, scramble
      validity ×10 games — counts/uniqueness/eligibility, canonical restore, shuffle
      leak fixed, desc convention) + a full 4-bot game on a scrambled board to a
      winner (24 rounds), 0 real JS errors (1 headless autoplay artifact).

### 2026-07-05 (later) — advanced settings + item toggles + inventory QoL (Isak)
- [x] **⚙️ Advanced settings** on the *Choose players* screen: collapsible `<details>`
      section under the player list; pull-down groups come from the `ADV_SECTIONS`
      registry (add an entry = a new group, matching the game's registry style).
- [x] **🛒 Items group**: one enable/disable checkbox per `SHOP_CATALOG` entry —
      iterates the catalog, so every future item appears automatically. The checkbox
      writes the item's `enabled` flag, which `shopStock()` already filters on
      (shop + black market both). Items already in a bag keep working.
- [x] **Coffee card reworded**: "When used: +4 to your next roll." — makes it clear
      it's an item you must *use*.
- [x] **Inventory stays closed after use**: using an item no longer auto-reopens the
      inventory panel.
- [x] Verified headless Edge: script runs to completion, 6/6 item rows + the Items
      group present in the rendered DOM, new coffee text in catalog + DOM.

### 2026-07-05 — 📯 War Horn (guest idea, built live with Isak + friend)
- [x] **NEW ITEM: 📯 War Horn** (consumable, 7 coins): blast wave floors every rival
      *standing* on the blower's row — shield-aware via `downPlayer`, already-down/
      frozen/off-board rivals untouched, 3+ felled fires the multi-kill announcer.
      Brassy horn SFX (`SFX.horn`) + expanding shockwave rings (`hornRings`); tunables
      in `HORN`. Bots value it (`ITEM_VALUE.warhorn:3`) and blow it only when a
      standing, unshielded rival shares their row (bag-full forces it, like the rest).
- [x] Verified headless Edge: 15/15 checks (catalog, row targeting, start-lane/finished
      immunity, shield block+spend, getupMin preserved, killstreak, bot hold/blow) +
      full 4-bot game to a winner (19 rounds), 0 JS errors.

### 2026-07-04 — Isak's answers to the 4-point-batch questions
- [x] **Coin tiers** (`COIN` + new `COIN_FX` DATA): yellow pays 1 — coin ping only, no
      icon; blue pays 3 — THREE big 🪙 pops + three pings in quick succession
      (`COIN_FX.blue`: POPS/GAP_MS/SCALE); rolled 6 pays 1 silently (no sound, no pop).
      `awardCoin(p, reason, n, fx)` picks the presentation from `COIN_FX`.
- [x] **Bot support is genuine** — trap targeting removed (`botSupportTrap` + its
      tunables deleted); support boosts a RANDOM rival regardless of where they land.
      Orange odds fixed: wheel 4/7 · support 2/7 · gun 1/7 (`ORANGE_WEIGHTS:[4,1,2]`,
      trailing modifiers removed to keep the ratios exact).
- [x] **Sizes**: pawns ×1.5, over-head popups ×3 (`TOKEN:{SCALE:1.5, ICON_SCALE:3}`).
      **Revised same day (Isak):** pawns ×1.25, popups ×2, ❄️ badge stays ×3
      (`FREEZE_ICON_SCALE`); blue-coin pings 100ms apart (`COIN_FX.blue.GAP_MS`);
      trap-support restored at 70% (`SUPPORT_TRAP_CHANCE`) with genuine random
      support the rest of the time (and always when no trap exists).
- [x] **Bot popups faster + toggleable in-game**: `THINK_MS:700`/`DECIDE_MS:650`; new
      Settings screen (button under Play on the title screen) with a "Bot decision
      popups 🤖" checkbox wired to `FEATURES.botThoughts`.
- [x] Verified headless Edge ×3: 23/23 checks (coin fx tiers instrumented, random
      support spread, settings wiring, sizes, odds) + full 4-bot games to a winner
      (rounds 45/20/26), 0 JS errors.

### 2026-07-02 — sniper-shield fix + tile-89 trapdoor (Isak)
- [x] Sniper hits now go through `downPlayer` — an ARMED shield blocks the shot
      (was setting `.downed` directly, bypassing the shield).
- [x] NEW: tile-89 trapdoor (`FEATURES.trapdoor`, registry rule `trap89`): disguised as
      plain yellow; FIRST landing = dramatic arc-plunge back to tile 1, then the tile is
      normal for the rest of the game (re-armed each newGame; fallout also cleared now).
- [x] Smoke 7/7, 0 errors.

### 2026-07-02 — shield is now tactical + blue tiles pay 3 (Isak)
- [x] Shield no longer guards from the bag: USE it from the inventory to arm it
      (`p.shieldOn`, bubble shows only when armed, blocks once). Bots arm theirs.
- [x] Plain BLUE tiles award 3 coins (yellow still 1); `COIN.PLAIN/BLUE`, `awardCoin(p,r,n)`.
- [x] Smoke 7/7, 0 errors.

### 2026-07-02 — lightning clouds, nuke rework, radioactive fallout rule, freeze fix (Isak)
- [x] **Lightning v3** (`CUTS.lightning:3`): clouds roll in from BOTH sides at the top, meet
      in the middle, sky darkens slowly; the strike itself unchanged.
- [x] **Nuke v3** (`CUTS.nuke:3`, timings kept): drawn nose-down warhead (fins + hazard band
      + trefoil) replaces 💣; slow rise-and-fall air-raid wail (`SFX.airraid`); fireball
      blooms then is swallowed by the white; flashbang ear-ring (`SFX.earring`) with the
      white void; knockdowns land BEHIND the white (via `nukeSequence(onWhiteout)`).
- [x] **NEW RULE: Radioactive fallout** (`FEATURES.radioactive`, first rule built via the
      registry recipe): each nuke converts 2 plain tiles to radioactive green (`RAD_TILES`,
      dynamic); landing infects: −1/turn stacking to −5 over 5 turns, then +1/turn back to 0,
      then cured + permanent +1 (immune). Re-exposure resets recovery to −5. Roll ≤ sickness
      = too weak to move. ☢️ badge in scoreboard. `MOVE_BONUSES` now supports negatives.
- [x] **Freeze fix (Isak)**: freezing NO LONGER spreads to players already standing nearby
      (`spreadFreeze` removed); you only freeze by LANDING on/next to a frozen player.
- [x] Verified: 13/13 targeted (freeze bystander safe, fallout paint/infect/curve/immunity,
      too-weak turn, re-exposure, v3 cutscenes clean) + suite 25/25.

### 2026-07-03 — Isak's 11-point batch (autonomous session)
- [x] **Coin fanfare**: every coin gain plays a Mario-style ping + a 🪙 pops over the pawn
      (`SFX.coin`, `coinPopup`).
- [x] **Support picked on the board**: veil + spotlight holes over candidates, hover =
      highlight + landing preview (dotted +5 trail, ladder/chute extension, target ring),
      click to choose (`pickPlayerOnBoard`, `supportPreview`).
- [x] **NEW ITEM: 🧤 Thieves' Gloves** (passive, 8): steal 1 coin per kick/bounce victim
      (`stealCoin`, hooks in `resolveEncounters`).
- [x] **Sniper multi-kill announcer**: 2+ downed = big screen callout + pitched-down
      browser voice ("double/triple/quad kill"; `KILLSTREAK`, `announceKill`).
- [x] **Consumable flourish**: used item hovers over the pawn in a soft aura (`itemFlourish`).
- [x] **Pile-up graze**: players in the chute's path now get clipped 1–3 back, 10% floored
      (`GRAZE`); bottom-of-chute full hit unchanged.
- [x] **All RULE_INFO cards rewritten vaguer** (why stays clear, details fuzzy — standing
      style rule, see CLAUDE.md; full detail stays in RULES.md).
- [x] **Black market v1**: secret square = shady dealer, 2 catalog items, dynamic prices
      (behind-the-pack discount, per-visit markup; `MARKET`, `runBlackMarket`).
- [x] Verified: Edge headless parse/run OK. Open clarifications in `Next/QUESTIONS.md`.

### 2026-07-03 — Isak's 4-point batch (autonomous session, later same day)
- [x] **Coin pop is blue-only**: plain yellow pays nothing now (`COIN.PLAIN:0`,
      `awardCoin` skips 0-coin awards); blue still pays 3 with the 🪙 pop. Rolled-6
      bonus coin kept (question logged).
- [x] **Bigger pawns + over-head icons**: `TOKEN = { SCALE:1.18, ICON_SCALE:1.5 }` —
      pawn body scaled via a wrapper group; coin pop, item flourish, ❄️ badge, SHAME
      banner, whose-turn arrow and shield bubble all scale from `TOKEN`.
- [x] **Switchback up-arrows**: white arrow across every 9→10 … 81→82 row boundary
      (`SWITCHBACK` DATA + `drawUpArrow` in RENDER; drawn under ladders/slides).
- [x] **Smarter bots (the queued item) + decision popups**: new BOT BRAIN section —
      `tileScore`/`landingScore` value landings in tiles; kick vs bounce scored (ladder
      ahead → bounce, deny + own-tile value → kick, downed-victim maths); orange pick
      weighs wheel/gun by standing and turns support into a trap when a rival's +5
      lands on freeze/setback/fallout/chute (`botSupportTrap`); sniper aims at the
      front-runner, skips armed shields, small aim wobble; shop/black-market buying by
      situational value (`botItemValue`, keeps buying while worth it); item timing
      (coffee held near the finish, clover waits for a clean landing or exact win,
      shield armed on real threats). Bots don't know the trapdoor until revealed.
      🤖 thought popup (`botThink`/`botDecide`, `.botthink` CSS) shows what's being
      weighed + the verdict; `FEATURES.botThoughts` toggles it; all tunables in `BOT`.
- [x] **Verified headless ×3**: 19/19 checks (coin guards, arrows drawn, pawn scale,
      landing scores, trap89 hidden until revealed, support-trap spotting, kick/bounce
      stats 30/30 each way, clover timing, shield threat) + full 4-bot games to a
      winner with popups on, 0 JS errors. Screenshot eyeballed: arrows/pawns/popup OK.

### 2026-07-03 — queued from Isak's batch (not yet built)
- [x] **Title screen: add a game-mode selection screen.** Built 2026-07-06 (Play →
      Game mode → Choose players; `GAME_MODES` DATA table).
- [x] **Design new game mode — King of the Hill**: built 2026-07-06 to Isak's full
      spec (see the Done entry below).
- [x] **KOTH: Mario-Party-style bonus trophies at the end** — built 2026-07-11
      (see the Done entry). Skipped categories (kicks dealt, tiles travelled)
      logged in QUESTIONS.md.
- [ ] **Design game mode — «Family mode»** (Isak, 2026-07-06): a calmer, less
      chaotic mode. ⚠ NOT an autonomous task: Isak wants to walk through the rule
      list together and say which rules are on/off (and possibly add new ones).
      Prep for that session: the mode-picker + `GAME_MODES` table are ready, and
      every rule is already a `FEATURES` flag — Family mode will mostly be a
      per-mode FEATURES preset.
- [ ] **Black market v2 — design the real stock + costs** (delayed-cost "very powerful"
      items). Idea pool from Isak: passives you can never replace, going into debt,
      powerful items with horrible side effects, cursed items, pity items.
      **Design proposal delivered 2026-07-18** → `SUGGESTIONS.md` §M (M1 Blood
      Coffee / M2 Debt Note / M3 Cursed Mask / M4 Borrowed Time / M5 Pity Pin;
      recommended rotation M1+M2+M4). Awaiting Isak's picks before building.
- [ ] **Polish pass**: more simple animations + SFX on everything; then QoL improvements
      once all other tasks are done.

### 2026-07-02 — radiation walks you backwards + wheel gets twin dice (Isak)
- [x] **Radioactive rework**: roll + debuff < 0 now hops you BACKWARDS that many tiles
      (`walkBackPath` in ENGINE, normal landing rules apply, floor at tile 1); exactly 0
      is still "too weak to move".
- [x] **Wheel**: both random slots now show 🎲 (the 🎯 dart board is gone); logs updated.
- [x] Confirmed the 🌀 tile-shuffle slot IS reachable (uniform 1/7 pick); fixed the stale
      "1/6" comment.

### 2026-07-02 — leviathan: V3 rejected (Isak: old is much better), V4 from-scratch redo
- [x] Live game reverted to the ORIGINAL leviathan (`CUTS.leviathan:1`).
- [x] V4 built from scratch, no code shared with V1/V3: body = scale-banded segment chain
      following the head's real swim trail; damped-spring steering (cruise sway, swoop to
      the gulp, S-curl rear-up); fresh head (mane/horn/whisker/jaw). Tunables `LEVI4`.
- [x] Preview can force a version: `#preview=leviathan4` (digit = CUTS version). Suite 25/25.

### 2026-07-02 — leviathan V3 redo + cutscene preview mode (Isak)
- [x] Leviathan V3 (`CUTS.leviathan:3`): dorsal fins + spine ridge rebuilt per frame from
      the same spine, faint second ripple in the glide, blink at the gulp. `2` = splash
      polish, `1` = original — flip back if V3 is worse. Spec choreography untouched.
- [x] Preview mode: open `index.html#preview=leviathan` (or lightning|star|nuke|gun) to
      watch a cutscene without playing; SPACE/click replays. Suite 25/25.
- [ ] ⚠ Isak has given precise visions for lightning/star/nuke that were LOST — re-capture
      them verbatim (KEEP FOREVER) next time he dictates them.

### 2026-07-02 — cutscene polish pass, individually revertible (Isak)
- [x] New `CUTS` DATA block: per-cutscene version switch (`{gun, leviathan, lightning, star, nuke}`,
      2 = polished, 1 = previous look) — flip any single one back if it feels worse.
- [x] Gun: no longer turns upside down aiming left (`gunPose` mirrors vertically past 90°);
      muzzle smoke puff per shot. Lightning: fading scorch mark + bolt afterglow fade-out.
      Star: drawn spinning gold star (not emoji) + landing shimmer ring. Nuke: bomb sways
      falling, blast shockwave ring, ash drifts down after the white-out. Leviathan: fades in,
      water spray at the gulp and the crash-landing.
- [x] Verified: all five fire clean in BOTH versions + gunPose flip check + suite 25/25.
      Harness note: gunFx waits on CSS animationend — dispatch it manually under virtual time.

### 2026-07-02 — movement feel pass (Isak)
- [x] Walking steps are hop arcs (`hopToken`: arc + landing squash, height `ANIM.HOP`);
      slides ride the drawn snake curve (`snakePoint` shared with `drawSlide`, ease-in).
      First move out of the START lane still glides. Suite 25/25, 0 errors.


### 2026-07-02 — shop shelf: 3 random items, one buy each per visit (Isak)
- [x] `shopStock()` draws `SHOP.STOCK` (3) random enabled items per visit; a per-visit
      `bought` set marks purchases "sold out" (disabled). Bots buy from the same shelf.
      Verified headless 5/5, 0 errors.

### 2026-07-02 — shop freeze fixed: catalog inlined (self-contained again) + error trap (Isak bug report)
- [x] Root cause: downloaded single-file copies lack `shop-items.js` → `SHOP_CATALOG`
      undefined on shop landing → turn chain dies → `busy` stuck. Catalog now inline
      (`SHOP_CATALOG` DATA block), `shop-items.js` deleted; `reportCrash` error trap logs
      `💥 Something broke: …` + releases `busy`. Verified: single-file + error-trap +
      full suite 25/25. (See LOG.md for details; harness note: stub rAF under virtual time.)

### 2026-07-02 — rules-engine refactor: registries for tiles / bonuses / rare events (Isak)
- [x] **`TILE_RULES` registry + `LANDING_ORDER`** — every special tile is one entry
      (`feature`, `tiles`, `color`, `onLand`/`offLand`, optional `matches`); a single
      generic `runTileRules(p, ctx)` replaces the duplicate if-chains in `moveCurrent`
      (on-turn) and `resolveLanding` (off-turn). Order per path is explicit
      (`LANDING_ORDER.turn` / `.offTurn` — freeze last on-turn, before teleport off-turn,
      exactly as before).
- [x] **Painting + plainness derive from the registry** — `cellColor` and `isPlainTile`
      read `TILE_RULES` via `specialTileColor`; `SPECIAL_TILES` dissolved into
      `FISH_COLOR`/`ORANGE_COLOR` DATA consts; `shuffleTiles` no longer re-syncs a
      colour map (it splices the tile arrays and everything follows).
- [x] **`MOVE_BONUSES` pipeline** — fish (+1 per 3), coffee (+4 one-shot, consumed),
      shoes (+1 passive) as entries; `moveBonusTotal(p)` sums them in `moveCurrent`.
- [x] **`RARE_EVENTS` table** — lightning / lucky star / fate swap; `startTurn` loops it.
- [x] **CLAUDE.md cookbook** — "Adding a new rule (the recipe)": DATA + handler +
      registry entry (+ FEATURES flag, RULE_INFO card, RULES.md note).
- [x] **Verified headless ×3 runs** — cellColor + isPlainTile byte-identical to the
      pre-refactor baseline for all 90 tiles; on/off-turn dispatch for all six tile rules
      (incl. feature-flag gating, skipTeleport guard, freeze-by-adjacency, interactive
      tiles inert off-turn); bonus math; 3 full autonomous 4-bot games to a winner.
      **25/25 checks per run, 0 JS errors.** No gameplay change intended.

### 2026-06-30 — inventory + items rework, coord labels off, encounter priority (Isak)
- [x] **Removed on-tile A1…J9 labels** — the coord *system* stays in code for
      programming; tiles no longer draw the grid label (1–90 number stays).
- [x] **Encounter before tile events** — `moveCurrent` resolves bounce/kick *before*
      fishing/teleport/orange/shop/setback/freeze, so hopping forward dodges an event
      tile and kicking lets you claim it. Plain landings unchanged.
- [x] **Inventory + items** — 🎒 Inventory button (use consumables before rolling);
      bag = 3 consumables + 1 passive (`INV`); items cost coins, bought at the gold shop.
      Coffee (4, +4 next roll), Shield (6, auto-block + blue bubble), Four-leaf Clover
      (10, guaranteed 6), Running Shoes (10, passive +1/roll, replaces old passive).
      `items[]`/`passive`/`rollBonus`/`forceSix` replace `shopItem`; catalog is data in
      `shop-items.js`, effects keyed by id. Bots buy + auto-use. **47/47 headless checks,
      0 JS errors.**

### 2026-06-30 — coordinate grid + ice spreads to neighbours (Isak request)
- [x] **Grid coordinate system** — single-source `cellRC`/`rcToCell`/`cellLabel`/
      `neighborCells`/`gridNear`; `cellCenter`+`tileBelow` refactored onto them (verified
      byte-identical for all 90 cells); A1…J9 badge rendered bottom-right of each tile.
      Completes the old `cellCenter()` coordinate-system TODO.
- [x] **Ice spreads to the 8 neighbours** — `spreadFreeze`: a newly-frozen player freezes
      anyone on the surrounding tiles (diagonals) + same tile; single ring, Shield blocks it.
      Reactive "moved next to a frozen player" check upgraded to real 8-way `gridNear`. The
      ice tile itself only freezes a direct landing (per Isak's clarification). `FREEZE.ADJ` = reach.

### 2026-06-26 — fish powers + secret square + smarter bots (Isak request batch)
- [x] **Bots vary their orange pick** — `BOT.ORANGE`/`ORANGE_WEIGHTS` reweighted to
      wheel:5 / gun:3 / support:2 so they no longer just spin the gun/roulette.
- [x] **Bot fishing odds by global catches** — new `FISH.BOT_LOSS_BY_CATCHES`
      `[.40,.60,.80,.90,.95]` keyed on `game.fishCaught` (total fish landed this game);
      first catch ~40% loss, escalating to 95%. (Removed the old streak-based `WIN_*`.)
- [x] **Secret square before tile 1** (`FEATURES.secretSquare`, `SECRET` DATA, viewBox
      widened left to `-96 0 1174 1040`). pos 0 + `p.onSecret`; not drawn until occupied
      (`showSecret`/`hideSecret`). Reached only via a backtrack below tile 1 — `setBackPos`
      routes lightning / pile-up knock-backs there instead of clamping to 1. `RULE_INFO.secret`.
- [x] **Fish powers** (`FEATURES.fishPowers`, tunables in `FISH`): +1 movement per 3 fish
      (`moveCurrent`); 2+ fish → ice escape on 3+ (`getupNeed`, used by HUD + `resolveGetUp`);
      2+ fish → 1-in-10 slip off a ladder (`applyLink`); 3+ fish + teleporter → shuffle
      everyone (`shuffleAllPositions`, `RULE_INFO.teleportshuffle`).
- [x] **Verified headless** — unit checks (setBackPos, getupNeed, shuffle multiset, bot-loss
      table, orange order, move-bonus formula) + targeted in-game paths (teleporter overload,
      fish-3 teleporter, secret-via-lightning) + 3 full autonomous games, **0 JS errors**;
      screenshot confirms the secret square reveals correctly.

### 2026-06-25
- [x] **Per-seat Player/Bot selection** — each setup row has a Player⇄Bot toggle, so a
      single game can mix humans and bots. `bot` flag on each roster/player; `game.autonomous`
      now tracks *the current seat* (set in `newGame` + `endTurn`), so a bot's turn auto-rolls
      while a human's waits for input. The *Autonomous mode* checkbox = "make every seat a bot."
      Bot seats marked 🤖 in the scoreboard. Verified headless: humans wait, bots self-roll,
      all-bot game finishes with a winner, 0 JS errors.

### 2026-06-24 autonomous build
- [x] **Explosions follow the target** — `explode(cell)` + `cellToScreen()`; centred on
      the victim's tile (where they stood before being moved). All call sites updated.
- [x] **Lightning animation** — clouds roll in, rumble, jagged bolt + crack on the
      leader's tile, then the knock-back.
- [x] **Lucky star animation (~4s)** — star flies in, scoops the trailing player,
      carries them to the destination tile with a sparkle trail.
- [x] **Nuke sequence** — air-raid siren → ~5s → ~3s descent → giant blast → 4s
      white-out → board revealed.
- [x] **Gun animation** — revolver draws/cocks, muzzle flash + explosion on each victim.
- [x] **Leviathan animation** — waves + sea-monster rise at the player's tile on a miss.
- [x] **Wheel RANDOM slot (6th)** — fires any effect in the game (wheel outcomes, gun,
      support, lightning, gain-fish, freeze, star, swap, random teleport).
- [x] **Wheel pointer accuracy** — pointer baked into the SVG; spin math generalised to
      N slots so it lands exactly under the pointer.
- [x] **Swap / star / lightning ~3× rarer** — per-turn chances ÷ 3 in the DATA block.
- [x] **Fishing easier + longer** — bigger zone, calmer fish, gentler drain, slower fill.
- [x] **Passive tile activation** — `resolveLanding()`: ladders/chutes/ice/teleporters
      fire when a player is moved onto them off-turn (kick, pile-up, swap, teleport,
      lightning, star, wheel/support). Fishing + orange stay manual. Depth-capped (6).

### Earlier
- [x] Project privacy pass (repo→private, username de-hardcoded, no-reply commit email).
- [x] `CLAUDE.md` collaboration guide created (layering + commit/push-at-session-end).

### 2026-06-24 verification + fixes
- [x] **Verified via headless Chrome** — page loads with no JS errors; every new
      effect path runs clean; a full autonomous game completes with a winner, 0 errors.
- [x] **`Play game.cmd` launcher** — fixes the "can't open by double-click" problem.
- [x] **Wheel size bug fixed** — a global `svg{}` rule was blowing the wheel up to
      ~795px (the real cause of the inaccurate-arrow feeling); scoped to `#board`.
- [x] **Wheel rotates about true centre** — `transform-box:fill-box`; all 6 slots
      land centred under the pointer (geometry-tested). Dead `.wheelpointer` CSS removed.

> Still worth a human eyeball in the browser for *feel* (animation pacing/looks),
> but correctness is now machine-verified.

## Ideas / later
- **`Next/SUGGESTIONS.md` (2026-07-05)** — curated pool of work suggestions (14) +
  shop-item ideas (15 normal + 7 black-market exotics), written on Isak's request.
  Pull picks from there into Active.
- Optional PNG board skin to match the classic photo.
- Bots / smarter autonomous opponents. *(Started 2026-06-25: bots now take teleporter
  swaps only when beneficial and favour gun/wheel over altruistic support — `BOT` DATA
  block. Could go further: gun/wheel choice by position, dice/fishing strategy, etc.)*
- More variant rules from the design ladder (special squares, minigames).
- Sound polish, nicer token art.

## Known risks / watch-outs
- No JS runtime locally (no node) → can't auto-syntax-check; edit carefully.
- Cascading passive triggers must have a depth cap (ladder↔chute↔teleport loops).
- The "RANDOM" wheel slot can fire heavy effects (nuke); that's intended.
