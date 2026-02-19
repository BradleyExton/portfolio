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
          <p className={styles.intro}>
            {servicesCopy.process.description}
          </p>
        </ScrollReveal>

        <div className={styles.block}>
          <div className={styles.blockRail} aria-hidden="true">
            <span className={styles.blockRailFlow} />
          </div>
          {servicesCopy.process.steps.map((item, index) => (
            <ScrollReveal key={item.step} delayMs={120 + index * 90}>
              <div className={styles.row}>
                <div className={styles.stepColumn}>
                  <div className={styles.stepBadge}>
                    {item.step}
                  </div>
                </div>
                <div className={styles.stepContent}>
                  <h4 className={styles.cardTitle}>{item.title}</h4>
                  <p className={styles.description}>{item.description}</p>
                  <p className={styles.output}>
                    <span className={styles.outputLabel}>You get:</span>{" "}
                    {item.output}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
