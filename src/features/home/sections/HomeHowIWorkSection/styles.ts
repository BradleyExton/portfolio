import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} relative overflow-hidden bg-surface-muted`;
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_10%_0%,var(--color-brand-weak)_0%,transparent_58%),radial-gradient(120%_120%_at_90%_100%,var(--color-brand-soft)_0%,transparent_62%)] opacity-70";
export const container = `relative ${spacing.container6}`;
export const heading = "mb-5";
export const description = "mb-12 md:mb-16";

// The track is a horizontal pipeline: four stations reading left to right on
// desktop, and a snap-scrolling lane below it. tabIndex on the list keeps the
// scrollable region reachable by keyboard.
export const stageList = "grid auto-cols-[minmax(15rem,80vw)] grid-flow-col gap-x-5 overflow-x-auto pb-5 [scroll-padding-inline:1rem] snap-x snap-mandatory focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:auto-cols-[minmax(17rem,60vw)] lg:grid-flow-row lg:auto-cols-auto lg:grid-cols-4 lg:gap-x-6 lg:overflow-x-visible lg:pb-0";
// Stations stretch to equal height in the grid, so pushing the chip row down
// with mt-auto lands every station's artifacts on one baseline.
export const stageItem = "flex snap-start flex-col text-center";

// Each station owns the two rail halves flanking its node, so the segments join
// into one continuous line across the track at any column count.
export const nodeRow = "mb-6 grid grid-cols-[1fr_auto_1fr] items-center";
const railBase = "h-[3px] rounded-full";
export const rail = `${railBase} bg-[repeating-linear-gradient(90deg,var(--color-brand-tint)_0_14px,transparent_14px_26px)] motion-safe:animate-[pipeline-flow_1.6s_linear_infinite]`;
export const railEnd = railBase;

const nodeBase = "relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-inverse font-heading text-lg font-bold";
// Ring colors are replacements rather than additions: stacking a second color
// utility on the same property is decided by generated CSS order, not authoring
// order, so the terminal station restates the full treatment.
export const node = `${nodeBase} text-brand-contrast shadow-[0_0_0_6px_var(--color-surface-muted),0_0_0_8px_var(--color-brand-tint)]`;
export const nodeFinal = `${nodeBase} text-accent-soft shadow-[0_0_0_6px_var(--color-surface-muted),0_0_0_8px_var(--color-accent-soft)]`;

// self-center keeps the pill shrink-wrapped; as a flex child it would otherwise
// stretch to the full station width.
const stationLabelBase = "mb-3 self-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider";
export const stationLabel = `${stationLabelBase} border-brand-tint bg-brand-weak text-brand-strong`;
export const stationLabelFinal = `${stationLabelBase} border-transparent bg-surface-inverse text-accent-soft`;

export const stageName = typeScale.cardTitle;
export const stageBody = "mb-4 text-sm leading-relaxed text-content-muted";
export const chipList = "mt-auto flex flex-wrap justify-center gap-2";
export const chip = typeScale.tagPill;

export const closing = "mt-12 text-balance text-center text-lg font-semibold text-content font-heading sm:text-xl md:mt-16";
