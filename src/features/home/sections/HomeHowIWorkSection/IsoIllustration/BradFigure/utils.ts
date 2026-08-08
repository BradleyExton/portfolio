/* Shared by the figure and its head, so the palette sits here rather than in
   either entry. Hex literals rather than theme tokens: the figure lives inside
   the iso scenes, which are hex-authored so the artwork stays identical across
   themes (matching the what-i-do illustration tier). */
export const palette = {
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
} as const;

/* Sleeve length on a 38-unit limb; the rest of the arm is skin. */
export const SLEEVE = 13;
