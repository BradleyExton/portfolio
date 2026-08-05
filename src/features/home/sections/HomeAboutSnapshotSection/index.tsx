"use client";

import Image from "next/image";
import { homeCopy } from "@/copy/home";
import { ActionLink, ArrowRightIcon, CheckCircleIcon, SectionIntro, cn } from "@/features/shared/designSystem";
import { IsoIllustration } from "./IsoIllustration";
import type { WhatIDoCapability } from "./types";
import {
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
            <div className={styles.introRow}>
              <div className={styles.portraitColumn}>
                <span className={styles.portraitRing} aria-hidden="true" />
                <div className={styles.portraitFrame}>
                  <Image
                    src="/images/headshot.png"
                    alt={homeCopy.aboutSnapshot.portraitAlt}
                    width={800}
                    height={800}
                    sizes="(min-width: 640px) 7rem, 6rem"
                    className={styles.portraitImage}
                  />
                </div>
                <span className={styles.portraitNode} aria-hidden="true" />
              </div>

              <div className={styles.introText}>
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
            </div>
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
                            <p aria-hidden="true" className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</p>
                            <h3 className={styles.cardTitle}>{capability.title}</h3>
                          </header>

                          <p className={styles.cardOutcome}>{capability.outcome}</p>

                          <ul className={styles.proofList} aria-label={`${capability.title} proof points`}>
                            {capability.proofPoints.map((proofPoint) => (
                              <li key={`${capability.id}-${proofPoint}`} className={styles.proofItem}>
                                <CheckCircleIcon className={styles.proofIcon} />
                                <span>{proofPoint}</span>
                              </li>
                            ))}
                          </ul>

                          <ul className={styles.chipList} aria-label={`${capability.title} technologies`}>
                            {capability.techChips.map((chip) => (
                              <li key={`${capability.id}-${chip}`} className={styles.chip}>{chip}</li>
                            ))}
                          </ul>
                        </div>

                        {showIllustrations ? (
                          // Only render the panel when illustrations are shown; below xl the
                          // empty aspect-ratio box would reserve dead space inside each card.
                          <div
                            className={cn(
                              styles.illustrationPanel,
                              index % 2 === 1 && styles.illustrationPanelDesktopSwap,
                            )}
                            aria-hidden="true"
                          >
                            <IsoIllustration capabilityId={capability.id} />
                          </div>
                        ) : null}
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
