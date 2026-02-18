import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { homeCopy } from "@/copy/home";
import { getToolLevelLabel } from "./utils";
import { HomeAboutSnapshotSection } from "./index";

const matchMediaMock = vi.fn().mockImplementation((query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));

class IntersectionObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

describe("HomeAboutSnapshotSection", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", matchMediaMock);
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders section heading, description, and about cta", () => {
    render(<HomeAboutSnapshotSection />);

    expect(
      screen.getByRole("heading", { name: homeCopy.aboutSnapshot.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(homeCopy.aboutSnapshot.description)).toBeInTheDocument();

    const link = screen.getByRole("link", { name: homeCopy.aboutSnapshot.cta });
    expect(link).toHaveAttribute("href", "/about");
  });

  it("renders capability cards as a semantic list", () => {
    render(<HomeAboutSnapshotSection />);

    const list = screen.getByRole("list", { name: "What I do capabilities" });
    expect(list.querySelectorAll(":scope > li")).toHaveLength(homeCopy.whatIDoCapabilities.length);
  });

  it("renders every capability with outcome, proof points, and chips", () => {
    render(<HomeAboutSnapshotSection />);

    homeCopy.whatIDoCapabilities.forEach((capability) => {
      expect(screen.getByRole("heading", { name: capability.title })).toBeInTheDocument();
      expect(screen.getByText(capability.outcome)).toBeInTheDocument();

      capability.proofPoints.forEach((proofPoint) => {
        expect(screen.getByText(proofPoint)).toBeInTheDocument();
      });

      const chipList = screen.getByRole("list", { name: `${capability.title} technologies` });
      capability.techChips.forEach((chip) => {
        expect(within(chipList).getByText(chip)).toBeInTheDocument();
      });
    });
  });

  it("renders a visible ai emphasis badge", () => {
    render(<HomeAboutSnapshotSection />);

    expect(screen.getByText(homeCopy.aboutSnapshot.aiFocusLabel)).toBeInTheDocument();
  });

  it("renders ai toolbelt title and tool level labels", () => {
    render(<HomeAboutSnapshotSection />);

    expect(screen.getByText(homeCopy.aboutSnapshot.aiToolbeltHeading)).toBeInTheDocument();

    const toolbeltList = screen.getByRole("list", { name: "AI toolbelt" });
    expect(toolbeltList.querySelectorAll(":scope > li")).toHaveLength(homeCopy.aiToolbelt.length);

    homeCopy.aiToolbelt.forEach((tool) => {
      expect(within(toolbeltList).getByText(tool.name)).toBeInTheDocument();
      expect(within(toolbeltList).getByText(tool.usage)).toBeInTheDocument();
      expect(within(toolbeltList).getAllByText(getToolLevelLabel(tool.level)).length).toBeGreaterThan(0);
    });
  });

  it("does not render legacy skill area labels", () => {
    render(<HomeAboutSnapshotSection />);

    expect(screen.queryByText("Front-End")).not.toBeInTheDocument();
    expect(screen.queryByText("Back-End")).not.toBeInTheDocument();
  });
});
