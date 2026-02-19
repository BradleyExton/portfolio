import { aboutCopy } from "@/copy/about";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.ambientBackdrop} aria-hidden="true" />
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.content}>
            <p className={styles.badgeRow}>
              <span className={styles.badgeDot} />
              {aboutCopy.hero.badge}
            </p>
            <h1 className={styles.title}>
              {aboutCopy.hero.heading}
            </h1>
            <p className={styles.description}>
              {aboutCopy.hero.description}
            </p>
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
