"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { homeCopy } from "@/copy/home";
import { SectionIntro } from "@/features/shared/designSystem";
import { useDeferredSectionVisibility } from "@/features/home/shared/useDeferredSectionVisibility";
import * as styles from "./styles";

const HomeHowIWorkSection = dynamic(
  () =>
    import("@/features/home/sections/HomeHowIWorkSection").then(
      (module) => module.HomeHowIWorkSection,
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
  const howIWorkAnchorRef = useRef<HTMLElement | null>(null);
  const experienceAnchorRef = useRef<HTMLElement | null>(null);
  const shouldRenderHowIWork = useDeferredSectionVisibility({
    targetRef: howIWorkAnchorRef,
    fallbackDelayMs: 2400,
  });
  const shouldRenderExperience = useDeferredSectionVisibility({
    targetRef: experienceAnchorRef,
    fallbackDelayMs: 2600,
  });

  return (
    <>
      {shouldRenderHowIWork ? (
        <HomeHowIWorkSection />
      ) : (
        <section
          id="how-i-work"
          ref={howIWorkAnchorRef}
          className={styles.placeholderHowIWorkSection}
        >
          <div className={styles.placeholderContainer}>
            <SectionIntro
              align="center"
              tone="inverse"
              eyebrow={homeCopy.howIWork.eyebrow}
              title={homeCopy.howIWork.heading}
              description={homeCopy.howIWork.description}
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
