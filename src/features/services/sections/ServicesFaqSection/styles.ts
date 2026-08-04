import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface`;
export const container = spacing.container5;
export const eyebrow = typeScale.eyebrow;
export const subheading = `${typeScale.sectionTitle} mb-7 sm:mb-10`;
export const block = "space-y-2.5 sm:space-y-3";
const cardBase = "overflow-hidden rounded-xl border bg-surface transition-[border-color,box-shadow] duration-300";
export const card = `${cardBase} border-border-default`;
export const cardOpen = `${cardBase} border-brand-tint shadow-sm`;
export const row = "group flex min-h-[3rem] w-full items-start justify-between gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand sm:items-center sm:px-5 sm:py-4";
export const labelText = "pr-3 font-semibold leading-snug text-content";
export const answerContainer = "border-t border-border-subtle px-4 pb-4 pt-3.5 sm:px-5";
export const description = "text-sm leading-relaxed text-content-muted sm:text-base";
const chevronBubbleBase = "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-300 sm:mt-0";
export const chevronBubble = `${chevronBubbleBase} border-border-default bg-surface-muted text-content-subtle group-hover:border-brand-tint group-hover:text-brand`;
export const chevronBubbleOpen = `${chevronBubbleBase} border-brand-tint bg-brand-soft text-brand-strong`;
export const chevronIcon = "h-4 w-4 transition-transform duration-300";
export const chevronExpanded = "rotate-180";
