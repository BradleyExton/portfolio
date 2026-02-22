import { servicesCopy } from "@/copy/services";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ServicesHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.shell}>
          <p className={styles.eyebrow}>{servicesCopy.hero.eyebrow}</p>
          <h1 className={styles.title}>
            {servicesCopy.hero.heading}
          </h1>
          <p className={styles.description}>
            {servicesCopy.hero.description}
          </p>
          <p className={styles.availability}>
            <span className={styles.availabilityLabel}>
              {servicesCopy.hero.availabilityLabel}:
            </span>
            <span className={styles.availabilityValue}>
              {servicesCopy.hero.availability}
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
