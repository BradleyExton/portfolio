"use client";

import Image from "next/image";
import Link from "next/link";
import { homeCopy } from "@/copy/home";
import type { WhatIDoCapability } from "./types";
import {
  getCapabilityAccentClass,
  getCapabilityIllustrationSrc,
  getStackedCardIndexClass,
  joinClassNames,
} from "./utils";
import { useActiveCapabilityId } from "./useActiveCapabilityId";
import * as styles from "./styles";

const whatIDoCapabilities = homeCopy.whatIDoCapabilities satisfies readonly WhatIDoCapability[];
const capabilityIds = whatIDoCapabilities.map((capability) => capability.id);

export function HomeAboutSnapshotSection() {
  const { activeCapabilityId, reduceMotion, listRef, setCardRef } = useActiveCapabilityId({
    capabilityIds,
  });

  return (
    <section id="about" className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <div className={styles.layoutFlow}>
          <div className={styles.intro}>
            <div>
              <p className={styles.eyebrow}>{homeCopy.aboutSnapshot.eyebrow}</p>
              <h2 className={styles.subheading}>{homeCopy.aboutSnapshot.heading}</h2>
              <p className={styles.description}>{homeCopy.aboutSnapshot.description}</p>
              <Link href="/about" className={styles.link}>
                {homeCopy.aboutSnapshot.cta}
                <svg className={styles.icon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <ol
              ref={listRef}
              className={styles.stackedCardList}
              aria-label="What I do capabilities"
              data-reduced-motion={reduceMotion ? "true" : "false"}
            >
              {whatIDoCapabilities.map((capability, index) => (
                // Alternate illustration side on desktop for visual rhythm while preserving mobile order.
                <li
                  key={capability.id}
                  ref={(cardNode) => setCardRef(capability.id, cardNode)}
                  className={joinClassNames(styles.stackedCardItem, getStackedCardIndexClass(index))}
                  data-active={capability.id === activeCapabilityId ? "true" : "false"}
                >
                  <article className={styles.stackedCard}>
                    <div
                      className={joinClassNames(
                        styles.cardSurface,
                        getCapabilityAccentClass(capability.id),
                        !reduceMotion && styles.cardSurfaceActiveScale,
                      )}
                      data-active={capability.id === activeCapabilityId ? "true" : "false"}
                    >
                      <div className={styles.cardLayout}>
                        <div
                          className={joinClassNames(
                            styles.cardContentColumn,
                            index % 2 === 1 && styles.cardContentColumnDesktopSwap,
                          )}
                        >
                          <header className={styles.cardHeader}>
                            <div className={styles.cardHeadingGroup}>
                              <p className={styles.cardIndex}>{`0${index + 1}`}</p>
                              <div className={styles.cardTitleRow}>
                                <h3 className={styles.cardTitle}>{capability.title}</h3>
                                {capability.emphasis === "ai" && (
                                  <span className={styles.emphasisBadge}>
                                    {homeCopy.aboutSnapshot.aiFocusLabel}
                                  </span>
                                )}
                              </div>
                            </div>
                          </header>

                          <p className={styles.cardOutcome}>{capability.outcome}</p>

                          <ul className={styles.proofList} aria-label={`${capability.title} proof points`}>
                            {capability.proofPoints.map((proofPoint) => (
                              <li key={`${capability.id}-${proofPoint}`} className={styles.proofItem}>{proofPoint}</li>
                            ))}
                          </ul>

                          <ul className={styles.chipList} aria-label={`${capability.title} technologies`}>
                            {capability.techChips.map((chip) => (
                              <li key={`${capability.id}-${chip}`} className={styles.chip}>{chip}</li>
                            ))}
                          </ul>
                        </div>

                        <div
                          className={joinClassNames(
                            styles.illustrationPanel,
                            index % 2 === 1 && styles.illustrationPanelDesktopSwap,
                          )}
                          aria-hidden="true"
                        >
                          <Image
                            src={getCapabilityIllustrationSrc(capability.id)}
                            alt=""
                            fill
                            sizes="(min-width: 1536px) 34vw, (min-width: 1280px) 38vw, 100vw"
                            className={styles.illustrationImage}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
