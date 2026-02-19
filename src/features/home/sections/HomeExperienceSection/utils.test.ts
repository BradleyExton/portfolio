import { describe, expect, it } from "vitest";
import {
  clamp01,
  computeTimelineProgress,
  getActiveIndex,
  getStableActiveIndex,
  getViewportAnchorY,
} from "./utils";

describe("HomeExperienceSection utils", () => {
  it("clamps values between 0 and 1", () => {
    expect(clamp01(-0.2)).toBe(0);
    expect(clamp01(0.4)).toBe(0.4);
    expect(clamp01(1.5)).toBe(1);
  });

  it("returns an anchored viewport position and clamps ratio input", () => {
    expect(getViewportAnchorY(1000, 0.45)).toBe(450);
    expect(getViewportAnchorY(800, -2)).toBe(0);
    expect(getViewportAnchorY(800, 2)).toBe(800);
    expect(getViewportAnchorY(0, 0.45)).toBe(0);
  });

  it("computes clamped progress for timeline fill", () => {
    expect(
      computeTimelineProgress({
        anchorY: 100,
        startY: 300,
        endY: 700,
      }),
    ).toBe(0);

    expect(
      computeTimelineProgress({
        anchorY: 550,
        startY: 300,
        endY: 700,
      }),
    ).toBeCloseTo(0.625, 4);

    expect(
      computeTimelineProgress({
        anchorY: 900,
        startY: 300,
        endY: 700,
      }),
    ).toBe(1);
  });

  it("handles collapsed ranges for progress calculations", () => {
    expect(
      computeTimelineProgress({
        anchorY: 400,
        startY: 500,
        endY: 500,
      }),
    ).toBe(0);

    expect(
      computeTimelineProgress({
        anchorY: 500,
        startY: 500,
        endY: 500,
      }),
    ).toBe(1);
  });

  it("selects the closest milestone index to anchor", () => {
    const centers = [100, 280, 520, 760];

    expect(getActiveIndex(centers, 120)).toBe(0);
    expect(getActiveIndex(centers, 350)).toBe(1);
    expect(getActiveIndex(centers, 600)).toBe(2);
    expect(getActiveIndex(centers, 900)).toBe(3);
  });

  it("falls back to the first item when no centers exist", () => {
    expect(getActiveIndex([], 200)).toBe(0);
  });

  it("keeps active index stable near boundaries with hysteresis", () => {
    const centers = [100, 280, 520, 760];

    expect(
      getStableActiveIndex({
        itemCenters: centers,
        anchorY: 205,
        previousIndex: 0,
        hysteresisPx: 30,
      }),
    ).toBe(0);

    expect(
      getStableActiveIndex({
        itemCenters: centers,
        anchorY: 225,
        previousIndex: 0,
        hysteresisPx: 30,
      }),
    ).toBe(1);

    expect(
      getStableActiveIndex({
        itemCenters: centers,
        anchorY: 175,
        previousIndex: 1,
        hysteresisPx: 30,
      }),
    ).toBe(1);

    expect(
      getStableActiveIndex({
        itemCenters: centers,
        anchorY: 145,
        previousIndex: 1,
        hysteresisPx: 30,
      }),
    ).toBe(0);
  });
});
