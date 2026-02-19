import type { CapabilityId } from "./types";

const STACKED_CARD_INDEX_CLASSES = [
  "[--index:1]",
  "[--index:2]",
  "[--index:3]",
  "[--index:4]",
] as const;

const STACKED_CARD_COUNT_CLASSES = [
  "[--numcards:1]",
  "[--numcards:2]",
  "[--numcards:3]",
  "[--numcards:4]",
  "[--numcards:5]",
  "[--numcards:6]",
  "[--numcards:7]",
  "[--numcards:8]",
] as const;

type CapabilityCardRect = {
  id: CapabilityId;
  top: number;
  bottom: number;
};

export const joinClassNames = (...classes: Array<string | false | undefined>): string => {
  return classes.filter(Boolean).join(" ");
};

export const getStackedCardIndexClass = (index: number): string => {
  const indexClass = STACKED_CARD_INDEX_CLASSES[index];
  if (indexClass) {
    return indexClass;
  }

  if (process.env.NODE_ENV !== "production") {
    // Guardrail to make maintenance issues obvious if card count grows past the current stack config.
    console.warn(`[HomeAboutSnapshotSection] Missing stacked index class for card index: ${index}`);
  }

  return "[--index:1]";
};

export const getStackedCardCountClass = (count: number): string => {
  const countClass = STACKED_CARD_COUNT_CLASSES[count - 1];
  if (countClass) {
    return countClass;
  }

  if (process.env.NODE_ENV !== "production") {
    // Guardrail for future content growth beyond the current class map.
    console.warn(`[HomeAboutSnapshotSection] Missing stacked card count class for count: ${count}`);
  }

  return "[--numcards:4]";
};

export const getCapabilityIllustrationSrc = (id: CapabilityId): string => {
  return `/images/what-i-do/${id}.png`;
};

export const resolveActiveCapabilityId = ({
  capabilityIds,
  cardRects,
  anchorY,
}: {
  capabilityIds: readonly CapabilityId[];
  cardRects: readonly CapabilityCardRect[];
  anchorY: number;
}): CapabilityId => {
  const fallback = capabilityIds[0] ?? "delivery";

  const activeByAnchor = [...cardRects]
    .reverse()
    .find((cardRect) => cardRect.top <= anchorY && cardRect.bottom > anchorY);
  if (activeByAnchor) {
    return activeByAnchor.id;
  }

  const firstVisible = cardRects.find((cardRect) => cardRect.bottom > 0);
  if (firstVisible) {
    return firstVisible.id;
  }

  return fallback;
};
