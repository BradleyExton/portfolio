import { aboutCopy } from "@/copy/about";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";
import { splitTechCategories, splitTools } from "./utils";

export function AboutTechStackSection() {
  const { coreEntries, featureEntry } = splitTechCategories(
    aboutCopy.techStack.categories,
  );

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
          {coreEntries.map(([category, tools], index) => (
            <ScrollReveal
              key={category}
              className={styles.card}
              delayMs={120 + index * 90}
            >
              <h3 className={styles.cardTitle}>{category}</h3>
              <ul className={styles.chipList}>
                {splitTools(tools).map((tool) => (
                  <li key={`${category}-${tool}`} className={styles.chip}>
                    {tool}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}

          {featureEntry ? (
            <ScrollReveal
              className={styles.featureCard}
              delayMs={120 + coreEntries.length * 90}
            >
              <h3 className={styles.featureTitle}>{featureEntry[0]}</h3>
              <p className={styles.featureNote}>{aboutCopy.techStack.aiNote}</p>
              <ul className={styles.chipList}>
                {splitTools(featureEntry[1]).map((tool) => (
                  <li
                    key={`${featureEntry[0]}-${tool}`}
                    className={styles.featureChip}
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}
