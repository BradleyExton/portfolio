import { homeCopy } from "@/copy/home";
import { SectionIntro } from "@/features/shared/designSystem";
import { IsoIllustration } from "./IsoIllustration";
import type { HowIWorkStage } from "./types";
import { getStageMarker, isFinalStage, isStageReversed } from "./utils";
import * as styles from "./styles";

const howIWorkStages = homeCopy.howIWork.stages satisfies readonly HowIWorkStage[];
const stageCount = howIWorkStages.length;

export function HomeHowIWorkSection() {
  return (
    <section id="how-i-work" className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <SectionIntro
          align="center"
          tone="inverse"
          eyebrow={homeCopy.howIWork.eyebrow}
          title={homeCopy.howIWork.heading}
          description={homeCopy.howIWork.description}
          descriptionClassName={styles.description}
        />

        <ol className={styles.stageList} aria-label="How I work stages">
          {howIWorkStages.map((stage, index) => {
            const isFinal = isFinalStage(index, stageCount);
            const reversed = isStageReversed(index);

            return (
              <li key={stage.id} className={styles.stageRow}>
                <div className={reversed ? styles.mediaColReversed : styles.mediaCol}>
                  <IsoIllustration stageId={stage.id} />
                </div>

                <div aria-hidden="true" className={styles.spineCol}>
                  <span className={index === 0 ? styles.railEnd : styles.rail} />
                  <span className={isFinal ? styles.nodeFinal : styles.node}>
                    {getStageMarker(index, stageCount)}
                  </span>
                  <span className={isFinal ? styles.railEnd : styles.rail} />
                </div>

                <div className={reversed ? styles.textColReversed : styles.textCol}>
                  <p className={isFinal ? styles.stationLabelFinal : styles.stationLabel}>
                    {stage.station}
                  </p>
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
              </li>
            );
          })}
        </ol>

        <p className={styles.closing}>{homeCopy.howIWork.closing}</p>
      </div>
    </section>
  );
}
