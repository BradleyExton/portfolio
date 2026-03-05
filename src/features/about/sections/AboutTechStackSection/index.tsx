import { aboutCopy } from "@/copy/about";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutTechStackSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={aboutCopy.techStack.eyebrow}
            title={aboutCopy.techStack.heading}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.subheading}
          />
        </ScrollReveal>

        <div className={styles.grid}>
          {Object.entries(aboutCopy.techStack.categories).map(([category, tools], index) => (
            <ScrollReveal
              key={category}
              className={styles.card}
              delayMs={120 + index * 90}
            >
              <h4 className={styles.cardTitle}>{category}</h4>
              <ul className={styles.chipList}>
                {tools.split(",").map((tool) => (
                  <li key={`${category}-${tool}`} className={styles.chip}>
                    {tool.trim()}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
