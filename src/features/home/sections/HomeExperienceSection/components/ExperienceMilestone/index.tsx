import { cn } from "@/features/shared/designSystem";
import * as styles from "./styles";

type ExperienceMilestoneProps = {
  isActive: boolean;
  reduceMotion: boolean;
};

export function ExperienceMilestone({ isActive, reduceMotion }: ExperienceMilestoneProps) {
  return (
    <span
      aria-hidden="true"
      data-timeline-milestone="true"
      className={cn(
        styles.milestoneNode,
        isActive && styles.milestoneNodeActive,
        isActive && styles.milestoneNodePulsing,
        reduceMotion && styles.milestoneNodeReducedMotion,
      )}
    >
      <span aria-hidden="true" className={styles.milestoneCore} />
    </span>
  );
}
