#!/usr/bin/env node

// Simple production startup script
process.env.NODE_ENV = "production";

// Import and start the server
import("./dist/server/index.js").catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
