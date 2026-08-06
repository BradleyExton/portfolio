import { spacing, typeScale } from "@/features/shared/designSystem";

// Outer shell carries no vertical rhythm of its own: the inverted band and the
// cards region below each own their spacing (cardsRegion composes spacing.section).
export const shell = "relative bg-surface";

// Full-bleed inverted band: dark emerald gradient with an amber accent glow,
// portrait cutout, and a capability ticker along the bottom edge.
export const introBand =
  "relative overflow-hidden bg-[linear-gradient(135deg,var(--color-brand-deeper),var(--color-brand-deep))] py-16 md:py-20";
export const introGlow =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_85%_20%,color-mix(in_srgb,var(--color-accent-soft)_14%,transparent)_0%,transparent_60%)]";
export const introContainer =
  "relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)]";
export const eyebrow = "mb-4 text-sm font-semibold uppercase tracking-wider text-accent-soft";
export const subheading =
  "text-balance text-3xl font-bold leading-[1.05] tracking-tight text-content-inverse font-[family-name:var(--font-space-grotesk)] sm:text-4xl lg:text-5xl";
export const description = "mt-6 max-w-[58ch] text-sm leading-relaxed text-content-inverse-muted sm:text-base";
export const ctaRow = "mt-8";
export const icon = "h-4 w-4";

export const portraitColumn = "relative mx-auto lg:justify-self-center";
export const portraitRing = "pointer-events-none absolute -inset-3 rounded-full border border-content-inverse/20";
export const portraitArc =
  "pointer-events-none absolute -inset-3 rounded-full border-2 border-transparent border-t-accent-soft";
export const portraitFrame =
  "relative h-40 w-40 overflow-hidden rounded-full border-2 border-content-inverse/30 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] sm:h-52 sm:w-52";
export const portraitImage = "h-full w-full object-cover object-top";

export const ticker = "relative mt-12 overflow-hidden border-y border-content-inverse/15 py-4 md:mt-16";
export const tickerTrack = "flex w-max animate-[about-ticker_28s_linear_infinite] motion-reduce:animate-none";
export const tickerGroup = "flex shrink-0 items-center";
export const tickerItem =
  "flex items-center gap-6 pr-6 text-sm font-semibold uppercase tracking-widest text-content-inverse/70";
export const tickerStar = "text-accent-soft";

export const cardsRegion = `${spacing.section} relative`;
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_8%_0%,var(--color-brand-weak)_0%,transparent_62%),radial-gradient(120%_120%_at_92%_100%,var(--color-brand-soft)_0%,transparent_60%)] opacity-70";
export const container = `relative ${spacing.container6}`;

export const stackedCardList = "[view-timeline-axis:block] [view-timeline-name:--what-i-do-stack] [--card-height:clamp(32rem,84svh,40rem)] [--card-gap:1.375rem] [--card-top-offset:0.875rem] [--stack-sticky-top:5rem] [--card-peek-offset:4rem] grid grid-cols-1 [grid-template-rows:repeat(var(--numcards),calc(var(--card-height)-(var(--card-top-offset)+var(--card-peek-offset))))] gap-[var(--card-gap)] overflow-visible pb-[calc((var(--numcards)-1)*(var(--card-top-offset)+var(--card-peek-offset))+1.5rem)] md:[--card-height:clamp(26rem,64svh,32rem)] md:[--card-top-offset:0.75rem] md:[--card-peek-offset:0rem] md:pb-[calc(var(--numcards)*var(--card-top-offset)+1.5rem)] xl:[--card-gap:5rem] xl:[--card-top-offset:4rem] xl:[--card-height:26rem] xl:[--stack-sticky-top:5.5rem] xl:[--card-peek-offset:1.5rem] xl:pb-[calc((var(--numcards)-1)*(var(--card-top-offset)+var(--card-peek-offset))+5.5rem)]";
export const stackedCardItem = "[--index0:calc(var(--index)-1)] [z-index:var(--index)] sticky top-[var(--stack-sticky-top)] overflow-visible [transform:translateY(calc(var(--index0)*(var(--card-top-offset)+var(--card-peek-offset))))]";
// min-h instead of a fixed height below xl: text-only cards grow with their
// content, so a clamp that undershoots can't clip chips under the next card.
export const stackedCard = "min-h-[var(--card-height)] overflow-visible xl:h-[var(--card-height)]";
export const cardSurface = "group/card stack-depth-scale relative h-full rounded-2xl border border-border-default bg-surface p-5 shadow-sm transition-[box-shadow,border-color] duration-300 motion-reduce:transition-none data-[active=true]:border-brand-tint data-[active=true]:shadow-xl md:p-6 xl:p-8";
export const cardLayout = "grid h-full gap-4 md:gap-5 lg:gap-6 xl:grid-cols-[minmax(0,45%)_minmax(0,55%)] xl:items-center xl:gap-8";
export const cardContentColumn = "flex h-full min-w-0 flex-col";
export const cardContentColumnDesktopSwap = "xl:order-2";
export const cardHeader = "mb-4 flex items-center gap-3 border-b border-border-subtle pb-4";
export const cardIndex = "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-tint bg-brand-weak text-sm font-bold text-brand font-[family-name:var(--font-space-grotesk)] transition-colors duration-300 group-data-[active=true]/card:border-brand group-data-[active=true]/card:bg-brand group-data-[active=true]/card:text-content-inverse";
export const cardTitle = `${typeScale.cardTitle} mb-0 min-w-0 text-xl leading-tight md:text-2xl`;
export const cardOutcome = "mb-4 text-base leading-relaxed text-content-muted";
export const illustrationPanel = "relative aspect-[16/9] w-full min-h-[17rem] overflow-hidden rounded-xl border border-border-subtle bg-gradient-to-br from-brand-weak/60 via-surface to-surface-muted";
export const illustrationPanelDesktopSwap = "xl:order-1";
export const illustrationImage = "object-contain object-center p-4 xl:p-5";

export const proofList = "mb-4 space-y-2.5";
export const proofItem = "flex gap-2.5 text-sm leading-relaxed text-content-muted sm:text-base";
export const proofIcon = "mt-0.5 h-4 w-4 shrink-0 text-brand sm:mt-1";
export const chipList = "mt-auto flex flex-wrap content-start gap-2 md:min-h-[4.5rem]";
export const chip = typeScale.tagPill;
