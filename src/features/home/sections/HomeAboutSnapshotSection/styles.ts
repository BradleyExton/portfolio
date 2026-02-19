export const section = "relative bg-surface px-6 py-16 md:py-20";
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_8%_0%,var(--color-brand-weak)_0%,transparent_62%),radial-gradient(120%_120%_at_92%_100%,var(--color-brand-soft)_0%,transparent_60%)] opacity-70";
export const container = "relative mx-auto max-w-6xl";
export const layoutFlow = "grid gap-5 md:gap-7";

export const intro = "max-w-3xl";
export const eyebrow = "mb-3 text-sm font-semibold uppercase tracking-wider text-brand";
export const subheading = "mb-5 text-3xl font-bold text-content font-[family-name:var(--font-space-grotesk)]";
export const description = "mb-6 leading-relaxed text-content-muted";
export const link = "group inline-flex items-center gap-2 font-medium text-brand transition-colors hover:text-brand-strong focus-visible:text-brand-strong";
export const icon = "h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";

export const stackedCardList = "[view-timeline-axis:block] [view-timeline-name:--what-i-do-stack] [--numcards:4] [--card-height:clamp(32rem,84svh,40rem)] [--card-gap:0.75rem] [--card-top-offset:0.75rem] [--stack-sticky-top:5rem] grid grid-cols-1 [grid-template-rows:repeat(var(--numcards),minmax(max-content,var(--card-height)))] gap-[var(--card-gap)] pb-[calc(var(--numcards)*var(--card-top-offset))] xl:[--card-top-offset:5.75rem] xl:[--card-height:23rem] xl:[--stack-sticky-top:5.5rem] xl:pb-12";
export const stackedCardItem = "[--index0:calc(var(--index)-1)] [--reverse-index:calc(var(--numcards)-var(--index0))] [--reverse-index0:calc(var(--reverse-index)-1)] [z-index:var(--index)] sticky top-[var(--stack-sticky-top)] pt-[calc(var(--index0)*var(--card-top-offset))]";
export const stackedCard = "[--start-range:calc(var(--index0)/var(--numcards)*100%)] [--end-range:calc(var(--index)/var(--numcards)*100%)] [--target-scale:calc(1.1-(0.1*var(--reverse-index)))] h-full origin-top supports-[animation-timeline]:motion-safe:[animation-duration:1ms] supports-[animation-timeline]:motion-safe:[animation-fill-mode:forwards] supports-[animation-timeline]:motion-safe:[animation-name:what-i-do-stack-scale] supports-[animation-timeline]:motion-safe:[animation-range:exit-crossing_var(--start-range)_exit-crossing_var(--end-range)] supports-[animation-timeline]:motion-safe:[animation-timeline:--what-i-do-stack] supports-[animation-timeline]:motion-safe:[animation-timing-function:linear]";
export const cardSurface = "relative h-full rounded-2xl bg-[var(--cap-wash)] p-5 shadow-[0_14px_36px_-28px_var(--cap-accent)] transition-[transform,box-shadow,background-color] duration-300 motion-reduce:transition-none data-[active=true]:bg-surface data-[active=true]:shadow-[0_36px_78px_-30px_var(--cap-accent)] md:p-6";
export const cardSurfaceActiveScale = "xl:data-[active=true]:motion-safe:scale-[1.016]";
export const cardLayout = "grid gap-4 md:gap-5 lg:gap-6 xl:grid-cols-[minmax(0,45%)_minmax(0,55%)] xl:items-center";
export const cardContentColumn = "min-w-0";
export const cardContentColumnDesktopSwap = "xl:order-2";
export const cardHeader = "mb-3";
export const cardHeadingGroup = "min-w-0 flex-1";
export const cardIndex = "text-xs font-semibold uppercase tracking-[0.12em] text-brand";
export const cardTitleRow = "mt-1 flex flex-wrap items-center gap-2.5";
export const cardTitle = "text-xl font-bold leading-snug text-content";
export const emphasisBadge = "shrink-0 rounded-full border border-brand-tint bg-brand-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-strong";
export const cardOutcome = "mb-4 leading-relaxed text-content-muted";
export const illustrationPanel = "relative order-first aspect-[16/9] w-full max-w-[42rem] overflow-hidden rounded-xl mx-auto xl:order-none xl:mx-0 xl:max-w-none xl:aspect-[16/9] xl:min-h-[17rem]";
export const illustrationPanelDesktopSwap = "xl:order-1";
export const illustrationImage = "object-contain object-center";

export const proofList = "mb-4 space-y-2";
export const proofItem = "relative pl-5 text-sm leading-relaxed text-content-muted before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-brand-tint";
export const chipList = "flex flex-wrap gap-2.5";
export const chip = "rounded-full border border-border-default bg-surface-muted px-3 py-1 text-xs font-medium text-content-muted";
