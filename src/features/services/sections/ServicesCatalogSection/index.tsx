import { servicesCopy } from "@/copy/services";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";
import { getServiceAnchorId } from "./utils";

export function ServicesCatalogSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.block}>
          {servicesCopy.services.map((service, index) => {
            const sectionId = getServiceAnchorId(service.title);

            return (
              <div key={service.title} id={sectionId}>
                <ScrollReveal
                  className={styles.grid}
                  delayMs={120 + index * 90}
                >
                  <div>
                    <div className={styles.row}>
                      {service.icon}
                    </div>
                    <h3 className={styles.subheading}>
                      {service.title}
                    </h3>
                    <p className={styles.description}>{service.description}</p>
                    <p className={styles.text}>{service.price}</p>
                  </div>
                  <div>
                    <h4 className={styles.cardTitle}>What&apos;s included:</h4>
                    <ul className={styles.featureList}>
                      {service.features.map((feature) => (
                        <li key={feature} className={styles.featureItem}>
                          <svg
                            className={styles.icon}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className={styles.card}>
                      <p className={styles.idealForText}>
                        <span className={styles.labelText}>Best for:</span>{" "}
                        {service.bestFor}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
