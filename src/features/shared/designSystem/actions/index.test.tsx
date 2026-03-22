import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { ActionLink } from "./index";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

describe("ActionLink", () => {
  it("renders internal routes as links", () => {
    render(<ActionLink href="/contact">Get in touch</ActionLink>);

    expect(screen.getByRole("link", { name: /get in touch/i })).toHaveAttribute("href", "/contact");
  });

  it("renders external destinations as anchors", () => {
    render(
      <ActionLink href="mailto:bradley@example.com" target="_blank" rel="noopener noreferrer">
        Email me
      </ActionLink>,
    );

    const link = screen.getByRole("link", { name: /email me/i });
    expect(link).toHaveAttribute("href", "mailto:bradley@example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
