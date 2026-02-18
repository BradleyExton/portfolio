import { aboutCopy } from "@/copy/about";
import * as styles from "./styles";

export function AboutStorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.eyebrow}>
          {aboutCopy.story.eyebrow}
        </h2>
        <div className={styles.block}>
          {aboutCopy.story.paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              className={
                index < aboutCopy.story.paragraphs.length - 1
                  ? `${styles.paragraph} ${styles.paragraphSpacing}`
                  : styles.paragraph
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
