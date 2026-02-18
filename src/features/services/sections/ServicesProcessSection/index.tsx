import { servicesCopy } from "@/copy/services";
import * as styles from "./styles";

export function ServicesProcessSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>
          {servicesCopy.process.eyebrow}
        </p>
        <h2 className={styles.subheading}>
          {servicesCopy.process.heading}
        </h2>

        <div className={styles.block}>
          {servicesCopy.process.steps.map((item) => (
            <div key={item.step} className={styles.row}>
              <div className={styles.stepBadge}>
                {item.step}
              </div>
              <div>
                <h4 className={styles.cardTitle}>{item.title}</h4>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
