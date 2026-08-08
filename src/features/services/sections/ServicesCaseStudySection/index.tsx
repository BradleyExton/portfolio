import Image from "next/image";
import { servicesCopy } from "@/copy/services";
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  SectionIntro,
} from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

const { caseStudy } = servicesCopy;

export function ServicesCaseStudySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={caseStudy.eyebrow}
            title={caseStudy.heading}
            description={caseStudy.description}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.subheading}
            descriptionClassName={styles.intro}
          />
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
          <article className={styles.card}>
            <a
              className={styles.mediaLink}
              href={caseStudy.linkHref}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={-1}
              aria-hidden="true"
            >
              <Image
                src="/images/work/precision-tradework.webp"
                alt={caseStudy.imageAlt}
                fill
                className={styles.mediaImage}
                sizes="(min-width: 1024px) 512px, 100vw"
              />
            </a>

            <div className={styles.body}>
              <div>
                <h3 className={styles.clientName}>{caseStudy.client}</h3>
                <p className={styles.clientMeta}>{caseStudy.clientMeta}</p>
              </div>

              <p className={styles.summary}>{caseStudy.summary}</p>

              <ul className={styles.list}>
                {caseStudy.highlights.map((item) => (
                  <li key={item} className={styles.listItem}>
                    <CheckCircleIcon className={styles.listMarker} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className={styles.tagRow}>
                {caseStudy.stack.map((item) => (
                  <span key={item} className={styles.tag}>
                    {item}
                  </span>
                ))}
              </div>

              <a
                className={styles.link}
                href={caseStudy.linkHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {caseStudy.linkLabel}
                <ArrowUpRightIcon className={styles.linkIcon} />
              </a>
            </div>
          </article>
        </ScrollReveal>
      </div>
    </section>
  );
}
