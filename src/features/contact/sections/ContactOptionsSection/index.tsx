import { contactCopy } from "@/copy/contact";
import { profile, profileComputed } from "@/copy/profile";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

type ContactOptionsSectionProps = {
  calcomUrl: string | null;
};

export function ContactOptionsSection({ calcomUrl }: ContactOptionsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <ScrollReveal className={styles.card} delayMs={120}>
            <div className={styles.row}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className={styles.subheading}>{contactCopy.options.call.title}</h3>
            <p className={styles.description}>{contactCopy.options.call.description}</p>
            <a
              href={calcomUrl ?? profileComputed.mailto}
              target={calcomUrl ? "_blank" : undefined}
              rel={calcomUrl ? "noopener noreferrer" : undefined}
              className={styles.link}
            >
              {calcomUrl
                ? contactCopy.options.call.cta
                : contactCopy.options.call.fallbackCta}
              <svg
                className={styles.linkIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </ScrollReveal>

          <ScrollReveal className={styles.card} delayMs={220}>
            <div className={styles.row}>
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className={styles.subheading}>{contactCopy.options.email.title}</h3>
            <p className={styles.description}>{contactCopy.options.email.description}</p>
            <a
              href={profileComputed.mailto}
              className={styles.link}
            >
              {profile.email}
              <svg
                className={styles.linkIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </ScrollReveal>

          <ScrollReveal className={styles.card} delayMs={320}>
            <div className={styles.row}>
              <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <h3 className={styles.subheading}>{contactCopy.options.linkedin.title}</h3>
            <p className={styles.description}>{contactCopy.options.linkedin.description}</p>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {contactCopy.options.linkedin.cta}
              <svg
                className={styles.linkIcon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
