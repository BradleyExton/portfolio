import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    globals: true,
    include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    server: {
      deps: {
        // Ships ESM that imports extensionless "next/link"; inlining lets
        // Vite resolve it instead of Node's stricter ESM resolver.
        inline: ["next-view-transitions"],
      },
    },
  },
});
