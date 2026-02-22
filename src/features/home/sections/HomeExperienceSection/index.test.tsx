import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { homeCopy } from "@/copy/home";
import { profile } from "@/copy/profile";
import { HomeExperienceSection } from "./index";

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

vi.mock("./useTimelineMetrics", () => ({
  useTimelineMetrics: () => ({
    activeIndex: 0,
    reduceMotion: false,
    sectionRef: { current: null },
    listRef: { current: null },
    pathSvgRef: { current: null },
    pathTrackRef: { current: null },
    pathFillRef: { current: null },
  }),
}));

describe("HomeExperienceSection", () => {
  beforeEach(() => {
    vi.stubGlobal("matchMedia", matchMediaMock);
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders section heading and timeline items", () => {
    render(<HomeExperienceSection />);

    expect(
      screen.getByRole("heading", { name: homeCopy.experience.heading }),
    ).toBeInTheDocument();

    const list = screen.getByRole("list", { name: "Career timeline" });
    expect(list.querySelectorAll(":scope > li")).toHaveLength(homeCopy.experience.items.length);
  });

  it("renders monograms, highlights, and technology chips for each role", () => {
    render(<HomeExperienceSection />);

    homeCopy.experience.items.forEach((job) => {
      expect(screen.getByText(job.monogram)).toBeInTheDocument();
      job.highlights.forEach((highlight) => {
        expect(screen.getAllByText(highlight).length).toBeGreaterThan(0);
      });
      job.techChips.forEach((chip) => {
        expect(screen.getAllByText(chip).length).toBeGreaterThan(0);
      });
    });
  });

  it("renders milestone stops pinned to each entry's top-left corner", () => {
    render(<HomeExperienceSection />);

    const stops = Array.from(
      document.querySelectorAll<HTMLElement>("[data-timeline-milestone='true']"),
    );
    expect(stops).toHaveLength(homeCopy.experience.items.length);
    stops.forEach((stop) => {
      expect(stop).toHaveClass("left-0");
      expect(stop).toHaveClass("top-8");
      expect(stop).toHaveClass("md:top-10");
      expect(stop).not.toHaveClass("right-3");
    });
  });

  it("renders a visible current role badge", () => {
    render(<HomeExperienceSection />);

    expect(screen.getByText(homeCopy.experience.currentLabel)).toBeInTheDocument();
  });

  it("renders linkedin cta with expected external link attributes", () => {
    render(<HomeExperienceSection />);

    const link = screen.getByRole("link", { name: homeCopy.experience.cta });
    expect(link).toHaveAttribute("href", profile.links.linkedin);
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders disclosure controls for entries with more than two highlights", () => {
    render(<HomeExperienceSection />);

    const disclosureControls = screen.getAllByText("More highlights");
    const entriesWithExtraHighlights = homeCopy.experience.items.filter((job) => {
      return job.highlights.length > 2;
    });

    expect(disclosureControls).toHaveLength(entriesWithExtraHighlights.length);
  });

  it("toggles additional highlights with native details disclosure", async () => {
    const user = userEvent.setup();
    render(<HomeExperienceSection />);

    const localLogicItem = screen.getByRole("heading", { name: "Local Logic" }).closest("article");
    expect(localLogicItem).not.toBeNull();

    const localLogicCard = localLogicItem as HTMLElement;
    const hiddenHighlight = homeCopy.experience.items[0].highlights[2];
    const details = localLogicCard.querySelector("details");
    expect(details).not.toBeNull();
    const disclosure = details as HTMLDetailsElement;
    expect(within(disclosure).getByText(hiddenHighlight)).not.toBeVisible();

    const toggle = disclosure.querySelector("summary");
    expect(toggle).not.toBeNull();
    await user.click(toggle as HTMLElement);
    expect(disclosure.open).toBe(true);
    expect(within(disclosure).getByText(hiddenHighlight)).toBeVisible();
    expect(within(disclosure).getByText("Less highlights")).toBeVisible();
  });
});
