import { aboutCopy } from "@/copy/about";
import * as styles from "./styles";

export function AboutOutsideSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.eyebrow}>
          {aboutCopy.outsideOfCode.eyebrow}
        </h2>
        <p className={styles.description}>
          {aboutCopy.outsideOfCode.description}
        </p>
      </div>
    </section>
  );
}
