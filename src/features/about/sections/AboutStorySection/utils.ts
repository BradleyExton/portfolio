import * as styles from "./styles";

/** Index of the "the way I build changed" paragraph that gets callout emphasis. */
const PIVOT_PARAGRAPH_INDEX = 2;

export function getStoryParagraphClass(index: number): string {
  if (index === 0) {
    return styles.paragraphLead;
  }
  if (index === PIVOT_PARAGRAPH_INDEX) {
    return styles.paragraphPivot;
  }
  return styles.paragraph;
}
