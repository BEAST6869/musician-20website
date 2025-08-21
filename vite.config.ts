import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
    proxy: {
      // Proxy API requests to the Express server in development
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: "dist/spa",
    chunkSizeWarningLimit: 1000,
    sourcemap: false,
    minify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["@radix-ui/react-slot", "@radix-ui/react-toast"],
          animations: ["framer-motion"],
        },
      },
      onwarn(warning, warn) {
        // Suppress chunk size warnings that can hang builds
        if (warning.code === "LARGE_BUNDLE") return;
        warn(warning);
      },
    },
    reportCompressedSize: false,
    emptyOutDir: true,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
  define: {
    // Define API URL for frontend
    __API_URL__: JSON.stringify(
      mode === "production" 
        ? "" // Same origin in production
        : "http://localhost:3001"
    ),
  },
}));
