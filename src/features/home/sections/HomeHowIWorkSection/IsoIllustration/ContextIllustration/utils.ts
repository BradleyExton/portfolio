/* The context line is laid out in the ground plane's own coordinates rather
   than screen ones. (a, b) are distances along the plane's two axes from its
   far corner — the same axes the scene's ground polygon is built on, +a running
   down-right and +b down-left — so a slot, a slat and the slab's own corners
   are one projection call apart, and nothing in the run can end up
   accidentally off-axis. -14 is the plane's far vertex; `rise` lifts a point
   off it. */
const AX = 0.866;
const AY = 0.5;

export const iso = (a: number, b: number, rise = 0): [number, number] => [
  AX * (a - b),
  -14 + AY * (a + b) - rise,
];

/** Same, formatted for a polygon/polyline `points` list. */
export const point = (a: number, b: number, rise = 0): string => iso(a, b, rise).join(",");

/* Belt slab: where the run starts and ends, and its outer width. The rails are
   the full width; the deck they hold is inset and sits lower, which is what
   keeps the run from reading as a flight of steps. Deck width is the crate's
   own footprint, so a crate fills its lane exactly. */
export const BELT = { start: 54, end: 145, far: 185, near: 209, rise: 8 } as const;
export const DECK = { far: 189, near: 205, rise: 5 } as const;

/** Centre of the run, set to the depth Bradley himself stands at. */
export const LANE = 197;

/** One crate per slot, four slots; the last is where his hand meets the line. */
export const SLOT_STEP = 28;
export const SLOT_COUNT = 4;

/* A crate's own bottom vertex, so `slot` returns the crate's centre rather than
   the patch of deck under it. */
const CRATE_DROP = 17.3;

export const slot = (index: number): [number, number] =>
  iso(BELT.end - (SLOT_COUNT - 1 - index) * SLOT_STEP, LANE, DECK.rise + CRATE_DROP);

/* Slats start a pitch behind the deck so the one stepping onto it is already
   drawn; the clip path trims both ends of the run. */
const SLAT_STEP = 12;

export const slats = Array.from(
  { length: Math.round((BELT.end - BELT.start) / SLAT_STEP) + 1 },
  (_, index) => BELT.start - SLAT_STEP + index * SLAT_STEP,
);
