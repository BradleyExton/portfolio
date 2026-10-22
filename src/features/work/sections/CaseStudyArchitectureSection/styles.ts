import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface-muted`;
export const container = spacing.container6;
export const intro = "mb-7 max-w-3xl md:mb-10";
export const eyebrow = typeScale.eyebrow;
export const title = typeScale.sectionTitle;
export const description = typeScale.sectionDescription;

export const figure = "rounded-2xl border border-border-default bg-surface p-4 shadow-sm sm:p-8";
// Two drawings of the same system, one per width class. Each is laid out for
// its own column so the labels stay readable instead of one drawing scaling
// down until the text is 7px on a phone.
export const diagramWide = "hidden md:block";
export const diagramNarrow = "mx-auto max-w-sm md:hidden";

export const notes = "scroll-view-stagger mt-8 grid gap-4 md:grid-cols-3 md:gap-6";
export const note = "border-t-2 border-brand pt-4 text-sm leading-relaxed text-content-muted sm:text-base";

export const connections = "mx-auto mt-6 flex max-w-sm flex-col gap-2 border-t border-border-default pt-4 md:hidden";
export const connection = "flex flex-wrap items-baseline justify-between gap-x-3 text-sm";
export const connectionRoute = "font-medium text-content";
export const connectionLabel = "text-xs text-content-muted";
