import Image from "next/image";
import { servicesCopy } from "@/copy/services";
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
          <p className={styles.eyebrow}>{servicesCopy.catalog.eyebrow}</p>
          <h2 id="services-catalog-heading" className={styles.heading}>
            {servicesCopy.catalog.heading}
          </h2>
          <p className={styles.description}>
            {servicesCopy.catalog.description}
          </p>
        </ScrollReveal>

        <div className={styles.grid}>
          {servicesCopy.services.map((service, index) => (
            <ScrollReveal
              key={service.id}
              className={styles.cardReveal}
              delayMs={120 + index * 90}
            >
              <article className={styles.card}>
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
