import { aboutCopy } from "@/copy/about";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutStorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <ScrollReveal>
            <h2 className={styles.eyebrow}>
              {aboutCopy.story.eyebrow}
            </h2>
          </ScrollReveal>
          <div className={styles.block}>
            {aboutCopy.story.paragraphs.map((paragraph, index) => (
              <ScrollReveal
                key={paragraph}
                className={styles.paragraphReveal}
                delayMs={90 + index * 70}
              >
                <p
                  className={
                    `${styles.paragraph} ${index === 0 ? styles.paragraphLead : ""} ${index < aboutCopy.story.paragraphs.length - 1 ? styles.paragraphSpacing : ""}`
                  }
                >
                  {paragraph}
                </p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
