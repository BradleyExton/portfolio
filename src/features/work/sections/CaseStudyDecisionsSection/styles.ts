import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface`;
export const container = spacing.container6;
export const intro = "mb-7 max-w-3xl md:mb-10";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.sectionTitle;

// Same ledger language as the homepage services list: hairline rows, an index
// mark in the gutter, no card chrome. Decisions read as a sequence, not a grid.
export const list = "scroll-view-stagger border-t border-border-strong";
export const row =
  "grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 border-b border-border-default py-7 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-x-6 md:py-9";
export const index = "pt-1 text-sm font-semibold tabular-nums text-brand font-[family-name:var(--font-space-grotesk)]";
export const rowBody = "min-w-0";
export const rowTitle = `${typeScale.cardTitle} mb-4 font-[family-name:var(--font-space-grotesk)]`;
// Choice and cost side by side from md so the trade is visible in one glance.
export const pair = "grid gap-5 md:grid-cols-2 md:gap-10";
export const pairLabel = `${typeScale.metaLabel} mb-1.5`;
export const pairValue = "max-w-[56ch] text-sm leading-relaxed text-content-muted sm:text-base";
