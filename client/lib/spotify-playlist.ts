// Spotify Playlist API integration using public playlists
// Uses hardcoded access token (replace with your actual token)

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

// Processed track data for UI
export interface PlaylistTrack {
  id: string;
  name: string;
  spotifyUrl: string;
  albumCover: string;
  artist: string;
}

class SpotifyPlaylistAPI {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  /**
   * Fetch tracks from a public Spotify playlist
   */
  async getPlaylistTracks(playlistId: string): Promise<PlaylistTrack[]> {
    if (!playlistId || playlistId === 'YOUR_PLAYLIST_ID_HERE') {
      throw new Error('Playlist ID not configured. Please update the PLAYLIST_ID in the configuration.');
    }

    if (!this.accessToken || this.accessToken === 'YOUR_ACCESS_TOKEN_HERE') {
      throw new Error('Access token not configured. Please add your Spotify access token.');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items(track(id,name,external_urls,album(images),artists(name)))`,
        {
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'Content-Type': 'application/json'
          }
        }
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

      const data: SpotifyPlaylistResponse = await response.json();

      // Process and format the tracks
      return data.tracks.items
        .filter(item => item.track && item.track.id) // Filter out null tracks
        .map((item): PlaylistTrack => ({
          id: item.track.id,
          name: item.track.name,
          spotifyUrl: item.track.external_urls.spotify,
          albumCover: item.track.album.images[0]?.url || 'https://via.placeholder.com/300x300/333/fff?text=No+Image',
          artist: item.track.artists[0]?.name || 'Unknown Artist'
        }));

    } catch (error) {
      console.error('Error fetching Spotify playlist:', error);
      throw error;
    }
  }

  /**
   * Populate existing song cards with playlist data
   * Assumes existing HTML structure with specific selectors
   */
  async populateSongCards(playlistId: string): Promise<void> {
    try {
      const tracks = await this.getPlaylistTracks(playlistId);
      const discographyContainer = document.getElementById('discography');
      
      if (!discographyContainer) {
        throw new Error('Discography container not found');
      }

      // Find existing song cards
      const songCards = discographyContainer.querySelectorAll('a[href*="spotify.com"]');
      
      tracks.forEach((track, index) => {
        const card = songCards[index];
        if (!card) return; // No more cards to populate

        // Update Spotify link
        (card as HTMLAnchorElement).href = track.spotifyUrl;

        // Update album cover image
        const coverImg = card.querySelector('img');
        if (coverImg) {
          coverImg.src = track.albumCover;
          coverImg.alt = `${track.name} artwork`;
        }

        // Update song title
        const titleElement = card.querySelector('h3');
        if (titleElement) {
          titleElement.textContent = track.name;
        }

        console.log(`✅ Updated card ${index + 1}: ${track.name}`);
      });

      console.log(`🎵 Successfully populated ${Math.min(tracks.length, songCards.length)} song cards`);

    } catch (error) {
      console.error('❌ Failed to populate song cards:', error);
      throw error;
    }
  }
}

// Configuration
const SPOTIFY_CONFIG = {
  // 🔧 Replace with your actual Spotify access token
  // Get this from: https://developer.spotify.com/console/get-playlist/
  ACCESS_TOKEN: 'YOUR_ACCESS_TOKEN_HERE',
  
  // 🎵 Replace with your actual playlist ID
  // From playlist URL: https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M
  // Playlist ID = 37i9dQZF1DXcBWIGoYBM5M
  PLAYLIST_ID: 'YOUR_PLAYLIST_ID_HERE'
};

// Export configured API instance
export const spotifyPlaylistAPI = new SpotifyPlaylistAPI(SPOTIFY_CONFIG.ACCESS_TOKEN);
export const PLAYLIST_ID = SPOTIFY_CONFIG.PLAYLIST_ID;

// Export configuration for easy access
export { SPOTIFY_CONFIG };
