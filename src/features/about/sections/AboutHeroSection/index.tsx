import { aboutCopy } from "@/copy/about";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.ambientBackdrop} aria-hidden="true" />
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.content}>
            <SectionIntro
              eyebrow={aboutCopy.hero.eyebrow}
              title={aboutCopy.hero.heading}
              description={aboutCopy.hero.description}
              titleAs="h1"
              titleClassName={styles.title}
              descriptionClassName={styles.description}
            />
            <ul className={styles.metaRow}>
              {aboutCopy.hero.highlights.map((highlight) => (
                <li key={highlight} className={styles.metaItem}>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
