import type { CaseStudy } from "@/copy/caseStudies";
import { caseStudyPageCopy } from "@/copy/caseStudies";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

type CaseStudyProblemSectionProps = {
  problem: CaseStudy["problem"];
};

export function CaseStudyProblemSection({ problem }: CaseStudyProblemSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal className={styles.story}>
          <SectionIntro
            eyebrow={caseStudyPageCopy.problemEyebrow}
            title={problem.heading}
            className={styles.intro}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.title}
          />
          <div className={styles.body}>
            {problem.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
          <aside className={styles.panel} aria-labelledby="case-study-constraints">
            <h3 id="case-study-constraints" className={styles.panelLabel}>
              {caseStudyPageCopy.constraintsLabel}
            </h3>
            <ul className={styles.list}>
              {problem.constraints.map((item) => (
                <li key={item} className={styles.listItem}>
                  <span aria-hidden="true" className={styles.marker} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </aside>
        </ScrollReveal>
      </div>
    </section>
  );
}
