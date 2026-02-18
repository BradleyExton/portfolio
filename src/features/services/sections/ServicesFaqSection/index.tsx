"use client";

import { useState } from "react";
import { servicesCopy } from "@/copy/services";
import * as styles from "./styles";
import type { OpenFaqIndex } from "./types";
import { toggleFaq } from "./utils";

export function ServicesFaqSection() {
  const [openFaq, setOpenFaq] = useState<OpenFaqIndex>(null);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          {servicesCopy.faq.eyebrow}
        </p>
        <h2 className={styles.subheading}>
          {servicesCopy.faq.heading}
        </h2>

        <div className={styles.block}>
          {servicesCopy.faq.items.map((faq, index) => {
            const isOpen = openFaq === index;
            const buttonId = `services-faq-trigger-${index}`;
            const panelId = `services-faq-panel-${index}`;

            return (
              <div key={faq.question} className={styles.card}>
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
