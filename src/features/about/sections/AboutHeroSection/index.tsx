import Image from "next/image";
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
          <div className={styles.layout}>
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

            <div className={styles.portraitColumn}>
              <span className={styles.portraitHalo} aria-hidden="true" />
              <span className={styles.portraitRing} aria-hidden="true" />
              <div className={styles.portraitFrame}>
                <Image
                  src="/images/headshot.png"
                  alt={aboutCopy.hero.portraitAlt}
                  width={800}
                  height={800}
                  priority
                  sizes="(min-width: 1024px) 16rem, (min-width: 640px) 14rem, 12rem"
                  className={styles.portraitImage}
                />
              </div>
              <span className={styles.portraitNode} aria-hidden="true" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
