import { homeCopy } from "@/copy/home";
import { profile } from "@/copy/profile";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import * as styles from "./styles";

export function HomeExperienceSection() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <ScrollReveal>
          <p className={styles.eyebrow}>
            {homeCopy.experience.eyebrow}
          </p>
          <h2 className={styles.subheading}>
            {homeCopy.experience.heading}
          </h2>
        </ScrollReveal>

        <div className={styles.block}>
          {homeCopy.experience.items.map((job, index) => (
            <ScrollReveal
              key={job.company}
              className={styles.card}
              delayMs={120 + index * 90}
            >
              <div className={styles.row}>
                <div className={styles.roleContent}>
                  <div className={styles.roleHeader}>
                    <h4 className={styles.cardTitle}>{job.company}</h4>
                    {job.current && (
                      <span className={styles.badge}>
                        {homeCopy.experience.currentLabel}
                      </span>
                    )}
                  </div>
                  <p className={styles.text}>{job.role}</p>
                  <p className={styles.roleDescription}>{job.description}</p>
                </div>
                <div className={styles.timeline}>
                  {job.period}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delayMs={180}>
          <div className={styles.ctaRow}>
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {homeCopy.experience.cta}
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
