import { contactCopy } from "@/copy/contact";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ContactHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <div className={styles.content}>
            <h1 className={styles.title}>
              {contactCopy.hero.heading}
            </h1>
            <p className={styles.description}>
              {contactCopy.hero.description}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
