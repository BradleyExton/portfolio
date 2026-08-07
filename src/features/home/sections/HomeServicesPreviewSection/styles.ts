import { spacing, typeScale } from "@/features/shared/designSystem";
import type { ServiceKey } from "./types";

// brand-weak rather than surface-muted: against the white Experience section
// above it, #f8faf9 was a 1% step and read as the same surface continuing.
export const section = `${spacing.section} relative overflow-hidden bg-brand-weak`;
// The card grid this replaced had three white panels breaking up the radial
// wash. A flat ledger has nothing to break it up, so the same overlay read as
// a heavy green field. Halved and pulled to the corners.
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(80%_80%_at_2%_0%,var(--color-brand-soft)_0%,transparent_55%),radial-gradient(80%_80%_at_98%_100%,var(--color-brand-tint)_0%,transparent_58%)] opacity-30";
export const container = `relative ${spacing.container6}`;

// The heading block and the availability line share one baseline rule, which
// doubles as the top edge of the ledger below it.
export const headerRow = "flex flex-col gap-5 border-b border-border-strong pb-6 md:flex-row md:items-end md:justify-between";
export const block = "max-w-2xl";
export const eyebrow = typeScale.eyebrow;
export const subheading = typeScale.sectionTitle;
export const description = typeScale.sectionDescription;
export const availability = "flex items-center gap-2 text-sm text-content-muted md:pb-1";
export const availabilityDot = "relative flex h-2 w-2 shrink-0";
export const availabilityPing = "absolute inline-flex h-2 w-2 rounded-full bg-brand opacity-60 motion-safe:animate-ping";
export const availabilityCore = "relative inline-flex h-2 w-2 rounded-full bg-brand";

export const list = "scroll-view-stagger";
export const row = "border-b border-border-default";
// Three-column ledger on desktop: mark, content, timeline. Below md the
// timeline column collapses into the meta line so rows stay two deep.
export const rowLink = "group grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-4 gap-y-3 py-6 transition-colors duration-200 hover:bg-surface/70 focus-visible:bg-surface/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:grid-cols-[3rem_minmax(0,1fr)_9rem] md:gap-x-6 md:px-3";
export const glyph = "h-10 w-10 text-brand transition-transform duration-300 md:h-11 md:w-11 motion-safe:group-hover:-translate-y-0.5";
// Shared view-transition-name with the services catalog card frames so the
// row mark morphs into the destination card illustration on navigation.
export const morphTargetByServiceKey: Record<ServiceKey, string> = {
  websites: "[view-transition-name:svc-illo-websites]",
  webApps: "[view-transition-name:svc-illo-web-applications]",
  aiTools: "[view-transition-name:svc-illo-ai-tools]",
};

export const rowBody = "min-w-0";
export const cardTitle = "mb-2 flex items-center gap-2 text-xl font-semibold text-content font-[family-name:var(--font-space-grotesk)] sm:text-2xl";
export const titleArrow = "text-brand opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 group-focus-visible:translate-x-1 group-focus-visible:opacity-100";
// The outcome is the load-bearing line in each row, so it sits one step above
// body copy rather than trailing a description.
export const outcome = "mb-3 max-w-[52ch] text-base leading-snug text-content md:text-lg";
// content-muted: this run names what each service actually covers, and at
// content-faint it sat at 2.2:1 on the brand-weak band.
export const meta = "text-xs font-medium uppercase tracking-wide text-content-muted";
// Below md the timeline column collapses into the row body. It gets its own
// labelled line rather than joining the tag run, where it just read as a
// fourth tag.
// Spelled out rather than metaLabel + a color override: appending a color
// utility after a token that already sets one is an unresolved conflict.
export const metaTimeline = "mt-2 text-xs font-semibold uppercase tracking-wide text-brand-strong md:hidden";
export const timelineCell = "hidden md:block md:text-right";
export const timelineLabel = `${typeScale.metaLabel} mb-1`;
export const timelineValue = "text-sm text-content-muted";

export const bottomCtaRow = "pt-7";
export const bottomCta = "group inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 transition-colors duration-200 hover:text-brand-strong hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
export const bottomCtaIcon = "h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";
