import { servicesCopy } from "@/copy/services";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function ServicesProcessSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={servicesCopy.process.eyebrow}
            title={servicesCopy.process.heading}
            description={servicesCopy.process.description}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.subheading}
            descriptionClassName={styles.intro}
          />
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
                    <span className={styles.outputLabel}>
                      {servicesCopy.process.outputLabel}
                    </span>{" "}
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
