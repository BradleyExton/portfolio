import { spacing, surfaces, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.hero} relative overflow-hidden`;
export const ambientBackdrop = surfaces.heroAmbient;
export const container = `relative ${spacing.container6}`;

export const backLink =
  "group mb-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-strong transition-colors duration-200 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:mb-8";
export const backIcon =
  "h-4 w-4 rotate-180 transition-transform duration-200 ease-out group-hover:-translate-x-0.5 group-focus-visible:-translate-x-0.5";

// Copy and cover side by side from lg; stacked below with the copy first, so
// the title and the one-line summary are the first thing a phone reads.
export const layout = "grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12";
export const copyColumn = "min-w-0";
export const coverColumn = "min-w-0";

export const intro = "max-w-2xl";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.pageHeroTitle;
export const description = typeScale.leadBody;

export const metaList = "mt-7 grid gap-x-6 gap-y-4 border-t border-border-default pt-6 sm:grid-cols-3";
export const metaItem = "min-w-0";
export const metaLabel = `${typeScale.metaLabel} mb-1`;
export const metaValue = "text-sm leading-relaxed text-content";

export const linkRow = "mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap";
export const linkIcon = "h-4 w-4";
