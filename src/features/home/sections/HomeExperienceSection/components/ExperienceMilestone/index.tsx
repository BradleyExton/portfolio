import { cn } from "@/features/shared/designSystem";
import type { ExperienceTimelineItem } from "../../types";
import * as styles from "./styles";

type ExperienceMilestoneProps = {
  job: ExperienceTimelineItem;
  isActive: boolean;
  reduceMotion: boolean;
};

export function ExperienceMilestone({
  job,
  isActive,
  reduceMotion,
}: ExperienceMilestoneProps) {
  return (
    <span
      aria-hidden="true"
      data-timeline-milestone="true"
      className={cn(
        styles.milestoneNode,
        isActive && styles.milestoneNodeActive,
        job.current && styles.milestoneNodePulsing,
        reduceMotion && styles.milestoneNodeReducedMotion,
      )}
    >
      <span aria-hidden="true" className={styles.milestoneCore} />
    </span>
  );
}
