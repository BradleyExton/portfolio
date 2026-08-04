import { spacing, surfaces, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.hero} relative overflow-hidden`;
export const ambientBackdrop = surfaces.heroAmbient;
export const container = `relative ${spacing.container6}`;
export const layout = "grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)] lg:gap-14";
export const content = "max-w-4xl";
export const title = `${typeScale.pageHeroTitle} mb-4 sm:mb-5 md:mb-6`;
export const description = `max-w-[34ch] text-balance ${typeScale.leadBody} md:text-xl`;
export const metaReveal = "w-full max-w-md lg:max-w-none lg:justify-self-end";
export const metaCard = "divide-y divide-border-subtle rounded-2xl border border-border-default/70 bg-surface/80 px-5 shadow-[0_28px_50px_-40px_var(--color-neutral-900)] backdrop-blur-sm sm:px-6";
export const metaRow = "flex flex-col gap-1 py-4 sm:py-5";
export const metaLabel = typeScale.metaLabel;
export const metaValue = "flex items-center gap-2.5 text-sm font-medium text-content sm:text-base";
export const metaDot = "h-2 w-2 flex-shrink-0 rounded-full bg-brand ring-[3px] ring-brand-soft motion-safe:animate-pulse";
