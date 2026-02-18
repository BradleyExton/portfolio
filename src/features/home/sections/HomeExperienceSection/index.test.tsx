import { render, screen } from "@testing-library/react";
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
});
