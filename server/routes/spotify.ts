import { RequestHandler } from "express";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyTokenCache {
  accessToken: string;
  expiresAt: number;
}

// In-memory token cache
let tokenCache: SpotifyTokenCache | null = null;

/**
 * Get access token using client credentials flow
 */
async function getSpotifyAccessToken(): Promise<string> {
  // Check if we have a valid cached token
  if (tokenCache && tokenCache.expiresAt > Date.now()) {
    return tokenCache.accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials not configured");
  }

  try {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: "grant_type=client_credentials",
    });

    if (!response.ok) {
      throw new Error(`Failed to get Spotify token: ${response.status}`);
    }

    const data: SpotifyTokenResponse = await response.json();

    // Cache the token with a 5-minute buffer before expiry
    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + (data.expires_in - 300) * 1000,
    };

    return data.access_token;
  } catch (error) {
    console.error("Error getting Spotify access token:", error);
    throw error;
  }
}

/**
 * Fetch playlist data from Spotify API
 */
export const handleSpotifyPlaylist: RequestHandler = async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!playlistId) {
      return res.status(400).json({ error: "Playlist ID is required" });
    }

    const accessToken = await getSpotifyAccessToken();

    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items(track(id,name,external_urls,album(images),artists(name)))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      let errorMessage = `Spotify API error: ${response.status} ${response.statusText}`;

      try {
        const errorData = await response.json();
        if (errorData.error?.message) {
          errorMessage += ` - ${errorData.error.message}`;
        }
      } catch (e) {
        // If we can't parse error response, use the original message
      }

      return res.status(response.status).json({ error: errorMessage });
    }

    const data = await response.json();

    // Process and format the tracks
    const tracks = data.tracks.items
      .filter((item: any) => item.track && item.track.id)
      .map((item: any) => ({
        id: item.track.id,
        name: item.track.name,
        spotifyUrl: item.track.external_urls.spotify,
        albumCover:
          item.track.album.images[0]?.url ||
          "https://via.placeholder.com/300x300/333/fff?text=No+Image",
        artist: item.track.artists[0]?.name || "Unknown Artist",
      }));

    res.json({ tracks });
  } catch (error) {
    console.error("Error fetching Spotify playlist:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch playlist";
    res.status(500).json({ error: errorMessage });
  }
};
