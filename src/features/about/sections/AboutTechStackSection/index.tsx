import { aboutCopy } from "@/copy/about";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function AboutTechStackSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <p className={styles.eyebrow}>
            {aboutCopy.techStack.eyebrow}
          </p>
          <h2 className={styles.subheading}>
            {aboutCopy.techStack.heading}
          </h2>
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
