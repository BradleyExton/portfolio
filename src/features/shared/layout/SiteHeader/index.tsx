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
import * as styles from "./styles";
import {
  buildHeaderNavItems,
  getHeaderContactHref,
  getMenuRevealDelay,
  isCurrentNavItem,
  toggleMenu,
} from "./utils";

const DESKTOP_MEDIA_QUERY = "(min-width: 768px)";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const isHomePage = pathname === "/";

  // Anchor links keep the same pathname, so this only covers real route changes.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsMenuOpen(false);
  }

  // The panel is md:hidden, so a resize past the breakpoint would otherwise
  // strand the scroll lock with no visible way to dismiss it.
  const isOpen = isMenuOpen && !isDesktop;

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
          isOpen ? styles.navSurfaceOpen : styles.navSurfaceIdle,
        )}
        aria-label="Primary"
      >
        <a href="#main-content" className={styles.skipLink}>
          Skip to main content
        </a>
        <div className={styles.container}>
          <div className={styles.row}>
            <Link href="/" className={styles.link}>
              <span className={styles.labelText}>{profile.firstName.charAt(0)}</span>
              {profile.firstName.slice(1)}{" "}
              <span className={styles.labelText}>{profile.lastName.charAt(0)}</span>
              {profile.lastName.slice(1)}
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
