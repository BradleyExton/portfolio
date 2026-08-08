/* The border is always present but transparent at rest, so condensing changes
   only paint, never layout.
   `translate`, not `transform`: Tailwind v4 compiles translate-y-* to the
   standalone `translate` CSS property, so naming `transform` here would watch
   a property that never changes and the header would snap instead of slide.
   Tailwind's own `transition-transform` shorthand covers all four of
   transform/translate/scale/rotate, which is why utilities elsewhere animate
   fine — an explicit property list has to opt in. */
export const nav = "fixed left-0 right-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter,translate,opacity]";

/* Scrolling down retires the header off the top edge; scrolling up brings it
   straight back. It fades as it travels so the edge does not read as a hard
   wipe against whatever section is passing underneath.

   Duration and easing live on the state classes, not the base, for two
   reasons. A transition takes its timing from the state it is moving *to*, so
   this is what lets leaving and arriving have different curves — the header
   accelerates away (ease-in, quick) and decelerates back (expo-out, longer),
   which reads far better than one symmetric curve in both directions. And
   keeping a single duration per state avoids two same-specificity
   `duration-*` utilities racing on source order.

   `focus-within` outranks the hidden state on specificity, so tabbing into
   the skip link or the nav pulls the header back rather than moving focus to
   something parked off-screen. */
export const navRevealed = "translate-y-0 opacity-100 duration-[340ms] ease-[cubic-bezier(0.16,1,0.3,1)]";
export const navHidden = "-translate-y-full opacity-0 duration-[240ms] ease-[cubic-bezier(0.4,0,1,1)] focus-within:translate-y-0 focus-within:opacity-100";

export const navSurfaceTop = "border-transparent bg-surface/0";
export const navSurfaceCondensed = "border-border-default bg-surface/80 shadow-sm shadow-content/5 backdrop-blur-md";
export const navSurfaceOpen = "border-border-default bg-surface shadow-xl shadow-content/10 backdrop-blur-md";
export const skipLink = "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] rounded-lg bg-surface px-3 py-2 text-sm font-medium text-content shadow";
export const container = "px-6";
export const row = "mx-auto flex max-w-6xl items-center justify-between motion-safe:transition-[padding] motion-safe:duration-300 motion-safe:ease-out";
export const rowTop = "py-5";
export const rowCondensed = "py-3";

/* Mark and wordmark stay together at every size. An earlier build collapsed
   the name on scroll and left the mark stranded at the far edge of a wide bar
   with a void beside it; the mark reads as a companion to the name, not a
   replacement for it. */
export const link = "flex items-center gap-2.5 text-xl font-bold text-content transition-colors hover:text-content-muted";
export const mark = "shrink-0 motion-safe:transition-[height,width] motion-safe:duration-300 motion-safe:ease-out";
export const markTop = "h-9 w-9";
export const markCondensed = "h-8 w-8";
export const labelText = "text-brand";
export const desktopNav = "hidden items-center gap-6 md:flex";
export const desktopNavList = "group flex items-center gap-1";
const desktopNavLinkBase = "relative isolate inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-content-muted transition-[color,opacity] duration-200 ease-out focus-visible:text-content focus-visible:outline-none";
export const desktopNavLink = `${desktopNavLinkBase} group-hover:opacity-55 hover:text-content hover:opacity-100 focus-visible:opacity-100 after:absolute after:bottom-1 after:left-3 after:h-[2px] after:w-[calc(100%-1.5rem)] after:origin-left after:scale-x-0 after:rounded-full after:bg-brand after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 focus-visible:after:scale-x-100`;
export const desktopNavLinkCurrent =
  "text-content after:scale-x-100 group-hover:opacity-100";

/* Dimmed backdrop behind the open panel; sits under the header (z-50). */
export const scrim = "fixed inset-0 z-40 bg-content/20 transition-opacity duration-300 ease-out md:hidden";
export const scrimOpen = "opacity-100";
export const scrimClosed = "pointer-events-none opacity-0";

export const button = "relative inline-flex h-11 w-11 items-center justify-center rounded-lg text-content transition-colors duration-200 hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand md:hidden";
export const burger = "relative block h-4 w-5";
export const burgerBar = "absolute left-0 h-0.5 w-5 rounded-full bg-content motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]";
export const burgerBarTop = "top-0";
export const burgerBarTopOpen = "translate-y-[7px] rotate-45";
export const burgerBarMiddle = "top-[7px]";
export const burgerBarMiddleOpen = "scale-x-50 opacity-0";
export const burgerBarBottom = "top-[14px]";
export const burgerBarBottomOpen = "-translate-y-[7px] -rotate-45";

/* The 0fr -> 1fr grid row is what makes the panel height animate both ways. */
export const menu = "grid overflow-hidden md:hidden motion-safe:transition-[grid-template-rows] motion-safe:duration-[420ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]";
export const menuOpen = "grid-rows-[1fr]";
export const menuClosed = "grid-rows-[0fr]";
export const menuClip = "min-h-0 overflow-hidden";
/* Panel ceiling clears the header at its full (uncondensed) height, which is
   what it always is while the menu is open. */
export const menuInner = "mx-auto max-h-[calc(100dvh-5.5rem)] max-w-6xl overflow-y-auto overscroll-contain border-t border-border-default px-6 pb-6 pt-2";
export const menuList = "flex flex-col";

export const menuReveal = "motion-safe:transition-[opacity,transform] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]";
export const menuRevealOpen = "translate-y-0 opacity-100 motion-safe:duration-[420ms]";
export const menuRevealClosed = "translate-y-3 opacity-0 motion-safe:duration-150";
export const menuRevealDelays = [
  "[transition-delay:70ms]",
  "[transition-delay:125ms]",
  "[transition-delay:180ms]",
  "[transition-delay:235ms]",
  "[transition-delay:290ms]",
] as const;

export const mobileNavLink = "group -mx-3 flex min-h-[52px] items-center justify-between gap-4 rounded-xl px-3 text-base font-medium text-content-muted transition-colors duration-200 hover:bg-surface-muted hover:text-content focus-visible:bg-surface-muted focus-visible:text-content focus-visible:outline-none active:bg-surface-subtle";
export const mobileNavLinkCurrent = "font-semibold text-brand";
export const mobileNavLinkIcon = "h-4 w-4 shrink-0 text-content-faint transition-transform duration-200 ease-out group-hover:translate-x-1 group-focus-visible:translate-x-1";
export const menuCta = "pt-4";
export const menuCtaLink = "w-full";
