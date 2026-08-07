import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";

const nextConfig: NextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL(".", import.meta.url)),
  // Pin the workspace root so builds work from git worktrees, where Next's
  // root inference walks past the checkout and fails to resolve packages.
  turbopack: {
    root: fileURLToPath(new URL(".", import.meta.url)),
  },
  images: {
    qualities: [70, 75],
    // Optimized variants are keyed by src + width + quality, so a long TTL is safe:
    // changing an image changes its request URL.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
