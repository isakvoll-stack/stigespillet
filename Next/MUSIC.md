# 🎵 Music & ambience direction

> ⚠ KEEP THIS FILE — Isak's canonical music vision (2026-07-18). Do **not**
> delete or trim these instructions, even as pieces ship. Check items off and
> add build notes, but the instructions themselves stay.

## Isak's instructions (2026-07-18, verbatim intent)

- Some **background music** would be wonderful.
- You must be able to **adjust the music volume AND the general volume
  settings mid-game**.
- The music should **match the board**:
  - **Boss fights** have their **own music depending on the boss** (can be
    variations of the same piece).
  - **Standard** has **one or a few musics**.
  - **Evernight** (Forever Night) should have **ambient night-time sounds** on
    top of **very calm or silent eerie music, if any at all**.
  - There should be a **new black tile** that makes **everything fall into
    night for three rounds**, adding the **same ambient night-time sounds**
    (like some **crickets** and maybe some **owl hoots** now and then).
  - **All the other board twists** should have their **own music, music
    variation, or ambient soundtrack**.

## Build state

- [x] **v1 engine shipped 2026-07-18** — `BGM` procedural sequencer (WebAudio,
      no audio files, one-file rule kept). `MUSIC` DATA block: tracks are
      16-step semitone patterns (bass/lead/pad); variants transpose + retime.
  - [x] Standard track (Classic/KOTH/tour road legs); Mayhem = faster variant
        (`MUSIC.MODE_VAR`).
  - [x] Boss track + **per-boss variations** (`MUSIC.BOSS_VAR` — key/tempo per
        boss, applied when the giant die lands; Joker gets its own shift).
  - [x] **Evernight ambience**: crickets (random chirps), owl hoots (rare),
        low two-note drone — `MUSIC.NIGHT`; used by the Forever Night twist.
  - [x] **🌃 Nightfall black tile** (`NIGHTFALL`, tiles 31 & 74, 3 rounds):
        night fog + the same cricket/owl ambience; lifts at dawn with a log
        line. Core-rule wired via the registries.
  - [x] **Every leg twist mapped** in `MUSIC.TWIST_VAR` (night → ambience; the
        rest are key/tempo variations of the standard track for now).
  - [x] **Volume mid-game**: 🔊 Sound button in the side panel (master +
        music sliders, live) + the same pair on the Settings screen;
        persisted in localStorage.
- [ ] v2 ideas (not yet asked-for polish — run past Isak first): a second/third
      standard track that rotates per game; truly distinct twist tracks
      (casino jazz chords, ice bells, flood waves); boss phase-change music
      escalation; win/lose stingers; duck music during big cutscenes.
