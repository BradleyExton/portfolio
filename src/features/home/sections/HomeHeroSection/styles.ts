import { spacing, typeScale } from "@/features/shared/designSystem";

export const section = `${spacing.hero} relative overflow-hidden`;
export const parallaxLayer = "pointer-events-none absolute inset-0 will-change-transform";
export const backgroundImageViewport = "pointer-events-none absolute inset-0 flex justify-center";
export const backgroundImageOverlay = "pointer-events-none relative h-full w-full max-w-[2200px] 2xl:[-webkit-mask-image:linear-gradient(to_right,transparent_0,black_7%,black_93%,transparent_100%)] 2xl:[mask-image:linear-gradient(to_right,transparent_0,black_7%,black_93%,transparent_100%)]";
export const image = "object-cover object-[70%_center] md:object-[72%_center] xl:object-bottom lg:motion-safe:animate-[hero-breathe_24s_ease-in-out_infinite]";
export const overlay = "absolute inset-0 bg-gradient-to-br from-brand-weak/95 via-surface/90 to-surface-muted/86";
/* Above the gradient overlay for legibility, but faded as a whole layer so
   the terminal recedes into the veiled photo instead of floating on top. */
export const screenLayer = "pointer-events-none absolute inset-0 z-[1] flex justify-center opacity-35";
export const screenViewport = "pointer-events-none relative h-full w-full max-w-[2200px]";
/* lg and up only. The terminal is anchored to the photo's monitor, and below
   1024px the photo's cover crop walks that monitor left far enough that the
   lead paragraph runs across the glass (measured: 125px of overlap at 768,
   77px at 834, first clear at 1024). */
