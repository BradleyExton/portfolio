import type { CaseStudy } from "@/copy/caseStudies";
import { caseStudyPageCopy } from "@/copy/caseStudies";
import { CheckCircleIcon, SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

type CaseStudyVerificationSectionProps = {
  verification: CaseStudy["verification"];
};

export function CaseStudyVerificationSection({ verification }: CaseStudyVerificationSectionProps) {
  return (
    <section className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={caseStudyPageCopy.verificationEyebrow}
            title={verification.heading}
            description={verification.description}
            className={styles.intro}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.title}
            descriptionClassName={styles.description}
          />
        </ScrollReveal>

        <dl className={styles.stats}>
          {verification.stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <dt className={styles.statLabel}>{stat.label}</dt>
              <dd className={styles.statValue}>{stat.value}</dd>
            </div>
          ))}
        </dl>

        <ul className={styles.checks}>
          {verification.checks.map((check) => (
            <li key={check} className={styles.check}>
              <CheckCircleIcon className={styles.checkIcon} />
              <span>{check}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
