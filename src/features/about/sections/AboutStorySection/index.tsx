import { aboutCopy } from "@/copy/about";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutStorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <h2 className={styles.eyebrow}>
            {aboutCopy.story.eyebrow}
          </h2>
        </ScrollReveal>
        <div className={styles.block}>
          {aboutCopy.story.paragraphs.map((paragraph, index) => (
            <ScrollReveal
              key={paragraph}
              delayMs={90 + index * 70}
            >
              <p
                className={
                  index < aboutCopy.story.paragraphs.length - 1
                    ? `${styles.paragraph} ${styles.paragraphSpacing}`
                    : styles.paragraph
                }
              >
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
