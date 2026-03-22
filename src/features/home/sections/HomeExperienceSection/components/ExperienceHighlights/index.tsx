import { ChevronDownIcon } from "@/features/shared/designSystem";
import * as styles from "./styles";

type ExperienceHighlightsProps = {
  company: string;
  highlights: readonly string[];
};

export function ExperienceHighlights({
  company,
  highlights,
}: ExperienceHighlightsProps) {
  const alwaysVisibleHighlights = highlights.slice(0, 2);
  const additionalHighlights = highlights.slice(2);
  const hasAdditionalHighlights = additionalHighlights.length > 0;

  return (
    <>
      <ul className={styles.highlightsListMobile} aria-label={`${company} highlights`}>
        {alwaysVisibleHighlights.map((highlight) => (
          <li key={`${company}-${highlight}`} className={styles.highlightItem}>
            {highlight}
          </li>
        ))}
      </ul>

      {hasAdditionalHighlights ? (
        <details className={styles.highlightsDetails}>
          <summary className={styles.highlightsSummary}>
            <span className={styles.highlightsSummaryLabel}>
              <span className="closed-label">More highlights</span>
              <span className="open-label">Less highlights</span>
            </span>
            <ChevronDownIcon className={styles.highlightsSummaryIcon} />
          </summary>
          <div className={styles.highlightsExpansion}>
            <div className={styles.highlightsExpansionInner}>
              <ul
                className={styles.highlightsListExpanded}
                aria-label={`${company} more highlights`}
              >
                {additionalHighlights.map((highlight) => (
                  <li key={`${company}-${highlight}`} className={styles.highlightItem}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      ) : null}

      <ul className={styles.highlightsListDesktop} aria-label={`${company} highlights`}>
        {highlights.map((highlight) => (
          <li key={`${company}-desktop-${highlight}`} className={styles.highlightItem}>
            {highlight}
          </li>
        ))}
      </ul>
    </>
  );
}
