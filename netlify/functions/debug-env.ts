import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  const envCheck = {
    spotifyClientId: !!process.env.SPOTIFY_CLIENT_ID,
    spotifyClientSecret: !!process.env.SPOTIFY_CLIENT_SECRET,
    nodeEnv: process.env.NODE_ENV || "unknown",
    netlifyDev: !!process.env.NETLIFY_DEV,
    availableEnvVars: Object.keys(process.env).filter(key => 
      key.includes('SPOTIFY') || key.includes('NETLIFY')
    ),
    timestamp: new Date().toISOString(),
  };

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(envCheck),
  };
};
