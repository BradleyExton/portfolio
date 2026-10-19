import type { CaseStudy } from "@/copy/caseStudies";
import { caseStudyPageCopy } from "@/copy/caseStudies";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { describeConnections } from "./utils";
import * as styles from "./styles";

type CaseStudyArchitectureSectionProps = {
  architecture: CaseStudy["architecture"];
};

export function CaseStudyArchitectureSection({ architecture }: CaseStudyArchitectureSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={caseStudyPageCopy.architectureEyebrow}
            title={architecture.heading}
            description={architecture.description}
            className={styles.intro}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.title}
            descriptionClassName={styles.description}
          />
        </ScrollReveal>

        <ScrollReveal delayMs={120}>
          <figure className={styles.figure}>
            <ArchitectureDiagram
              diagram={architecture.diagram}
              variant="wide"
              className={styles.diagramWide}
            />
            <ArchitectureDiagram
              diagram={architecture.diagram}
              variant="narrow"
              className={styles.diagramNarrow}
            />
            <ul aria-hidden="true" className={styles.connections}>
              {describeConnections(architecture.diagram).map((connection) => (
                <li key={connection.key} className={styles.connection}>
                  <span className={styles.connectionRoute}>{connection.route}</span>
                  {connection.label ? (
                    <span className={styles.connectionLabel}>{connection.label}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </figure>
        </ScrollReveal>

        <ul className={styles.notes}>
          {architecture.notes.map((note) => (
            <li key={note} className={styles.note}>
              {note}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
