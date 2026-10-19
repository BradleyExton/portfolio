import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface`;
// The story gets the wider column; constraints sit beside it as a reference
// card the reader can check against, not a second narrative.
export const container = `${spacing.container6} grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-14`;
export const story = "min-w-0";
export const intro = "max-w-2xl";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.sectionTitle;
export const body = `flex max-w-[62ch] flex-col gap-4 ${typeScale.leadBody}`;

export const panel = "rounded-2xl border border-border-default bg-surface-muted p-5 sm:p-6";
export const panelLabel = `${typeScale.metaLabel} mb-4`;
export const list = "flex flex-col gap-3.5";
export const listItem = "flex gap-3 text-sm leading-relaxed text-content sm:text-base";
// A short brand rule rather than a check icon: these are limits the work had
// to live inside, and a check would read as features delivered.
export const marker = "mt-2.5 h-0.5 w-3 shrink-0 rounded-full bg-brand";
