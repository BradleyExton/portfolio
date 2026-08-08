"use client";

import { useRef } from "react";
import { homeCopy } from "@/copy/home";
import { cn } from "@/features/shared/designSystem";
import type { ExperienceTimelineItem as ExperienceTimelineItemType } from "../../types";
import { CompanyMark } from "../CompanyMark";
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
  const entryRef = useRef<HTMLElement | null>(null);

  const handleSpotlightMove = (event: React.PointerEvent<HTMLElement>) => {
    const entryNode = entryRef.current;
    if (!entryNode || reduceMotion) {
      return;
    }

    const entryRect = entryNode.getBoundingClientRect();
    entryNode.style.setProperty("--spot-x", `${event.clientX - entryRect.left}px`);
    entryNode.style.setProperty("--spot-y", `${event.clientY - entryRect.top}px`);
  };

  return (
    <li className={cn(styles.timelineItem, styles.itemReveal)} aria-current={isActive ? "step" : undefined}>
      <ExperienceMilestone isActive={isActive} reduceMotion={reduceMotion} />
      <span
        aria-hidden="true"
        className={cn(styles.milestoneLead, job.current && styles.milestoneLeadCurrent)}
      />

      <article
        ref={entryRef}
        data-timeline-entry="true"
        data-active={isActive ? "true" : "false"}
        onPointerMove={handleSpotlightMove}
        className={cn(
          styles.entry,
          styles.entrySpotlight,
          job.current && styles.entryCurrent,
          isActive && styles.entryLifted,
        )}
      >
        <span aria-hidden="true" className={styles.wireRing} />
        {job.current ? (
          <span aria-hidden="true" className={styles.signalPulseClip}>
            <span className={styles.signalPulse} />
          </span>
        ) : (
          <span aria-hidden="true" className={styles.shimmerClip}>
            <span className={styles.shimmerBeam} />
          </span>
        )}

        <header className={styles.entryHeader}>
          <span
            aria-hidden="true"
            className={job.current ? styles.logoPlateCurrent : styles.logoPlate}
          >
            <CompanyMark company={job.company} inverse={job.current} />
          </span>
          <div className={styles.roleHeader}>
            <h3 className={job.current ? styles.companyCurrent : styles.company}>{job.company}</h3>
            {job.current ? (
              <span className={styles.badge}>{homeCopy.experience.currentLabel}</span>
            ) : null}
          </div>
          <p className={job.current ? styles.textCurrent : styles.text}>{job.role}</p>
          <p className={job.current ? styles.timelineCurrent : styles.timeline}>{job.period}</p>
        </header>

        <p className={job.current ? styles.roleDescriptionCurrent : styles.roleDescription}>
          {job.description}
        </p>

        <ExperienceHighlights
          company={job.company}
          highlights={job.highlights}
          inverse={job.current}
        />

        <ul
          className={job.current ? styles.chipListCurrent : styles.chipList}
          aria-label={`${job.company} technologies`}
        >
          {job.techChips.map((chip) => (
            <li key={`${job.company}-${chip}`} className={job.current ? styles.chipCurrent : styles.chip}>
              {chip}
            </li>
          ))}
        </ul>
      </article>
    </li>
  );
}
