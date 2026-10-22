import { spacing, typeScale } from "@/features/shared/designSystem";

// surface-muted with a hairline above: the Experience section before this one
// is white, and two white bands in a row read as one long section.
export const section = `${spacing.section} border-t border-border-default bg-surface-muted`;
export const container = spacing.container6;
export const intro = "mb-7 max-w-2xl md:mb-10";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.sectionTitle;
export const description = typeScale.sectionDescription;

export const grid = "scroll-view-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6";
export const item = "min-w-0";
// The whole card is the link, so the hover lift and the focus ring both
// belong to it rather than to the title alone.
export const card =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-border-default bg-surface shadow-sm transition-[border-color,box-shadow,translate] duration-300 ease-out hover:border-brand-tint hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-safe:hover:-translate-y-0.5";
export const media = "block aspect-[16/10] overflow-hidden border-b border-border-default bg-surface-subtle";
export const mediaImage =
  "h-full w-full object-cover object-top transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.02]";
export const body = "flex flex-1 flex-col gap-2 p-5 sm:p-6";
export const cardTitle =
  "flex items-center gap-2 text-xl font-semibold text-content font-[family-name:var(--font-space-grotesk)]";
// Same entrance as the services ledger arrows on this page.
export const titleArrow =
  "h-4 w-4 shrink-0 -translate-x-1 text-brand opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none";
export const summary = "text-sm leading-relaxed text-content-muted sm:text-base";
export const meta =
  "mt-auto flex flex-wrap items-center gap-x-2.5 gap-y-1 pt-3 text-xs font-medium uppercase tracking-wide text-content-muted";
export const metaSeparator = "text-brand-tint";
