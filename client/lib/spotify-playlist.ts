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
  /**
   * Since we're now a static site, we'll return mock/hardcoded playlist data
   * In a real implementation, you'd need a backend service to handle Spotify API calls
   */
  async getPlaylistTracks(playlistId: string): Promise<PlaylistTrack[]> {
    if (!playlistId || playlistId === "YOUR_PLAYLIST_ID_HERE") {
      throw new Error(
        "Playlist ID not configured. Please update the PLAYLIST_ID in the configuration.",
      );
    }

    // For GitHub Pages deployment, return hardcoded tracks
    // This avoids the need for a backend API
    return [
      {
        id: "5iuWm1EbaACpLVqs5jEplm",
        name: "Sacred Queer Heart",
        spotifyUrl: "https://open.spotify.com/track/5iuWm1EbaACpLVqs5jEplm?si=c0828c8edcb641a6",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
        artists: ["Shelby Mackay"]
      },
      {
        id: "53NYm8PTesJSSMSMoyljeh",
        name: "Moongirlnonsense",
        spotifyUrl: "https://open.spotify.com/track/53NYm8PTesJSSMSMoyljeh?si=5d6c3dcc88674138",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
        artists: ["Shelby Mackay"]
      },
      {
        id: "3CY4ZmQ067SPACan76Wj5B",
        name: "Stillelectricwhenshesdown",
        spotifyUrl: "https://open.spotify.com/track/3CY4ZmQ067SPACan76Wj5B?si=7b652d81525a4371",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
        artists: ["Shelby Mackay"]
      },
      {
        id: "5JdLlW10WLuhWnxfhCednE",
        name: "Dontforgetmypeace",
        spotifyUrl: "https://open.spotify.com/track/5JdLlW10WLuhWnxfhCednE?si=3c33e8ef46544dc2",
        albumCover: "https://i.scdn.co/image/ab67616d0000b273e8b066f70c206551210d902b",
        artists: ["Shelby Mackay"]
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
