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
// brand-contrast, matching the How I Work band and the deferred placeholder's
// inverse eyebrow. Amber made the page's two inverted bands label the same
// element in two different colors, so the eyebrow read as a status marker
// rather than a section tag. mb-3 is the sitewide eyebrow gap.
export const eyebrow = "mb-3 text-sm font-semibold uppercase tracking-wider text-brand-contrast";
// Sized to the shared section-title rank (30/36px) rather than its own 48px:
// this is a peer of "Where I've worked" and "Available for select projects",
// and outranking them made the page read as having two heading levels.
// Leading is left at the 40px default the other section titles use; the old
// leading-[1.05] set this one heading 2px tighter at the same rank.
export const subheading =
  "text-balance text-3xl font-bold tracking-tight text-content-inverse font-[family-name:var(--font-space-grotesk)] sm:text-4xl";
// mt-4 to match the 16px title-to-description gap every other section on the
// page uses. This block was the only one at 24.
export const description = "mt-4 max-w-[58ch] text-sm leading-relaxed text-content-inverse-muted sm:text-base";
export const ctaRow = "mt-8";
export const icon = "h-4 w-4";

export const portraitColumn = "group relative mx-auto lg:justify-self-center";
export const portraitRing = "pointer-events-none absolute -inset-3 rounded-full border border-content-inverse/20";
export const portraitArc =
  "pointer-events-none absolute -inset-3 rounded-full border-2 border-transparent border-t-accent-soft transition-transform duration-[1800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[200deg]";
// Three rings leave the rim on a one-second stagger. They start invisible, so
// the keyframes own the whole visible life of a pulse.
const portraitPulseBase =
  "pointer-events-none absolute -inset-3 rounded-full border border-content-inverse/30 opacity-0";
export const portraitPulse = `${portraitPulseBase} motion-safe:group-hover:animate-[portrait-ripple_3s_ease-out_infinite]`;
export const portraitPulseMid = `${portraitPulseBase} motion-safe:group-hover:animate-[portrait-ripple_3s_ease-out_1s_infinite]`;
export const portraitPulseLate = `${portraitPulseBase} motion-safe:group-hover:animate-[portrait-ripple_3s_ease-out_2s_infinite]`;
export const portraitFrame =
  "relative h-40 w-40 overflow-hidden rounded-full border-2 border-content-inverse/30 shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)] transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03] sm:h-52 sm:w-52";
export const portraitImage = "h-full w-full object-cover object-top";

// Capability words ride a rotating 3D cylinder aligned to the intro's content
// column, so they turn away and drop out at the sides instead of running the
// full width of the screen. Geometry lives in the about-ring-* utilities.
export const ticker = "relative mx-auto mt-12 w-full max-w-6xl px-4 sm:px-6 md:mt-16";
// Narrow screens see a shallower slice of the arc, so words reach the edge
// less foreshortened; a wider fade there keeps them from cutting off mid-word.
export const ringViewport =
  "about-ring-viewport relative h-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_28%,black_72%,transparent_100%)] sm:[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_82%,transparent_100%)]";
export const ringDepth = "about-ring-depth absolute inset-0";
export const ring = "about-ring absolute inset-0";
export const ringSlot =
  "about-ring-slot text-center text-[0.6875rem] font-semibold uppercase tracking-[0.2em] whitespace-nowrap text-content-inverse/75 sm:text-sm";
export const ringStarSlot = "about-ring-slot about-ring-slot-mid text-center text-[0.5625rem] leading-none text-accent-soft sm:text-[0.6875rem]";
export const ringStarGlyph =
  "inline-block animate-[about-ring-star_10s_linear_infinite] motion-reduce:animate-none";

export const cardsRegion = `${spacing.section} relative`;
export const ambientBackdrop = "pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_8%_0%,var(--color-brand-weak)_0%,transparent_62%),radial-gradient(120%_120%_at_92%_100%,var(--color-brand-soft)_0%,transparent_60%)] opacity-70";
export const container = `relative ${spacing.container6}`;

