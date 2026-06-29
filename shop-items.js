// shop-items.js — Stigespillet shop item catalog
// ─────────────────────────────────────────────
// Edit this file to add, remove, or disable shop items.
// The game (index.html) reads this automatically — you never need to touch
// index.html just to change the item list.
//
// Items in catalog: 3  ← update this number when you add or remove items
// ─────────────────────────────────────────────
//
// Each entry:
//   id      — internal key used by the game engine (keep stable; changing
//             an id while a player holds that item will break their display)
//   ico     — emoji shown in the shop picker and the scoreboard
//   name    — display name (shown bold in the shop)
//   desc    — one-line description shown to the player when shopping
//   enabled — true = can appear in the shop; false = hidden everywhere

const SHOP_CATALOG = [

  {
    id:      "boots",
    ico:     "👟",
    name:    "Speed Boots",
    desc:    "+4 to your next roll.",
    enabled: true,
  },

  {
    id:      "shield",
    ico:     "🛡️",
    name:    "Shield",
    desc:    "Block the next knockdown or freeze.",
    enabled: true,
  },

  {
    id:      "charm",
    ico:     "🍀",
    name:    "Lucky Charm",
    desc:    "Roll the die again immediately.",
    enabled: true,
  },

];
