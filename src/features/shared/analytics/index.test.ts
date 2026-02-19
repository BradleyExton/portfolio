import { afterEach, describe, expect, it, vi } from "vitest";
import {
  trackContactCtaClick,
  trackContactFormStart,
  trackContactFormSubmit,
} from "./index";

const setGtag = (fn: ((...args: unknown[]) => void) | undefined) => {
  (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag = fn;
};

describe("analytics tracking", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    setGtag(undefined);
  });

  it("does not fire events when analytics is disabled by environment", () => {
    vi.stubEnv("NODE_ENV", "test");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    const gtag = vi.fn();
    setGtag(gtag);

    trackContactFormStart();

    expect(gtag).not.toHaveBeenCalled();
  });

  it("does not fire events when measurement ID is missing", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "");
    const gtag = vi.fn();
    setGtag(gtag);

    trackContactFormSubmit("hiring");

    expect(gtag).not.toHaveBeenCalled();
  });

  it("fires expected contact events when analytics is enabled", () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_GA_MEASUREMENT_ID", "G-TEST123");
    const gtag = vi.fn();
    setGtag(gtag);

    trackContactCtaClick({
      ctaType: "call",
      destinationKind: "calendar",
    });
    trackContactFormSubmit("");

    expect(gtag).toHaveBeenNthCalledWith(1, "event", "contact_cta_click", {
      cta_type: "call",
      section: "contact_options",
      destination_kind: "calendar",
    });
    expect(gtag).toHaveBeenNthCalledWith(2, "event", "contact_form_submit", {
      topic: "unknown",
      section: "contact_form",
    });
  });
});

