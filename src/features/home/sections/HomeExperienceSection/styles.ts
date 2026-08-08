import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} relative overflow-hidden bg-surface`;
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,var(--color-brand-soft)_0%,transparent_58%),radial-gradient(130%_130%_at_100%_100%,var(--color-brand-weak)_0%,transparent_62%)] opacity-70";
export const container = `relative ${spacing.container6}`;
export const eyebrow = typeScale.eyebrow;
export const subheading = `${typeScale.sectionTitle} mb-10`;
export const timelineWrapper = "relative";
export const pathSvg = "pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible";
export const pathTrack = "fill-none stroke-border-default [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2.5]";
export const pathFill = "fill-none stroke-brand [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:3] transition-[stroke-dashoffset] duration-500 ease-out motion-reduce:transition-none";
export const timelineList = "relative";
export const timelineItem = "relative";
// The rail owns a gutter of its own; cards start clear of it so the stroke
// never paints across a card face (it used to cut a bright line down the
// emerald current card).
export const itemReveal = "relative py-6 pl-10 md:py-9 md:pl-16";
// Node center = item padding-top + card padding + half the 48px logo plate, so
// the stop lands on the company mark rather than on the card's rounded corner.
export const milestoneNode = "absolute left-4 top-[68px] z-50 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-tint bg-surface ring-4 ring-surface shadow-sm transition-[transform,border-color,box-shadow] duration-300 md:left-5 md:top-[88px] md:h-8 md:w-8";
export const milestoneNodeActive = "border-brand bg-brand-soft shadow-md";
export const milestoneNodePulsing = "motion-safe:animate-[timeline-node-pulse_2.1s_ease-in-out_infinite]";
export const milestoneNodeReducedMotion = "motion-safe:animate-none";
export const milestoneCore = "h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_0_2px_var(--color-surface)] md:h-3 md:w-3";
// Hairline tying the rail stop to the card it labels, fading out as it arrives.
export const milestoneLead = "pointer-events-none absolute left-4 top-[68px] h-px w-6 -translate-y-1/2 bg-gradient-to-r from-border-default to-transparent md:left-5 md:top-[88px] md:w-11";
export const milestoneLeadCurrent = "from-brand-contrast/70";
export const entry = "group/entry relative isolate w-full rounded-2xl border border-border-subtle bg-surface/80 p-5 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-[-1px] before:z-10 before:rounded-2xl before:border-2 before:border-brand-contrast before:opacity-0 before:transition-opacity before:duration-500 before:ease-out motion-reduce:before:transition-none md:p-7";
// Scroll focus only lifts the card and fades in the brand-contrast edge; card
// colors never change with scroll, so the motion stays quiet.
export const entryLifted = "shadow-xl before:opacity-100 motion-safe:-translate-y-1";
// Signal treatment for the current role: a rich emerald surface (brand-deep
// into brand-deeper) with a soft glow, statically applied so it anchors the
// top of the timeline without chasing scroll position.
export const entryCurrent = "border-transparent shadow-lg bg-[radial-gradient(120%_90%_at_85%_-10%,color-mix(in_srgb,var(--color-brand-contrast)_22%,transparent)_0%,transparent_60%),linear-gradient(160deg,var(--color-brand-deep),var(--color-brand-deeper)_62%)]";
// Cursor-tracking emerald spotlight; the JS handler feeds --spot-x/--spot-y,
// and the fallback keeps the wash centered until it does.
export const entrySpotlight = "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_srgb,var(--color-brand-contrast)_10%,transparent),transparent_65%)] after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 motion-reduce:after:hidden";
// Animated emerald-to-amber current running around the cards. The mask keeps
// only the 1px ring so the translucent card body stays untinted.
// The amber stop is blended halfway back toward emerald: at full strength it
// read as a stray yellow streak on the card's top edge rather than a current.
// The conic gradient only reads as a travelling current while it rotates. With
// the animation off it froze at 0deg, parking a fixed emerald/amber/grey
// patchwork on every card edge — an amber corner on one card, a grey run on
// the next. motion-reduce swaps the whole gradient for a flat brand-tint ring
// so the cards keep an edge without the stalled rainbow.
export const wireRing = "timeline-wire-mask pointer-events-none absolute inset-[-1px] rounded-2xl p-px bg-[conic-gradient(from_var(--wire-angle,0deg),var(--color-brand)_0%,var(--color-brand-contrast)_20%,color-mix(in_srgb,var(--color-accent-soft)_45%,var(--color-brand-contrast))_38%,var(--color-brand)_55%,var(--color-border-default)_80%,var(--color-brand)_100%)] motion-safe:animate-[timeline-wire-spin_8s_linear_infinite] motion-reduce:bg-none motion-reduce:bg-brand-tint";
export const signalPulseClip = "pointer-events-none absolute inset-0 overflow-hidden rounded-2xl";
export const signalPulse = "absolute left-0 top-0 h-9 w-[3px] rounded-full bg-[linear-gradient(to_bottom,transparent,var(--color-brand-contrast),transparent)] motion-safe:animate-[timeline-signal-travel_4.5s_ease-in-out_infinite] motion-reduce:hidden";
// One-shot sheen fired when the rail reaches a past role, the light-card echo
// of the current card's travelling signal. Negative z keeps it under the copy,
// above the card surface, and inside the card's own stacking context.
export const shimmerClip = "pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-2xl";
export const shimmerBeam = "absolute inset-y-0 left-0 w-1/5 opacity-0 bg-[linear-gradient(90deg,transparent,color-mix(in_srgb,var(--color-brand-soft)_80%,transparent)_46%,color-mix(in_srgb,var(--color-accent-soft)_12%,transparent)_62%,transparent)] motion-safe:group-data-[active=true]/entry:animate-[timeline-card-shimmer_1.6s_cubic-bezier(0.33,1,0.68,1)]";
// Identity block: mark plate in column one, name over role in column two, and
// the date pushed to the far edge once there is room for a third column.
export const entryHeader = "mb-4 grid grid-cols-[auto_1fr] items-center gap-x-4 sm:grid-cols-[auto_1fr_auto] md:mb-6";
export const logoPlate = "row-span-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border-default bg-surface-muted shadow-sm";
export const logoPlateCurrent = "row-span-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-brand-contrast/25 bg-brand-contrast/10";
export const roleHeader = "flex flex-wrap items-center gap-x-3 gap-y-1";
// font-semibold, not font-bold. These are h3s, the same rank as the What I Do
// card titles and the How I Work stage names, and 700 here against 600 there
// made the timeline read as a heavier heading level than its neighbours.
export const company = "text-xl font-semibold text-content md:text-2xl";
export const companyCurrent = "text-xl font-semibold text-content-inverse md:text-2xl";
export const badge = "rounded-full bg-accent-soft px-2.5 py-0.5 text-[0.6875rem] font-bold uppercase tracking-wide text-content";
export const text = "text-[0.9375rem] font-semibold text-brand";
// Amber role line on the emerald current card, replacing (not stacking on) the
// emerald `text` class to avoid same-specificity cascade fights.
export const textCurrent = "text-[0.9375rem] font-semibold text-accent-soft";
// content-subtle, not content-faint: faint is below AA on white at any size.
export const timeline = "col-start-2 mt-1 text-sm font-medium tabular-nums text-content-subtle sm:col-start-3 sm:row-start-1 sm:mt-0 sm:justify-self-end";
export const timelineCurrent = "col-start-2 mt-1 text-sm font-medium tabular-nums text-brand-tint sm:col-start-3 sm:row-start-1 sm:mt-0 sm:justify-self-end";
export const roleDescription = "mb-3.5 max-w-[68ch] leading-relaxed text-content-subtle md:mb-4";
export const roleDescriptionCurrent = "mb-3.5 max-w-[68ch] leading-relaxed text-content-inverse-muted md:mb-4";
export const highlightsListMobile = "mb-2 space-y-1.5 md:hidden";
export const highlightsDetails = "md:hidden [&_.open-label]:hidden [&[open]_.open-label]:inline [&[open]_.closed-label]:hidden [&[open]_.chevron]:rotate-180 [&[open]_.highlights-panel]:[grid-template-rows:1fr] [&[open]_.highlights-panel]:opacity-100";
export const highlightsSummary = "inline-flex cursor-pointer list-none items-center gap-1 pl-5 py-0.5 text-xs font-medium tracking-wide text-content-subtle transition-colors hover:text-content focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden";
export const highlightsSummaryCurrent = "inline-flex cursor-pointer list-none items-center gap-1 pl-5 py-0.5 text-xs font-medium tracking-wide text-content-inverse-muted transition-colors hover:text-content-inverse focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-contrast [&::-webkit-details-marker]:hidden";
export const highlightsSummaryLabel = "inline-flex items-center";
export const highlightsSummaryIcon = "chevron h-3.5 w-3.5 shrink-0 transition-transform duration-200";
export const highlightsExpansion = "highlights-panel grid [grid-template-rows:0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none";
export const highlightsExpansionInner = "overflow-hidden";
export const highlightsListExpanded = "space-y-1.5 pt-1";
// Two columns once the card is wide enough: a single column at this width ran
// the highlight lines past 130 characters. Multi-column rather than grid, so
// an odd count balances instead of leaving a hole in the second column.
export const highlightsListDesktop = "hidden md:block lg:columns-2 lg:gap-x-10";
export const highlightItem = "relative pl-5 text-sm leading-relaxed text-content-muted md:mb-2 md:break-inside-avoid before:absolute before:left-0 before:top-[0.5625rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand-contrast";
// Inverse highlight rows for the emerald current card, with amber markers.
export const highlightItemCurrent = "relative pl-5 text-sm leading-relaxed text-content-inverse-muted md:mb-2 md:break-inside-avoid before:absolute before:left-0 before:top-[0.5625rem] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent-soft";
// Tech stack reads as a card footer, ruled off from the highlights above it.
export const chipList = "mt-3.5 flex flex-wrap gap-2 border-t border-border-subtle pt-3.5 md:mt-4 md:pt-4";
export const chipListCurrent = "mt-3.5 flex flex-wrap gap-2 border-t border-brand-contrast/20 pt-3.5 md:mt-4 md:pt-4";
// Light-card chips share the sitewide tagPill treatment (plus the timeline's
// hover interactions) so adjacent sections rank tags at the same visual weight.
export const chip = `${typeScale.tagPill} transition-[transform,border-color,background-color,color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-brand-contrast hover:bg-brand-weak hover:text-brand`;
// Dark-card chips restate the tagPill geometry with inverse-safe emerald text
// instead of extending it, avoiding a same-specificity color clash.
export const chipCurrent = "rounded-full border border-brand-contrast/35 bg-brand/15 px-3 py-1 text-xs font-medium text-brand-tint transition-[transform,border-color,background-color,color] duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-brand/25";
// Indented to the card column, not the section margin, so the link closes the
// timeline instead of hanging off its left edge.
export const ctaRow = "mt-10 pl-10 md:pl-16";
export const link = "group inline-flex items-center gap-2 font-medium text-content-muted transition-colors hover:text-brand";
export const icon = "h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";
