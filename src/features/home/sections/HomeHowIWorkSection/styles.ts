import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.section} relative overflow-hidden bg-surface-muted`;
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_10%_0%,var(--color-brand-weak)_0%,transparent_58%),radial-gradient(120%_120%_at_90%_100%,var(--color-brand-soft)_0%,transparent_62%)] opacity-70";
export const container = `relative ${spacing.container6}`;
export const heading = "mb-5";
export const description = "mb-10 md:mb-12";

// The track is a vertical pipeline: each stage is a full-width row with the
// iso scene on one side and copy on the other, alternating around a center
// spine so the workflow reads top to bottom as one continuous line.
export const stageList = "flex flex-col";
export const stageRow = "grid grid-cols-1 gap-y-5 py-8 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,1fr)_4.5rem_minmax(0,1fr)] lg:gap-x-8 lg:gap-y-0 lg:py-4";

const mediaColBase = "mx-auto w-full max-w-lg lg:max-w-xl lg:row-start-1 lg:self-center";
export const mediaCol = `${mediaColBase} lg:col-start-1`;
export const mediaColReversed = `${mediaColBase} lg:col-start-3`;

// The spine column owns the rail halves flanking its node, so the segments
// join into one continuous line down the track. Row padding is bridged with
// negative margins so adjacent rail segments meet between rows.
export const spineCol = "hidden lg:col-start-2 lg:row-start-1 lg:-my-4 lg:flex lg:flex-col lg:items-center lg:self-stretch";
const railBase = "w-[3px] flex-1 rounded-full";
export const rail = `${railBase} bg-[repeating-linear-gradient(180deg,var(--color-brand-tint)_0_14px,transparent_14px_26px)]`;
export const railEnd = railBase;

const nodeBase = "relative z-10 my-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-inverse font-heading text-lg font-bold";
// Ring colors are replacements rather than additions: stacking a second color
// utility on the same property is decided by generated CSS order, not
// authoring order, so the terminal station restates the full treatment.
export const node = `${nodeBase} text-brand-contrast shadow-[0_0_0_6px_var(--color-surface-muted),0_0_0_8px_var(--color-brand-tint)]`;
export const nodeFinal = `${nodeBase} text-accent-soft shadow-[0_0_0_6px_var(--color-surface-muted),0_0_0_8px_var(--color-accent-soft)]`;

const textColBase = "flex flex-col items-center text-center lg:row-start-1 lg:self-center";
export const textCol = `${textColBase} lg:col-start-3 lg:items-start lg:text-left`;
export const textColReversed = `${textColBase} lg:col-start-1 lg:items-end lg:text-right`;

const stationLabelBase = "mb-3 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider";
export const stationLabel = `${stationLabelBase} border-brand-tint bg-brand-weak text-brand-strong`;
export const stationLabelFinal = `${stationLabelBase} border-transparent bg-surface-inverse text-accent-soft`;

export const stageName = typeScale.cardTitle;
export const stageBody = "mb-4 max-w-prose text-sm leading-relaxed text-content-muted";
export const chipList = "flex flex-wrap justify-center gap-2 lg:justify-start";
export const chipListReversed = "flex flex-wrap justify-center gap-2 lg:justify-end";
export const chip = typeScale.tagPill;

export const closing = "mt-12 text-balance text-center text-lg font-semibold text-content font-heading sm:text-xl md:mt-14";
