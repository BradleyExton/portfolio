import { servicesCopy } from "@/copy/services";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ServicesHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.shell}>
          <SectionIntro
            eyebrow={servicesCopy.hero.eyebrow}
            title={servicesCopy.hero.heading}
            description={servicesCopy.hero.description}
            titleAs="h1"
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.title}
            descriptionClassName={styles.description}
          />
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
