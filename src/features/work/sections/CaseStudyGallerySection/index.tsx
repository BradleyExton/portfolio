import type { CaseStudyShot } from "@/copy/caseStudies";
import { caseStudyPageCopy } from "@/copy/caseStudies";
import { SectionIntro, cn } from "@/features/shared/designSystem";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import { ShotFigure } from "@/features/work/shared/ShotFigure";
import { splitShots } from "./utils";
import * as styles from "./styles";

type CaseStudyGallerySectionProps = {
  shots: readonly CaseStudyShot[];
};

export function CaseStudyGallerySection({ shots }: CaseStudyGallerySectionProps) {
  const { screens, phones, leadSpansRow } = splitShots(shots);

  return (
    <section className={styles.section} aria-labelledby="case-study-gallery" data-case-study-gallery="">
      <div className={styles.container}>
        <ScrollReveal>
          <SectionIntro
            eyebrow={caseStudyPageCopy.galleryEyebrow}
            title={<span id="case-study-gallery">{caseStudyPageCopy.galleryHeading}</span>}
            description={caseStudyPageCopy.galleryDescription}
            className={styles.intro}
            eyebrowClassName={styles.eyebrow}
            titleClassName={styles.title}
            descriptionClassName={styles.description}
          />
        </ScrollReveal>

        {screens.length > 0 ? (
          <div className={styles.screenGrid}>
            {screens.map((shot, index) => (
              <ScrollReveal
                key={shot.src}
                delayMs={index % 2 === 0 ? 0 : 120}
                className={cn(index === 0 && leadSpansRow ? styles.leadScreen : undefined)}
              >
                <ShotFigure
                  shot={shot}
                  sizes={
                    index === 0 && leadSpansRow
                      ? "(min-width: 1152px) 1104px, 100vw"
                      : "(min-width: 768px) 540px, 100vw"
                  }
                />
              </ScrollReveal>
            ))}
          </div>
        ) : null}

        {phones.length > 0 ? (
          <div className={styles.phoneRow}>
            {phones.map((shot, index) => (
              <ScrollReveal
                key={shot.src}
                delayMs={index === 0 ? 0 : index === 1 ? 120 : 220}
                className={styles.phoneItem}
              >
                <ShotFigure shot={shot} sizes="240px" />
              </ScrollReveal>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
