import type { CapabilityId } from "./types";

const STACKED_CARD_INDEX_CLASSES = [
  "[--index:1]",
  "[--index:2]",
  "[--index:3]",
  "[--index:4]",
] as const;

const CAPABILITY_ACCENT_CLASSES: Record<CapabilityId, string> = {
  delivery: "[--cap-accent:var(--color-primary-500)] [--cap-border:var(--color-primary-200)] [--cap-wash:var(--color-primary-50)]",
  frontend: "[--cap-accent:var(--color-info)] [--cap-border:var(--color-info-200)] [--cap-wash:var(--color-info-50)]",
  platform: "[--cap-accent:var(--color-neutral-700)] [--cap-border:var(--color-neutral-300)] [--cap-wash:var(--color-neutral-100)]",
  ai: "[--cap-accent:var(--color-accent-500)] [--cap-border:var(--color-accent-200)] [--cap-wash:var(--color-accent-50)]",
};

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

export const getCapabilityIllustrationSrc = (id: CapabilityId): string => {
  return `/images/what-i-do/${id}.png`;
};

export const getCapabilityAccentClass = (id: CapabilityId): string => {
  return CAPABILITY_ACCENT_CLASSES[id];
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
