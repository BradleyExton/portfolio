import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SectionIntro } from "./index";

describe("SectionIntro", () => {
  it("renders an h2 by default", () => {
    render(<SectionIntro title="Default heading" />);

    expect(screen.getByRole("heading", { level: 2, name: "Default heading" })).toBeInTheDocument();
  });

  it("supports titleAs for semantic heading control", () => {
    render(<SectionIntro title="Hero heading" titleAs="h1" />);

    expect(screen.getByRole("heading", { level: 1, name: "Hero heading" })).toBeInTheDocument();
  });

  it("supports center alignment", () => {
    render(
      <SectionIntro
        title="Centered heading"
        align="center"
        description="Centered description"
      />,
    );

    const heading = screen.getByRole("heading", { name: "Centered heading" });
    expect(heading.parentElement).toHaveClass("text-center");

    expect(screen.getByText("Centered description")).toHaveClass("mx-auto");
  });

  it("supports inverse tone", () => {
    render(
      <SectionIntro
        eyebrow="Testimonials"
        title="Trusted by teams"
        description="Words from clients"
        tone="inverse"
      />,
    );

    expect(screen.getByText("Testimonials")).toHaveClass("text-brand-contrast");
    expect(screen.getByRole("heading", { name: "Trusted by teams" })).toHaveClass("text-content-inverse");
    expect(screen.getByText("Words from clients")).toHaveClass("text-content-inverse-muted");
  });

  it("omits optional eyebrow and description when not provided", () => {
    render(<SectionIntro title="Heading only" />);

    expect(screen.queryByText("Testimonials")).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Heading only" })).toBeInTheDocument();
  });
});
