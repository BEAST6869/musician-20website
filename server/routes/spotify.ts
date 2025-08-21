import { Router, Request, Response } from "express";
import { spotifyTokenManager } from "../lib/spotify-token-manager.js";

export const spotifyRouter = Router();

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

interface SpotifyArtistAlbumsResponse {
  items: Array<{
    id: string;
    name: string;
    release_date: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
    external_urls: {
      spotify: string;
    };
  }>;
}

interface SpotifySearchResponse {
  tracks?: {
    items: Array<{
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
    }>;
  };
}

/**
 * Generic Spotify API request handler with automatic token management
 */
async function makeSpotifyRequest(endpoint: string, options: RequestInit = {}) {
  const token = await spotifyTokenManager.getAccessToken();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`https://api.spotify.com/v1/${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Spotify API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if ((error as Error).name === "AbortError") {
      throw new Error("Spotify API request timeout");
    }

    throw error;
  }
}

/**
 * Get playlist tracks
 * GET /api/spotify/playlist/:playlistId
 */
spotifyRouter.get(
  "/playlist/:playlistId",
  async (req: Request, res: Response) => {
    try {
      const { playlistId } = req.params;

      if (!playlistId) {
        return res.status(400).json({ error: "Playlist ID is required" });
      }

      console.log(`🎵 Fetching playlist: ${playlistId}`);

      const data: SpotifyPlaylistResponse = await makeSpotifyRequest(
        `playlists/${playlistId}?fields=tracks.items(track(id,name,external_urls,album(images),artists(name)))`,
      );

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

      res.json({ tracks, total: tracks.length });
    } catch (error) {
      console.error("❌ Error fetching Spotify playlist:", error);
      res.status(500).json({
        error: "Failed to fetch playlist",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

/**
 * Get artist albums
 * GET /api/spotify/artist/:artistId/albums
 */
spotifyRouter.get(
  "/artist/:artistId/albums",
  async (req: Request, res: Response) => {
    try {
      const { artistId } = req.params;
      const { limit = "20", offset = "0" } = req.query;

      if (!artistId) {
        return res.status(400).json({ error: "Artist ID is required" });
      }

      console.log(`🎤 Fetching albums for artist: ${artistId}`);

      const data: SpotifyArtistAlbumsResponse = await makeSpotifyRequest(
        `artists/${artistId}/albums?include_groups=album,single&market=US&limit=${limit}&offset=${offset}`,
      );

      const albums = data.items.map((album) => ({
        id: album.id,
        name: album.name,
        releaseDate: album.release_date,
        spotifyUrl: album.external_urls.spotify,
        image:
          album.images[0]?.url ||
          "https://via.placeholder.com/640x640/333/fff?text=No+Image",
      }));

      res.json({ albums, total: albums.length });
    } catch (error) {
      console.error("❌ Error fetching artist albums:", error);
      res.status(500).json({
        error: "Failed to fetch artist albums",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
);

/**
 * Search tracks
 * GET /api/spotify/search?q=query&type=track&limit=20
 */
spotifyRouter.get("/search", async (req: Request, res: Response) => {
  try {
    const { q, type = "track", limit = "20", offset = "0" } = req.query;

    if (!q) {
      return res.status(400).json({ error: "Search query is required" });
    }

    console.log(`🔍 Searching Spotify: "${q}"`);

    const data: SpotifySearchResponse = await makeSpotifyRequest(
      `search?q=${encodeURIComponent(q as string)}&type=${type}&limit=${limit}&offset=${offset}&market=US`,
    );

    if (type === "track" && data.tracks) {
      const tracks = data.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        spotifyUrl: track.external_urls.spotify,
        albumCover:
          track.album.images[0]?.url ||
          "https://via.placeholder.com/640x640/333/fff?text=No+Image",
        artist: track.artists.map((artist) => artist.name).join(", "),
      }));

      res.json({ tracks, total: tracks.length });
    } else {
      res.json({ results: data, total: 0 });
    }
  } catch (error) {
    console.error("❌ Error searching Spotify:", error);
    res.status(500).json({
      error: "Failed to search Spotify",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Get token status (for debugging)
 * GET /api/spotify/token/status
 */
spotifyRouter.get("/token/status", async (req: Request, res: Response) => {
  try {
    const tokenInfo = spotifyTokenManager.getTokenInfo();
    res.json({
      hasToken: tokenInfo.hasToken,
      expiresIn: tokenInfo.expiresIn,
      clientIdConfigured: !!process.env.SPOTIFY_CLIENT_ID,
      clientSecretConfigured: !!process.env.SPOTIFY_CLIENT_SECRET,
    });
  } catch (error) {
    console.error("❌ Error getting token status:", error);
    res.status(500).json({
      error: "Failed to get token status",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

/**
 * Force token refresh (for debugging)
 * POST /api/spotify/token/refresh
 */
spotifyRouter.post("/token/refresh", async (req: Request, res: Response) => {
  try {
    spotifyTokenManager.clearCache();
    const token = await spotifyTokenManager.getAccessToken();
    const tokenInfo = spotifyTokenManager.getTokenInfo();

    res.json({
      message: "Token refreshed successfully",
      expiresIn: tokenInfo.expiresIn,
    });
  } catch (error) {
    console.error("❌ Error refreshing token:", error);
    res.status(500).json({
      error: "Failed to refresh token",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
