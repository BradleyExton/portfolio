import Image from "next/image";
import { servicesCopy } from "@/copy/services";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
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
            align="center"
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
                <div className={styles.imageFrame}>
                  <Image
                    src={service.illustration.src}
                    alt={service.illustration.alt}
                    width={800}
                    height={560}
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </div>
                <div className={styles.cardRow}>
                  <span className={styles.badge}>{getServiceNumber(index)}</span>
                  <p className={styles.timeline}>{service.timeline}</p>
                </div>
                <h3 className={styles.subheading}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <ul className={styles.featureList}>
                  {service.deliverables.slice(0, 2).map((deliverable) => (
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
