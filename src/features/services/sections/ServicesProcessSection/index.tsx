import { servicesCopy } from "@/copy/services";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ServicesProcessSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <p className={styles.eyebrow}>
            {servicesCopy.process.eyebrow}
          </p>
          <h2 className={styles.subheading}>
            {servicesCopy.process.heading}
          </h2>
        </ScrollReveal>

        <div className={styles.block}>
          {servicesCopy.process.steps.map((item, index) => (
            <ScrollReveal key={item.step} delayMs={120 + index * 90}>
              <div className={styles.row}>
                <div className={styles.stepColumn}>
                  <div className={styles.stepBadge}>
                    {item.step}
                  </div>
                  {index < servicesCopy.process.steps.length - 1 && (
                    <div className={styles.stepConnector} aria-hidden="true">
                      <span className={styles.stepConnectorFlow} />
                    </div>
                  )}
                </div>
                <div className={styles.stepContent}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.description}>{item.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
