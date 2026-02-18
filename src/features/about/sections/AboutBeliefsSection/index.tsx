import { aboutCopy } from "@/copy/about";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutBeliefsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <p className={styles.eyebrow}>
            {aboutCopy.beliefs.eyebrow}
          </p>
          <h2 className={styles.subheading}>
            {aboutCopy.beliefs.heading}
          </h2>
        </ScrollReveal>

        <div className={styles.block}>
          {aboutCopy.beliefs.items.map((belief, index) => (
            <ScrollReveal
              key={belief.title}
              className={styles.card}
              delayMs={120 + index * 90}
            >
              <h4 className={styles.cardTitle}>{belief.title}</h4>
              <p className={styles.description}>{belief.description}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
