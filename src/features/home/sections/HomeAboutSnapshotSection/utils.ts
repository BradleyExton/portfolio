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

// One class per seat on the capability ring. Length must stay in step with
// --ring-count in globals.css, or the last words overlap the first.
const RING_SLOT_CLASSES = [
  "[--slot:0]",
  "[--slot:1]",
  "[--slot:2]",
  "[--slot:3]",
  "[--slot:4]",
  "[--slot:5]",
  "[--slot:6]",
  "[--slot:7]",
  "[--slot:8]",
  "[--slot:9]",
  "[--slot:10]",
  "[--slot:11]",
  "[--slot:12]",
  "[--slot:13]",
  "[--slot:14]",
  "[--slot:15]",
  "[--slot:16]",
  "[--slot:17]",
  "[--slot:18]",
  "[--slot:19]",
  "[--slot:20]",
] as const;

export const RING_SLOT_COUNT = RING_SLOT_CLASSES.length;

type CapabilityCardRect = {
  id: CapabilityId;
  top: number;
  bottom: number;
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

export const getRingSlotClass = (index: number): string => {
  const slotClass = RING_SLOT_CLASSES[index];
  if (slotClass) {
    return slotClass;
  }

  if (process.env.NODE_ENV !== "production") {
    // Guardrail if the ticker copy grows past the seats defined on the ring.
    console.warn(`[HomeAboutSnapshotSection] Missing ring slot class for index: ${index}`);
  }

  return "[--slot:0]";
};

export const getCapabilityIllustrationSrc = (id: CapabilityId): string => {
  return `/images/what-i-do/${id}.svg`;
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
