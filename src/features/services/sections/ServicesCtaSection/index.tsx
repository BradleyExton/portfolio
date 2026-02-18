import Link from "next/link";
import { servicesCopy } from "@/copy/services";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ServicesCtaSection() {
  return (
    <section className={styles.section}>
      <ScrollReveal>
        <div className={styles.container}>
          <h2 className={styles.heading}>
            {servicesCopy.cta.heading}
          </h2>
          <p className={styles.description}>
            {servicesCopy.cta.description}
          </p>
          <Link
            href="/contact"
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
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {servicesCopy.cta.buttonLabel}
          </Link>
        </div>
      </ScrollReveal>
    </section>
  );
}
