"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeCopy } from "@/copy/home";
import * as styles from "./styles";
import { setupHeroParallaxController } from "./utils";

type HeroTechPill = (typeof homeCopy.techStackPills)[number];
const steamWispClasses = [
  styles.steamWispOne,
  styles.steamWispTwo,
  styles.steamWispThree,
  styles.steamWispFour,
  styles.steamWispFive,
  styles.steamWispSix,
  styles.steamWispSeven,
];

function TechPillIcon({ tech }: { tech: HeroTechPill }) {
  if (tech === "React") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.techIcon}>
        <circle cx="12" cy="12" r="1.75" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="10" ry="4.25" transform="rotate(60 12 12)" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="10" ry="4.25" transform="rotate(120 12 12)" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    );
  }

  if (tech === "Next.js") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.techIcon}>
        <circle cx="12" cy="12" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7.75 15.5V8.5L16.25 15.5V8.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      </svg>
    );
  }

  if (tech === "TypeScript") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.techIcon}>
        <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <text x="12" y="15.4" fill="currentColor" fontSize="8.5" fontWeight="800" textAnchor="middle">TS</text>
      </svg>
    );
  }

  if (tech === "Node.js") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.techIcon}>
        <path d="M12 2.5L20 7V17L12 21.5L4 17V7L12 2.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <text x="12" y="15.35" fill="currentColor" fontSize="8.5" fontWeight="800" textAnchor="middle">N</text>
      </svg>
    );
  }

  return null;
}

export function HomeHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const backgroundLayerRef = useRef<HTMLDivElement | null>(null);
  const steamLayerRef = useRef<HTMLDivElement | null>(null);
  const topOrbLayerRef = useRef<HTMLDivElement | null>(null);
  const bottomOrbLayerRef = useRef<HTMLDivElement | null>(null);
  const contentLayerRef = useRef<HTMLDivElement | null>(null);
  const pillsLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    return setupHeroParallaxController({
      sectionRef,
      backgroundLayerRef,
      steamLayerRef,
      topOrbLayerRef,
      bottomOrbLayerRef,
      contentLayerRef,
      pillsLayerRef,
    });
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
              className={styles.image}
            />
          </div>
        </div>
      </div>
      <div className={styles.overlay} />
      <div ref={steamLayerRef} className={styles.steamLayer} aria-hidden="true">
        <div className={styles.steamCluster}>
          <div className={styles.steamBaseGlow} />
          {steamWispClasses.map((steamClassName) => (
            <span
              key={steamClassName}
              className={`${styles.steamWisp} ${steamClassName}`}
            />
          ))}
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
          ref={pillsLayerRef}
          className={`${styles.techPillsRow} ${styles.visibleState}`}
        >
          {homeCopy.techStackPills.map((tech) => (
            <span
              key={tech}
              className={styles.techPill}
            >
              <TechPillIcon tech={tech} />
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
