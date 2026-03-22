import { homeCopy } from "@/copy/home";
import { cn } from "@/features/shared/designSystem";
import type { ExperienceTimelineItem as ExperienceTimelineItemType } from "../../types";
import { ExperienceHighlights } from "../ExperienceHighlights";
import { ExperienceMilestone } from "../ExperienceMilestone";
import * as styles from "./styles";

type ExperienceTimelineItemProps = {
  job: ExperienceTimelineItemType;
  isActive: boolean;
  reduceMotion: boolean;
};

export function ExperienceTimelineItem({
  job,
  isActive,
  reduceMotion,
}: ExperienceTimelineItemProps) {
  return (
    <li className={cn(styles.timelineItem, styles.itemReveal)} aria-current={isActive ? "step" : undefined}>
      <ExperienceMilestone job={job} isActive={isActive} reduceMotion={reduceMotion} />

      <article
        data-timeline-entry="true"
        className={cn(
          styles.entry,
          isActive && styles.entryBorderActive,
          isActive && styles.entryActive,
        )}
      >
        <header className={styles.entryHeader}>
          <p className={styles.metaRow}>
            <span aria-hidden="true" className={styles.monogram}>
              {job.monogram}
            </span>
            <span className={styles.timeline}>{job.period}</span>
          </p>
          <div className={styles.roleHeader}>
            <h3 className={styles.company}>{job.company}</h3>
            {job.current ? (
              <span className={styles.badge}>{homeCopy.experience.currentLabel}</span>
            ) : null}
          </div>
          <p className={styles.text}>{job.role}</p>
        </header>

        <p className={styles.roleDescription}>{job.description}</p>

        <ExperienceHighlights company={job.company} highlights={job.highlights} />

        <ul className={styles.chipList} aria-label={`${job.company} technologies`}>
          {job.techChips.map((chip) => (
            <li key={`${job.company}-${chip}`} className={styles.chip}>
              {chip}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
