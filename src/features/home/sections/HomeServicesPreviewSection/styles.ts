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

// The heading block and the availability marker share one baseline. The rule
// that used to close this block moved down to ledgerHead, so the column labels
// sit above it and the whole thing reads as one table head.
export const headerRow = "flex flex-col gap-5 pb-6 md:flex-row md:items-end md:justify-between";
export const block = "max-w-2xl";
export const eyebrow = typeScale.eyebrow;
export const subheading = typeScale.sectionTitle;
export const description = typeScale.sectionDescription;
// Becomes a bordered pill only from md up, where it sits at the far end of a
// wide header row and unenclosed body copy read as an orphaned sentence rather
// than a status. On phones the line wraps to two, and a pill around it turned
// the smallest claim in the section into its largest object. bg-surface
// because the band itself is brand-weak, so a brand tint would not separate.
export const availability =
  "flex items-start gap-2.5 text-sm text-content-muted md:rounded-full md:border md:border-brand-tint md:bg-surface md:px-3.5 md:py-1.5 md:shadow-[0_1px_2px_rgba(15,42,29,0.04)]";
// items-start plus a 6px drop rather than items-center: the line wraps to two
// on phones and at the md breakpoint, and centering put the dot beside the
// gap between them instead of beside the word it marks.
export const availabilityDot = "relative mt-1.5 flex h-2 w-2 shrink-0";
export const availabilityPing = "absolute inline-flex h-2 w-2 rounded-full bg-brand opacity-60 motion-safe:animate-ping";
export const availabilityCore = "relative inline-flex h-2 w-2 rounded-full bg-brand";

// Column labels for the ledger, stated once. Every row used to restate
// "Typical build" above its own value, which stacked three identical labels
// down the right edge and read as a header copy-pasted into the data.
// Track template is kept in lockstep with rowLink below.
export const ledgerHead =
  "grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-4 border-b border-border-strong pb-0 md:grid-cols-[3rem_minmax(0,1fr)_9rem] md:gap-x-6 md:pb-3";
// Only the timeline column gets a label. A matching "Service" on the left
// landed directly under the section's own "Services" eyebrow and read as a
// stutter, and the rows below name themselves anyway.
export const ledgerHeadLabelEnd = `${typeScale.metaLabel} hidden md:col-start-3 md:block md:text-right`;

export const list = "scroll-view-stagger";
// relative so the hover rule below can overlay this row's own bottom border.
export const row = "relative border-b border-border-default";
// Three-column ledger on desktop: mark, content, timeline. Below md the
// timeline column collapses into the meta line so rows stay two deep.
// No horizontal padding: the row used to carry md:px-3 so the old background
// fill had an inset, which pushed the glyph 12px right of the section heading's
// left edge. With the fill gone, the rows align to the same margin as the
// title, the rule, and the CTA.
export const rowLink =
  "group relative grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-x-4 gap-y-3 py-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand md:grid-cols-[3rem_minmax(0,1fr)_9rem] md:gap-x-6 md:py-7";
// Hover used to flood the whole row with bg-surface/70 — a white slab punched
// into the green band, edge to edge, that flipped the section's dominant color
// for as long as the pointer sat there. It is replaced by a brand rule that
// wipes along the row's own bottom border, left to right. Same easing as the
// portrait arc in the section above.
export const rowRule =
  "pointer-events-none absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none";
export const glyph =
  "h-10 w-10 text-brand transition-[transform,color] duration-300 ease-out group-hover:text-brand-strong group-focus-visible:text-brand-strong md:h-11 md:w-11 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:-translate-y-0.5";
// Shared view-transition-name with the services catalog card frames so the
// row mark morphs into the destination card illustration on navigation.
export const morphTargetByServiceKey: Record<ServiceKey, string> = {
  websites: "[view-transition-name:svc-illo-websites]",
  webApps: "[view-transition-name:svc-illo-web-applications]",
  aiTools: "[view-transition-name:svc-illo-ai-tools]",
};

export const rowBody = "min-w-0";
export const cardTitle = "mb-2 flex items-center gap-2 text-xl font-semibold text-content font-[family-name:var(--font-space-grotesk)] sm:text-2xl";
// Enters from the left rather than sitting at rest and sliding right: fading
// in and moving away in the same 200ms read as two separate events.
// Sized here rather than composed with bottomCtaIcon, which sets its own
// hover transform — the two would resolve as a transform conflict.
export const titleArrow =
  "h-4 w-4 shrink-0 -translate-x-1 text-brand opacity-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 motion-reduce:transition-none";
// The outcome is the load-bearing line in each row, so it sits one step above
// body copy rather than trailing a description.
export const outcome = "mb-3 max-w-[52ch] text-base leading-snug text-content md:text-lg";
// content-muted: this run names what each service actually covers, and at
// content-faint it sat at 2.2:1 on the brand-weak band.
export const meta = "flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wide text-content-muted";
// The tags used to be joined with double-spaced middots inside one string, so
// the separators carried the same weight and color as the words they divide.
// Pulling them out lets the run read as three terms rather than one phrase.
// Withheld below md, where the run wraps: a separator is a flex item like any
// other, so a wrap could strand one at the end of a line with nothing after it.
// From md the run sits on one line and the gap does the rest of the spacing.
export const metaSeparator = "hidden text-brand-tint md:inline";
// Below md the timeline column collapses into the row body. It gets its own
// labelled line rather than joining the tag run, where it just read as a
// fourth tag.
// The value used to be uppercase, bold, and brand-strong, which made the
// smallest fact in the row the loudest thing on a phone. Label and value now
// split the emphasis the same way the desktop column does.
export const metaTimeline = "mt-2 flex items-baseline gap-2 md:hidden";
export const metaTimelineLabel = typeScale.metaLabel;
export const metaTimelineValue = "text-xs font-medium text-content";
export const timelineCell = "hidden md:block md:pt-1 md:text-right";
// Tracks the row's hover state so the far end of a wide row responds too.
// Left inert, the timeline column read as unrelated to the link under it.
export const timelineValue =
  "text-sm font-medium text-content-muted transition-colors duration-300 group-hover:text-brand-strong group-focus-visible:text-brand-strong";

export const bottomCtaRow = "pt-7";
export const bottomCta = "group inline-flex items-center gap-2 text-sm font-semibold text-brand underline-offset-4 transition-colors duration-200 hover:text-brand-strong hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
export const bottomCtaIcon = "h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";
