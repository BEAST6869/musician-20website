import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { spotifyRouter } from "./routes/spotify.js";
import { healthRouter } from "./routes/health.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors({
    origin: process.env.NODE_ENV === "production" 
      ? [process.env.FRONTEND_URL, "https://*.railway.app"].filter(Boolean)
      : ["http://localhost:3000", "http://localhost:8080", "http://localhost:5173"],
    credentials: true
  }));
  
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
  });

  // Health check routes
  app.use("/api/health", healthRouter);
  app.use("/api", healthRouter); // Legacy ping route

  // Spotify API routes
  app.use("/api/spotify", spotifyRouter);

  // Serve static files in production
  if (process.env.NODE_ENV === "production") {
    const staticPath = path.join(__dirname, "../dist/spa");
    app.use(express.static(staticPath));
    
    // SPA fallback - serve index.html for all non-API routes
    app.get("*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(staticPath, "index.html"));
      } else {
        res.status(404).json({ error: "API endpoint not found" });
      }
    });
  }

  // Global error handler
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ 
      error: "Internal server error",
      message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong"
    });
  });

  return app;
}

// Start server if running directly
if (process.env.NODE_ENV === "production" || process.argv[1] === fileURLToPath(import.meta.url)) {
  const app = createServer();
  const port = process.env.PORT || 8080;

  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server running on port ${port}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`🎵 Spotify integration: ${process.env.SPOTIFY_CLIENT_ID ? "✅" : "❌"}`);
  });
}
