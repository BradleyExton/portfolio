"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeCopy } from "@/copy/home";
import { ArrowRightIcon } from "@/features/shared/designSystem";
import { HeroToolchainPills } from "./HeroToolchainPills";
import * as styles from "./styles";

const steamWispClasses = [
  styles.steamWispOne,
  styles.steamWispTwo,
  styles.steamWispThree,
  styles.steamWispFour,
  styles.steamWispFive,
  styles.steamWispSix,
  styles.steamWispSeven,
];

export function HomeHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundLayerRef = useRef<HTMLDivElement | null>(null);
  const steamLayerRef = useRef<HTMLDivElement | null>(null);
  const steamClusterRef = useRef<HTMLDivElement | null>(null);
  const topOrbLayerRef = useRef<HTMLDivElement | null>(null);
  const bottomOrbLayerRef = useRef<HTMLDivElement | null>(null);
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const pillsLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let teardown: () => void = () => {};
    let isDisposed = false;

    const activateParallax = async () => {
      const { setupHeroParallaxController } = await import("./utils");
      if (isDisposed) {
        return;
      }

      teardown = setupHeroParallaxController({
        sectionRef,
        backgroundLayerRef,
        steamLayerRef,
        steamClusterRef,
        topOrbLayerRef,
        bottomOrbLayerRef,
        contentLayerRef,
        pillsLayerRef,
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      const idleId = window.requestIdleCallback(() => {
        void activateParallax();
      }, { timeout: 1200 });
      return () => {
        isDisposed = true;
        window.cancelIdleCallback(idleId);
        teardown();
      };
    }

    const timerId = window.setTimeout(() => {
      void activateParallax();
    }, 180);
    return () => {
      isDisposed = true;
      window.clearTimeout(timerId);
      teardown();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-parallax-section="hero">
      <div
        ref={backgroundLayerRef}
        className={styles.parallaxLayer}
        data-parallax-layer="background"
      >
        <div className={styles.backgroundImageViewport}>
          <div className={styles.backgroundImageOverlay}>
            <Image
              src="/images/hero-v2.png"
              alt=""
              fill
              priority
              fetchPriority="high"
              sizes="100vw"
              quality={70}
              className={styles.image}
            />
          </div>
        </div>
      </div>
      <div className={styles.overlay} />
      <div ref={steamLayerRef} className={styles.steamLayer} aria-hidden="true">
        <div className={styles.steamViewport}>
          <div ref={steamClusterRef} className={styles.steamCluster}>
            <div className={styles.steamBaseGlow} />
            {steamWispClasses.map((steamClassName) => (
              <span
                key={steamClassName}
                className={`${styles.steamWisp} ${steamClassName}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div
        ref={topOrbLayerRef}
        className={styles.parallaxLayer}
        data-parallax-layer="top-orb"
      >
        <div className={styles.accentOrbTopRight} />
      </div>
      <div
        ref={bottomOrbLayerRef}
        className={styles.parallaxLayer}
        data-parallax-layer="bottom-orb"
      >
        <div className={styles.accentOrbBottomLeft} />
      </div>

      <div className={styles.container}>
        <div className={styles.grid}>
          <div
            ref={contentLayerRef}
            className={`${styles.textColumn} ${styles.visibleState}`}
          >
            <h1 className={styles.title}>
              {homeCopy.hero.heading.prefix && `${homeCopy.hero.heading.prefix} `}
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
                href="#how-i-work"
                className={styles.ctaLink}
              >
                {homeCopy.hero.ctaPrimary}
                <ArrowRightIcon className={styles.icon} />
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
          ref={pillsLayerRef}
          className={`${styles.techPillsRow} ${styles.visibleState}`}
        >
          <HeroToolchainPills />
        </div>
      </div>
    </section>
  );
}
