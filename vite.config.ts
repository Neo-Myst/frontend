import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for importing from the `src` directory
    },
  },
  server: {
    port: 5173, // Specify the development server port
    open: true, // Automatically open the browser when the server starts
  },
  build: {
    outDir: "dist", // Specify the output directory for production build
    sourcemap: true, // Generate source maps for debugging
    rollupOptions: {
      external: [/.*\.test\.tsx?$/], // Exclude test files
    },
  },
});
