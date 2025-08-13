import { Handler } from "@netlify/functions";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyPlaylistResponse {
  tracks: {
    items: Array<{
      track: {
        id: string;
        name: string;
        external_urls: {
          spotify: string;
        };
        album: {
          images: Array<{
            url: string;
            height: number;
            width: number;
          }>;
        };
        artists: Array<{
          name: string;
        }>;
      };
    }>;
  };
}

// Get Spotify access token with optimized timeout for Netlify
async function getSpotifyToken(): Promise<string> {
  // Use Netlify's recommended way to access env vars
  const clientId = Netlify.env.get("SPOTIFY_CLIENT_ID") || process.env.SPOTIFY_CLIENT_ID || "4867425ccf554368bcc7274926d45738";
  const clientSecret = Netlify.env.get("SPOTIFY_CLIENT_SECRET") || process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientSecret || clientSecret === "YOUR_SPOTIFY_CLIENT_SECRET_HERE") {
    throw new Error("Spotify credentials not configured");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // Reduced timeout for Netlify

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to get Spotify token: ${response.status} - ${errorText}`,
      );
    }

    const data: SpotifyTokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    clearTimeout(timeoutId);
    if ((error as Error).name === "AbortError") {
      throw new Error("Spotify token request timeout");
    }
    throw error;
  }
}

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
    const playlistId = event.path.split("/").pop();

    if (!playlistId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Playlist ID is required" }),
      };
    }

    // Get access token
    const token = await getSpotifyToken();

    // Fetch playlist data with reduced timeout for Netlify
    const playlistController = new AbortController();
    const playlistTimeoutId = setTimeout(
      () => playlistController.abort(),
      8000,
    );

    let response: Response;
    try {
      response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items(track(id,name,external_urls,album(images),artists(name)))`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          signal: playlistController.signal,
        },
      );

      clearTimeout(playlistTimeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Spotify API error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      clearTimeout(playlistTimeoutId);
      if ((error as Error).name === "AbortError") {
        throw new Error("Spotify playlist request timeout");
      }
      throw error;
    }

    const data: SpotifyPlaylistResponse = await response.json();

    // Transform the data to match frontend interface
    const tracks = data.tracks.items.map((item) => ({
      id: item.track.id,
      name: item.track.name,
      spotifyUrl: item.track.external_urls.spotify,
      albumCover:
        item.track.album.images[0]?.url ||
        "https://via.placeholder.com/640x640/333/fff?text=No+Image",
      artist: item.track.artists.map((artist) => artist.name).join(", "),
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ tracks }),
    };
  } catch (error) {
    console.error("Error fetching Spotify playlist:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: "Failed to fetch playlist",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
    };
  }
};
