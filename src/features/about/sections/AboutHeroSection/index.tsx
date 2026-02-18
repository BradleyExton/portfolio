import { aboutCopy } from "@/copy/about";
import * as styles from "./styles";

export function AboutHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {aboutCopy.hero.heading}
        </h1>
        <p className={styles.description}>
          {aboutCopy.hero.description}
        </p>
      </div>
    </section>
  );
}
