import { beforeEach, describe, expect, it } from "vitest";
import { consumeRateLimit, getRequestIp, resetRateLimits } from "./rateLimit";

beforeEach(() => {
  resetRateLimits();
});

describe("getRequestIp", () => {
  it("takes the first entry of x-forwarded-for", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 70.41.3.18" });

    expect(getRequestIp(headers)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip, then to a placeholder", () => {
    expect(getRequestIp(new Headers({ "x-real-ip": "203.0.113.9" }))).toBe("203.0.113.9");
    expect(getRequestIp(new Headers())).toBe("unknown");
  });
});

describe("consumeRateLimit", () => {
  it("allows a burst up to the limit and then blocks", () => {
    const now = 1_000;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      expect(consumeRateLimit("203.0.113.5", now)).toBe(true);
    }

    expect(consumeRateLimit("203.0.113.5", now)).toBe(false);
  });

  it("keeps separate counts per caller", () => {
    const now = 1_000;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      consumeRateLimit("203.0.113.5", now);
    }

    expect(consumeRateLimit("203.0.113.9", now)).toBe(true);
  });

  it("lets a blocked caller through once the window rolls over", () => {
    const now = 1_000;

    for (let attempt = 0; attempt < 5; attempt += 1) {
      consumeRateLimit("203.0.113.5", now);
    }

    expect(consumeRateLimit("203.0.113.5", now + 10 * 60 * 1000)).toBe(true);
  });
});
