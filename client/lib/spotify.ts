// Spotify Web API integration using Client Credentials Flow
// ⚠️ WARNING: In production, client_secret should NEVER be exposed in frontend code!
// Move token generation to backend/serverless function for security.

// Spotify API Types
export interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

export interface SpotifyExternalUrls {
  spotify: string;
}

export interface SpotifyArtist {
  id: string;
  name: string;
  type: string;
  uri: string;
  external_urls: SpotifyExternalUrls;
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  album_type: "album" | "single" | "compilation";
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  images: SpotifyImage[];
  external_urls: SpotifyExternalUrls;
  artists: SpotifyArtist[];
}

export interface SpotifyArtistAlbumsResponse {
  items: SpotifyAlbum[];
  total: number;
  limit: number;
  offset: number;
  next: string | null;
  previous: string | null;
}

export interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Processed release data for our UI
export interface ProcessedRelease {
  id: string;
  title: string;
  type: "Single" | "Album" | "Compilation";
  year: string;
  spotifyUrl: string;
  artwork: string;
  releaseDate: string;
}

class SpotifyAPI {
  private clientId: string;
  private clientSecret: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private readonly DEFAULT_TIMEOUT = 10000; // 10 seconds
  private readonly CACHE_DURATION = 300000; // 5 minutes

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Validate that credentials are properly configured
   */
  private validateCredentials(): void {
    if (!this.clientId || this.clientId === "YOUR_SPOTIFY_CLIENT_ID_HERE") {
      throw new Error(
        "Spotify CLIENT_ID not configured. Please update client/lib/spotify-config.ts",
      );
    }
    if (
      !this.clientSecret ||
      this.clientSecret === "YOUR_SPOTIFY_CLIENT_SECRET_HERE"
    ) {
      throw new Error(
        "Spotify CLIENT_SECRET not configured. Please update client/lib/spotify-config.ts",
      );
    }
  }

  /**
   * Fetch with timeout and retry logic
   */
  private async fetchWithTimeout(
    url: string,
    options: RequestInit,
    timeout: number = this.DEFAULT_TIMEOUT,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if ((error as Error).name === "AbortError") {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Get cached data if available and not expired
   */
  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() < cached.expiry) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  /**
   * Set data in cache
   */
  private setCachedData(key: string, data: any): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.CACHE_DURATION,
    });
  }

  /**
   * Get access token using Client Credentials Flow
   * ⚠️ SECURITY WARNING: This exposes client_secret in frontend!
   * In production, move this to backend/serverless function.
   */
  private async getAccessToken(): Promise<string> {
    // Validate credentials before making API call
    this.validateCredentials();

    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const response = await this.fetchWithTimeout(
        "https://accounts.spotify.com/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
          },
          body: "grant_type=client_credentials",
        },
      );

      if (!response.ok) {
        let errorMessage = `Failed to get Spotify token: ${response.status} ${response.statusText}`;

        try {
          const errorData = await response.json();
          if (errorData.error_description) {
            errorMessage += ` - ${errorData.error_description}`;
          }
        } catch (e) {
          // If we can't parse error response, use the original message
        }

        throw new Error(errorMessage);
      }

      const data: SpotifyTokenResponse = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = Date.now() + data.expires_in * 1000 - 60000; // Subtract 1 minute for safety

      return this.accessToken;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred while getting Spotify token");
    }
  }

  /**
   * Fetch artist's albums and singles from Spotify with caching
   */
  async getArtistReleases(
    artistId: string,
    limit: number = 12,
  ): Promise<ProcessedRelease[]> {
    // Validate artist ID
    if (!artistId || artistId === "YOUR_SPOTIFY_ARTIST_ID_HERE") {
      throw new Error(
        "Spotify ARTIST_ID not configured. Please update client/lib/spotify-config.ts with your actual Spotify Artist ID",
      );
    }

    // Check cache first
    const cacheKey = `releases-${artistId}-${limit}`;
    const cachedData = this.getCachedData(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const token = await this.getAccessToken();

      const response = await this.fetchWithTimeout(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=${limit}&offset=0`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

        throw new Error(errorMessage);
      }

      const data: SpotifyArtistAlbumsResponse = await response.json();

      // Process and format the releases
      const processedReleases = data.items.map(
        (album): ProcessedRelease => ({
          id: album.id,
          title: album.name,
          type: this.formatAlbumType(album.album_type),
          year: album.release_date.split("-")[0],
          spotifyUrl: album.external_urls.spotify,
          artwork:
            album.images[0]?.url ||
            "https://via.placeholder.com/300x300/333/fff?text=No+Image",
          releaseDate: album.release_date,
        }),
      );

      // Cache the processed data
      this.setCachedData(cacheKey, processedReleases);
      return processedReleases;
    } catch (error) {
      console.error("Error fetching Spotify releases:", error);
      throw error;
    }
  }

  private formatAlbumType(type: string): "Single" | "Album" | "Compilation" {
    switch (type) {
      case "single":
        return "Single";
      case "album":
        return "Album";
      case "compilation":
        return "Compilation";
      default:
        return "Single";
    }
  }
}

import { SPOTIFY_CONFIG } from "./spotify-config";

// Note: Spotify API client moved to Netlify Functions for security
// Client-side code should use ApiClient instead
// export const spotifyAPI = new SpotifyAPI(
//   SPOTIFY_CONFIG.CLIENT_ID,
//   CLIENT_SECRET, // This would be handled server-side
// );

// Export artist ID for component use
export const ARTIST_ID = SPOTIFY_CONFIG.ARTIST_ID;
