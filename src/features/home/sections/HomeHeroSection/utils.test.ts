import { describe, expect, it } from "vitest";
import {
  applyHeroPointerDeadZone,
  getHeroFrameEasing,
  getHeroParallaxCenteredProgress,
  getHeroPointerLayerOffsets,
  getHeroPointerTarget,
  getHeroScrollLayerOffsets,
  interpolateHeroParallaxVector,
  isHeroParallaxVectorSettled,
  mergeHeroParallaxLayerOffsets,
  shouldEnableHeroPointerParallax,
  shouldEnableHeroScrollParallax,
} from "./utils";

const createRect = (overrides?: Partial<DOMRect>): DOMRect => {
  return {
    x: 0,
    y: 0,
    left: 100,
    top: 100,
    right: 900,
    bottom: 700,
    width: 800,
    height: 600,
    toJSON: () => ({}),
    ...overrides,
  } as DOMRect;
};

describe("HomeHeroSection utils", () => {
  it("enables scroll parallax only on tablet and above when motion is allowed", () => {
    expect(shouldEnableHeroScrollParallax(767, false)).toBe(false);
    expect(shouldEnableHeroScrollParallax(768, false)).toBe(true);
    expect(shouldEnableHeroScrollParallax(1200, true)).toBe(false);
  });

  it("enables pointer parallax only on large desktop with fine hover pointers", () => {
    expect(shouldEnableHeroPointerParallax(1023, false, true)).toBe(false);
    expect(shouldEnableHeroPointerParallax(1024, false, false)).toBe(false);
    expect(shouldEnableHeroPointerParallax(1024, true, true)).toBe(false);
    expect(shouldEnableHeroPointerParallax(1280, false, true)).toBe(true);
  });

  it("clamps centered scroll progress between -1 and 1", () => {
    const viewportHeight = 900;

    expect(getHeroParallaxCenteredProgress(createRect({ top: 1500, height: 600 }), viewportHeight)).toBe(-1);
    expect(getHeroParallaxCenteredProgress(createRect({ top: -700, height: 600 }), viewportHeight)).toBe(1);
    expect(getHeroParallaxCenteredProgress(createRect({ top: 900, height: 600 }), viewportHeight)).toBe(-1);
  });

  it("normalizes pointer coordinates to a centered and clamped vector", () => {
    const rect = createRect({ left: 100, top: 100, width: 800, height: 600 });

    const center = getHeroPointerTarget(rect, 500, 400);
    expect(center).toEqual({ x: 0, y: 0 });

    const clamped = getHeroPointerTarget(rect, 2000, -300);
    expect(clamped).toEqual({ x: 1, y: -1 });
  });

  it("applies a dead-zone near center and preserves edge reach", () => {
    expect(applyHeroPointerDeadZone({ x: 0.06, y: -0.08 })).toEqual({ x: 0, y: 0 });
    expect(applyHeroPointerDeadZone({ x: 1, y: -1 })).toEqual({ x: 1, y: -1 });
    expect(applyHeroPointerDeadZone({ x: 0.35, y: 0 }).x).toBeCloseTo(0.2778, 4);
  });

  it("uses frame-time easing to keep pointer interpolation consistent", () => {
    const sixtyFps = getHeroFrameEasing(16);
    const slowFrame = getHeroFrameEasing(40);
    const clampedFrame = getHeroFrameEasing(300);

    expect(sixtyFps).toBeCloseTo(0.174, 2);
    expect(slowFrame).toBeGreaterThan(sixtyFps);
    expect(clampedFrame).toBeCloseTo(slowFrame, 4);
  });

  it("interpolates and settles pointer vectors for smooth inertia", () => {
    const next = interpolateHeroParallaxVector(
      { x: 0, y: 0 },
      { x: 1, y: -1 },
      0.14,
    );

    expect(next.x).toBeCloseTo(0.14, 4);
    expect(next.y).toBeCloseTo(-0.14, 4);
    expect(isHeroParallaxVectorSettled(next, { x: 1, y: -1 }, 0.001)).toBe(false);
    expect(isHeroParallaxVectorSettled({ x: 0.9996, y: -0.9996 }, { x: 1, y: -1 }, 0.001)).toBe(true);
  });

  it("merges scroll and pointer layer offsets", () => {
    const scrollOffsets = getHeroScrollLayerOffsets(0.5);
    const pointerOffsets = getHeroPointerLayerOffsets({ x: 0.25, y: -0.5 });

    const combined = mergeHeroParallaxLayerOffsets(scrollOffsets, pointerOffsets);

    expect(combined.background.x).toBeCloseTo(-1, 4);
    expect(combined.background.y).toBeCloseTo(13, 4);
    expect(combined.topOrb.x).toBeCloseTo(-8, 4);
    expect(combined.topOrb.y).toBeCloseTo(-6.5, 4);
    expect(combined.bottomOrb.x).toBeCloseTo(3.375, 4);
    expect(combined.bottomOrb.y).toBeCloseTo(13.5, 4);
    expect(combined.content.x).toBeCloseTo(0.45, 4);
    expect(combined.content.y).toBeCloseTo(-1.4, 4);
    expect(combined.pills.x).toBeCloseTo(0.75, 4);
    expect(combined.pills.y).toBeCloseTo(-2, 4);
  });
});
