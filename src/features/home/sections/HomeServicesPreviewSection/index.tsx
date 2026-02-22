import Image from "next/image";
import Link from "next/link";
import { homeCopy } from "@/copy/home";
import type { HomeServicePreviewItem, ServiceKey } from "./types";
import { buildHomeServicePreviewItems } from "./utils";
import * as styles from "./styles";

const previewItems = buildHomeServicePreviewItems(
  homeCopy.servicesPreview.items,
) satisfies readonly HomeServicePreviewItem[];

const illustrationByServiceKey: Record<
  ServiceKey,
  Readonly<{
    alt: string;
    src: string;
  }>
> = {
  websites: {
    alt: "Website service illustration",
    src: "/images/services/website-illustration.png",
  },
  webApps: {
    alt: "Web application service illustration",
    src: "/images/services/web-application-illustration.png",
  },
  aiTools: {
    alt: "AI tools service illustration",
    src: "/images/services/ai-tools-illustration.png",
  },
};

const hrefByServiceKey: Record<ServiceKey, string> = {
  websites: "/services#websites",
  webApps: "/services#web-applications",
  aiTools: "/services#ai-tools",
};

export function HomeServicesPreviewSection() {
  return (
    <section id="services" className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
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
          {previewItems.map((service) => {
            const illustration = illustrationByServiceKey[service.key];
            const href = hrefByServiceKey[service.key];

            return (
              <div key={service.title} className={styles.cardWrap}>
                <Link
                  href={href}
                  prefetch={false}
                  className={styles.card}
                  aria-label={`View ${service.title} service details`}
                >
                  <div className={styles.glow} />
                  <div className={styles.illustrationWrap}>
                    <Image
                      src={illustration.src}
                      alt={illustration.alt}
                      width={176}
                      height={176}
                      sizes="(min-width: 1280px) 176px, (min-width: 768px) 22vw, 40vw"
                      loading="lazy"
                      fetchPriority="low"
                      className={styles.serviceImage}
                    />
                  </div>
                  <h4 className={styles.cardTitle}>{service.title}</h4>
                  <p className={styles.text}>{service.description}</p>
                  <p className={styles.outcome}>{service.outcome}</p>
                  <p className={styles.hint}>{service.deliveryHint}</p>
                  <ul className={styles.tagList} aria-label={`${service.title} tags`}>
                    {service.tags.map((tag) => (
                      <li key={`${service.title}-${tag}`} className={styles.tag}>
                        {tag}
                      </li>
                    ))}
                  </ul>
                </Link>
              </div>
            );
          })}
        </div>

        <div className={styles.bottomCtaRow}>
          <Link href="/services" className={styles.bottomCta}>
            {homeCopy.servicesPreview.cta}
            <svg
              className={styles.bottomCtaIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
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
