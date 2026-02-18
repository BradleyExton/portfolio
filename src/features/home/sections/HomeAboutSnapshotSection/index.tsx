import Link from "next/link";
import { homeCopy } from "@/copy/home";
import { ScrollReveal } from "@/features/shared/motion/ScrollReveal";
import type { WhatIDoAiTool, WhatIDoCapability } from "./types";
import {
  getCapabilityCardVariant,
  getToolLevelBadgeVariant,
  getToolLevelLabel,
  joinClassNames,
} from "./utils";
import * as styles from "./styles";

const whatIDoCapabilities = homeCopy.whatIDoCapabilities satisfies readonly WhatIDoCapability[];
const aiToolbelt = homeCopy.aiToolbelt satisfies readonly WhatIDoAiTool[];
const capabilityRevealDelays = [120, 180, 220, 320] as const;

export function HomeAboutSnapshotSection() {
  return (
    <section id="about" className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <div className={styles.grid}>
          <ScrollReveal className={styles.intro}>
            <div>
              <p className={styles.eyebrow}>
                {homeCopy.aboutSnapshot.eyebrow}
              </p>
              <h2 className={styles.subheading}>
                {homeCopy.aboutSnapshot.heading}
              </h2>
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
          </ScrollReveal>

          <ul className={styles.capabilityList} aria-label="What I do capabilities">
            {whatIDoCapabilities.map((capability, index) => (
              <li key={capability.title} className={styles.capabilityItem}>
                <ScrollReveal delayMs={capabilityRevealDelays[index] ?? 320}>
                  <article
                    className={joinClassNames(
                      styles.card,
                      getCapabilityCardVariant(capability.emphasis),
                    )}
                  >
                    <header className={styles.cardHeader}>
                      <h3 className={styles.cardTitle}>{capability.title}</h3>
                      {capability.emphasis === "ai" && (
                        <span className={styles.emphasisBadge}>
                          {homeCopy.aboutSnapshot.aiFocusLabel}
                        </span>
                      )}
                    </header>

                    <p className={styles.cardOutcome}>{capability.outcome}</p>

                    <ul className={styles.proofList} aria-label={`${capability.title} proof points`}>
                      {capability.proofPoints.map((proofPoint) => (
                        <li key={`${capability.title}-${proofPoint}`} className={styles.proofItem}>
                          {proofPoint}
                        </li>
                      ))}
                    </ul>

                    <ul className={styles.chipList} aria-label={`${capability.title} technologies`}>
                      {capability.techChips.map((chip) => (
                        <li key={`${capability.title}-${chip}`} className={styles.chip}>
                          {chip}
                        </li>
                      ))}
                    </ul>
                  </article>
                </ScrollReveal>
              </li>
            ))}
          </ul>
        </div>

        <ScrollReveal delayMs={220}>
          <div className={styles.toolbelt}>
            <p className={styles.toolbeltTitle}>
              {homeCopy.aboutSnapshot.aiToolbeltHeading}
            </p>
            <ul className={styles.toolbeltList} aria-label="AI toolbelt">
              {aiToolbelt.map((tool) => (
                <li key={tool.name} className={styles.toolItem}>
                  <div className={styles.toolHeader}>
                    <p className={styles.toolName}>{tool.name}</p>
                    <span
                      className={joinClassNames(
                        styles.toolLevelBadge,
                        getToolLevelBadgeVariant(tool.level),
                      )}
                    >
                      {getToolLevelLabel(tool.level)}
                    </span>
                  </div>
                  <p className={styles.toolUsage}>{tool.usage}</p>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