export const screenCluster = "invisible absolute left-0 top-0 hidden h-[292px] w-[336px] origin-top-left lg:block";
export const steamLayer = "pointer-events-none absolute inset-0 z-[2] flex justify-center";
export const steamViewport = "pointer-events-none relative h-full w-full max-w-[2200px]";
export const steamCluster = "absolute hidden h-[210px] w-[134px] sm:block";
export const steamBaseGlow = "absolute bottom-[26px] left-1/2 h-[32px] w-[72px] -translate-x-1/2 rounded-full bg-surface/24 blur-3xl";
export const steamWisp = "absolute bottom-[18px] left-1/2 h-[136px] w-[22px] -translate-x-1/2 rounded-full opacity-0 blur-[13px] [background:radial-gradient(58%_66%_at_50%_54%,color-mix(in_srgb,var(--color-surface)_72%,transparent)_0%,color-mix(in_srgb,var(--color-surface)_34%,transparent)_52%,transparent_100%)] [filter:drop-shadow(0_0_8px_color-mix(in_srgb,var(--color-surface)_20%,transparent))] [transform-origin:50%_100%] [--steam-origin-x:0px] [--steam-mid-x:0px] [--steam-drift-x:10px] motion-reduce:opacity-35";
export const steamWispOne = "h-[116px] w-[15px] [--steam-origin-x:-42px] [--steam-mid-x:-11px] [--steam-drift-x:14px] md:motion-safe:animate-[steam-rise-plume_6.4s_ease-in-out_infinite]";
export const steamWispTwo = "h-[138px] w-[19px] [--steam-origin-x:-24px] [--steam-mid-x:-7px] [--steam-drift-x:12px] md:motion-safe:animate-[steam-rise-sway_5.8s_cubic-bezier(0.34,0.06,0.24,1)_-1s_infinite]";
export const steamWispThree = "h-[146px] w-[20px] [--steam-origin-x:-6px] [--steam-mid-x:6px] [--steam-drift-x:10px] md:motion-safe:animate-[steam-rise-plume_5.3s_ease-in-out_-2s_infinite]";
export const steamWispFour = "h-[138px] w-[18px] [--steam-origin-x:14px] [--steam-mid-x:5px] [--steam-drift-x:-9px] md:motion-safe:animate-[steam-rise-sway_6.2s_cubic-bezier(0.34,0.06,0.24,1)_-3s_infinite]";
export const steamWispFive = "h-[122px] w-[15px] [--steam-origin-x:30px] [--steam-mid-x:-8px] [--steam-drift-x:-12px] md:motion-safe:animate-[steam-rise-plume_6.9s_ease-in-out_-4.2s_infinite]";
export const steamWispSix = "h-[110px] w-[14px] [--steam-origin-x:-32px] [--steam-mid-x:-3px] [--steam-drift-x:11px] md:motion-safe:animate-[steam-rise-plume_7.2s_ease-in-out_-2.8s_infinite]";
export const steamWispSeven = "h-[126px] w-[16px] [--steam-origin-x:22px] [--steam-mid-x:2px] [--steam-drift-x:-10px] md:motion-safe:animate-[steam-rise-sway_6.7s_cubic-bezier(0.34,0.06,0.24,1)_-5.1s_infinite]";
export const accentOrbTopRight = "absolute right-0 top-20 h-96 w-96 rounded-full bg-brand-tint/30 blur-3xl md:motion-safe:animate-[float-orb_16s_ease-in-out_infinite]";
// Pushed into the corner and thinned out. At bottom-0/left-0 with /40 the
// 320px orb plus its 64px blur centred on the CTA row and the AI tiles, so the
// warm accent read as a stain across the whole lower left rather than a glow
// off the corner, and it dulled the emerald tool labels sitting on it.
export const accentOrbBottomLeft = "absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-accent-soft/25 blur-3xl md:motion-safe:animate-[float-orb-reverse_18s_ease-in-out_infinite]";
export const container = `relative ${spacing.container6}`;
export const grid = "grid items-center";
export const title = typeScale.heroTitle;
// Each word is its own unbreakable unit so the line never splits on the hyphen
// inside "AI-Native" or "Full-Stack". At 390px the heading was breaking as
// "AI-Native Full-" / "Stack Engineer".
export const titleWord = "whitespace-nowrap";
// Deep end of the emerald ramp, not the mid: primary-600 against the light
// hero carries far less luminance contrast than the near-black rest of the
// line, so in grayscale the highlighted phrase read as the de-emphasized one.
export const labelText = "bg-gradient-to-r from-brand-deep to-brand-deeper bg-clip-text text-transparent";
// mb-9 against the heading's mb-5: the paragraph now binds up to the heading
// and breaks down to the CTA, instead of sitting equidistant between them.
export const description = `mb-9 max-w-xl ${typeScale.leadBody} md:text-xl`;
export const ctaRow = "flex flex-wrap gap-3";
// h-12/15px, not h-11/14px. The lead paragraph above runs at 20px, so 14px
// button text made the primary action the smallest type in the block it is
// supposed to lead.
export const ctaLink = "group inline-flex h-12 items-center gap-1.5 rounded-lg bg-brand px-6 text-[15px] font-medium leading-none text-content-inverse shadow-md shadow-brand-tint transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand-strong hover:shadow-lg active:translate-y-0 active:shadow-md focus-visible:outline-brand";
export const icon = "relative top-px h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5";
// Outlined counterpart to the solid primary. The old border-default hairline
// on a near-white hero left this button invisible under a squint test, so the
// pair read as one CTA; a brand-weight outline keeps it clearly secondary
// while still registering as a control.
export const link = "group inline-flex h-12 items-center gap-1.5 rounded-lg border border-brand/70 bg-surface/90 px-6 text-[15px] font-semibold leading-none text-brand-strong backdrop-blur-sm transition-[background-color,border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-brand-strong hover:bg-surface hover:shadow-md active:translate-y-0 active:shadow-sm focus-visible:outline-brand";
export const textColumn = "max-w-3xl transition-all duration-1000 motion-safe:will-change-transform";
export const visibleState = "translate-y-0 opacity-100";
/* Two layouts, because a wrapping flex row cannot hold an even beat. Each tile
   is only as wide as its own label, so the glyphs marched at 78/72/83/68/72px
   instead of a single pitch. Below md the tiles sit in a grid; at md and up
   they are fixed-width flex items, which is the same thing by other means once
   the whole strip fits on one line.

   Five columns needs a 69px cell for "MCP Servers", so it only turns on at
   390px; below that the strip drops to four, which also lands the four AI
   tools on a row of their own. The 420px cap keeps the 5-column pitch near the
   76px the flex row uses, instead of stretching to 144px at 767. */
export const techPillsRow = "mt-14 grid max-w-[420px] grid-cols-4 items-start gap-y-6 motion-safe:will-change-transform min-[390px]:grid-cols-5 md:flex md:max-w-none md:flex-wrap md:gap-x-1";
