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
export const itemReveal = "relative py-8 md:py-10";
export const milestoneNode = "absolute left-0 top-8 z-50 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-brand-tint bg-surface ring-4 ring-surface shadow-sm transition-[transform,border-color,box-shadow] duration-300 md:top-10 md:h-8 md:w-8";
export const milestoneNodeActive = "border-brand bg-brand-soft shadow-md";
export const milestoneNodePulsing = "motion-safe:animate-[timeline-node-pulse_2.1s_ease-in-out_infinite]";
export const milestoneNodeReducedMotion = "motion-safe:animate-none";
export const milestoneCore = "h-2.5 w-2.5 rounded-full bg-brand shadow-[0_0_0_2px_var(--color-surface)] md:h-3 md:w-3";
export const entry = "relative isolate w-full rounded-2xl rounded-bl-none border border-border-subtle bg-surface/65 p-4 transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] before:pointer-events-none before:absolute before:inset-[-1px] before:z-10 before:rounded-2xl before:rounded-bl-none before:border-2 before:border-l-0 before:border-brand-contrast before:opacity-0 before:transition-opacity before:duration-500 before:ease-out motion-reduce:before:transition-none md:p-7";
// Scroll focus only lifts the card and fades in the brand-contrast edge; card
// colors never change with scroll, so the motion stays quiet.
export const entryLifted = "shadow-xl before:opacity-100 motion-safe:-translate-y-1.5";
// Signal treatment for the current role: a rich emerald surface (brand-deep
// into brand-deeper) with a soft glow, statically applied so it anchors the
// top of the timeline without chasing scroll position.
export const entryCurrent = "border-transparent shadow-lg bg-[radial-gradient(120%_90%_at_85%_-10%,color-mix(in_srgb,var(--color-brand-contrast)_22%,transparent)_0%,transparent_60%),linear-gradient(160deg,var(--color-brand-deep),var(--color-brand-deeper)_62%)]";
// Cursor-tracking emerald spotlight; the JS handler feeds --spot-x/--spot-y,
// and the fallback keeps the wash centered until it does.
export const entrySpotlight = "after:pointer-events-none after:absolute after:inset-0 after:rounded-2xl after:rounded-bl-none after:bg-[radial-gradient(420px_circle_at_var(--spot-x,50%)_var(--spot-y,50%),color-mix(in_srgb,var(--color-brand-contrast)_10%,transparent),transparent_65%)] after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 motion-reduce:after:hidden";
// Animated emerald-to-amber current running around the cards. The mask keeps
// only the 1px ring so the translucent card body stays untinted.
export const wireRing = "timeline-wire-mask pointer-events-none absolute inset-[-1px] rounded-2xl rounded-bl-none p-px bg-[conic-gradient(from_var(--wire-angle,0deg),var(--color-brand)_0%,var(--color-brand-contrast)_20%,var(--color-accent-soft)_38%,var(--color-brand)_55%,var(--color-border-default)_80%,var(--color-brand)_100%)] motion-safe:animate-[timeline-wire-spin_8s_linear_infinite]";
export const watermark = "pointer-events-none select-none absolute right-5 top-2 font-heading text-6xl font-bold leading-none tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--color-border-default)] md:right-7 md:text-8xl";
export const watermarkCurrent = "[-webkit-text-stroke:1.5px_color-mix(in_srgb,var(--color-content-inverse)_22%,transparent)]";
export const signalPulseClip = "pointer-events-none absolute inset-0 overflow-hidden rounded-2xl rounded-bl-none";
export const signalPulse = "absolute left-0 top-0 h-9 w-[3px] rounded-full bg-[linear-gradient(to_bottom,transparent,var(--color-brand-contrast),transparent)] motion-safe:animate-[timeline-signal-travel_4.5s_ease-in-out_infinite] motion-reduce:hidden";
export const entryHeader = "mb-4";
export const metaRow = "mb-2 flex items-center gap-3 text-sm text-content-faint";
export const roleHeader = "mb-2 flex flex-wrap items-center gap-x-3 gap-y-2";
export const company = "text-2xl font-bold text-content";
export const companyCurrent = "text-2xl font-bold text-content-inverse";
export const badge = "rounded-full bg-accent-soft px-2.5 py-0.5 text-xs font-semibold text-content";
export const text = "font-semibold text-brand";
// Amber role line on the emerald current card, replacing (not stacking on) the
// emerald `text` class to avoid same-specificity cascade fights.
export const textCurrent = "font-semibold text-accent-soft";
export const timeline = "whitespace-nowrap text-sm font-medium text-content-faint";
export const timelineCurrent = "whitespace-nowrap text-sm font-medium text-brand-tint";
export const roleDescription = "mb-3 leading-relaxed text-content-subtle md:mb-4";
export const roleDescriptionCurrent = "mb-3 leading-relaxed text-content-inverse-muted md:mb-4";
export const highlightsListMobile = "mb-2 space-y-1.5 md:hidden";
export const highlightsDetails = "mb-4 md:hidden [&_.open-label]:hidden [&[open]_.open-label]:inline [&[open]_.closed-label]:hidden [&[open]_.chevron]:rotate-180 [&[open]_.highlights-panel]:[grid-template-rows:1fr] [&[open]_.highlights-panel]:opacity-100";
export const highlightsSummary = "inline-flex cursor-pointer list-none items-center gap-1 pl-5 py-0.5 text-xs font-medium tracking-wide text-content-faint transition-colors hover:text-content-muted focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden";
export const highlightsSummaryCurrent = "inline-flex cursor-pointer list-none items-center gap-1 pl-5 py-0.5 text-xs font-medium tracking-wide text-content-inverse-muted transition-colors hover:text-content-inverse focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-contrast [&::-webkit-details-marker]:hidden";
export const highlightsSummaryLabel = "inline-flex items-center";
export const highlightsSummaryIcon = "chevron h-3.5 w-3.5 shrink-0 transition-transform duration-200";
export const highlightsExpansion = "highlights-panel grid [grid-template-rows:0fr] opacity-0 transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none";
export const highlightsExpansionInner = "overflow-hidden";
export const highlightsListExpanded = "space-y-1.5 pt-1";
export const highlightsListDesktop = "hidden md:mb-5 md:block md:space-y-2";
export const highlightItem = "relative pl-5 text-sm leading-relaxed text-content-muted before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-brand-tint";
// Inverse highlight rows for the emerald current card, with amber markers.
export const highlightItemCurrent = "relative pl-5 text-sm leading-relaxed text-content-inverse-muted before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent-soft";
export const chipList = "flex flex-wrap gap-2";
// Light-card chips share the sitewide tagPill treatment (plus the timeline's
// hover interactions) so adjacent sections rank tags at the same visual weight.
export const chip = `${typeScale.tagPill} transition-[transform,border-color,background-color,color] duration-200 motion-safe:hover:-translate-y-0.5 hover:border-brand-contrast hover:bg-brand-weak hover:text-brand`;
// Dark-card chips restate the tagPill geometry with inverse-safe emerald text
// instead of extending it, avoiding a same-specificity color clash.
export const chipCurrent = "rounded-full border border-brand-contrast/35 bg-brand/15 px-3 py-1 text-xs font-medium text-brand-tint transition-[transform,border-color,background-color,color] duration-200 motion-safe:hover:-translate-y-0.5 hover:bg-brand/25";
export const ctaRow = "mt-10";
export const link = "group inline-flex items-center gap-2 font-medium text-content-muted transition-colors hover:text-brand";
export const icon = "h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";
