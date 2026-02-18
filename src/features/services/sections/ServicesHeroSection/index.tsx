import { servicesCopy } from "@/copy/services";
import * as styles from "./styles";

export function ServicesHeroSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          {servicesCopy.hero.heading}
        </h1>
        <p className={styles.description}>
          {servicesCopy.hero.description}
        </p>
      </div>
    </section>
  );
}
