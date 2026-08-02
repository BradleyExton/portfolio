type TimelineProgressInput = {
  anchorY: number;
  startY: number;
  endY: number;
};

export const clamp01 = (value: number): number => {
  return Math.max(0, Math.min(1, value));
};

export const getViewportAnchorY = (
  viewportHeight: number,
  anchorRatio = 0.45,
): number => {
  if (viewportHeight <= 0) {
    return 0;
  }

  return viewportHeight * clamp01(anchorRatio);
};

// Watermark label for past-role cards, e.g. "Dec 2021 - Feb 2023" -> "'21".
export const getStartYearShort = (period: string): string | null => {
  const yearMatch = period.match(/\b\d{4}\b/);

  if (!yearMatch) {
    return null;
  }

  return yearMatch[0].slice(2);
};

export const computeTimelineProgress = ({
  anchorY,
  startY,
  endY,
}: TimelineProgressInput): number => {
  const span = endY - startY;

  if (span <= 0) {
    return anchorY >= endY ? 1 : 0;
  }

  return clamp01((anchorY - startY) / span);
};
