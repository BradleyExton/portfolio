export const tile =
  "flex flex-col items-center gap-2.5 transition-transform duration-300 motion-safe:hover:-translate-y-1.5";

export const glyphFrame = "relative";
export const aiHalo =
  "pointer-events-none absolute inset-2 -z-10 rounded-full bg-brand-tint/60 blur-lg";

export const aiLabel = "text-xs font-semibold text-brand-strong";
export const stackLabel = "text-xs font-medium text-content-muted";

export const divider = "mb-7 hidden self-end text-base text-accent-soft sm:block";

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
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.93s_both]",
  "motion-safe:animate-[hero-chip-rise_0.6s_cubic-bezier(0.22,1,0.36,1)_0.99s_both]",
];
