/* The single source for the cartoon Bradley character.

   He is drawn in two places at wildly different sizes — the how-i-work iso
   scenes and the nav mark — and every earlier attempt at the mark redrew him
   from scratch at mark scale. That always produced a near-miss: a slightly
   different hairline, a hoodie instead of the button-up, a face that read as a
   second character standing beside the first. So what both renderers need
   lives here once and each scales it by transform rather than retracing it.

   Only the front view and the front of the shirt are here, because that is all
   the mark ever shows. The 3/4, back and glance heads, the legs, the shoes and
   the back of the shirt stay with the scene figure.

   Coordinates are the scene figure's own: the head box is 42x52 centred on
   x=0 with the crown at y=2 and the chin at y=54, and the torso hangs below it
   from y=59.

   Hex literals rather than theme tokens: the artwork is hex-authored so it
   stays identical across themes (matching the what-i-do illustration tier),
   and semantic tokens would let a future theme recolour his skin. */
export const bradPalette = {
  skin: "#f2c29c",
  skinShade: "#eab88f",
  hair: "#a37e54",
  // Only ever seen from behind: the slicked strands over the crown, which are
  // the one thing separating the back of his head from a plain brown oval.
  hairShade: "#8a6844",
  stubble: "#c49a6c",
  shirt: "#10b981",
  shirtShade: "#059669",
  // Collar, placket and cuff bands.
  trim: "#d1fae5",
  pants: "#2f423a",
  // Hip pockets and belt loops, which have nothing but tone to separate them
  // from the seat they sit on.
  pantsShade: "#25352e",
  belt: "#1c2b25",
  // Warm against the cool trim: the buckle sits directly below the placket,
  // and in the same family the two merged into one pale line down the centre.
  buckle: "#caa14f",
  // The shoe upper has to stay clearly lighter than the pants. Matched to
  // them, the upper vanished and only the midsole read.
  shoe: "#7b8f85",
  sole: "#f3f6f4",
  eye: "#2f2a26",
  brow: "#8a683f",
  nose: "#dda87e",
  mouth: "#8f6844",
} as const;

/* No fringe: the hairline is a wide arch sitting high on the skull with both
   temples receded past the brow, and a short taper in front of each ear. The
   outer edge of the hair reuses the skull's own top curve, so the hair can
   never bulge past the silhouette the way a drawn-on cap does. */
export const bradFrontFace = {
  neck: { x: -6, y: 52, width: 12, height: 10 },
  skull: "M-21 22 q0 -20 21 -20 q21 0 21 20 l0 14 q0 18 -21 18 q-21 0 -21 -18 z",
  earLeft: { cx: -21, cy: 32, r: 4.5 },
  earRight: { cx: 21, cy: 32, r: 4.5 },
  stubble:
    "M-19.5 38 q0 15 19.5 15 q19.5 0 19.5 -15 l0 6 q-2 14 -19.5 14 q-17.5 0 -19.5 -14 z",
  hair:
    "M-21 19 q0 -17 21 -17 q21 0 21 17 C18.6 13 16.4 8.6 13 8 C8.4 7 4 9 0 12 C-4 9 -8.4 7 -13 8 C-16.4 8.6 -18.6 13 -21 19 Z",
  sideburnLeft: "M-20.4 19 q-1.4 8 -0.4 12 q2.6 -3 3 -8 q0 -3 -0.6 -4.6 z",
  sideburnRight: "M20.4 19 q1.4 8 0.4 12 q-2.6 -3 -3 -8 q0 -3 0.6 -4.6 z",
  eyeLeft: { cx: -8, cy: 30, r: 2.4 },
  eyeRight: { cx: 8, cy: 30, r: 2.4 },
  brows: "M-12 24 q4 -2.5 8 -1 M4 23 q4 -1.5 8 1",
  nose: "M0 32 q2 3 0 5",
  mouth: "M-5 42.5 q5 4.5 10 0",
} as const;

/* The shirt block, plus the tells that only a front view has. The shade is a
   rim down the right edge rather than a panel splitting the chest, and the
   placket runs the full height of the shirt: cropping it short is what turns
   the two collar points into a bow tie, since a pale group that closes on
   itself stops reading as a garment. */
export const bradTorso = {
  body: "M-22 70 q0 -8 8 -10 l28 0 q8 2 8 10 L17 98 q0 5 -5 5 l-24 0 q-5 0 -5 -5 z",
  shade: "M14 60.4 q8 2 8 9.6 L17 98 q0 5 -5 5 l-3 0 z",
  lapelLeft: "M-11 59 L-1.5 61 L-7 73 z",
  lapelRight: "M11 59 L1.5 61 L7 73 z",
  placket: { x: -2.4, y: 60, width: 4.8, height: 37 },
  buttonYs: [71, 80, 89],
} as const;
