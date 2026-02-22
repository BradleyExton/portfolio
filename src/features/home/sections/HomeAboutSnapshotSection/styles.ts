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

export const stackedCardList = "[view-timeline-axis:block] [view-timeline-name:--what-i-do-stack] [--card-height:clamp(32rem,84svh,40rem)] [--card-gap:1.375rem] [--card-top-offset:0.875rem] [--stack-sticky-top:5rem] [--card-peek-offset:4rem] grid grid-cols-1 [grid-template-rows:repeat(var(--numcards),calc(var(--card-height)-(var(--card-top-offset)+var(--card-peek-offset))))] gap-[var(--card-gap)] overflow-visible pb-[calc((var(--numcards)-1)*(var(--card-top-offset)+var(--card-peek-offset))+1.5rem)] md:[--card-top-offset:0.75rem] md:[--card-peek-offset:0rem] md:pb-[calc(var(--numcards)*var(--card-top-offset)+1.5rem)] xl:[--card-gap:5rem] xl:[--card-top-offset:4rem] xl:[--card-height:26rem] xl:[--stack-sticky-top:5.5rem] xl:[--card-peek-offset:1.5rem] xl:pb-[calc((var(--numcards)-1)*(var(--card-top-offset)+var(--card-peek-offset))+5.5rem)]";
export const stackedCardItem = "[--index0:calc(var(--index)-1)] [z-index:var(--index)] sticky top-[var(--stack-sticky-top)] overflow-visible [transform:translateY(calc(var(--index0)*(var(--card-top-offset)+var(--card-peek-offset))))]";
export const stackedCard = "h-[var(--card-height)] overflow-visible";
export const cardSurface = "relative h-full overflow-hidden rounded-2xl border border-border-default bg-surface p-5 shadow-sm transition-[transform,box-shadow] duration-300 motion-reduce:transition-none data-[active=true]:shadow-xl md:p-6";
export const cardLayout = "grid h-full gap-4 md:gap-5 lg:gap-6 xl:grid-cols-[minmax(0,45%)_minmax(0,55%)] xl:items-center";
export const cardContentColumn = "flex h-full min-w-0 flex-col";
export const cardContentColumnDesktopSwap = "xl:order-2";
export const cardHeader = "mb-4";
export const cardHeadingGroup = "min-w-0 flex-1";
export const cardIndex = "text-[11px] font-semibold uppercase tracking-[0.14em] text-brand md:text-xs";
export const cardTitleRow = "mt-1 flex flex-wrap items-center gap-2.5";
export const cardTitle = "text-[1.375rem] font-bold leading-tight text-content md:text-2xl";
export const emphasisBadge = "shrink-0 rounded-full border border-brand-tint bg-brand-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand-strong";
export const cardOutcome = "mb-4 text-[0.975rem] leading-7 text-content-muted";
export const illustrationPanel = "relative order-last aspect-[16/9] w-full max-w-[42rem] overflow-hidden rounded-xl mx-auto md:order-first xl:order-none xl:mx-0 xl:max-w-none xl:aspect-[16/9] xl:min-h-[17rem]";
export const illustrationPanelDesktopSwap = "xl:order-1";
export const illustrationImage = "object-contain object-center";

export const proofList = "mb-4 space-y-2";
export const proofItem = "relative pl-5 text-[0.95rem] leading-6 text-content-muted before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-brand-tint";
export const chipList = "mt-auto flex flex-wrap content-start gap-2.5 md:min-h-[4.5rem]";
export const chip = "rounded-full border border-border-default bg-surface-muted px-3.5 py-1 text-[13px] font-medium text-content-muted";
