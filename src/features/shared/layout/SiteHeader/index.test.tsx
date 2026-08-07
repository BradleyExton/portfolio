import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

let mockedPathname = "/";

vi.mock("next/navigation", () => ({
  usePathname: () => mockedPathname,
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

  it("locks body scroll only while the mobile menu is open", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const toggleButton = screen.getByRole("button", { name: "Toggle menu" });
    expect(document.body.style.overflow).toBe("");

    await user.click(toggleButton);
    expect(document.body.style.overflow).toBe("hidden");

    await user.click(toggleButton);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the mobile menu on Escape and restores focus to the toggle", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const toggleButton = screen.getByRole("button", { name: "Toggle menu" });
    await user.click(toggleButton);
    expect(toggleButton).toHaveAttribute("aria-expanded", "true");

    await user.keyboard("{Escape}");
    expect(toggleButton).toHaveAttribute("aria-expanded", "false");
    expect(toggleButton).toHaveFocus();
    expect(document.body.style.overflow).toBe("");
  });

  it("keeps mobile menu links out of the tab order while closed", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const menu = document.getElementById("mobile-menu");
    const panel = menu?.querySelector("[inert]");
    expect(panel).not.toBeNull();

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(menu?.querySelector("[inert]")).toBeNull();
  });
});
