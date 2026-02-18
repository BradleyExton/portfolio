import { defineConfig, devices } from "@playwright/test";
const projectRoot = __dirname;

export default defineConfig({
  testDir: "./e2e",
  timeout: 30_000,
  fullyParallel: false,
  use: {
    baseURL: "http://127.0.0.1:3001",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: "npm run build && npm run start -- --hostname 127.0.0.1 --port 3001",
    cwd: projectRoot,
    url: "http://127.0.0.1:3001",
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
