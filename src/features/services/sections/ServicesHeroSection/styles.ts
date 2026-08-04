import { spacing, surfaces, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.hero} relative overflow-hidden`;
export const ambientBackdrop = surfaces.heroAmbient;
export const container = `relative ${spacing.container5}`;
export const shell = "text-left";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.pageHeroTitle;
export const description = `max-w-3xl ${typeScale.leadBody}`;
export const availability = "mt-5 inline-flex max-w-full flex-col rounded-2xl bg-surface/70 px-3.5 py-2 text-sm leading-relaxed text-content-subtle sm:mt-6 sm:flex-row sm:items-center sm:gap-1 sm:rounded-full sm:py-1.5";
export const availabilityLabel = "font-semibold text-content";
export const availabilityValue = "break-words";
