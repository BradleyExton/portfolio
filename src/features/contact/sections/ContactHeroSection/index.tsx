import { contactCopy } from "@/copy/contact";
import * as styles from "./styles";

export function ContactHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {contactCopy.hero.heading}
        </h1>
        <p className={styles.description}>
          {contactCopy.hero.description}
        </p>
      </div>
    </section>
  );
}
