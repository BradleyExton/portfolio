import Image from "next/image";
import { homeCopy } from "@/copy/home";
import { SectionIntro, cn } from "@/features/shared/designSystem";
import type { HowIWorkStage } from "./types";
import { formatStageIndex, getStageIllustrationSrc } from "./utils";
import * as styles from "./styles";

const howIWorkStages = homeCopy.howIWork.stages satisfies readonly HowIWorkStage[];

export function HomeHowIWorkSection() {
  return (
    <section id="how-i-work" className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <SectionIntro
          eyebrow={homeCopy.howIWork.eyebrow}
          title={homeCopy.howIWork.heading}
          description={homeCopy.howIWork.description}
          eyebrowClassName={styles.eyebrow}
          titleClassName={styles.heading}
          descriptionClassName={styles.description}
        />

        <ol className={styles.stageList} aria-label="How I work stages">
          {howIWorkStages.map((stage, index) => (
            // Alternate illustration side on desktop for visual rhythm while preserving mobile order.
            <li key={stage.id} className={styles.stageItem}>
              <div aria-hidden="true" className={styles.stageMarkerColumn}>
                <p className={styles.stageIndex}>{formatStageIndex(index)}</p>
                {index < howIWorkStages.length - 1 ? (
                  <span className={styles.stageRail} />
                ) : null}
              </div>

              <article className={styles.stageCard}>
                <div className={styles.stageLayout}>
                  <div
                    className={cn(
                      styles.stageContent,
                      index % 2 === 1 && styles.stageContentDesktopSwap,
                    )}
                  >
                    <h3 className={styles.stageName}>{stage.name}</h3>
                    <p className={styles.stageBody}>{stage.body}</p>
                    <ul className={styles.chipList} aria-label={`${stage.name} artifacts`}>
                      {stage.chips.map((chip) => (
                        <li key={`${stage.id}-${chip}`} className={styles.chip}>
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={cn(
                      styles.illustrationPanel,
                      index % 2 === 1 && styles.illustrationPanelDesktopSwap,
                    )}
                    aria-hidden="true"
                  >
                    <Image
                      src={getStageIllustrationSrc(stage.id)}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 40vw, 90vw"
                      loading="lazy"
                      fetchPriority="low"
                      className={styles.illustrationImage}
                    />
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <p className={styles.closing}>{homeCopy.howIWork.closing}</p>
      </div>
    </section>
  );
}
