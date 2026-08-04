import { aboutCopy } from "@/copy/about";
import { SectionIntro } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";
import { getStoryParagraphClass } from "./utils";

export function AboutStorySection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={aboutCopy.story.eyebrow}
            title={aboutCopy.story.heading}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.heading}
          />
        </ScrollReveal>
        <div className={styles.block}>
          {aboutCopy.story.paragraphs.map((paragraph, index) => (
            <ScrollReveal key={paragraph} delayMs={90 + index * 70}>
              <p className={getStoryParagraphClass(index)}>{paragraph}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
