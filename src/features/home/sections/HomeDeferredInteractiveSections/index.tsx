"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { homeCopy } from "@/copy/home";
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

    if (typeof window.IntersectionObserver === "undefined") {
      const timerId = window.setTimeout(() => setShouldRenderAbout(true), 0);
      return () => window.clearTimeout(timerId);
    }

    const node = aboutAnchorRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRenderAbout(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_ROOT_MARGIN, threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRenderAbout]);

  useEffect(() => {
    if (shouldRenderExperience) {
      return;
    }

    if (typeof window.IntersectionObserver === "undefined") {
      const timerId = window.setTimeout(() => setShouldRenderExperience(true), 0);
      return () => window.clearTimeout(timerId);
    }

    const node = experienceAnchorRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldRenderExperience(true);
          observer.disconnect();
        }
      },
      { rootMargin: PRELOAD_ROOT_MARGIN, threshold: 0.2 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [shouldRenderExperience]);

  return (
    <>
      {shouldRenderAbout ? (
        <HomeAboutSnapshotSection />
      ) : (
        <section id="about" ref={aboutAnchorRef} className={styles.placeholderAboutSection}>
          <div className={styles.placeholderContainer}>
            <p className={styles.placeholderEyebrow}>{homeCopy.aboutSnapshot.eyebrow}</p>
            <h2 className={styles.placeholderHeading}>{homeCopy.aboutSnapshot.heading}</h2>
            <p className={styles.placeholderText}>{homeCopy.aboutSnapshot.description}</p>
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
            <p className={styles.placeholderEyebrow}>{homeCopy.experience.eyebrow}</p>
            <h2 className={styles.placeholderHeading}>{homeCopy.experience.heading}</h2>
            <div aria-hidden="true" className={styles.placeholderTimeline} />
          </div>
        </section>
      )}
    </>
  );
}
