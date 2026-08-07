// 72px is the widest label ("MCP Servers" measures 69px at 11px) rounded up,
// so every tile is the same width and the glyphs land on one 76px pitch.
export const tile =
  "flex flex-col items-center gap-1.5 transition-transform duration-300 motion-safe:hover:-translate-y-1 md:w-[72px]";

export const glyphFrame = "relative";
// The stack row is the supporting cast: Next.js in particular is drawn in the
// near-black neutrals, which made it the highest-contrast mark in the strip and
// pulled the eye past the four AI tools it is meant to sit behind.
export const stackGlyphFrame = "relative opacity-85";
export const aiHalo =
  "pointer-events-none absolute inset-1.5 -z-10 rounded-full bg-brand-tint/50 blur-md";

// Labels are captions for the glyphs, not a third tier of headings. Dropping
// them to 11px and off bold keeps the whole strip below the CTA row.
export const aiLabel = "text-[11px] font-medium text-brand-strong";
export const stackLabel = "text-[11px] font-normal text-content-subtle";

// h-12 matches the glyph box, so the mark centres on the row of cubes. It used
// to hang off the bottom of the row, stranded in the gap between the glyphs and
// their captions with nothing to align to.
export const divider =
  "hidden h-12 w-4 items-center justify-center text-sm text-accent-soft md:inline-flex";

/* Staggered entrance, one tile after another. */
export const aiTileMotion = [
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.25s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.33s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.41s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.49s_both]",
];

export const dividerMotion =
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.57s_both]";

export const stackTileMotion = [
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.63s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.69s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.75s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.81s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.87s_both]",
];
