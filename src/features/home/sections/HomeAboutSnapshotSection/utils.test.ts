import { describe, expect, it, vi } from "vitest";
import type { CapabilityId } from "./types";
import {
  getCapabilityAccentClass,
  getCapabilityIllustrationSrc,
  getStackedCardCountClass,
  getStackedCardIndexClass,
  resolveActiveCapabilityId,
} from "./utils";

const capabilityIds: readonly CapabilityId[] = ["delivery", "frontend", "platform", "ai"];

describe("HomeAboutSnapshotSection utils", () => {
  it("returns deterministic illustration paths for capability ids", () => {
    capabilityIds.forEach((capabilityId) => {
      expect(getCapabilityIllustrationSrc(capabilityId)).toBe(`/images/what-i-do/${capabilityId}.png`);
    });
  });

  it("returns stacked index classes and a safe fallback", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(getStackedCardIndexClass(0)).toBe("[--index:1]");
    expect(getStackedCardIndexClass(1)).toBe("[--index:2]");
    expect(getStackedCardIndexClass(2)).toBe("[--index:3]");
    expect(getStackedCardIndexClass(3)).toBe("[--index:4]");
    expect(getStackedCardIndexClass(12)).toBe("[--index:1]");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[HomeAboutSnapshotSection] Missing stacked index class for card index: 12",
    );

    consoleWarnSpy.mockRestore();
  });

  it("returns stacked card-count classes and a safe fallback", () => {
    const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(getStackedCardCountClass(1)).toBe("[--numcards:1]");
    expect(getStackedCardCountClass(4)).toBe("[--numcards:4]");
    expect(getStackedCardCountClass(8)).toBe("[--numcards:8]");
    expect(getStackedCardCountClass(12)).toBe("[--numcards:4]");
    expect(consoleWarnSpy).toHaveBeenCalledWith(
      "[HomeAboutSnapshotSection] Missing stacked card count class for count: 12",
    );

    consoleWarnSpy.mockRestore();
  });

  it("returns accent classes for each capability id", () => {
    capabilityIds.forEach((capabilityId) => {
      const accentClass = getCapabilityAccentClass(capabilityId);
      expect(accentClass).toContain("--cap-accent");
      expect(accentClass).toContain("--cap-wash");
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
