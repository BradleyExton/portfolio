"use client";

import { useState } from "react";
import { servicesCopy } from "@/copy/services";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";
import type { OpenFaqIndex } from "./types";
import { toggleFaq } from "./utils";

export function ServicesFaqSection() {
  const [openFaq, setOpenFaq] = useState<OpenFaqIndex>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={servicesCopy.faq.eyebrow}
            title={servicesCopy.faq.heading}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.subheading}
          />
        </ScrollReveal>

        <div className={styles.block}>
          {servicesCopy.faq.items.map((faq, index) => {
            const isOpen = openFaq === index;
            const buttonId = `services-faq-trigger-${index}`;
            const panelId = `services-faq-panel-${index}`;

            return (
              <ScrollReveal
                key={faq.question}
                className={styles.card}
                delayMs={120 + index * 80}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(toggleFaq(openFaq, index))}
                  className={styles.row}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  id={buttonId}
                >
                  <span className={styles.labelText}>{faq.question}</span>
                  <svg
                    className={isOpen ? `${styles.chevronIcon} ${styles.chevronExpanded}` : styles.chevronIcon}
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div
                  id={panelId}
                  className={styles.answerContainer}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                >
                  <p className={styles.description}>{faq.answer}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
