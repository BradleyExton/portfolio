import { spacing, surfaces, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.hero} relative overflow-hidden`;
export const ambientBackdrop = surfaces.heroAmbient;
export const container = `relative ${spacing.container5}`;
export const shell = "text-left";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.pageHeroTitle;
export const description = `max-w-3xl ${typeScale.leadBody}`;
export const availability = "mt-5 inline-flex max-w-full items-start gap-2.5 rounded-2xl border border-border-default/70 bg-surface/80 px-4 py-2.5 text-sm leading-relaxed text-content-subtle shadow-sm sm:mt-6 sm:items-center sm:rounded-full sm:py-2";
export const availabilityDot = "mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-brand ring-[3px] ring-brand-soft sm:mt-0";
export const availabilityText = "flex min-w-0 flex-col sm:flex-row sm:items-center sm:gap-1";
export const availabilityLabel = "font-semibold text-content";
export const availabilityValue = "break-words";
