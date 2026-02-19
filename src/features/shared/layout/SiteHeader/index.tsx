"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { commonCopy } from "@/copy/common";
import { navigationCopy } from "@/copy/navigation";
import { profile } from "@/copy/profile";
import * as styles from "./styles";
import { buildHeaderNavItems, getHeaderContactHref, toggleMenu } from "./utils";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHomePage = pathname === "/";
  const navAnimationVariant = searchParams.get("navfx") === "pill" ? "pill" : "underline";

  const navItems = buildHeaderNavItems(isHomePage);
  const contactHref = getHeaderContactHref(isHomePage);
  const desktopNavLinkClassName =
    navAnimationVariant === "pill"
      ? styles.desktopNavLinkPill
      : styles.desktopNavLinkUnderline;

  return (
    <nav className={styles.nav} aria-label="Primary">
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
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={desktopNavLinkClassName}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <Link
              href={contactHref}
              className={styles.ctaLink}
            >
              {commonCopy.cta.getInTouch}
            </Link>
          </div>

          <button
            className={styles.button}
            onClick={() => setIsMenuOpen((open) => toggleMenu(open))}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className={styles.icon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <div id="mobile-menu" className={styles.block}>
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={contactHref}
              className={styles.mobileCtaLink}
              onClick={() => setIsMenuOpen(false)}
            >
              {navigationCopy.headerPrimaryLabel}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
