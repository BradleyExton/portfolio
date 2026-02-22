import Link from "next/link";
import { homeCopy } from "@/copy/home";
import { profileComputed } from "@/copy/profile";
import * as styles from "./styles";

export function HomeContactCtaSection() {
  return (
    <section
      id="contact"
      className={styles.section}
    >
      <div className={styles.container}>
        <h2 className={styles.heading}>
          {homeCopy.contactCta.heading}
        </h2>
        <p className={styles.description}>
          {homeCopy.contactCta.description}
        </p>
        <div className={styles.row}>
          <a
            href={profileComputed.mailto}
            className={styles.link}
          >
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
            {homeCopy.contactCta.ctaPrimary}
          </a>
          <Link
            href="/contact"
            className={styles.ctaLink}
          >
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
            {homeCopy.contactCta.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
