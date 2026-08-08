/* Shared by the figure and its head drawings. Hex literals rather than theme
   tokens: the figure lives inside the iso scenes, which are hex-authored so the
   artwork stays identical across themes (matching the what-i-do tier). */
export const palette = {
  skin: "#f2c29c",
  skinShade: "#eab88f",
  hair: "#a37e54",
  hairShade: "#8a683f",
  stubble: "#c49a6c",
  shirt: "#10b981",
  shirtShade: "#059669",
  pants: "#2f423a",
  shoes: "#1c2b25",
} as const;
