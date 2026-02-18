import { aboutCopy } from "@/copy/about";
import * as styles from "./styles";

export function AboutBeliefsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.eyebrow}>
          {aboutCopy.beliefs.eyebrow}
        </h2>
        <h3 className={styles.subheading}>
          {aboutCopy.beliefs.heading}
        </h3>

        <div className={styles.block}>
          {aboutCopy.beliefs.items.map((belief) => (
            <div
              key={belief.title}
              className={styles.card}
            >
              <h4 className={styles.cardTitle}>{belief.title}</h4>
              <p className={styles.description}>{belief.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
