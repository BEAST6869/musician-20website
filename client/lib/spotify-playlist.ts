// Spotify Playlist API integration using secure backend
// No longer requires hardcoded access tokens

// Spotify API Types for Playlist
export interface SpotifyPlaylistTrack {
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
}

export interface SpotifyPlaylistResponse {
  tracks: {
    items: SpotifyPlaylistTrack[];
  };
}

// Backend API response type
interface BackendPlaylistResponse {
  tracks: PlaylistTrack[];
}

// Processed track data for UI
export interface PlaylistTrack {
  id: string;
  name: string;
  spotifyUrl: string;
  albumCover: string;
  artist: string;
}

class SpotifyPlaylistAPI {
  private readonly DEFAULT_TIMEOUT = 10000; // 10 seconds
  private cache: Map<string, { data: PlaylistTrack[]; expiry: number }> = new Map();
  private readonly CACHE_DURATION = 300000; // 5 minutes

  /**
   * Fetch with timeout
   */
  private async fetchWithTimeout(url: string, timeout: number = this.DEFAULT_TIMEOUT): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if ((error as Error).name === 'AbortError') {
        throw new Error(`Request timeout after ${timeout}ms`);
      }
      throw error;
    }
  }

  /**
   * Get cached data if available and not expired
   */
  private getCachedData(key: string): PlaylistTrack[] | null {
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
  private setCachedData(key: string, data: PlaylistTrack[]): void {
    this.cache.set(key, {
      data,
      expiry: Date.now() + this.CACHE_DURATION
    });
  }

  /**
   * Fetch tracks from a Spotify playlist via our backend API
   */
  async getPlaylistTracks(playlistId: string): Promise<PlaylistTrack[]> {
    if (!playlistId || playlistId === "YOUR_PLAYLIST_ID_HERE") {
      console.warn("⚠️ Playlist ID not configured. Using mock data.");
      return this.getMockTracks();
    }

    // Check cache first
    const cacheKey = `playlist-${playlistId}`;
    const cachedData = this.getCachedData(cacheKey);
    if (cachedData) {
      console.log("📋 Using cached playlist data");
      return cachedData;
    }

    try {
      const response = await this.fetchWithTimeout(`/api/spotify/playlist/${playlistId}`);

      if (!response.ok) {
        let errorMessage = `Backend API error: ${response.status} ${response.statusText}`;

        try {
          const errorData = await response.json();
          if (errorData.error) {
            errorMessage += ` - ${errorData.error}`;
          }
        } catch (e) {
          // If we can't parse error response, use the original message
        }

        throw new Error(errorMessage);
      }

      const data: BackendPlaylistResponse = await response.json();

      // Cache the data
      this.setCachedData(cacheKey, data.tracks);

      return data.tracks;
    } catch (error) {
      console.error("Error fetching Spotify playlist:", error);

      // Return mock data as fallback
      console.warn("🔄 Using mock data as fallback");
      return this.getMockTracks();
    }
  }

  /**
   * Get mock tracks for fallback
   */
  private getMockTracks(): PlaylistTrack[] {
    return [
      {
        id: "mock1",
        name: "Sample Track 1",
        spotifyUrl: "https://open.spotify.com/track/example1",
        albumCover: "https://via.placeholder.com/300x300/333/fff?text=Track+1",
        artist: "Sample Artist"
      },
      {
        id: "mock2",
        name: "Sample Track 2",
        spotifyUrl: "https://open.spotify.com/track/example2",
        albumCover: "https://via.placeholder.com/300x300/333/fff?text=Track+2",
        artist: "Sample Artist"
      },
      {
        id: "mock3",
        name: "Sample Track 3",
        spotifyUrl: "https://open.spotify.com/track/example3",
        albumCover: "https://via.placeholder.com/300x300/333/fff?text=Track+3",
        artist: "Sample Artist"
      }
    ];
  }

  /**
   * Populate existing song cards with playlist data
   * Assumes existing HTML structure with specific selectors
   */
  async populateSongCards(playlistId: string): Promise<void> {
    try {
      const tracks = await this.getPlaylistTracks(playlistId);
      const discographyContainer = document.getElementById("discography");

      if (!discographyContainer) {
        throw new Error("Discography container not found");
      }

      // Find existing song cards
      const songCards = discographyContainer.querySelectorAll(
        'a[href*="spotify.com"]',
      );

      tracks.forEach((track, index) => {
        const card = songCards[index];
        if (!card) return; // No more cards to populate

        // Update Spotify link
        (card as HTMLAnchorElement).href = track.spotifyUrl;

        // Update album cover image
        const coverImg = card.querySelector("img");
        if (coverImg) {
          coverImg.src = track.albumCover;
          coverImg.alt = `${track.name} artwork`;
        }

        // Update song title
        const titleElement = card.querySelector("h3");
        if (titleElement) {
          titleElement.textContent = track.name;
        }

        console.log(`✅ Updated card ${index + 1}: ${track.name}`);
      });

      console.log(
        `🎵 Successfully populated ${Math.min(tracks.length, songCards.length)} song cards`,
      );
    } catch (error) {
      console.error("❌ Failed to populate song cards:", error);
      throw error;
    }
  }
}

// Configuration
const SPOTIFY_CONFIG = {
  // 🎵 Playlist ID extracted from your Spotify URL
  // From playlist URL: https://open.spotify.com/playlist/1ghDr8QsDH7aeP7Jd8OLT9
  // Playlist ID = 1ghDr8QsDH7aeP7Jd8OLT9
  PLAYLIST_ID: "1ghDr8QsDH7aeP7Jd8OLT9",
};

// Export configured API instance
export const spotifyPlaylistAPI = new SpotifyPlaylistAPI();
export const PLAYLIST_ID = SPOTIFY_CONFIG.PLAYLIST_ID;

// Export configuration for easy access
export { SPOTIFY_CONFIG };
