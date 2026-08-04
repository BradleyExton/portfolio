import { contactCopy } from "@/copy/contact";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

const heroMeta = contactCopy.hero.meta;

export function ContactHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.ambientBackdrop} aria-hidden="true" />
      <div className={styles.container}>
        <div className={styles.layout}>
          <ScrollReveal>
            <div className={styles.content}>
              <SectionIntro
                eyebrow={contactCopy.hero.eyebrow}
                title={contactCopy.hero.heading}
                description={contactCopy.hero.description}
                titleAs="h1"
                titleClassName={styles.title}
                descriptionClassName={styles.description}
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delayMs={140} className={styles.metaReveal}>
            <dl className={styles.metaCard}>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>{heroMeta.availabilityLabel}</dt>
                <dd className={styles.metaValue}>
                  <span className={styles.metaDot} aria-hidden="true" />
                  {heroMeta.availabilityValue}
                </dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>{heroMeta.responseLabel}</dt>
                <dd className={styles.metaValue}>{heroMeta.responseValue}</dd>
              </div>
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>{heroMeta.locationLabel}</dt>
                <dd className={styles.metaValue}>{heroMeta.locationValue}</dd>
              </div>
            </dl>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
