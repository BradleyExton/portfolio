import type { CaseStudy } from "@/copy/caseStudies";
import { caseStudyPageCopy } from "@/copy/caseStudies";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

type CaseStudyDecisionsSectionProps = {
  decisions: CaseStudy["decisions"];
};

export function CaseStudyDecisionsSection({ decisions }: CaseStudyDecisionsSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={caseStudyPageCopy.decisionsEyebrow}
            title={decisions.heading}
            className={styles.intro}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.title}
          />
        </ScrollReveal>

        <ol className={styles.list}>
          {decisions.items.map((decision, index) => (
            <li key={decision.title} className={styles.row}>
              <span aria-hidden="true" className={styles.index}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.rowBody}>
                <h3 className={styles.rowTitle}>{decision.title}</h3>
                <dl className={styles.pair}>
                  <div>
                    <dt className={styles.pairLabel}>{caseStudyPageCopy.choiceLabel}</dt>
                    <dd className={styles.pairValue}>{decision.choice}</dd>
                  </div>
                  <div>
                    <dt className={styles.pairLabel}>{caseStudyPageCopy.tradeoffLabel}</dt>
                    <dd className={styles.pairValue}>{decision.tradeoff}</dd>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
