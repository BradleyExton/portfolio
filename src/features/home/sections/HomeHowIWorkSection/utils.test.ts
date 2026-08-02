import { describe, expect, it } from "vitest";
import { formatStageIndex, getStageIllustrationSrc } from "./utils";

describe("getStageIllustrationSrc", () => {
  it("maps each stage id to its how-i-work illustration", () => {
    expect(getStageIllustrationSrc("spec")).toBe("/images/how-i-work/spec.svg");
    expect(getStageIllustrationSrc("context")).toBe("/images/how-i-work/context.svg");
    expect(getStageIllustrationSrc("agents")).toBe("/images/how-i-work/agents.svg");
    expect(getStageIllustrationSrc("gates")).toBe("/images/how-i-work/gates.svg");
  });
});

describe("formatStageIndex", () => {
  it("zero-pads the one-based stage number", () => {
    expect(formatStageIndex(0)).toBe("01");
    expect(formatStageIndex(3)).toBe("04");
  });
});
