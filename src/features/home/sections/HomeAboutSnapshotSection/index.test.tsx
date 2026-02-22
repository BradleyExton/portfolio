import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { homeCopy } from "@/copy/home";
import { HomeAboutSnapshotSection } from "./index";

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

  it("renders stacked capability cards as a semantic list", () => {
    render(<HomeAboutSnapshotSection />);

    const list = screen.getByRole("list", { name: "What I do capabilities" });
    const topLevelItems = Array.from(list.children).filter(
      (node) => node.tagName === "LI" && node.getAttribute("aria-hidden") !== "true",
    );
    expect(topLevelItems).toHaveLength(homeCopy.whatIDoCapabilities.length);
  });

  it("applies mobile peek stack classes while preserving md/xl overrides", () => {
    render(<HomeAboutSnapshotSection />);

    const list = screen.getByRole("list", { name: "What I do capabilities" });
    expect(list).toHaveClass("[--card-top-offset:0.875rem]");
    expect(list).toHaveClass("[--card-peek-offset:4rem]");
    expect(list).toHaveClass("overflow-visible");
    expect(list).toHaveClass("md:[--card-peek-offset:0rem]");
    expect(list).toHaveClass("md:pb-[calc(var(--numcards)*var(--card-top-offset)+1.5rem)]");
    expect(list).toHaveClass("xl:[--card-peek-offset:1.5rem]");

    const firstItem = list.querySelector("li");
    expect(firstItem).not.toBeNull();
    expect(firstItem as HTMLElement).toHaveClass("overflow-visible");

    const firstCard = firstItem?.querySelector("article");
    expect(firstCard).not.toBeNull();
    expect(firstCard as HTMLElement).toHaveClass("overflow-visible");

    const cardLayout = firstItem?.querySelector("article > div > div");
    expect(cardLayout).not.toBeNull();

    const layoutChildren = Array.from(cardLayout?.children ?? []);
    const firstIllustrationPanel = layoutChildren[1] as HTMLElement | undefined;
    expect(firstIllustrationPanel).toBeDefined();
    expect(firstIllustrationPanel).toHaveClass("order-last");
    expect(firstIllustrationPanel).toHaveClass("md:order-first");
  });

  it("keeps card content column before illustration in the layout DOM order", () => {
    render(<HomeAboutSnapshotSection />);

    const list = screen.getByRole("list", { name: "What I do capabilities" });
    const topLevelItems = Array.from(list.children).filter(
      (node) => node.tagName === "LI" && node.getAttribute("aria-hidden") !== "true",
    );

    topLevelItems.forEach((item, index) => {
      const cardLayout = item.querySelector("article > div > div");
      expect(cardLayout).not.toBeNull();

      const layoutChildren = Array.from(cardLayout?.children ?? []);
      expect(layoutChildren).toHaveLength(2);

      const contentColumn = layoutChildren[0];
      const illustrationPanel = layoutChildren[1];
      const capability = homeCopy.whatIDoCapabilities[index];

      expect(
        within(contentColumn as HTMLElement).getByRole("heading", {
          level: 3,
          name: capability.title,
        }),
      ).toBeInTheDocument();
      expect(illustrationPanel?.querySelector("img")).not.toBeNull();
    });
  });

  it("renders every capability card with outcome, proof points, and chips", () => {
    render(<HomeAboutSnapshotSection />);

    homeCopy.whatIDoCapabilities.forEach((capability) => {
      expect(screen.getByRole("heading", { level: 3, name: capability.title })).toBeInTheDocument();
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

  it("renders deterministic illustration src paths for all capability cards", () => {
    render(<HomeAboutSnapshotSection />);

    const list = screen.getByRole("list", { name: "What I do capabilities" });
    const images = list.querySelectorAll("img");
    expect(images).toHaveLength(homeCopy.whatIDoCapabilities.length);

    homeCopy.whatIDoCapabilities.forEach((capability, index) => {
      expect(images[index]).toHaveAttribute("src", `/images/what-i-do/${capability.id}.png`);
    });
  });

  it("renders a visible ai emphasis badge", () => {
    render(<HomeAboutSnapshotSection />);

    expect(screen.getByText(homeCopy.aboutSnapshot.aiFocusLabel)).toBeInTheDocument();
  });

  it("does not render the removed ai toolbelt rail", () => {
    render(<HomeAboutSnapshotSection />);

    expect(screen.queryByText("AI Tools (Recent Focus)")).not.toBeInTheDocument();
    expect(screen.queryByRole("list", { name: "AI toolbelt" })).not.toBeInTheDocument();
  });

  it("keeps a short ai tools one-liner in the ai card outcome", () => {
    render(<HomeAboutSnapshotSection />);

    expect(
      screen.getByText(/Recent stack: Codex, Claude Code, MCP Servers, and ChatGPT Integrations\./),
    ).toBeInTheDocument();
  });

  it("does not render prototype comparison controls", () => {
    render(<HomeAboutSnapshotSection />);

    expect(screen.queryByText("Prototype Comparison")).not.toBeInTheDocument();
    expect(screen.queryByRole("tablist", { name: "Capability section prototypes" })).not.toBeInTheDocument();
  });

  it("does not render legacy skill area headings", () => {
    render(<HomeAboutSnapshotSection />);

    expect(screen.queryByRole("heading", { name: "Front-End" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Back-End" })).not.toBeInTheDocument();
  });
});
