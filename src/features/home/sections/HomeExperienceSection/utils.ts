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

export const getActiveIndex = (
  itemCenters: readonly number[],
  anchorY: number,
): number => {
  if (itemCenters.length === 0) {
    return 0;
  }

  let closestIndex = 0;
  let closestDistance = Math.abs(itemCenters[0] - anchorY);

  itemCenters.forEach((center, index) => {
    const distance = Math.abs(center - anchorY);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  });

  return closestIndex;
};

export const getStableActiveIndex = ({
  itemCenters,
  anchorY,
  previousIndex,
  hysteresisPx = 20,
}: {
  itemCenters: readonly number[];
  anchorY: number;
  previousIndex: number;
  hysteresisPx?: number;
}): number => {
  if (itemCenters.length === 0) {
    return 0;
  }

  let nextIndex = Math.max(0, Math.min(previousIndex, itemCenters.length - 1));

  while (nextIndex < itemCenters.length - 1) {
    const downBoundary = (
      (itemCenters[nextIndex] + itemCenters[nextIndex + 1]) / 2
    ) + hysteresisPx;
    if (anchorY < downBoundary) {
      break;
    }
    nextIndex += 1;
  }

  while (nextIndex > 0) {
    const upBoundary = (
      (itemCenters[nextIndex - 1] + itemCenters[nextIndex]) / 2
    ) - hysteresisPx;
    if (anchorY > upBoundary) {
      break;
    }
    nextIndex -= 1;
  }

  return nextIndex;
};
