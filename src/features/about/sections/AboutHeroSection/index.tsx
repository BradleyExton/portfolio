import { aboutCopy } from "@/copy/about";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.content}>
            <h1 className={styles.title}>
              {aboutCopy.hero.heading}
            </h1>
            <p className={styles.description}>
              {aboutCopy.hero.description}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
