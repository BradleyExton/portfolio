import { spacing, surfaces, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.hero} relative overflow-hidden`;
export const ambientBackdrop = surfaces.heroAmbient;
export const container = `relative ${spacing.container6}`;
export const layout =
  "flex flex-col-reverse items-center gap-10 lg:flex-row lg:items-center lg:gap-14";
export const content = "min-w-0 w-full lg:flex-1";
export const title = `${typeScale.pageHeroTitle} mb-4 md:mb-5`;
export const description = `mb-5 max-w-3xl ${typeScale.leadBody} md:mb-6 md:text-xl`;
export const metaRow = "flex flex-wrap gap-2";
export const metaItem =
  "rounded-full border border-border-default bg-surface/80 px-3 py-1.5 text-sm font-medium text-content-muted shadow-sm";

export const portraitColumn = "group relative shrink-0";
export const portraitHalo =
  "pointer-events-none absolute -inset-6 rounded-full bg-brand-tint/25 blur-2xl transition-opacity duration-700 group-hover:opacity-70";
export const portraitRing =
  "pointer-events-none absolute -inset-3 rounded-full border border-brand-tint/70";
// Same ripple as the home intro band, keyed to brand tint so the rings stay
// legible on the light hero ground.
const portraitPulseBase =
  "pointer-events-none absolute -inset-3 rounded-full border border-brand/40 opacity-0";
export const portraitPulse = `${portraitPulseBase} motion-safe:group-hover:animate-[portrait-ripple_3s_ease-out_infinite]`;
export const portraitPulseMid = `${portraitPulseBase} motion-safe:group-hover:animate-[portrait-ripple_3s_ease-out_1s_infinite]`;
export const portraitPulseLate = `${portraitPulseBase} motion-safe:group-hover:animate-[portrait-ripple_3s_ease-out_2s_infinite]`;
export const portraitFrame =
  "relative h-48 w-48 overflow-hidden rounded-full border border-border-default bg-[linear-gradient(to_bottom_right,var(--color-brand-weak),var(--color-brand-soft))] shadow-[0_18px_40px_-18px_rgba(6,78,59,0.45)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:h-56 sm:w-56 lg:h-64 lg:w-64";
export const portraitImage = "h-full w-full object-cover object-center";
// Echoes the terminal node on the How I Work rail so the portrait reads as
// part of the same illustration language rather than a pasted-in avatar.
export const portraitNode =
  "pointer-events-none absolute bottom-4 left-0 h-3.5 w-3.5 rounded-full bg-accent-soft shadow-[0_0_0_5px_var(--color-surface),0_0_0_7px_var(--color-brand-tint)]";
