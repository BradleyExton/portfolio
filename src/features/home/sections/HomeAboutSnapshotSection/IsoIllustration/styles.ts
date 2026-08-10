// Scene wrapper: .iso-scene scopes the assemble/loop behavior defined in
// globals.css; activation is driven by data-active on the card surface.
// Padding existed to hold the scene off the old panel border. With the border
// gone it only shrank the drawing, so the scene now fills its column and the
// card's own gutter does the spacing.
export const scene = "iso-scene absolute inset-0";

// Watermark wrapper deliberately omits .iso-scene: a scene that assembles and
// then loops forever behind body copy reads as distraction, not detail. The
// parent owns placement, so this only fills the space it is given.
export const watermarkScene = "h-full w-full";

export const sceneByVariant = {
  panel: scene,
  watermark: watermarkScene,
} as const;

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

/* Loop classes the three scenes share. Packets on one route are offset against
   each other rather than given separate durations, so the whole card stays on
   the sitewide beat. */
export const packet = "iso-loop-pulse";
export const packetLate = "iso-loop-pulse [--iso-pulse-delay:-1.4s]";
export const packetLater = "iso-loop-pulse [--iso-pulse-delay:-2.1s]";
export const bob = "iso-loop-bob";
export const bobSlow = "iso-loop-bob [--iso-bob-duration:4.4s]";
export const twinkleA = "iso-loop-tw";
export const twinkleB = "iso-loop-tw [--iso-tw-delay:-1.2s]";
