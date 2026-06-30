// shop-items.js — Stigespillet shop item catalog
// ─────────────────────────────────────────────
// Edit this file to add, remove, or disable shop items.
// The game (index.html) reads this automatically — you never need to touch
// index.html just to change the item list.
//
// Items in catalog: 4  ← update this number when you add or remove items
// ─────────────────────────────────────────────
//
// Each entry:
//   id      — internal key used by the game engine (keep stable; changing
//             an id while a player holds that item will break their display)
//   ico     — emoji shown in the shop picker, inventory and the scoreboard
//   name    — display name (shown bold in the shop)
//   desc    — one-line description shown to the player
//   kind    — "consumable" (held in your 3-slot bag, used before you roll)
//             or "passive" (the 1 always-on item; a new one replaces the old)
//   cost    — price in coins
//   enabled — true = can appear in the shop; false = hidden everywhere

const SHOP_CATALOG = [

  {
    id:      "coffee",
    ico:     "☕",
    name:    "Coffee",
    desc:    "+4 to your next roll.",
    kind:    "consumable",
    cost:    4,
    enabled: true,
  },

  {
    id:      "shield",
    ico:     "🛡️",
    name:    "Shield",
    desc:    "Blocks the next knockdown or freeze. A blue bubble shows while it's active.",
    kind:    "consumable",
    cost:    6,
    enabled: true,
  },

  {
    id:      "clover",
    ico:     "🍀",
    name:    "Four-leaf Clover",
    desc:    "Guarantees a 6 on your next roll.",
    kind:    "consumable",
    cost:    10,
    enabled: true,
  },

  {
    id:      "shoes",
    ico:     "👟",
    name:    "Running Shoes",
    desc:    "Passive: +1 to every roll while worn.",
    kind:    "passive",
    cost:    10,
    enabled: true,
  },

];
