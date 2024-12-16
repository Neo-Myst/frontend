import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom", // Use JSDOM for React testing
    setupFiles: "./setupTests.ts", // Load Jest DOM matchers before tests
  },
});
