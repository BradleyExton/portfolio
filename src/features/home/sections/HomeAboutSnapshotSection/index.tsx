"use client";

import Image from "next/image";
import { homeCopy } from "@/copy/home";
import { ActionLink, ArrowRightIcon, CheckCircleIcon, cn } from "@/features/shared/designSystem";
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
    <section id="about" className={styles.shell}>
      <div className={styles.introBand}>
        <div aria-hidden="true" className={styles.introGlow} />
        <div className={styles.introContainer}>
          <div>
            <p className={styles.eyebrow}>{homeCopy.aboutSnapshot.eyebrow}</p>
            <h2 className={styles.subheading}>{homeCopy.aboutSnapshot.heading}</h2>
            <p className={styles.description}>{homeCopy.aboutSnapshot.description}</p>
            <div className={styles.ctaRow}>
              <ActionLink
                href="/about"
                variant="surface"
                size="md"
                icon={<ArrowRightIcon className={styles.icon} />}
              >
                {homeCopy.aboutSnapshot.cta}
              </ActionLink>
            </div>
          </div>

          <div className={styles.portraitColumn}>
            <span className={styles.portraitRing} aria-hidden="true" />
            <span className={styles.portraitArc} aria-hidden="true" />
            <div className={styles.portraitFrame}>
              <Image
                src="/images/headshot.png"
                alt={homeCopy.aboutSnapshot.portraitAlt}
                width={800}
                height={800}
                sizes="(min-width: 640px) 13rem, 10rem"
                className={styles.portraitImage}
              />
            </div>
          </div>
        </div>

        <div className={styles.ticker} aria-hidden="true">
          <div className={styles.tickerFrame}>
            <div className={styles.tickerViewport}>
              <div className={styles.tickerTrack}>
                {[0, 1].map((half) => (
                  <div key={half} className={styles.tickerGroup}>
                    {homeCopy.aboutSnapshot.tickerItems.map((item) => (
                      <span key={`${half}-${item}`} className={styles.tickerItem}>
                        {item}
                        <span className={styles.tickerStar}>✦</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardsRegion}>
        <div aria-hidden="true" className={styles.ambientBackdrop} />
        <div className={styles.container}>
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
