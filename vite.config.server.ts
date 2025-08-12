import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    ssr: true,
    outDir: "dist/server",
    target: "node18",
    rollupOptions: {
      input: "./server/node-build.ts",
      output: {
        entryFileNames: "node-build.mjs",
        format: "es",
      },
      external: ["express"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
});
