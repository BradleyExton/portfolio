import { Link } from "next-view-transitions";
import { homeCopy } from "@/copy/home";
import { ActionLink, ArrowRightIcon, SectionIntro, cn } from "@/features/shared/designSystem";
import { ServiceGlyph } from "./ServiceGlyph";
import type { HomeServicePreviewItem } from "./types";
import { buildHomeServicePreviewItems } from "./utils";
import * as styles from "./styles";

const previewItems = buildHomeServicePreviewItems(
  homeCopy.servicesPreview.items,
) satisfies readonly HomeServicePreviewItem[];

export function HomeServicesPreviewSection() {
  return (
    <section id="services" className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <div className={styles.headerRow}>
          <SectionIntro
            eyebrow={homeCopy.servicesPreview.eyebrow}
            title={homeCopy.servicesPreview.heading}
            description={homeCopy.servicesPreview.description}
            className={styles.block}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.subheading}
            descriptionClassName={styles.description}
          />

          <p className={styles.availability}>
            <span aria-hidden="true" className={styles.availabilityDot}>
              <span className={styles.availabilityPing} />
              <span className={styles.availabilityCore} />
            </span>
            {homeCopy.servicesPreview.availability}
          </p>
        </div>

        <ul className={styles.list}>
          {previewItems.map((service) => (
            <li key={service.key} className={styles.row}>
              <Link
                href={service.href}
                prefetch={false}
                className={styles.rowLink}
                aria-label={`View ${service.title} service details`}
              >
                <ServiceGlyph
                  serviceKey={service.key}
                  className={cn(styles.glyph, styles.morphTargetByServiceKey[service.key])}
                />

                <div className={styles.rowBody}>
                  <h3 className={styles.cardTitle}>
                    {service.title}
                    <ArrowRightIcon
                      aria-hidden="true"
                      className={cn(styles.bottomCtaIcon, styles.titleArrow)}
                    />
                  </h3>
                  <p className={styles.outcome}>{service.outcome}</p>
                  <p className={styles.meta}>{service.tags.join("  ·  ")}</p>
                  <p className={styles.metaTimeline}>Typical build: {service.timeline}</p>
                </div>

                <div className={styles.timelineCell}>
                  <p className={styles.timelineLabel}>Typical build</p>
                  <p className={styles.timelineValue}>{service.timeline}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className={styles.bottomCtaRow}>
          <ActionLink
            href="/services"
            variant="inline"
            size="text"
            className={styles.bottomCta}
            icon={<ArrowRightIcon className={styles.bottomCtaIcon} />}
          >
            {homeCopy.servicesPreview.cta}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
