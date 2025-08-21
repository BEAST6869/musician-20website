import { Router, Request, Response } from "express";

export const healthRouter = Router();

/**
 * Health check endpoint
 * GET /api/health
 */
healthRouter.get("/", (req: Request, res: Response) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
    version: process.env.npm_package_version || "unknown",
  });
});

/**
 * Ping endpoint (legacy support)
 * GET /api/ping
 */
healthRouter.get("/ping", (req: Request, res: Response) => {
  res.json({ 
    message: "pong",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Demo endpoint (legacy support)
 * GET /api/demo
 */
healthRouter.get("/demo", (req: Request, res: Response) => {
  res.json({
    message: "Demo endpoint working!",
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || "development",
    features: {
      spotify: !!process.env.SPOTIFY_CLIENT_ID,
      cors: true,
      healthCheck: true,
    },
  });
});
