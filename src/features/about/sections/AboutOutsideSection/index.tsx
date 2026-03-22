import { aboutCopy } from "@/copy/about";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutOutsideSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.panel}>
          <ScrollReveal>
            <SectionIntro
              title={aboutCopy.outsideOfCode.eyebrow}
              titleClassName={styles.heading}
            />
            <p className={styles.description}>
              {aboutCopy.outsideOfCode.description}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
