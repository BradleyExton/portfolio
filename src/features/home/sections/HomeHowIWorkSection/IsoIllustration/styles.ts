// Scene wrapper: .iso-scene scopes the assemble/loop behavior defined in
// globals.css; activation is driven by data-active on the stage row.
export const scene = "iso-scene";

// Piece classes stagger the assemble animation; --iso-piece feeds the
// animation-delay calc in globals.css.
export const pieces = [
  "iso-piece [--iso-piece:0]",
  "iso-piece [--iso-piece:1]",
  "iso-piece [--iso-piece:2]",
  "iso-piece [--iso-piece:3]",
  "iso-piece [--iso-piece:4]",
  "iso-piece [--iso-piece:5]",
  "iso-piece [--iso-piece:6]",
  "iso-piece [--iso-piece:7]",
] as const;

export const svg = "h-auto w-full";