export const stackedCardList = "[view-timeline-axis:block] [view-timeline-name:--what-i-do-stack] [--card-height:clamp(32rem,84svh,40rem)] [--card-gap:1.375rem] [--card-top-offset:0.875rem] [--stack-sticky-top:5rem] [--card-peek-offset:4rem] grid grid-cols-1 [grid-template-rows:repeat(var(--numcards),calc(var(--card-height)-(var(--card-top-offset)+var(--card-peek-offset))))] gap-[var(--card-gap)] overflow-visible pb-[calc((var(--numcards)-1)*(var(--card-top-offset)+var(--card-peek-offset))+1.5rem)] md:[--card-height:clamp(26rem,64svh,32rem)] md:[--card-top-offset:0.75rem] md:[--card-peek-offset:0rem] md:pb-[calc(var(--numcards)*var(--card-top-offset)+1.5rem)] xl:[--card-gap:5rem] xl:[--card-top-offset:4rem] xl:[--card-height:26rem] xl:[--stack-sticky-top:5.5rem] xl:[--card-peek-offset:1.5rem] xl:pb-[calc((var(--numcards)-1)*(var(--card-top-offset)+var(--card-peek-offset))+5.5rem)]";
export const stackedCardItem = "[--index0:calc(var(--index)-1)] [z-index:var(--index)] sticky top-[var(--stack-sticky-top)] overflow-visible [transform:translateY(calc(var(--index0)*(var(--card-top-offset)+var(--card-peek-offset))))]";
// min-h instead of a fixed height below xl: text-only cards grow with their
// content, so a clamp that undershoots can't clip chips under the next card.
export const stackedCard = "min-h-[var(--card-height)] overflow-visible xl:h-[var(--card-height)]";
// overflow-hidden lets the below-xl watermark bleed past the corner and get
// clipped by the card radius instead of escaping the surface; xl has no
// watermark and keeps its original overflow behaviour.
export const cardSurface = "group/card stack-depth-scale relative h-full overflow-hidden rounded-2xl border border-border-default bg-surface p-5 shadow-sm transition-[box-shadow,border-color] duration-300 motion-reduce:transition-none data-[active=true]:border-brand-tint data-[active=true]:shadow-xl md:p-6 xl:overflow-visible xl:p-8";
export const cardLayout = "relative z-10 grid h-full gap-4 md:gap-5 lg:gap-6 xl:grid-cols-[minmax(0,45%)_minmax(0,55%)] xl:items-center xl:gap-8";
export const cardContentColumn = "flex h-full min-w-0 flex-col";
export const cardContentColumnDesktopSwap = "xl:order-2";
export const cardHeader = "mb-4 flex items-center gap-3 border-b border-border-subtle pb-4";
export const cardIndex = "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-tint bg-brand-weak text-sm font-bold text-brand font-[family-name:var(--font-space-grotesk)] transition-colors duration-300 group-data-[active=true]/card:border-brand group-data-[active=true]/card:bg-brand group-data-[active=true]/card:text-content-inverse";
export const cardTitle = `${typeScale.cardTitle} mb-0 min-w-0 text-xl leading-tight md:text-2xl`;
export const cardOutcome = "mb-4 text-base leading-relaxed text-content-muted";
// No fill and no border: a tinted, rounded, outlined box around the scene made
// every card a card-within-a-card, and the frame competed with the card's own
// edge two inches away. The scenes now sit directly on the card surface, which
// is what the shade retune in isoKit is for — their board tops used to be
// #ffffff and relied on this panel's tint to be visible at all.
export const illustrationPanel = "relative aspect-[16/9] w-full min-h-[17rem]";
export const illustrationPanelDesktopSwap = "xl:order-1";

// Below xl the scene has no column of its own, so it becomes a corner
// watermark. It hangs off the top-right because the stack buries each card's
// lower half under the next one: the header band is the only region every card
// keeps on screen. The tint sits underneath because the scenes are built from
// near-white faces that would otherwise disappear against the card surface.
export const illustrationWatermarkTint =
  "pointer-events-none absolute -right-16 -top-16 z-0 h-72 w-72 rounded-full bg-brand-weak opacity-75 blur-2xl";
// Two-axis mask (composited as an intersection): full strength against the
// right edge, gone by the time it reaches the copy column, and faded out below
// the header band so the proof points stay on clean surface.
// Both ramps end earlier than they used to (78% -> 55% across, 100% -> 62%
// down). At 390px the old stops put the scene's saturated amber block at ~31%
// strength directly behind the outcome paragraph; the copy column now sits in
// the tail of both ramps.
// Opacity stepped 45 -> 30 when the scenes gained a deliberate dark mass. The
// darkest value in each scene went from #047857 to #064e3b, which at the old
// 45% turned every card's top-right corner into a hard shape competing with
// the heading rather than a texture behind it.
export const illustrationWatermark =
  "pointer-events-none absolute -right-14 -top-10 z-0 aspect-[16/9] w-[30rem] opacity-30 [-webkit-mask-composite:source-in] [-webkit-mask-image:linear-gradient(to_left,black_18%,transparent_55%),linear-gradient(to_bottom,black_20%,transparent_62%)] [mask-composite:intersect] [mask-image:linear-gradient(to_left,black_18%,transparent_55%),linear-gradient(to_bottom,black_20%,transparent_62%)] sm:w-[34rem]";
export const proofList = "mb-4 space-y-2.5";
export const proofItem = "flex gap-2.5 text-sm leading-relaxed text-content-muted sm:text-base";
export const proofIcon = "mt-0.5 h-4 w-4 shrink-0 text-brand sm:mt-1";
export const chipList = "mt-auto flex flex-wrap content-start gap-2 md:min-h-[4.5rem]";
export const chip = typeScale.tagPill;
