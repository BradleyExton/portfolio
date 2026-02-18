const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

type HeroParallaxLayerRefs = {
  backgroundLayer: HTMLDivElement | null;
  topOrbLayer: HTMLDivElement | null;
  bottomOrbLayer: HTMLDivElement | null;
};

export const shouldEnableHeroParallax = (
  viewportWidth: number,
  prefersReducedMotion: boolean,
): boolean => {
  return viewportWidth >= 768 && !prefersReducedMotion;
};

export const getHeroParallaxCenteredProgress = (
  sectionRect: DOMRect,
  viewportHeight: number,
): number => {
  const start = viewportHeight;
  const end = -sectionRect.height;
  const rawProgress = (start - sectionRect.top) / (start - end);
  const clampedProgress = clamp(rawProgress, 0, 1);

  return clampedProgress * 2 - 1;
};

export const applyHeroParallaxTransforms = (
  refs: HeroParallaxLayerRefs,
  centeredProgress: number,
): void => {
  const backgroundOffsetY = Math.round(centeredProgress * 20);
  const topOrbOffsetX = Math.round(centeredProgress * -12);
  const topOrbOffsetY = Math.round(centeredProgress * -24);
  const bottomOrbOffsetX = Math.round(centeredProgress * 10);
  const bottomOrbOffsetY = Math.round(centeredProgress * 18);

  if (refs.backgroundLayer) {
    refs.backgroundLayer.style.transform = `translate3d(0, ${backgroundOffsetY}px, 0)`;
  }

  if (refs.topOrbLayer) {
    refs.topOrbLayer.style.transform = `translate3d(${topOrbOffsetX}px, ${topOrbOffsetY}px, 0)`;
  }

  if (refs.bottomOrbLayer) {
    refs.bottomOrbLayer.style.transform = `translate3d(${bottomOrbOffsetX}px, ${bottomOrbOffsetY}px, 0)`;
  }
};

export const clearHeroParallaxTransforms = (
  refs: HeroParallaxLayerRefs,
): void => {
  if (refs.backgroundLayer) {
    refs.backgroundLayer.style.transform = "";
  }

  if (refs.topOrbLayer) {
    refs.topOrbLayer.style.transform = "";
  }

  if (refs.bottomOrbLayer) {
    refs.bottomOrbLayer.style.transform = "";
  }
};
