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
  album_type: 'album' | 'single' | 'compilation';
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
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
  type: 'Single' | 'Album' | 'Compilation';
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

  constructor(clientId: string, clientSecret: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }

  /**
   * Get access token using Client Credentials Flow
   * ⚠️ SECURITY WARNING: This exposes client_secret in frontend!
   * In production, move this to backend/serverless function.
   */
  private async getAccessToken(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`
      },
      body: 'grant_type=client_credentials'
    });

    if (!response.ok) {
      throw new Error(`Failed to get Spotify token: ${response.status} ${response.statusText}`);
    }

    const data: SpotifyTokenResponse = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Subtract 1 minute for safety

    return this.accessToken;
  }

  /**
   * Fetch artist's albums and singles from Spotify
   */
  async getArtistReleases(artistId: string, limit: number = 12): Promise<ProcessedRelease[]> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(
        `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=US&limit=${limit}&offset=0`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Spotify API error: ${response.status} ${response.statusText}`);
      }

      const data: SpotifyArtistAlbumsResponse = await response.json();

      // Process and format the releases
      return data.items.map((album): ProcessedRelease => ({
        id: album.id,
        title: album.name,
        type: this.formatAlbumType(album.album_type),
        year: album.release_date.split('-')[0],
        spotifyUrl: album.external_urls.spotify,
        artwork: album.images[0]?.url || 'https://via.placeholder.com/300x300/333/fff?text=No+Image',
        releaseDate: album.release_date
      }));

    } catch (error) {
      console.error('Error fetching Spotify releases:', error);
      throw error;
    }
  }

  private formatAlbumType(type: string): 'Single' | 'Album' | 'Compilation' {
    switch (type) {
      case 'single':
        return 'Single';
      case 'album':
        return 'Album';
      case 'compilation':
        return 'Compilation';
      default:
        return 'Single';
    }
  }
}

import { SPOTIFY_CONFIG } from './spotify-config';

// Initialize Spotify API client
export const spotifyAPI = new SpotifyAPI(SPOTIFY_CONFIG.CLIENT_ID, SPOTIFY_CONFIG.CLIENT_SECRET);

// Export artist ID for component use
export const ARTIST_ID = SPOTIFY_CONFIG.ARTIST_ID;
