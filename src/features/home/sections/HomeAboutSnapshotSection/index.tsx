import Link from "next/link";
import { homeCopy } from "@/copy/home";
import * as styles from "./styles";

export function HomeAboutSnapshotSection() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div>
            <h2 className={styles.eyebrow}>
              {homeCopy.aboutSnapshot.eyebrow}
            </h2>
            <h3 className={styles.subheading}>
              {homeCopy.aboutSnapshot.heading}
            </h3>
            <p className={styles.description}>
              {homeCopy.aboutSnapshot.description}
            </p>
            <Link
              href="/about"
              className={styles.link}
            >
              {homeCopy.aboutSnapshot.cta}
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
          </div>

          <div className={styles.statsGrid}>
            {homeCopy.skillAreas.map((area) => (
              <div
                key={area.label}
                className={styles.card}
              >
                <h4 className={styles.cardTitle}>{area.label}</h4>
                <p className={styles.text}>{area.skills}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
