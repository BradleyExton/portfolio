"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeCopy } from "@/copy/home";
import * as styles from "./styles";
import {
  applyHeroParallaxTransforms,
  clearHeroParallaxTransforms,
  getHeroParallaxCenteredProgress,
  shouldEnableHeroParallax,
} from "./utils";

type HomeHeroSectionProps = {
  isVisible: boolean;
};

export function HomeHeroSection({ isVisible }: HomeHeroSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundLayerRef = useRef<HTMLDivElement | null>(null);
  const topOrbLayerRef = useRef<HTMLDivElement | null>(null);
  const bottomOrbLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;
    let isParallaxEnabled = false;

    const getLayerRefs = () => {
      return {
        backgroundLayer: backgroundLayerRef.current,
        topOrbLayer: topOrbLayerRef.current,
        bottomOrbLayer: bottomOrbLayerRef.current,
      };
    };

    const updateParallax = () => {
      frameId = 0;

      const section = sectionRef.current;
      if (!section || !isParallaxEnabled) {
        return;
      }

      const centeredProgress = getHeroParallaxCenteredProgress(
        section.getBoundingClientRect(),
        window.innerHeight,
      );

      applyHeroParallaxTransforms(getLayerRefs(), centeredProgress);
    };

    const queueParallaxUpdate = () => {
      if (frameId !== 0) {
        return;
      }

      frameId = window.requestAnimationFrame(updateParallax);
    };

    const refreshParallaxMode = () => {
      const nextMode = shouldEnableHeroParallax(
        window.innerWidth,
        motionQuery.matches,
      );

      if (nextMode !== isParallaxEnabled) {
        isParallaxEnabled = nextMode;
        if (!isParallaxEnabled) {
          clearHeroParallaxTransforms(getLayerRefs());
        }
      }

      queueParallaxUpdate();
    };

    const handleScroll = () => {
      queueParallaxUpdate();
    };

    const handleResize = () => {
      refreshParallaxMode();
    };

    const handleMotionPreferenceChange = () => {
      refreshParallaxMode();
    };

    refreshParallaxMode();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    motionQuery.addEventListener("change", handleMotionPreferenceChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      motionQuery.removeEventListener("change", handleMotionPreferenceChange);

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      clearHeroParallaxTransforms(getLayerRefs());
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={backgroundLayerRef} className={styles.parallaxLayer}>
        <div className={styles.backgroundImageOverlay}>
          <Image
            src="/images/hero.png"
            alt=""
            fill
            priority
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.overlay} />
      <div ref={topOrbLayerRef} className={styles.parallaxLayer}>
        <div className={styles.accentOrbTopRight} />
      </div>
      <div ref={bottomOrbLayerRef} className={styles.parallaxLayer}>
        <div className={styles.accentOrbBottomLeft} />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div
            className={
              isVisible
                ? `${styles.textColumn} ${styles.visibleState}`
                : `${styles.textColumn} ${styles.hiddenState}`
            }
          >
            <div className={styles.row}>
              <span className={styles.badge} />
              {homeCopy.hero.badge}
            </div>

            <h1 className={styles.title}>
              {homeCopy.hero.heading.prefix}{" "}
              <span className={styles.labelText}>
                {homeCopy.hero.heading.highlight}
              </span>{" "}
              {homeCopy.hero.heading.suffix}
            </h1>

            <p className={styles.description}>
              {homeCopy.hero.description}
            </p>

            <div className={styles.ctaRow}>
              <Link
                href="#experience"
                className={styles.ctaLink}
              >
                {homeCopy.hero.ctaPrimary}
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
              <Link
                href="#contact"
                className={styles.link}
              >
                {homeCopy.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>

        <div
          className={
            isVisible
              ? `${styles.techPillsRow} ${styles.visibleState}`
              : `${styles.techPillsRow} ${styles.hiddenState}`
          }
        >
          {homeCopy.techStackPills.map((tech) => (
            <span
              key={tech}
              className={styles.techPill}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
