// Spotify API integration using secure backend endpoints
// All Spotify API calls now go through our backend for security

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

// Track data from playlist
export interface ProcessedTrack {
  id: string;
  name: string;
  spotifyUrl: string;
  albumCover: string;
  artist: string;
}

import { SPOTIFY_CONFIG } from "./spotify-config";

class SpotifyAPI {
  private apiBase: string;

  constructor(apiBase: string) {
    this.apiBase = apiBase;
  }

  /**
   * Fetch playlist tracks from our backend API
   */
  async getPlaylistTracks(playlistId: string): Promise<ProcessedTrack[]> {
    try {
      const response = await fetch(`${this.apiBase}/playlist/${playlistId}`);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch playlist: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      return data.tracks || [];
    } catch (error) {
      console.error("Error fetching playlist:", error);
      throw error;
    }
  }

  /**
   * Fetch artist releases - this would need a backend endpoint
   * For now, returning empty array until backend endpoint is implemented
   */
  async getArtistReleases(
    artistId: string,
    limit: number = 12,
  ): Promise<ProcessedRelease[]> {
    try {
      // This would call a backend endpoint like /api/spotify/artist/{artistId}/releases
      // For now, return empty array to prevent TypeScript errors
      console.warn("Artist releases endpoint not yet implemented in backend");
      return [];
    } catch (error) {
      console.error("Error fetching artist releases:", error);
      throw error;
    }
  }
}

// Initialize Spotify API client with backend base URL
export const spotifyAPI = new SpotifyAPI(SPOTIFY_CONFIG.API_BASE);

// Artist ID - this should be moved to backend configuration eventually
export const ARTIST_ID = "31lyqvgaccgiuua2s2kdoxr6bsoy";
