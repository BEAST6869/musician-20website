import { RequestHandler } from "express";

export const handleDemo: RequestHandler = (req, res) => {
  res.json({ 
    message: "Hello from the backend!",
    timestamp: new Date().toISOString()
  });
};
