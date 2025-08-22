import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: ["./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
    chunkSizeWarningLimit: 1000,
<<<<<<< HEAD
=======
    sourcemap: false, // Disable sourcemaps for faster builds
    minify: "esbuild", // Use esbuild for faster minification
>>>>>>> 19d9491b5e7b76d4e4db88fed63bfd06aa65f5fc
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
<<<<<<< HEAD
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
          ],
          utils: ["clsx", "tailwind-merge", "class-variance-authority"],
=======
          ui: ["@radix-ui/react-slot", "@radix-ui/react-toast"],
          animations: ["framer-motion"],
>>>>>>> 19d9491b5e7b76d4e4db88fed63bfd06aa65f5fc
        },
      },
    },
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      const app = createServer();

      // Add Express app as middleware to Vite dev server
      server.middlewares.use(app);
    },
  };
}
