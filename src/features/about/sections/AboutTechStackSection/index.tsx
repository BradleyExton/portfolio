import { aboutCopy } from "@/copy/about";
import * as styles from "./styles";

export function AboutTechStackSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          {aboutCopy.techStack.eyebrow}
        </p>
        <h2 className={styles.subheading}>
          {aboutCopy.techStack.heading}
        </h2>

        <div className={styles.grid}>
          {Object.entries(aboutCopy.techStack.categories).map(([category, tools]) => (
            <div
              key={category}
              className={styles.card}
            >
              <h4 className={styles.cardTitle}>{category}</h4>
              <p className={styles.description}>{tools}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
