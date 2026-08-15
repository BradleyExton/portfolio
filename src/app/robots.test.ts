import { afterEach, describe, expect, it, vi } from "vitest";
import { profile } from "@/copy/profile";

const loadRobots = async () => {
  vi.resetModules();
  const robotsModule = await import("@/app/robots");
  return robotsModule.default;
};

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("robots", () => {
  it("allows crawling and points at the sitemap", async () => {
    vi.stubEnv("UNDER_CONSTRUCTION", "false");
    const robots = await loadRobots();

    expect(robots()).toEqual({
      rules: [{ userAgent: "*", allow: "/" }],
      sitemap: `${profile.links.website}/sitemap.xml`,
    });
  });

  it("blocks crawling while the site is under construction", async () => {
    vi.stubEnv("UNDER_CONSTRUCTION", "true");
    const robots = await loadRobots();
    const result = robots();

    expect(result.rules).toEqual([{ userAgent: "*", disallow: "/" }]);
    expect(result.sitemap).toBeUndefined();
  });
});
