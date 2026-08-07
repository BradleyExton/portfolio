import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} relative overflow-hidden bg-gradient-to-br from-brand-strong via-brand-deep to-brand-deeper text-content-inverse`;
// Soft emerald bloom behind the heading so the band reads as lit, not flat.
export const ambientGlow = "pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_-20%,color-mix(in_srgb,var(--color-brand-contrast)_16%,transparent)_0%,transparent_60%)]";
// Extra padding on the container rather than the section: this is the page's
// closing moment and the only band shorter than a viewport, so it gets more
// air than the standard section rhythm. Adding it here keeps spacing.section's
// py-* the single source of the base rhythm instead of stacking a second py
// utility that the cascade, not the author, would resolve.
export const container = `scroll-view-rise relative ${spacing.container4} py-2 text-center sm:py-4 md:py-8`;
// No mb/size overrides: sectionTitleInverse already carries mb-4 and
// sm:text-4xl, and the appended mb-6/md:text-4xl were unresolved duplicates.
export const heading = typeScale.sectionTitleInverse;
export const description = `mx-auto mb-8 max-w-2xl ${typeScale.leadBodyInverse}`;
// Stacked full-width below sm so the two CTAs share an edge instead of
// centring at two different widths; side by side from sm up.
export const row = "flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4";
export const link = "hover:-translate-y-0.5";
export const icon = "h-5 w-5";
export const ctaLink =
  "border border-brand-tint bg-brand-deep hover:-translate-y-0.5 hover:border-surface hover:bg-brand-deeper focus-visible:outline-surface";
