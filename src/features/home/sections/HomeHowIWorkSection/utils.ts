export const formatStageIndex = (index: number): string =>
  String(index + 1).padStart(2, "0");

export const isFinalStage = (index: number, total: number): boolean =>
  total > 0 && index === total - 1;

// The last station reads as the pipeline's output rather than another step, so
// its marker is a check instead of a number. Markers are decorative; the stage
// name carries the meaning for assistive tech.
export const getStageMarker = (index: number, total: number): string =>
  isFinalStage(index, total) ? "✓" : formatStageIndex(index);

// Odd rows swap the illustration to the other side of the spine so the track
// zigzags down the page.
export const isStageReversed = (index: number): boolean => index % 2 === 1;
