import express from "express";
import { handleDemo } from "./routes/demo";
import { handleSpotifyPlaylist } from "./routes/spotify";

export function createServer() {
  const app = express();

  // Enable JSON parsing
  app.use(express.json());

  // API Routes
  app.get("/api/ping", (req, res) => {
    res.json({ message: "pong" });
  });

  app.get("/api/demo", handleDemo);
  app.get("/api/spotify/playlist/:playlistId", handleSpotifyPlaylist);

  return app;
}

// For production builds
if (import.meta.env.PROD) {
  const app = createServer();
  const port = process.env.PORT || 8080;
  
  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
}
