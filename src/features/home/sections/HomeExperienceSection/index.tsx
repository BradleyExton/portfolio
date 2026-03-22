"use client";

import { homeCopy } from "@/copy/home";
import { profile } from "@/copy/profile";
import { ActionLink, ArrowUpRightIcon, SectionIntro } from "@/features/shared/designSystem";
import { ExperienceTimelineItem } from "./components/ExperienceTimelineItem";
import type { ExperienceTimelineItem as ExperienceTimelineItemType } from "./types";
import { useTimelineMetrics } from "./useTimelineMetrics";
import * as styles from "./styles";

const experienceItems = homeCopy.experience.items satisfies readonly ExperienceTimelineItemType[];
const currentRoleIndex = experienceItems.findIndex((item) => item.current);

export function HomeExperienceSection() {
  const {
    activeIndex,
    reduceMotion,
    sectionRef,
    listRef,
    pathSvgRef,
    pathTrackRef,
    pathFillRef,
  } = useTimelineMetrics({ currentRoleIndex });

  return (
    <section id="experience" ref={sectionRef} className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <SectionIntro
          eyebrow={homeCopy.experience.eyebrow}
          title={homeCopy.experience.heading}
          eyebrowClassName={styles.eyebrow}
          titleClassName={styles.subheading}
        />

        <div className={styles.timelineWrapper}>
          <svg
            ref={pathSvgRef}
            aria-hidden="true"
            className={styles.pathSvg}
            preserveAspectRatio="none"
          >
            <path ref={pathTrackRef} className={styles.pathTrack} />
            <path ref={pathFillRef} className={styles.pathFill} />
          </svg>

          <ol ref={listRef} className={styles.timelineList} aria-label="Career timeline">
            {experienceItems.map((job, index) => (
              <ExperienceTimelineItem
                key={job.company}
                job={job}
                isActive={index === activeIndex}
                reduceMotion={reduceMotion}
              />
            ))}
          </ol>
        </div>

        <div className={styles.ctaRow}>
          <ActionLink
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            variant="inline"
            size="text"
            className={styles.link}
            icon={<ArrowUpRightIcon className={styles.icon} />}
          >
            {homeCopy.experience.cta}
          </ActionLink>
        </div>
      </div>
    </section>
  );
}
