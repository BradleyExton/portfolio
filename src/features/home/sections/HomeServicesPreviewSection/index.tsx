import { Fragment } from "react";
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

        <div aria-hidden="true" className={styles.ledgerHead}>
          <span className={styles.ledgerHeadLabelEnd}>Typical build</span>
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
                    <ArrowRightIcon aria-hidden="true" className={styles.titleArrow} />
                  </h3>
                  <p className={styles.outcome}>{service.outcome}</p>
                  {/* Each tag needs its own element: below md the separators
                      are display:none, and bare sibling text nodes would then
                      merge into one anonymous flex item with no gap between
                      the words. */}
                  <p className={styles.meta}>
                    {service.tags.map((tag, index) => (
                      <Fragment key={tag}>
                        {index > 0 ? (
                          <span aria-hidden="true" className={styles.metaSeparator}>
                            ·
                          </span>
                        ) : null}
                        <span>{tag}</span>
                      </Fragment>
                    ))}
                  </p>
                  <p className={styles.metaTimeline}>
                    <span className={styles.metaTimelineLabel}>Typical build</span>
                    <span className={styles.metaTimelineValue}>{service.timeline}</span>
                  </p>
                </div>

                <div className={styles.timelineCell}>
                  {/* The column header carries this label visually, but it is
                      decorative to assistive tech, and the phone-width line
                      that states it is display:none at this width. */}
                  <p className={styles.timelineValue}>
                    <span className="sr-only">Typical build: </span>
                    {service.timeline}
                  </p>
                </div>

                <span aria-hidden="true" className={styles.rowRule} />
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
