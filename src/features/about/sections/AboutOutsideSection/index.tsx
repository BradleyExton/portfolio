import { aboutCopy } from "@/copy/about";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutOutsideSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <ScrollReveal>
            <h2 className={styles.eyebrow}>
              {aboutCopy.outsideOfCode.eyebrow}
            </h2>
            <p className={styles.description}>
              {aboutCopy.outsideOfCode.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
