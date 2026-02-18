import Link from "next/link";
import { commonCopy } from "@/copy/common";
import { navigationCopy } from "@/copy/navigation";
import { profile, profileComputed } from "@/copy/profile";
import * as styles from "./styles";

const socialLinks = [
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    external: true,
  },
  {
    label: "Email",
    href: profileComputed.mailto,
    external: false,
  },
] as const;

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <Link href="/" className={styles.link}>
              <span className={styles.labelText}>{profile.firstName.charAt(0)}</span>
              {profile.firstName.slice(1)}{" "}
              <span className={styles.labelText}>{profile.lastName.charAt(0)}</span>
              {profile.lastName.slice(1)}
            </Link>
            <p className={styles.text}>{profile.title}</p>
          </div>

          <div>
            <h4 className={styles.cardTitle}>
              {navigationCopy.footerQuickLinksLabel}
            </h4>
            <nav className={styles.nav}>
              {navigationCopy.footerLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={styles.navLink}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className={styles.cardTitle}>
              {navigationCopy.footerConnectLabel}
            </h4>
            <nav className={styles.nav}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={styles.navLink}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className={styles.row}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} {profile.fullName}. {commonCopy.legal.allRightsReserved}
          </p>
          <p className={styles.location}>{profile.location}</p>
        </div>
      </div>
    </footer>
  );
}
