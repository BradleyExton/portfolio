export const nav = "fixed left-0 right-0 top-0 z-50 border-b border-border-default backdrop-blur-md transition-[background-color,box-shadow] duration-300";
export const navSurfaceIdle = "bg-surface/80";
export const navSurfaceOpen = "bg-surface shadow-xl shadow-content/10";
export const skipLink = "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] rounded-lg bg-surface px-3 py-2 text-sm font-medium text-content shadow";
export const container = "px-6";
export const row = "mx-auto flex max-w-6xl items-center justify-between py-4";
export const link = "text-xl font-bold text-content transition-colors hover:text-content-muted";
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
export const menuInner = "mx-auto max-h-[calc(100dvh-4rem)] max-w-6xl overflow-y-auto overscroll-contain border-t border-border-default px-6 pb-6 pt-2";
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
