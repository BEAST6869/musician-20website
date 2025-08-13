import { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {
  // Enable CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Content-Type": "application/json",
  };

  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const demoData = {
      message: "Hello from Netlify Functions!",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "development",
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(demoData),
    };
  } catch (error) {
    console.error("Error in demo function:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
