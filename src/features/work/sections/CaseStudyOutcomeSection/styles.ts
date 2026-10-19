import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} border-t border-border-default bg-surface-muted`;
export const container = `${spacing.container6} grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-end lg:gap-14`;
export const story = "min-w-0";
export const intro = "max-w-2xl";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.sectionTitle;
export const body = `flex max-w-[62ch] flex-col gap-4 ${typeScale.leadBody}`;

export const linkList = "mt-6 flex flex-wrap gap-x-6 gap-y-2";
export const link =
  "group inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-brand-strong underline-offset-4 transition-colors duration-200 hover:text-brand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
export const linkIcon =
  "h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

// The page's single forward action: the next study, as a card the whole of
// which is the link.
export const nextCard =
  "group flex flex-col gap-2 rounded-2xl border border-border-default bg-surface p-6 shadow-sm transition-[border-color,box-shadow,translate] duration-300 ease-out hover:border-brand-tint hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-safe:hover:-translate-y-0.5 sm:p-7";
export const nextLabel = typeScale.metaLabel;
export const nextTitle = `${typeScale.cardTitle} mb-0 flex items-center gap-2 font-[family-name:var(--font-space-grotesk)]`;
export const nextIcon =
  "h-4 w-4 shrink-0 text-brand transition-transform duration-300 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1";
export const nextSummary = "text-sm leading-relaxed text-content-muted";
