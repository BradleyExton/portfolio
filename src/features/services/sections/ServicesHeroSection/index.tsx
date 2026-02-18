import { servicesCopy } from "@/copy/services";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ServicesHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.content}>
            <h1 className={styles.title}>
              {servicesCopy.hero.heading}
            </h1>
            <p className={styles.description}>
              {servicesCopy.hero.description}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
