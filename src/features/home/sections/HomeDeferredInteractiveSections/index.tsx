"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { homeCopy } from "@/copy/home";
import { SectionIntro } from "@/features/shared/designSystem";
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

const PRELOAD_ROOT_MARGIN = "0px";

export function HomeDeferredInteractiveSections() {
  const aboutAnchorRef = useRef<HTMLElement | null>(null);
  const experienceAnchorRef = useRef<HTMLElement | null>(null);
  const [shouldRenderAbout, setShouldRenderAbout] = useState(false);
  const [shouldRenderExperience, setShouldRenderExperience] = useState(false);

  useEffect(() => {
    if (shouldRenderAbout) {
      return;
    }

    const fallbackTimerId = window.setTimeout(() => {
      setShouldRenderAbout(true);
    }, 2200);

    if (typeof window.IntersectionObserver === "undefined") {
      const timerId = window.setTimeout(() => setShouldRenderAbout(true), 0);
      return () => {
        window.clearTimeout(fallbackTimerId);
        window.clearTimeout(timerId);
      };
    }

    const node = aboutAnchorRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          window.clearTimeout(fallbackTimerId);
          setShouldRenderAbout(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_ROOT_MARGIN, threshold: 0.2 },
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(fallbackTimerId);
      observer.disconnect();
    };
  }, [shouldRenderAbout]);

  useEffect(() => {
    if (shouldRenderExperience) {
      return;
    }

    const fallbackTimerId = window.setTimeout(() => {
      setShouldRenderExperience(true);
    }, 2600);

    if (typeof window.IntersectionObserver === "undefined") {
      const timerId = window.setTimeout(() => setShouldRenderExperience(true), 0);
      return () => {
        window.clearTimeout(fallbackTimerId);
        window.clearTimeout(timerId);
      };
    }

    const node = experienceAnchorRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          window.clearTimeout(fallbackTimerId);
          setShouldRenderExperience(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_ROOT_MARGIN, threshold: 0.2 },
    );

    observer.observe(node);
    return () => {
      window.clearTimeout(fallbackTimerId);
      observer.disconnect();
    };
  }, [shouldRenderExperience]);

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
