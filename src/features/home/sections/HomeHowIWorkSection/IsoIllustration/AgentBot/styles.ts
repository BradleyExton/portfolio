// Status light on the antenna, running the scene's shared twinkle. Staggered
// by a third of the bar per agent so the three never pulse in unison — the
// bodies already move together on the beat, and a synchronised light on top of
// that read as one blinking object rather than three working sessions.
export const statusByKind = {
  claude: "iso-loop-tw",
  codex: "iso-loop-tw [--iso-tw-delay:-0.8s]",
  gemini: "iso-loop-tw [--iso-tw-delay:-1.6s]",
} as const;
