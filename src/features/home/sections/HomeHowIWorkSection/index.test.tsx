import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { homeCopy } from "@/copy/home";
import { HomeHowIWorkSection } from "./index";

vi.mock("next/image", () => ({
  default: (props: { fill?: boolean } & Record<string, unknown>) => {
    const imageProps = { ...props };
    delete imageProps.fill;
    const altText = typeof props.alt === "string" ? props.alt : "";

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...imageProps} alt={altText} />
    );
  },
}));

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

  it("renders one decorative illustration per stage from the how-i-work set", () => {
    const { container } = render(<HomeHowIWorkSection />);

    const sources = Array.from(container.querySelectorAll("img")).map((image) =>
      image.getAttribute("src"),
    );
    expect(sources).toEqual(
      homeCopy.howIWork.stages.map((stage) => `/images/how-i-work/${stage.id}.svg`),
    );
  });
});
