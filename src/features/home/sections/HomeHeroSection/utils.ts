import type {
  HeroParallaxLayerElements,
  HeroParallaxLayerOffsets,
  HeroParallaxLayerRefs,
  HeroParallaxVector,
} from "./types";

const HERO_SCROLL_MIN_VIEWPORT = 768;
const HERO_POINTER_MIN_VIEWPORT = 1024;
const POINTER_DAMPING_RATE = 12;
const POINTER_SETTLE_THRESHOLD = 0.001;
const SCROLL_CHANGE_THRESHOLD = 0.001;
const POINTER_DEAD_ZONE = 0.1;
const DEFAULT_FRAME_DELTA_MS = 16;
const MIN_FRAME_DELTA_MS = 8;
const MAX_FRAME_DELTA_MS = 40;
const HERO_MD_BREAKPOINT = 768;
const HERO_XL_BREAKPOINT = 1280;
const HERO_BACKGROUND_IMAGE_WIDTH = 1536;
const HERO_BACKGROUND_IMAGE_HEIGHT = 1024;
const HERO_STEAM_SOURCE_POINT = {
  x: 1320,
  y: 820,
};
const HERO_STEAM_CLUSTER_OFFSET = {
  x: -50,
  y: 8,
};

const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const createZeroVector = (): HeroParallaxVector => {
  return { x: 0, y: 0 };
};

const createZeroLayerOffsets = (): HeroParallaxLayerOffsets => {
  return {
    background: createZeroVector(),
    steam: createZeroVector(),
    topOrb: createZeroVector(),
    bottomOrb: createZeroVector(),
    content: createZeroVector(),
    pills: createZeroVector(),
  };
};

const isNearZero = (value: number, epsilon: number): boolean => {
  return Math.abs(value) <= epsilon;
};

const applyAxisDeadZone = (
  value: number,
  deadZone: number,
): number => {
  const absoluteValue = Math.abs(value);
  if (absoluteValue <= deadZone) {
    return 0;
  }

  const sign = Math.sign(value);
  const scaledMagnitude = (absoluteValue - deadZone) / (1 - deadZone);

  return sign * clamp(scaledMagnitude, 0, 1);
};

const toPixelOffset = (value: number): string => {
  return `${value.toFixed(2)}px`;
};

const resolveLayerElements = (
  refs: HeroParallaxLayerRefs,
): HeroParallaxLayerElements => {
  return {
    backgroundLayer: refs.backgroundLayerRef.current,
    steamLayer: refs.steamLayerRef.current,
    steamCluster: refs.steamClusterRef.current,
    topOrbLayer: refs.topOrbLayerRef.current,
    bottomOrbLayer: refs.bottomOrbLayerRef.current,
    contentLayer: refs.contentLayerRef.current,
    pillsLayer: refs.pillsLayerRef.current,
  };
};

const getHeroBackgroundObjectPosition = (
  viewportWidth: number,
): HeroParallaxVector => {
  return {
    x: viewportWidth >= HERO_MD_BREAKPOINT ? 0.72 : 0.7,
    y: viewportWidth >= HERO_XL_BREAKPOINT ? 1 : 0.5,
  };
};

const applyHeroSteamClusterAnchor = (
  steamCluster: HTMLDivElement | null,
): void => {
  if (!steamCluster) {
    return;
  }

  const steamViewport = steamCluster.parentElement as HTMLDivElement | null;
  if (!steamViewport) {
    return;
  }

  const viewportWidth = steamViewport.clientWidth;
  const viewportHeight = steamViewport.clientHeight;

  if (viewportWidth <= 0 || viewportHeight <= 0) {
    return;
  }

  const objectPosition = getHeroBackgroundObjectPosition(window.innerWidth);
  const coverScale = Math.max(
    viewportWidth / HERO_BACKGROUND_IMAGE_WIDTH,
    viewportHeight / HERO_BACKGROUND_IMAGE_HEIGHT,
  );
  const renderedWidth = HERO_BACKGROUND_IMAGE_WIDTH * coverScale;
  const renderedHeight = HERO_BACKGROUND_IMAGE_HEIGHT * coverScale;
  const offsetX = (viewportWidth - renderedWidth) * objectPosition.x;
  const offsetY = (viewportHeight - renderedHeight) * objectPosition.y;
  const anchorX = (
    offsetX
    + HERO_STEAM_SOURCE_POINT.x * coverScale
    + HERO_STEAM_CLUSTER_OFFSET.x
  );
  const anchorY = (
    offsetY
    + HERO_STEAM_SOURCE_POINT.y * coverScale
    + HERO_STEAM_CLUSTER_OFFSET.y
  );

  steamCluster.style.left = toPixelOffset(anchorX);
  steamCluster.style.top = toPixelOffset(anchorY);
  steamCluster.style.right = "auto";
  steamCluster.style.bottom = "auto";
  steamCluster.style.transform = "translate3d(-50%, -100%, 0)";
};

