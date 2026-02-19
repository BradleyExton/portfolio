"use client";

import { useMemo } from "react";
import { homeCopy } from "@/copy/home";
import { profile } from "@/copy/profile";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import type { ExperienceTimelineItem } from "./types";
import { useTimelineMetrics } from "./useTimelineMetrics";
import * as styles from "./styles";

const experienceItems = homeCopy.experience.items satisfies readonly ExperienceTimelineItem[];

const getClassName = (...classNames: Array<string | false>): string => {
  return classNames.filter(Boolean).join(" ");
};

export function HomeExperienceSection() {
  const currentRoleIndex = useMemo(() => {
    return experienceItems.findIndex((item) => item.current);
  }, []);
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
        <ScrollReveal>
          <p className={styles.eyebrow}>
            {homeCopy.experience.eyebrow}
          </p>
          <h2 className={styles.subheading}>
            {homeCopy.experience.heading}
          </h2>
        </ScrollReveal>

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
            {experienceItems.map((job, index) => {
              const isActive = index === activeIndex;

              return (
                <li
                  key={job.company}
                  className={styles.timelineItem}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    aria-hidden="true"
                    data-timeline-milestone="true"
                    className={getClassName(
                      styles.milestoneNode,
                      isActive && styles.milestoneNodeActive,
                      job.current && styles.milestoneNodePulsing,
                      reduceMotion && styles.milestoneNodeReducedMotion,
                    )}
                  >
                    <span aria-hidden="true" className={styles.milestoneCore} />
                  </span>

                  <ScrollReveal className={styles.itemReveal} delayMs={120 + index * 90}>
                    <article
                      data-timeline-entry="true"
                      className={getClassName(
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
                          {job.current && (
                            <span className={styles.badge}>
                              {homeCopy.experience.currentLabel}
                            </span>
                          )}
                        </div>
                        <p className={styles.text}>{job.role}</p>
                      </header>

                      <p className={styles.roleDescription}>{job.description}</p>

                      <ul className={styles.highlightsList} aria-label={`${job.company} highlights`}>
                        {job.highlights.map((highlight) => (
                          <li key={`${job.company}-${highlight}`} className={styles.highlightItem}>
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      <ul className={styles.chipList} aria-label={`${job.company} technologies`}>
                        {job.techChips.map((chip) => (
                          <li key={`${job.company}-${chip}`} className={styles.chip}>
                            {chip}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </ScrollReveal>
                </li>
              );
            })}
          </ol>
        </div>

        <ScrollReveal delayMs={180}>
          <div className={styles.ctaRow}>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {homeCopy.experience.cta}
              <svg
                className={styles.icon}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
