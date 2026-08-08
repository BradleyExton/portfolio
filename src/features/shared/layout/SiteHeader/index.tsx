"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { commonCopy } from "@/copy/common";
import { navigationCopy } from "@/copy/navigation";
import { profile } from "@/copy/profile";
import { ActionLink, ArrowRightIcon } from "@/features/shared/designSystem";
import { cn } from "@/features/shared/designSystem/cn";
import { useMediaQuery } from "@/features/shared/designSystem/useMediaQuery";
import { useScrollState } from "@/features/shared/designSystem/useScrollState";
import { BradMark } from "./BradMark";
import * as styles from "./styles";
import {
  buildHeaderNavItems,
  getHeaderContactHref,
  getMenuRevealDelay,
  isCurrentNavItem,
  toggleMenu,
} from "./utils";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";
const REDUCED_MOTION_MEDIA_QUERY = "(prefers-reduced-motion: reduce)";

/* Low enough that the header commits to its condensed state on the first
   flick rather than lagging behind the content sliding under it. */
const CONDENSE_THRESHOLD_PX = 16;

/* Clears the header's own full height, so it never retires while it is still
   sitting over the top of the page. */
const HIDE_THRESHOLD_PX = 120;

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const prefersReducedMotion = useMediaQuery(REDUCED_MOTION_MEDIA_QUERY);
  const { isPast: isScrolled, isScrollingDown } = useScrollState(
    CONDENSE_THRESHOLD_PX,
    HIDE_THRESHOLD_PX,
  );
  const isHomePage = pathname === "/";

  // Anchor links keep the same pathname, so this only covers real route changes.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  // The panel is md:hidden, so a resize past the breakpoint would otherwise
  // strand the scroll lock with no visible way to dismiss it.
  const isOpen = isMenuOpen && !isDesktop;

  // An open panel needs the full-height header regardless of scroll position,
  // otherwise opening the menu at the top of the page would condense the row
  // out from under the button that was just tapped.
  const isCondensed = isScrolled && !isOpen;

  // Reduced motion opts out of retiring entirely rather than getting the same
  // move without the transition: a header that teleports off the top edge on
  // every downward flick is exactly what that preference is asking to avoid.
  const isHidden = isScrollingDown && !isOpen && !prefersReducedMotion;

  const navItems = buildHeaderNavItems(isHomePage);
  const contactHref = getHeaderContactHref(isHomePage);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsMenuOpen(false);
      toggleRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const revealClassName = (index: number): string =>
    cn(
      styles.menuReveal,
      isOpen ? styles.menuRevealOpen : styles.menuRevealClosed,
      isOpen && getMenuRevealDelay(styles.menuRevealDelays, index),
    );

  return (
    <>
      <button
        type="button"
        aria-hidden="true"
        tabIndex={-1}
        onClick={closeMenu}
        className={cn(
          styles.scrim,
          isOpen ? styles.scrimOpen : styles.scrimClosed,
        )}
      />
      <nav
        className={cn(
          styles.nav,
          isHidden ? styles.navHidden : styles.navRevealed,
          isOpen
            ? styles.navSurfaceOpen
            : isScrolled
              ? styles.navSurfaceCondensed
              : styles.navSurfaceTop,
        )}
        aria-label="Primary"
      >
        <a href="#main-content" className={styles.skipLink}>
          Skip to main content
        </a>
        <div className={styles.container}>
          <div
            className={cn(
              styles.row,
              isCondensed ? styles.rowCondensed : styles.rowTop,
            )}
          >
            {/* The brand-coloured initials split the name across spans, which
                fragments the computed accessible name into "B radley E xton".
                The label restores it and matches the visible text exactly. */}
            <Link href="/" className={styles.link} aria-label={profile.fullName}>
              <BradMark
                className={cn(
                  styles.mark,
                  isCondensed ? styles.markCondensed : styles.markTop,
                )}
              />
              <span>
                <span className={styles.labelText}>{profile.firstName.charAt(0)}</span>
                {profile.firstName.slice(1)}{" "}
                <span className={styles.labelText}>{profile.lastName.charAt(0)}</span>
                {profile.lastName.slice(1)}
              </span>
            </Link>

            <div className={styles.desktopNav}>
              <div className={styles.desktopNavList}>
                {navItems.map((item) => {
                  const isCurrent = isCurrentNavItem(item.href, pathname);
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        styles.desktopNavLink,
                        isCurrent && styles.desktopNavLinkCurrent,
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <ActionLink href={contactHref}>
                {commonCopy.cta.getInTouch}
              </ActionLink>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className={styles.button}
              onClick={() => setIsMenuOpen((open) => toggleMenu(open))}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span aria-hidden="true" className={styles.burger}>
                <span
                  className={cn(
                    styles.burgerBar,
                    styles.burgerBarTop,
                    isOpen && styles.burgerBarTopOpen,
                  )}
                />
                <span
                  className={cn(
                    styles.burgerBar,
                    styles.burgerBarMiddle,
                    isOpen && styles.burgerBarMiddleOpen,
                  )}
                />
                <span
                  className={cn(
                    styles.burgerBar,
                    styles.burgerBarBottom,
                    isOpen && styles.burgerBarBottomOpen,
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <div
          id="mobile-menu"
          className={cn(
            styles.menu,
            isOpen ? styles.menuOpen : styles.menuClosed,
          )}
        >
          <div className={styles.menuClip}>
            <div className={styles.menuInner} inert={!isOpen}>
              <div className={styles.menuList}>
                {navItems.map((item, index) => {
                  const isCurrent = isCurrentNavItem(item.href, pathname);
                  return (
                    <div key={item.label} className={revealClassName(index)}>
                      <Link
                        href={item.href}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          styles.mobileNavLink,
                          isCurrent && styles.mobileNavLinkCurrent,
                        )}
                        onClick={closeMenu}
                      >
                        <span>{item.label}</span>
                        <ArrowRightIcon className={styles.mobileNavLinkIcon} />
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div
                className={cn(styles.menuCta, revealClassName(navItems.length))}
              >
                <ActionLink
                  href={contactHref}
                  size="md"
                  className={styles.menuCtaLink}
                  onClick={closeMenu}
                >
                  {navigationCopy.headerPrimaryLabel}
                </ActionLink>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