const clearHeroSteamClusterAnchor = (
  steamCluster: HTMLDivElement | null,
): void => {
  if (!steamCluster) {
    return;
  }

  steamCluster.style.left = "";
  steamCluster.style.top = "";
  steamCluster.style.right = "";
  steamCluster.style.bottom = "";
  steamCluster.style.transform = "";
};

const subscribeMediaQueryChange = (
  mediaQueryList: MediaQueryList,
  onChange: () => void,
): (() => void) => {
  const listener = () => {
    onChange();
  };

  if (typeof mediaQueryList.addEventListener === "function") {
    mediaQueryList.addEventListener("change", listener);
    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }

  mediaQueryList.addListener(listener);
  return () => {
    mediaQueryList.removeListener(listener);
  };
};

export const shouldEnableHeroScrollParallax = (
  viewportWidth: number,
  prefersReducedMotion: boolean,
): boolean => {
  return viewportWidth >= HERO_SCROLL_MIN_VIEWPORT && !prefersReducedMotion;
};

export const shouldEnableHeroPointerParallax = (
  viewportWidth: number,
  prefersReducedMotion: boolean,
  supportsFinePointerHover: boolean,
): boolean => {
  return (
    viewportWidth >= HERO_POINTER_MIN_VIEWPORT
    && !prefersReducedMotion
    && supportsFinePointerHover
  );
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

export const applyHeroPointerDeadZone = (
  vector: HeroParallaxVector,
  deadZone = POINTER_DEAD_ZONE,
): HeroParallaxVector => {
  const normalizedDeadZone = clamp(deadZone, 0, 0.95);

  return {
    x: applyAxisDeadZone(vector.x, normalizedDeadZone),
    y: applyAxisDeadZone(vector.y, normalizedDeadZone),
  };
};

export const getHeroPointerTarget = (
  sectionRect: DOMRect,
  clientX: number,
  clientY: number,
): HeroParallaxVector => {
  const centerX = sectionRect.left + sectionRect.width / 2;
  const centerY = sectionRect.top + sectionRect.height / 2;
  const halfWidth = Math.max(sectionRect.width / 2, 1);
  const halfHeight = Math.max(sectionRect.height / 2, 1);

  const normalizedTarget = {
    x: clamp((clientX - centerX) / halfWidth, -1, 1),
    y: clamp((clientY - centerY) / halfHeight, -1, 1),
  };

  return applyHeroPointerDeadZone(normalizedTarget);
};

export const getHeroFrameEasing = (
  deltaMs: number,
  dampingRate = POINTER_DAMPING_RATE,
): number => {
  const clampedDeltaMs = clamp(deltaMs, MIN_FRAME_DELTA_MS, MAX_FRAME_DELTA_MS);
  const deltaSeconds = clampedDeltaMs / 1000;
  const alpha = 1 - Math.exp(-dampingRate * deltaSeconds);

  return clamp(alpha, 0, 1);
};

export const interpolateHeroParallaxVector = (
  current: HeroParallaxVector,
  target: HeroParallaxVector,
  easing: number,
): HeroParallaxVector => {
  return {
    x: current.x + (target.x - current.x) * easing,
    y: current.y + (target.y - current.y) * easing,
  };
};

export const isHeroParallaxVectorSettled = (
  current: HeroParallaxVector,
  target: HeroParallaxVector,
  epsilon: number,
): boolean => {
  return (
    isNearZero(current.x - target.x, epsilon)
    && isNearZero(current.y - target.y, epsilon)
  );
};

export const getHeroScrollLayerOffsets = (
  centeredProgress: number,
): HeroParallaxLayerOffsets => {
  return {
    background: {
      x: 0,
      y: centeredProgress * 20,
    },
    steam: {
      x: 0,
      y: centeredProgress * 20,
    },
    topOrb: {
      x: centeredProgress * -12,
      y: centeredProgress * -24,
    },
    bottomOrb: {
      x: centeredProgress * 10,
      y: centeredProgress * 18,
    },
    content: {
      x: 0,
      y: 0,
    },
    pills: {
      x: 0,
      y: 0,
    },
  };
};

export const getHeroPointerLayerOffsets = (
  pointerVector: HeroParallaxVector,
): HeroParallaxLayerOffsets => {
  return {
    background: {
      x: pointerVector.x * -4,
      y: pointerVector.y * -6,
    },
    steam: {
      x: pointerVector.x * -4,
      y: pointerVector.y * -6,
    },
    topOrb: {
      x: pointerVector.x * -8,
      y: pointerVector.y * -11,
    },
    bottomOrb: {
      x: pointerVector.x * -6.5,
      y: pointerVector.y * -9,
    },
    content: {
      x: pointerVector.x * 1.8,
      y: pointerVector.y * 2.8,
    },
    pills: {
      x: pointerVector.x * 3,
      y: pointerVector.y * 4,
    },
  };
};

export const mergeHeroParallaxLayerOffsets = (
  scrollOffsets: HeroParallaxLayerOffsets,
  pointerOffsets: HeroParallaxLayerOffsets,
): HeroParallaxLayerOffsets => {
  return {
    background: {
      x: scrollOffsets.background.x + pointerOffsets.background.x,
      y: scrollOffsets.background.y + pointerOffsets.background.y,
    },
    steam: {
      x: scrollOffsets.steam.x + pointerOffsets.steam.x,
      y: scrollOffsets.steam.y + pointerOffsets.steam.y,
    },
    topOrb: {
      x: scrollOffsets.topOrb.x + pointerOffsets.topOrb.x,
      y: scrollOffsets.topOrb.y + pointerOffsets.topOrb.y,
    },
    bottomOrb: {
      x: scrollOffsets.bottomOrb.x + pointerOffsets.bottomOrb.x,
      y: scrollOffsets.bottomOrb.y + pointerOffsets.bottomOrb.y,
    },
    content: {
      x: scrollOffsets.content.x + pointerOffsets.content.x,
      y: scrollOffsets.content.y + pointerOffsets.content.y,
    },
    pills: {
      x: scrollOffsets.pills.x + pointerOffsets.pills.x,
      y: scrollOffsets.pills.y + pointerOffsets.pills.y,
    },
  };
};

const applyHeroParallaxTransforms = (
  elements: HeroParallaxLayerElements,
  offsets: HeroParallaxLayerOffsets,
): void => {
  if (elements.backgroundLayer) {
    elements.backgroundLayer.style.transform = `translate3d(${toPixelOffset(offsets.background.x)}, ${toPixelOffset(offsets.background.y)}, 0)`;
  }

  if (elements.steamLayer) {
    elements.steamLayer.style.transform = `translate3d(${toPixelOffset(offsets.steam.x)}, ${toPixelOffset(offsets.steam.y)}, 0)`;
  }

  if (elements.topOrbLayer) {
    elements.topOrbLayer.style.transform = `translate3d(${toPixelOffset(offsets.topOrb.x)}, ${toPixelOffset(offsets.topOrb.y)}, 0)`;
  }

  if (elements.bottomOrbLayer) {
    elements.bottomOrbLayer.style.transform = `translate3d(${toPixelOffset(offsets.bottomOrb.x)}, ${toPixelOffset(offsets.bottomOrb.y)}, 0)`;
  }

  if (elements.contentLayer) {
    elements.contentLayer.style.transform = `translate3d(${toPixelOffset(offsets.content.x)}, ${toPixelOffset(offsets.content.y)}, 0)`;
  }

  if (elements.pillsLayer) {
    elements.pillsLayer.style.transform = `translate3d(${toPixelOffset(offsets.pills.x)}, ${toPixelOffset(offsets.pills.y)}, 0)`;
  }
};

const clearHeroParallaxTransforms = (
  elements: HeroParallaxLayerElements,
): void => {
  if (elements.backgroundLayer) {
    elements.backgroundLayer.style.transform = "";
  }

  if (elements.steamLayer) {
    elements.steamLayer.style.transform = "";
  }

  if (elements.topOrbLayer) {
    elements.topOrbLayer.style.transform = "";
  }

  if (elements.bottomOrbLayer) {
    elements.bottomOrbLayer.style.transform = "";
  }

  if (elements.contentLayer) {
    elements.contentLayer.style.transform = "";
  }

  if (elements.pillsLayer) {
    elements.pillsLayer.style.transform = "";
  }
};

export const setupHeroParallaxController = (
  refs: HeroParallaxLayerRefs,
): (() => void) => {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const section = refs.sectionRef.current;
  if (!section) {
    return () => undefined;
  }

  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

  let frameId = 0;
  let isSectionVisible = true;
  let isPointerInside = false;
  let scrollParallaxEnabled = false;
  let pointerParallaxEnabled = false;
  let lastScrollProgress = 0;
  let targetPointer = createZeroVector();
  let currentPointer = createZeroVector();
  let lastFrameTimestamp = 0;
  let visibilityObserver: IntersectionObserver | null = null;
  let hasScrollListener = false;
  let hasPointerListeners = false;

  const getLayerElements = () => {
    return resolveLayerElements(refs);
  };

  const resetPointerState = () => {
    targetPointer = createZeroVector();
    currentPointer = createZeroVector();
    isPointerInside = false;
    lastFrameTimestamp = 0;
  };

  const scheduleFrame = () => {
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame((timestamp) => {
      frameId = 0;

      const activeSection = refs.sectionRef.current;
      if (!activeSection || !isSectionVisible) {
        return;
      }

      if (!scrollParallaxEnabled && !pointerParallaxEnabled) {
        return;
      }

      const sectionRect = activeSection.getBoundingClientRect();
      const nextScrollProgress = scrollParallaxEnabled
        ? getHeroParallaxCenteredProgress(sectionRect, window.innerHeight)
        : 0;
      const scrollChanged = Math.abs(nextScrollProgress - lastScrollProgress) > SCROLL_CHANGE_THRESHOLD;
      lastScrollProgress = nextScrollProgress;

      if (pointerParallaxEnabled) {
        const frameDeltaMs = lastFrameTimestamp === 0
          ? DEFAULT_FRAME_DELTA_MS
          : timestamp - lastFrameTimestamp;
        const frameEasing = getHeroFrameEasing(frameDeltaMs);
        lastFrameTimestamp = timestamp;

        currentPointer = interpolateHeroParallaxVector(
          currentPointer,
          targetPointer,
          frameEasing,
        );
      } else {
        currentPointer = createZeroVector();
        lastFrameTimestamp = 0;
      }

      const scrollOffsets = getHeroScrollLayerOffsets(nextScrollProgress);
      const pointerOffsets = pointerParallaxEnabled
        ? getHeroPointerLayerOffsets(currentPointer)
        : createZeroLayerOffsets();
      const combinedOffsets = mergeHeroParallaxLayerOffsets(
        scrollOffsets,
        pointerOffsets,
      );

      applyHeroParallaxTransforms(getLayerElements(), combinedOffsets);

      const pointerSettled = isHeroParallaxVectorSettled(
        currentPointer,
        targetPointer,
        POINTER_SETTLE_THRESHOLD,
      );
      const shouldContinue = (
        (pointerParallaxEnabled && (!pointerSettled || isPointerInside))
        || scrollChanged
      );

      if (shouldContinue) {
        scheduleFrame();
      }
    });
  };

  const refreshCapabilities = () => {
    const layerElements = getLayerElements();
    applyHeroSteamClusterAnchor(layerElements.steamCluster);

    const prefersReducedMotion = reducedMotionQuery.matches;
    scrollParallaxEnabled = shouldEnableHeroScrollParallax(
      window.innerWidth,
      prefersReducedMotion,
    );
    pointerParallaxEnabled = shouldEnableHeroPointerParallax(
      window.innerWidth,
      prefersReducedMotion,
      finePointerQuery.matches,
    );
    syncInteractionListeners();

    if (!pointerParallaxEnabled) {
      resetPointerState();
    }

    if (!scrollParallaxEnabled && !pointerParallaxEnabled) {
      clearHeroParallaxTransforms(layerElements);
      return;
    }

    scheduleFrame();
  };

  const handleScroll = () => {
    scheduleFrame();
  };

  const handleResize = () => {
    refreshCapabilities();
  };

  const handlePointerEnter = (event: PointerEvent) => {
    if (!pointerParallaxEnabled) {
      return;
    }

    isPointerInside = true;
    targetPointer = getHeroPointerTarget(
      section.getBoundingClientRect(),
      event.clientX,
      event.clientY,
    );
    scheduleFrame();
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!pointerParallaxEnabled) {
      return;
    }

    targetPointer = getHeroPointerTarget(
      section.getBoundingClientRect(),
      event.clientX,
      event.clientY,
    );
    scheduleFrame();
  };

  const handlePointerLeave = () => {
    if (!pointerParallaxEnabled) {
      return;
    }

    isPointerInside = false;
    targetPointer = createZeroVector();
    scheduleFrame();
  };

  const setScrollListener = (enabled: boolean) => {
    if (enabled && !hasScrollListener) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      hasScrollListener = true;
      return;
    }

    if (!enabled && hasScrollListener) {
      window.removeEventListener("scroll", handleScroll);
      hasScrollListener = false;
    }
  };

  const setPointerListeners = (enabled: boolean) => {
    if (enabled && !hasPointerListeners) {
      section.addEventListener("pointerenter", handlePointerEnter);
      section.addEventListener("pointermove", handlePointerMove);
      section.addEventListener("pointerleave", handlePointerLeave);
      section.addEventListener("pointercancel", handlePointerLeave);
      hasPointerListeners = true;
      return;
    }

    if (!enabled && hasPointerListeners) {
      section.removeEventListener("pointerenter", handlePointerEnter);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      section.removeEventListener("pointercancel", handlePointerLeave);
      hasPointerListeners = false;
    }
  };

  const syncInteractionListeners = () => {
    setScrollListener(scrollParallaxEnabled);
    setPointerListeners(pointerParallaxEnabled);
  };

  if (typeof window.IntersectionObserver === "function") {
    visibilityObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isSectionVisible = entry?.isIntersecting ?? false;

        if (!isSectionVisible) {
          lastFrameTimestamp = 0;
          clearHeroParallaxTransforms(getLayerElements());
          return;
        }

        scheduleFrame();
      },
      {
        threshold: 0,
      },
    );

    visibilityObserver.observe(section);
  }

  window.addEventListener("resize", handleResize);

  const unsubscribeReducedMotion = subscribeMediaQueryChange(
    reducedMotionQuery,
    refreshCapabilities,
  );
  const unsubscribeFinePointer = subscribeMediaQueryChange(
    finePointerQuery,
    refreshCapabilities,
  );

  refreshCapabilities();

  return () => {
    if (frameId !== 0) {
      window.cancelAnimationFrame(frameId);
    }

    setScrollListener(false);
    setPointerListeners(false);
    window.removeEventListener("resize", handleResize);

    unsubscribeReducedMotion();
    unsubscribeFinePointer();
    visibilityObserver?.disconnect();
    const layerElements = getLayerElements();
    clearHeroParallaxTransforms(layerElements);
    clearHeroSteamClusterAnchor(layerElements.steamCluster);
  };
};
