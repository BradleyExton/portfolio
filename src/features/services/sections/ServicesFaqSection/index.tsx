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
        <h2 className={styles.eyebrow}>
          {servicesCopy.faq.eyebrow}
        </h2>
        <h3 className={styles.subheading}>
          {servicesCopy.faq.heading}
        </h3>

        <div className={styles.block}>
          {servicesCopy.faq.items.map((faq, index) => (
            <div key={faq.question} className={styles.card}>
              <button
                onClick={() => setOpenFaq(toggleFaq(openFaq, index))}
                className={styles.row}
              >
                <span className={styles.labelText}>{faq.question}</span>
                <svg
                  className={
                    openFaq === index ? `${styles.chevronIcon} ${styles.chevronExpanded}` : styles.chevronIcon
                  }
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
              {openFaq === index && (
                <div className={styles.answerContainer}>
                  <p className={styles.description}>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
