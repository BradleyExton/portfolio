import React from "react";
import { act, render, screen } from "@testing-library/react";
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

const scrollTo = (y: number) => {
  window.scrollY = y;
  window.dispatchEvent(new Event("scroll"));
};

describe("SiteHeader", () => {
  beforeEach(() => {
    mockedPathname = "/";
    window.scrollY = 0;
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

  it("condenses the header once the page scrolls past the threshold", async () => {
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav.className).toContain("bg-surface/0");

    await act(async () => {
      scrollTo(200);
    });
    expect(nav.className).toContain("backdrop-blur-md");
    expect(nav.className).not.toContain("bg-surface/0");

    await act(async () => {
      scrollTo(0);
    });
    expect(nav.className).toContain("bg-surface/0");
  });

  it("keeps the header at full height while the mobile menu is open", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    await act(async () => {
      scrollTo(200);
    });

    // The row is the flex container holding the lockup and the toggle.
    const row = screen.getByRole("button", { name: "Toggle menu" }).parentElement;
    expect(row?.className).toContain("py-3");

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    expect(row?.className).toContain("py-5");
  });

  it("retires the header on downward scroll and brings it back on upward", async () => {
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Primary" });
    expect(nav.className).toContain("translate-y-0");

    await act(async () => {
      scrollTo(400);
    });
    expect(nav.className).toContain("-translate-y-full");

    await act(async () => {
      scrollTo(340);
    });
    expect(nav.className).not.toContain("-translate-y-full");
  });

  it("stays put near the top of the page and while the menu is open", async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: "Primary" });

    // Above the hide threshold the header has nowhere useful to retire to.
    await act(async () => {
      scrollTo(60);
    });
    expect(nav.className).not.toContain("-translate-y-full");

    await user.click(screen.getByRole("button", { name: "Toggle menu" }));
    await act(async () => {
      scrollTo(600);
    });
    expect(nav.className).not.toContain("-translate-y-full");
  });

  it("keeps the whole name as the home link's accessible name", () => {
    render(<SiteHeader />);

    // The brand-coloured initials split the name across spans, which would
    // otherwise compute as "B radley E xton".
    expect(screen.getByRole("link", { name: "Bradley Exton" })).toBeInTheDocument();
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
