import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { contactCopy } from "@/copy/contact";
import { profile } from "@/copy/profile";
import { trackContactCtaClick } from "@/features/shared/analytics";
import { ContactOptionsSection } from "./index";

vi.mock("@/features/shared/analytics", () => ({
  trackContactCtaClick: vi.fn(),
}));

describe("ContactOptionsSection", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("tracks call CTA clicks with calendar destination when URL is provided", async () => {
    const user = userEvent.setup();

    render(<ContactOptionsSection calcomUrl="https://cal.com/test/30min" />);

    await user.click(screen.getByRole("link", { name: contactCopy.options.call.cta }));

    expect(trackContactCtaClick).toHaveBeenCalledWith({
      ctaType: "call",
      destinationKind: "calendar",
    });
  });

  it("tracks email and LinkedIn CTA clicks", async () => {
    const user = userEvent.setup();

    render(<ContactOptionsSection calcomUrl="https://cal.com/test/30min" />);

    const emailLink = screen.getByRole("link", { name: profile.email });
    const linkedinLink = screen.getByRole("link", { name: contactCopy.options.linkedin.cta });
    // Prevent jsdom navigation side effects while still exercising onClick analytics handlers.
    emailLink.addEventListener("click", (event) => event.preventDefault());
    linkedinLink.addEventListener("click", (event) => event.preventDefault());

    await user.click(emailLink);
    await user.click(linkedinLink);

    expect(trackContactCtaClick).toHaveBeenNthCalledWith(1, {
      ctaType: "email",
      destinationKind: "mailto",
    });
    expect(trackContactCtaClick).toHaveBeenNthCalledWith(2, {
      ctaType: "linkedin",
      destinationKind: "external",
    });
  });
});
