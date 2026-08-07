import { spacing, typeScale } from "@/features/shared/designSystem";

// The one inverted band between the two white halves of the page. Everything
// from the What I Do cards to the contact CTA used to sit on #fff or #f8faf9,
// so seven viewports passed with no value change. This section carries the
// positioning argument, so it is the one that earns the contrast, and the
// pale iso scenes finally have a ground to read against.
export const section = `${spacing.section} relative overflow-hidden bg-[linear-gradient(165deg,var(--color-brand-deep),var(--color-brand-deeper)_58%,var(--color-brand-deep))]`;
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(85%_65%_at_12%_0%,color-mix(in_srgb,var(--color-brand-contrast)_14%,transparent)_0%,transparent_62%),radial-gradient(75%_60%_at_88%_100%,color-mix(in_srgb,var(--color-accent-soft)_10%,transparent)_0%,transparent_58%)]";
export const container = `relative ${spacing.container6}`;
// No title margin override: SectionIntro's own mb-4 is the gap every other
// section on this page uses, and stacking mb-5 on top of it left the winner
// to generated CSS order rather than authoring order.
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
export const rail = `${railBase} bg-[repeating-linear-gradient(180deg,color-mix(in_srgb,var(--color-brand-contrast)_45%,transparent)_0_14px,transparent_14px_26px)]`;
export const railEnd = railBase;

// The nodes are wayfinding, not content. On the old light ground the solid
// dark squares with a double ring were the loudest thing in the section and
// outranked the stage names; here they sit just above the band value with a
// thin ring, so the eye lands on the copy first.
const nodeBase = "relative z-10 my-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-deeper/80 font-heading text-lg font-bold";
// Ring colors are replacements rather than additions: stacking a second color
// utility on the same property is decided by generated CSS order, not
// authoring order, so the terminal station restates the full treatment.
export const node = `${nodeBase} text-brand-contrast ring-1 ring-brand-contrast/40`;
export const nodeFinal = `${nodeBase} text-accent-soft ring-1 ring-accent-soft/55`;

const textColBase = "flex flex-col items-center text-center lg:row-start-1 lg:self-center";
export const textCol = `${textColBase} lg:col-start-3 lg:items-start lg:text-left`;
export const textColReversed = `${textColBase} lg:col-start-1 lg:items-end lg:text-right`;

const stationLabelBase = "mb-3 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider";
export const stationLabel = `${stationLabelBase} border-brand-contrast/40 bg-brand-contrast/10 text-brand-contrast`;
export const stationLabelFinal = `${stationLabelBase} border-accent-soft/50 bg-accent-soft/12 text-accent-soft`;

// One step up from cardTitle's 18/20px. These are the four beats of the
// workflow argument and were previously the smallest headings on the page.
export const stageName = "mb-2 text-xl font-semibold text-content-inverse font-[family-name:var(--font-space-grotesk)] sm:text-2xl";
export const stageBody = "mb-4 max-w-prose text-sm leading-relaxed text-content-inverse-muted";
export const chipList = "flex flex-wrap justify-center gap-2 lg:justify-start";
export const chipListReversed = "flex flex-wrap justify-center gap-2 lg:justify-end";
export const chip = typeScale.tagPillInverse;

export const closing = "mt-12 text-balance text-center text-lg font-semibold text-content-inverse font-heading sm:text-xl md:mt-14";
