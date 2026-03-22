"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { commonCopy } from "@/copy/common";
import { navigationCopy } from "@/copy/navigation";
import { profile } from "@/copy/profile";
import {
  ActionLink,
  CloseIcon,
  MenuIcon,
} from "@/features/shared/designSystem";
import * as styles from "./styles";
import { buildHeaderNavItems, getHeaderContactHref, toggleMenu } from "./utils";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const navItems = buildHeaderNavItems(isHomePage);
  const contactHref = getHeaderContactHref(isHomePage);

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
                  className={styles.desktopNavLink}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <ActionLink href={contactHref}>
              {commonCopy.cta.getInTouch}
            </ActionLink>
          </div>

          <button
            className={styles.button}
            onClick={() => setIsMenuOpen((open) => toggleMenu(open))}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <CloseIcon className={styles.icon} /> : <MenuIcon className={styles.icon} />}
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
            <ActionLink
              href={contactHref}
              className="w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              {navigationCopy.headerPrimaryLabel}
            </ActionLink>
          </div>
        )}
      </div>
    </nav>
  );
}
