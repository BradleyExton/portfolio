"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { homeCopy } from "@/copy/home";
import { SectionIntro } from "@/features/shared/designSystem";
import { useDeferredSectionVisibility } from "@/features/home/shared/useDeferredSectionVisibility";
import * as styles from "./styles";

const HomeAboutSnapshotSection = dynamic(
  () =>
    import("@/features/home/sections/HomeAboutSnapshotSection").then(
      (module) => module.HomeAboutSnapshotSection,
    ),
  { ssr: false },
);

const HomeExperienceSection = dynamic(
  () =>
    import("@/features/home/sections/HomeExperienceSection").then(
      (module) => module.HomeExperienceSection,
    ),
  { ssr: false },
);

export function HomeDeferredInteractiveSections() {
  const aboutAnchorRef = useRef<HTMLElement | null>(null);
  const experienceAnchorRef = useRef<HTMLElement | null>(null);
  const shouldRenderAbout = useDeferredSectionVisibility({
    targetRef: aboutAnchorRef,
    fallbackDelayMs: 2200,
  });
  const shouldRenderExperience = useDeferredSectionVisibility({
    targetRef: experienceAnchorRef,
    fallbackDelayMs: 2600,
  });

  return (
    <>
      {shouldRenderAbout ? (
        <HomeAboutSnapshotSection />
      ) : (
        <section id="about" ref={aboutAnchorRef} className={styles.placeholderAboutSection}>
          <div className={styles.placeholderContainer}>
            <SectionIntro
              eyebrow={homeCopy.aboutSnapshot.eyebrow}
              title={homeCopy.aboutSnapshot.heading}
              description={homeCopy.aboutSnapshot.description}
              eyebrowClassName={styles.placeholderEyebrow}
              titleClassName={styles.placeholderHeading}
              descriptionClassName={styles.placeholderText}
            />
            <div aria-hidden="true" className={styles.placeholderCard} />
          </div>
        </section>
      )}

      {shouldRenderExperience ? (
        <HomeExperienceSection />
      ) : (
        <section
          id="experience"
          ref={experienceAnchorRef}
          className={styles.placeholderExperienceSection}
        >
          <div className={styles.placeholderContainer}>
            <SectionIntro
              eyebrow={homeCopy.experience.eyebrow}
              title={homeCopy.experience.heading}
              eyebrowClassName={styles.placeholderEyebrow}
              titleClassName={styles.placeholderHeading}
            />
            <div
              aria-hidden="true"
              data-placeholder-timeline="true"
              className={styles.placeholderTimeline}
            />
          </div>
        </section>
      )}
    </>
  );
}
