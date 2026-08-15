import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import { profile } from "@/copy/profile";

describe("sitemap", () => {
  it("lists every primary route once", () => {
    const urls = sitemap().map((entry) => entry.url);

    expect(urls).toEqual([
      profile.links.website,
      `${profile.links.website}/services`,
      `${profile.links.website}/contact`,
      `${profile.links.website}/about`,
    ]);
  });

  it("uses absolute canonical-host URLs", () => {
    for (const entry of sitemap()) {
      expect(entry.url.startsWith("https://")).toBe(true);
      expect(new URL(entry.url).host).toBe(new URL(profile.links.website).host);
    }
  });

  it("ranks the home route highest", () => {
    const [home] = sitemap();

    expect(home.priority).toBe(1);
    expect(home.lastModified).toBeInstanceOf(Date);
  });
});
