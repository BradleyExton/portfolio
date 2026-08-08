import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} bg-surface`;
export const container = spacing.container5;
export const eyebrow = typeScale.eyebrow;
export const subheading = `${typeScale.sectionTitle} mb-3 leading-tight`;
export const intro = `mb-7 max-w-3xl ${typeScale.sectionDescription} sm:mb-10`;
// Media first on mobile, second at lg: the screenshot is the proof, so it
// leads on a phone where the copy column would otherwise push it below the
// fold entirely.
export const card = "overflow-hidden rounded-2xl border border-border-default bg-surface shadow-sm lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]";
// Fixed ratio while the card is stacked, full cell height once it is two
// columns: the copy column is taller than 16/10 at lg, so a ratio there left
// a band of empty card below the screenshot.
export const mediaLink = "group relative block aspect-[16/10] overflow-hidden bg-surface-muted focus-visible:outline-brand lg:aspect-auto lg:h-full lg:min-h-[420px]";
export const mediaImage = "object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.02]";
export const body = "flex flex-col gap-4 p-5 sm:p-7";
export const clientName = `${typeScale.cardTitle} mb-1`;
export const clientMeta = typeScale.metaLabel;
export const summary = "leading-relaxed text-content-muted";
export const list = "flex flex-col gap-2.5";
export const listItem = "flex gap-2.5 text-sm leading-relaxed text-content-muted";
export const listMarker = "mt-0.5 h-4 w-4 flex-shrink-0 text-brand";
export const tagRow = "flex flex-wrap gap-2";
export const tag = typeScale.tagPill;
export const link = "group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand-strong transition-colors duration-200 hover:text-brand focus-visible:outline-brand";
export const linkIcon = "h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5";
