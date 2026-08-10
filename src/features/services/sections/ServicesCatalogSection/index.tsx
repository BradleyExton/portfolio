import { servicesCopy } from "@/copy/services";
import { SectionIntro, cn } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import { IsoIllustration } from "./IsoIllustration";
import * as styles from "./styles";
import { getServiceNumber } from "./utils";

export function ServicesCatalogSection() {
  return (
    <section
      className={styles.section}
      aria-labelledby="services-catalog-heading"
    >
      <div className={styles.container}>
        <ScrollReveal className={styles.intro}>
          <SectionIntro
            eyebrow={servicesCopy.catalog.eyebrow}
            title={<span id="services-catalog-heading">{servicesCopy.catalog.heading}</span>}
            description={servicesCopy.catalog.description}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.heading}
            descriptionClassName={styles.description}
          />
        </ScrollReveal>

        <div className={styles.grid}>
          {servicesCopy.services.map((service, index) => (
            <ScrollReveal
              key={service.id}
              className={styles.cardReveal}
              delayMs={120 + index * 90}
            >
              <article id={service.id} className={`${styles.card} ${styles.anchorOffset}`}>
                <div className={cn(styles.imageFrame, styles.imageFrameMorphById[service.id])}>
                  <IsoIllustration serviceId={service.id} label={service.illustration.alt} />
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.badge}>{getServiceNumber(index)}</span>
                  <p className={styles.timeline}>{service.timeline}</p>
                </div>
                <h3 className={styles.subheading}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.deliverables.slice(0, 3).map((deliverable) => (
                    <li key={deliverable}>
                      {deliverable}
                    </li>
                  ))}
                </ul>
                <p className={styles.price}>{service.price}</p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
