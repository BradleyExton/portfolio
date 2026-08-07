import { navigationCopy } from "@/copy/navigation";
import type { SiteNavItem } from "./types";

export const buildHeaderNavItems = (isHomePage: boolean): SiteNavItem[] =>
  navigationCopy.items.map((item) => ({
    label: item.label,
    href: isHomePage ? item.homeHref : item.routeHref,
  }));

// Anchor hrefs ("#experience", "/#experience") never mark a current page.
export const isCurrentNavItem = (href: string, pathname: string): boolean =>
  !href.includes("#") && pathname === href;

export const getHeaderContactHref = (isHomePage: boolean): string =>
  isHomePage ? "#contact" : "/contact";

export const toggleMenu = (isMenuOpen: boolean): boolean => !isMenuOpen;

// Rows past the last authored delay share it rather than dropping the stagger.
export const getMenuRevealDelay = (
  delays: readonly string[],
  index: number,
): string => delays[Math.min(index, delays.length - 1)] ?? "";
