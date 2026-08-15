import type { MetadataRoute } from "next";
import { profile } from "@/copy/profile";

type SitemapRoute = {
  path: string;
  changeFrequency: "monthly" | "yearly";
  priority: number;
};

// Ordered by how much each route matters as a search or ad landing page.
const routes: SitemapRoute[] = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.8 },
  { path: "/about", changeFrequency: "yearly", priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${profile.links.website}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
