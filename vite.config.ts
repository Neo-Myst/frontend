// vite.config.ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    port: 5173, // Specify the development server port
    open: true, // Automatically open the browser when the server starts
  },

  build: {
    outDir: "dist",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("react-plotly.js")) {
            return "react-plotly";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },

  test: {
    globals: true,
    environment: "jsdom", 
    setupFiles: "./setupTests.ts",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      exclude: ["**/node_modules/**", "**/dist/**", "**/coverage/**"],
    },
  },
});
