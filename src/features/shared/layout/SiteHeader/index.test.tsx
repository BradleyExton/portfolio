import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

let mockedPathname = "/";
let mockedNavFx: string | null = null;

vi.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
  useSearchParams: () => ({
    get: (key: string) => (key === "navfx" ? mockedNavFx : null),
  }),
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

import SiteHeader from "./index";

describe("SiteHeader", () => {
  beforeEach(() => {
    mockedPathname = "/";
    mockedNavFx = null;
  });

  it("uses hash links on home route", () => {
    render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute(
      "href",
      "#about",
    );
    expect(
      screen.getAllByRole("link", { name: "Experience" })[0],
    ).toHaveAttribute("href", "#experience");
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toHaveAttribute(
      "href",
      "#services",
    );
    expect(
      screen.getAllByRole("link", { name: "Get In Touch" })[0],
    ).toHaveAttribute("href", "#contact");
  });

  it("uses route links away from home", () => {
    mockedPathname = "/about";
    render(<SiteHeader />);

    expect(screen.getAllByRole("link", { name: "About" })[0]).toHaveAttribute(
      "href",
      "/about",
    );
    expect(
      screen.getAllByRole("link", { name: "Experience" })[0],
    ).toHaveAttribute("href", "/#experience");
    expect(screen.getAllByRole("link", { name: "Services" })[0]).toHaveAttribute(
      "href",
      "/services",
    );
    expect(
      screen.getAllByRole("link", { name: "Get In Touch" })[0],
    ).toHaveAttribute("href", "/contact");
  });

  it("toggles mobile menu button state", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const toggleButton = screen.getByRole("button", { name: "Toggle menu" });
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
  });

  it("uses pill hover variant when navfx=pill is set", () => {
    mockedNavFx = "pill";
    render(<SiteHeader />);

    const aboutLink = screen.getAllByRole("link", { name: "About" })[0];
    expect(aboutLink.className).toContain("after:bg-brand/12");
  });
});
