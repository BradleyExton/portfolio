import Link from "next/link";
import { commonCopy } from "@/copy/common";
import { navigationCopy } from "@/copy/navigation";
import { profile, profileComputed } from "@/copy/profile";
import {
  ActionLink,
  type ActionLinkProps,
  ArrowUpRightIcon,
} from "@/features/shared/designSystem";
import * as styles from "./styles";

type SocialLink = {
  label: string;
  href: string;
  variant: NonNullable<ActionLinkProps["variant"]>;
  size: NonNullable<ActionLinkProps["size"]>;
  target?: ActionLinkProps["target"];
  rel?: ActionLinkProps["rel"];
  opensInNewTab?: boolean;
};

const socialLinks: readonly SocialLink[] = [
  {
    label: "Send an Email",
    href: profileComputed.mailto,
    variant: "brand",
    size: "sm",
  },
  {
    label: "LinkedIn",
    href: profile.links.linkedin,
    variant: "ghost",
    size: "text",
    target: "_blank",
    rel: "noopener noreferrer",
    opensInNewTab: true,
  },
  {
    label: "GitHub",
    href: profile.links.github,
    variant: "ghost",
    size: "text",
    target: "_blank",
    rel: "noopener noreferrer",
    opensInNewTab: true,
  },
];

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
            <nav
              className={styles.nav}
              aria-label="Footer quick links"
            >
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
            <nav
              className={styles.connectNav}
              aria-label="Footer connect links"
            >
              {socialLinks.map((link) => (
                <ActionLink
                  key={link.label}
                  href={link.href}
                  variant={link.variant}
                  size={link.size}
                  target={link.target}
                  rel={link.rel}
                  icon={link.opensInNewTab ? <ArrowUpRightIcon className={styles.externalIndicator} /> : null}
                >
                  <>
                    <span>{link.label}</span>
                    {link.opensInNewTab ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </>
                </ActionLink>
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
