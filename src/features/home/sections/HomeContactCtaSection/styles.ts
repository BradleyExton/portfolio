import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} relative overflow-hidden bg-gradient-to-br from-brand-strong via-brand-deep to-brand-deeper text-content-inverse`;
// Soft emerald bloom behind the heading so the band reads as lit, not flat.
export const ambientGlow = "pointer-events-none absolute inset-0 bg-[radial-gradient(90%_120%_at_50%_-20%,color-mix(in_srgb,var(--color-brand-contrast)_16%,transparent)_0%,transparent_60%)]";
export const container = `scroll-view-rise relative ${spacing.container4} text-center`;
export const heading = `${typeScale.sectionTitleInverse} mb-6 md:text-4xl`;
export const description = `mx-auto mb-8 max-w-2xl ${typeScale.leadBodyInverse}`;
export const row = "flex flex-wrap justify-center gap-4";
export const link = "hover:-translate-y-0.5";
export const icon = "h-5 w-5";
export const ctaLink =
  "border border-brand-tint bg-brand-deep hover:-translate-y-0.5 hover:border-surface hover:bg-brand-deeper focus-visible:outline-surface";
