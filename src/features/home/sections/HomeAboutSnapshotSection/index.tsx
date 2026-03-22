"use client";

import Image from "next/image";
import { homeCopy } from "@/copy/home";
import { ActionLink, ArrowRightIcon, SectionIntro, cn } from "@/features/shared/designSystem";
import type { WhatIDoCapability } from "./types";
import {
  getCapabilityIllustrationSrc,
  getStackedCardCountClass,
  getStackedCardIndexClass,
} from "./utils";
import { useActiveCapabilityId } from "./useActiveCapabilityId";
import * as styles from "./styles";

const whatIDoCapabilities = homeCopy.whatIDoCapabilities satisfies readonly WhatIDoCapability[];
const capabilityIds = whatIDoCapabilities.map((capability) => capability.id);

export function HomeAboutSnapshotSection() {
  const { activeCapabilityId, reduceMotion, showIllustrations, listRef, setCardRef } = useActiveCapabilityId({
    capabilityIds,
  });

  return (
    <section id="about" className={styles.section}>
      <div aria-hidden="true" className={styles.ambientBackdrop} />
      <div className={styles.container}>
        <div className={styles.layoutFlow}>
          <div className={styles.intro}>
            <SectionIntro
              eyebrow={homeCopy.aboutSnapshot.eyebrow}
              title={homeCopy.aboutSnapshot.heading}
              description={homeCopy.aboutSnapshot.description}
              eyebrowClassName={styles.eyebrow}
              titleClassName={styles.subheading}
              descriptionClassName={styles.description}
            />
            <ActionLink
              href="/about"
              variant="inline"
              size="text"
              className={styles.link}
              icon={<ArrowRightIcon className={styles.icon} />}
            >
              {homeCopy.aboutSnapshot.cta}
            </ActionLink>
          </div>

          <div>
            <ol
              ref={listRef}
              className={cn(
                styles.stackedCardList,
                getStackedCardCountClass(whatIDoCapabilities.length),
              )}
              aria-label="What I do capabilities"
              data-reduced-motion={reduceMotion ? "true" : "false"}
            >
              {whatIDoCapabilities.map((capability, index) => (
                // Alternate illustration side on desktop for visual rhythm while preserving mobile order.
                <li
                  key={capability.id}
                  className={cn(styles.stackedCardItem, getStackedCardIndexClass(index))}
                  data-active={capability.id === activeCapabilityId ? "true" : "false"}
                >
                  <article className={styles.stackedCard}>
                    <div
                      ref={(cardNode) => setCardRef(capability.id, cardNode)}
                      className={styles.cardSurface}
                      data-active={capability.id === activeCapabilityId ? "true" : "false"}
                    >
                      <div className={styles.cardLayout}>
                        <div
                          className={cn(
                            styles.cardContentColumn,
                            index % 2 === 1 && styles.cardContentColumnDesktopSwap,
                          )}
                        >
                          <header className={styles.cardHeader}>
                            <div className={styles.cardHeadingGroup}>
                              <p className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</p>
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
                          className={cn(
                            styles.illustrationPanel,
                            index % 2 === 1 && styles.illustrationPanelDesktopSwap,
                          )}
                          aria-hidden="true"
                        >
                          {showIllustrations ? (
                            <Image
                              src={getCapabilityIllustrationSrc(capability.id)}
                              alt=""
                              fill
                              sizes="(min-width: 1536px) 34vw, 38vw"
                              loading="lazy"
                              fetchPriority="low"
                              className={styles.illustrationImage}
                            />
                          ) : null}
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
