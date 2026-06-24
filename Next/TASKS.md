# Stigespillet (Web) — Task backlog

The master to-do list. Check items off as they ship. Newest direction from Isak
is at the top of **Active**. When everything in Active is done, pull from Ideas.
See `LOG.md` for the running session history.

> Single source of truth lives in the DATA block of `index.html`. Tunables
> (chances, timings, distances) belong there, never as bare literals in logic.

---

## Active — requested 2026-06-23/24 (autonomous build)

### Effects & animations
- [ ] **Explosions follow the target.** They were always screen-centre. Centre each
      explosion on the *targeted player's tile* — specifically where they stood
      **before** the effect moved/knocked them. (`explode(cell)` + `cellToScreen`.)
- [ ] **Lightning animation.** Clouds roll in → rumbling thunder → a lightning bolt
      strikes the leader's tile with a sharp crack. Then the existing knock-back.
- [ ] **Lucky star animation (~4s).** A star flies across the screen, scoops up the
      last-place player, and carries them to their destination tile over ~4 seconds.
- [ ] **Nuke sequence.** Classic nuclear air-raid siren → wait ~5s → a nuke descends
      from above, ~3s to impact → giant explosion → screen fades to **white for 4s**
      → board revealed again.
- [ ] **Gun animation.** Add a visual to the gun/roulette outcome (draw, muzzle
      flash, bang at the victims) instead of a bare centre explosion.
- [ ] **Leviathan animation.** Add a sea-monster visual on a failed catch (the wave/
      monster rising at the player's tile, dragging them off) instead of a bare boom.

### Wheel of Fortune
- [ ] **Add the missing 6th slot = "RANDOM".** Lands → fire a random effect from the
      whole game: any wheel outcome (nuke / back-to-start / next / +15 / nothing),
      the gun, randomly support a player, lightning, gain a fish, get frozen, the
      star, the swap, a random teleport — and any other effect in the game.
- [ ] **Fix pointer accuracy.** The arrow didn't line up with the landed slot. Put
      the pointer inside the wheel SVG (pixel-aligned to centre) and make the spin
      math land the chosen segment exactly under it.

### Probability tuning
- [ ] **Make swap, star and lightning ~3× rarer** than they currently are
      (per-turn random chances ÷ 3). Swap is otherwise fine as-is.

### Fishing
- [ ] **Slightly easier and longer.** Bigger catch zone, calmer fish, gentler drain,
      slower fill so a round lasts a bit longer. Keep the streak ramp, just softer.

### Passive tile activation (knock-around triggers)
- [ ] **Tiles activate when you're moved onto them — even off-turn.** When a player is
      knocked/moved by lightning, a chute pile-up, the star, swap, teleport, kick,
      gun, wheel, etc. and lands on an *event/movement/trap* tile, it triggers:
      ladders, chutes (incl. pile-ups), ice (freeze), teleporters.
      **Do NOT** trigger time-consuming/interactive tiles passively: the fishing
      minigame (dark-blue) and the orange Wheel/Support/Gun choice.
      Needs a cascade depth guard so chains can't loop forever.

---

## Done
- [x] Project privacy pass (repo→private, username de-hardcoded, no-reply commit email).
- [x] `CLAUDE.md` collaboration guide created (layering + commit/push-at-session-end).

## Ideas / later
- Optional PNG board skin to match the classic photo.
- Bots / smarter autonomous opponents.
- More variant rules from the design ladder (special squares, minigames).
- Sound polish, nicer token art.

## Known risks / watch-outs
- No JS runtime locally (no node) → can't auto-syntax-check; edit carefully.
- Cascading passive triggers must have a depth cap (ladder↔chute↔teleport loops).
- The "RANDOM" wheel slot can fire heavy effects (nuke); that's intended.
