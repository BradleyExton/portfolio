import { contactCopy } from "@/copy/contact";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ContactHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.content}>
            <SectionIntro
              title={contactCopy.hero.heading}
              description={contactCopy.hero.description}
              titleAs="h1"
              titleClassName={styles.title}
              descriptionClassName={styles.description}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
