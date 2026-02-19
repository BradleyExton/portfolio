import { describe, expect, it } from "vitest";
import type { CapabilityId } from "./types";
import { getCapabilityIllustrationSrc, resolveActiveCapabilityId } from "./utils";

const capabilityIds: readonly CapabilityId[] = ["delivery", "frontend", "platform", "ai"];

describe("HomeAboutSnapshotSection utils", () => {
  it("returns deterministic illustration paths for capability ids", () => {
    capabilityIds.forEach((capabilityId) => {
      expect(getCapabilityIllustrationSrc(capabilityId)).toBe(`/images/what-i-do/${capabilityId}.png`);
    });
  });

  it("resolves the first card as active when entering the section", () => {
    const activeId = resolveActiveCapabilityId({
      capabilityIds,
      cardRects: [
        { id: "delivery", top: 96, bottom: 420 },
        { id: "frontend", top: 540, bottom: 880 },
      ],
      anchorY: 108,
    });

    expect(activeId).toBe("delivery");
  });

  it("resolves a middle card as active while stacked", () => {
    const activeId = resolveActiveCapabilityId({
      capabilityIds,
      cardRects: [
        { id: "delivery", top: -320, bottom: -24 },
        { id: "frontend", top: 88, bottom: 432 },
        { id: "platform", top: 312, bottom: 660 },
      ],
      anchorY: 108,
    });

    expect(activeId).toBe("frontend");
  });

  it("falls back to first visible card when no card crosses the anchor", () => {
    const activeId = resolveActiveCapabilityId({
      capabilityIds,
      cardRects: [
        { id: "delivery", top: -400, bottom: -110 },
        { id: "frontend", top: 188, bottom: 540 },
      ],
      anchorY: 108,
    });

    expect(activeId).toBe("frontend");
  });

  it("falls back to first capability id when no cards are visible", () => {
    const activeId = resolveActiveCapabilityId({
      capabilityIds,
      cardRects: [],
      anchorY: 108,
    });

    expect(activeId).toBe("delivery");
  });
});
