import { Link } from "next-view-transitions";
import type { CaseStudy } from "@/copy/caseStudies";
import { caseStudyPageCopy } from "@/copy/caseStudies";
import {
  ActionLink,
  ArrowRightIcon,
  ArrowUpRightIcon,
  SectionIntro,
} from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import { ShotFigure } from "@/features/work/shared/ShotFigure";
import * as styles from "./styles";

type CaseStudyHeroSectionProps = {
  study: CaseStudy;
};

export function CaseStudyHeroSection({ study }: CaseStudyHeroSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="case-study-title">
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <Link href={caseStudyPageCopy.backHref} className={styles.backLink}>
          <ArrowRightIcon aria-hidden="true" className={styles.backIcon} />
          {caseStudyPageCopy.backLabel}
        </Link>

        <div className={styles.layout}>
          <ScrollReveal className={styles.copyColumn}>
            <SectionIntro
              eyebrow={caseStudyPageCopy.heroEyebrow}
              title={<span id="case-study-title">{study.title}</span>}
              description={study.summary}
              titleAs="h1"
              className={styles.intro}
              eyebrowClassName={styles.eyebrow}
              titleClassName={styles.title}
              descriptionClassName={styles.description}
            />

            <dl className={styles.metaList}>
              {study.meta.map((item) => (
                <div key={item.label} className={styles.metaItem}>
                  <dt className={styles.metaLabel}>{item.label}</dt>
                  <dd className={styles.metaValue}>{item.value}</dd>
                </div>
              ))}
            </dl>

            {study.links.length > 0 ? (
              <div className={styles.linkRow}>
                {study.links.map((link, index) => (
                  <ActionLink
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant={index === 0 ? "brand" : "outline"}
                    icon={<ArrowUpRightIcon className={styles.linkIcon} />}
                  >
                    {link.label}
                    <span className="sr-only"> {caseStudyPageCopy.externalLinkHint}</span>
                  </ActionLink>
                ))}
              </div>
            ) : null}
          </ScrollReveal>

          <ScrollReveal delayMs={120} className={styles.coverColumn}>
            <ShotFigure
              shot={study.cover}
              priority
              showCaption={false}
              sizes="(min-width: 1024px) 640px, 100vw"
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
