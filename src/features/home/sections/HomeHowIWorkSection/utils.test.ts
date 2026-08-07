import { describe, expect, it } from "vitest";
import { formatStageIndex, getStageMarker, isFinalStage, isStageReversed } from "./utils";

describe("formatStageIndex", () => {
  it("zero-pads the one-based stage number", () => {
    expect(formatStageIndex(0)).toBe("01");
    expect(formatStageIndex(3)).toBe("04");
  });
});

describe("isFinalStage", () => {
  it("is true only for the last index in the track", () => {
    expect(isFinalStage(0, 4)).toBe(false);
    expect(isFinalStage(2, 4)).toBe(false);
    expect(isFinalStage(3, 4)).toBe(true);
  });

  it("is false when there are no stages", () => {
    expect(isFinalStage(-1, 0)).toBe(false);
  });
});

describe("getStageMarker", () => {
  it("numbers every station except the terminal one", () => {
    expect(getStageMarker(0, 4)).toBe("01");
    expect(getStageMarker(1, 4)).toBe("02");
    expect(getStageMarker(2, 4)).toBe("03");
  });

  it("marks the terminal station with a check", () => {
    expect(getStageMarker(3, 4)).toBe("✓");
  });
});

describe("isStageReversed", () => {
  it("reverses only the odd rows so the track zigzags", () => {
    expect(isStageReversed(0)).toBe(false);
    expect(isStageReversed(1)).toBe(true);
    expect(isStageReversed(2)).toBe(false);
    expect(isStageReversed(3)).toBe(true);
  });
});
