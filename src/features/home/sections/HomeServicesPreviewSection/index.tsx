import Link from "next/link";
import { homeCopy } from "@/copy/home";
import * as styles from "./styles";

export function HomeServicesPreviewSection() {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.block}>
          <p className={styles.eyebrow}>
            {homeCopy.servicesPreview.eyebrow}
          </p>
          <h2 className={styles.subheading}>
            {homeCopy.servicesPreview.heading}
          </h2>
          <p className={styles.description}>
            {homeCopy.servicesPreview.description}
          </p>
        </div>

        <div className={styles.grid}>
          {homeCopy.servicesPreview.items.map((service) => (
            <div
              key={service.title}
              className={styles.card}
            >
              <div className={styles.row}>
                {service.icon}
              </div>
              <h4 className={styles.cardTitle}>{service.title}</h4>
              <p className={styles.text}>{service.description}</p>
              <p className={styles.price}>{service.price}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link
            href="/services"
            className={styles.link}
          >
            {homeCopy.servicesPreview.cta}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
