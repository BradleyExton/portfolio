import type { MetadataRoute } from "next";
import { publicEnv } from "@/config/publicEnv";
import { profile } from "@/copy/profile";

export default function robots(): MetadataRoute.Robots {
  if (publicEnv.underConstruction) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${profile.links.website}/sitemap.xml`,
  };
}
