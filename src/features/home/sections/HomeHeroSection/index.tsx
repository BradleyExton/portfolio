"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { homeCopy } from "@/copy/home";
import { ArrowRightIcon } from "@/features/shared/designSystem";
import * as styles from "./styles";

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

  if (tech === "Python") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.techIcon}>
        <path
          fill="currentColor"
          d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.867s-.109-3.42 3.35-3.42h5.766s3.24.052 3.24-3.148V3.202S18.28 0 11.913 0zM8.708 1.85c.578 0 1.046.47 1.046 1.052 0 .581-.468 1.051-1.046 1.051-.579 0-1.046-.47-1.046-1.051 0-.582.467-1.052 1.046-1.052z"
        />
        <path
          fill="currentColor"
          d="M12.087 24c6.092 0 5.712-2.656 5.712-2.656l-.007-2.752h-5.814v-.826h8.123s3.9.445 3.9-5.735c0-6.18-3.404-5.96-3.404-5.96h-2.03v2.867s.109 3.42-3.35 3.42H9.451s-3.24-.052-3.24 3.148v5.292S5.72 24 12.087 24zm3.206-1.85c-.579 0-1.046-.47-1.046-1.052 0-.581.467-1.051 1.046-1.051.578 0 1.046.47 1.046 1.051 0 .582-.468 1.052-1.046 1.052z"
        />
      </svg>
    );
  }

  if (tech === "Tailwind CSS") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.techIcon}>
        <path
          fill="currentColor"
          d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C15.61 7.17 14.48 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98.98 2.11 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.31-.74-1.91-1.35C10.61 13.17 9.48 12 7 12z"
        />
      </svg>
    );
  }

  return null;
}

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
