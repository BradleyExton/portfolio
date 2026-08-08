import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface`;
export const container = spacing.container5;
export const intro = "mb-7 max-w-3xl md:mb-10";
export const eyebrow = typeScale.eyebrow;
export const heading = typeScale.sectionTitle;
export const description = typeScale.sectionDescription;
export const grid = "grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3";
export const cardReveal = "h-full";
export const card = "group flex h-full flex-col rounded-xl border border-border-default bg-surface p-4 shadow-sm transition-[border-color,box-shadow,transform,translate,scale,rotate] duration-300 hover:border-brand-tint hover:shadow-lg motion-safe:hover:-translate-y-1 sm:p-5";
export const anchorOffset = "scroll-mt-28 md:scroll-mt-32";
export const imageFrame = "mb-4 overflow-hidden rounded-lg border border-border-subtle bg-gradient-to-br from-brand-weak via-surface-muted to-brand-soft/60";
// Shared view-transition-name with the home services preview illustrations so
// the preview card morphs into this frame on navigation. Keyed by service id.
export const imageFrameMorphById: Record<string, string> = {
  websites: "[view-transition-name:svc-illo-websites]",
  "web-applications": "[view-transition-name:svc-illo-web-applications]",
  "ai-tools": "[view-transition-name:svc-illo-ai-tools]",
};
export const image = "aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.03] sm:aspect-[10/7]";
export const cardRow = "mb-3 flex items-center justify-between gap-2";
export const badge = "inline-flex h-6 items-center rounded-full bg-brand-soft px-2.5 text-xs font-bold text-brand-strong";
export const timeline = "inline-flex h-6 items-center rounded-full border border-border-default bg-surface-muted px-2.5 text-xs font-semibold uppercase tracking-wide text-content-muted";
export const subheading = `${typeScale.cardTitle} mb-2 transition-colors duration-300 group-hover:text-brand-strong`;
export const cardDescription = "mb-3 text-sm leading-relaxed text-content-muted";
export const featureList = "mb-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-content-muted marker:text-brand-contrast";
export const price = "mt-auto border-t border-border-subtle pt-3 text-lg font-bold text-brand-strong";
