// Scene wrapper: .iso-scene scopes the assemble/loop behavior defined in
// globals.css; activation is driven by data-active on the card surface.
export const scene = "iso-scene absolute inset-0 p-4 xl:p-5";

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
  "iso-piece [--iso-piece:8]",
  "iso-piece [--iso-piece:9]",
  "iso-piece [--iso-piece:10]",
] as const;

export const svg = "h-full w-full";
