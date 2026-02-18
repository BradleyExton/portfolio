import Image from "next/image";
import Link from "next/link";
import { homeCopy } from "@/copy/home";
import * as styles from "./styles";

type HomeHeroSectionProps = {
  isVisible: boolean;
};

export function HomeHeroSection({ isVisible }: HomeHeroSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.overlay} />
      <div className={styles.accentOrbTopRight} />
      <div className={styles.accentOrbBottomLeft} />

      <div className={styles.backgroundImageOverlay}>
        <Image
          src="/images/hero-background.png"
          alt=""
          fill
          className={styles.image}
        />
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
                    d="M19 9l-7 7-7-7"
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

          <div
            className={
              isVisible
                ? `${styles.imageColumn} ${styles.imageVisibleState}`
                : `${styles.imageColumn} ${styles.imageHiddenState}`
            }
          >
            <div className={styles.wrapper}>
              <div className={styles.card}>
                <Image
                  src="/images/cartoon-me.png"
                  alt="Bradley Exton"
                  fill
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                  className={styles.portraitImage}
                  priority
                />
              </div>

              <div className={styles.experienceBadge}>
                <p className={styles.text}>{homeCopy.hero.yearsExperience}</p>
                <p className={styles.experienceLabel}>
                  {homeCopy.hero.yearsExperienceLabel}
                </p>
              </div>
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
