import { Link } from "next-view-transitions";
import type { CaseStudy } from "@/copy/caseStudies";
import { caseStudyPageCopy } from "@/copy/caseStudies";
import { ArrowRightIcon, ArrowUpRightIcon, SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

type CaseStudyOutcomeSectionProps = {
  outcome: CaseStudy["outcome"];
  links: CaseStudy["links"];
  next: CaseStudy;
};

export function CaseStudyOutcomeSection({ outcome, links, next }: CaseStudyOutcomeSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.story}>
          <SectionIntro
            eyebrow={caseStudyPageCopy.outcomeEyebrow}
            title={outcome.heading}
            className={styles.intro}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.title}
          />
          <div className={styles.body}>
            {outcome.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {links.length > 0 ? (
            <ul className={styles.linkList}>
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {link.label}
                    <span className="sr-only"> {caseStudyPageCopy.externalLinkHint}</span>
                    <ArrowUpRightIcon aria-hidden="true" className={styles.linkIcon} />
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
          <Link href={`/work/${next.slug}`} className={styles.nextCard}>
            <span className={styles.nextLabel}>{caseStudyPageCopy.nextLabel}</span>
            <span className={styles.nextTitle}>
              {next.title}
              <ArrowRightIcon aria-hidden="true" className={styles.nextIcon} />
            </span>
            <span className={styles.nextSummary}>{next.summary}</span>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
