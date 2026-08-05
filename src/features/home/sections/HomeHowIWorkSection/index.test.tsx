import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { homeCopy } from "@/copy/home";
import { HomeHowIWorkSection } from "./index";

describe("HomeHowIWorkSection", () => {
  it("renders section heading, description, and closing line", () => {
    render(<HomeHowIWorkSection />);

    expect(
      screen.getByRole("heading", { name: homeCopy.howIWork.heading }),
    ).toBeInTheDocument();
    expect(screen.getByText(homeCopy.howIWork.description)).toBeInTheDocument();
    expect(screen.getByText(homeCopy.howIWork.closing)).toBeInTheDocument();
  });

  it("renders every workflow stage as an ordered list with name, body, and artifact chips", () => {
    render(<HomeHowIWorkSection />);

    const list = screen.getByRole("list", { name: "How I work stages" });
    const topLevelItems = Array.from(list.children).filter(
      (node) => node.tagName === "LI",
    );
    expect(topLevelItems).toHaveLength(homeCopy.howIWork.stages.length);

    for (const stage of homeCopy.howIWork.stages) {
      expect(screen.getByRole("heading", { level: 3, name: stage.name })).toBeInTheDocument();
      expect(screen.getByText(stage.body)).toBeInTheDocument();

      const chipList = screen.getByRole("list", { name: `${stage.name} artifacts` });
      for (const chip of stage.chips) {
        expect(within(chipList).getByText(chip)).toBeInTheDocument();
      }
    }
  });

  it("labels each pipeline station with its stage name", () => {
    render(<HomeHowIWorkSection />);

    for (const stage of homeCopy.howIWork.stages) {
      expect(screen.getByText(stage.station)).toBeInTheDocument();
    }
  });

  it("keeps the horizontally scrolling track reachable by keyboard", () => {
    render(<HomeHowIWorkSection />);

    expect(screen.getByRole("list", { name: "How I work stages" })).toHaveAttribute(
      "tabindex",
      "0",
    );
  });

  it("hides the decorative station markers and rails from assistive tech", () => {
    const { container } = render(<HomeHowIWorkSection />);

    const markerRows = container.querySelectorAll('[aria-hidden="true"]');
    const markerText = Array.from(markerRows).map((node) => node.textContent);
    expect(markerText).toContain("01");
    expect(markerText).toContain("✓");
  });
});
