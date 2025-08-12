import { RequestHandler } from "express";

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

// Get Spotify access token using Client Credentials Flow
async function getSpotifyToken(): Promise<string> {
  const clientId = process.env.SPOTIFY_CLIENT_ID || "4867425ccf554368bcc7274926d45738";
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "YOUR_SPOTIFY_CLIENT_SECRET_HERE";
  
  if (clientSecret === "YOUR_SPOTIFY_CLIENT_SECRET_HERE") {
    throw new Error("Spotify client secret not configured");
  }

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
    },
    body: 'grant_type=client_credentials'
  });

  if (!response.ok) {
    throw new Error(`Failed to get Spotify token: ${response.status}`);
  }

  const data: SpotifyTokenResponse = await response.json();
  return data.access_token;
}

export const handleSpotifyPlaylist: RequestHandler = async (req, res) => {
  try {
    const { playlistId } = req.params;
    
    if (!playlistId) {
      return res.status(400).json({ error: "Playlist ID is required" });
    }

    // Get access token
    const token = await getSpotifyToken();

    // Fetch playlist data
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?fields=tracks.items(track(id,name,external_urls,album(images),artists(name)))`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`);
    }

    const data: SpotifyPlaylistResponse = await response.json();

    // Transform the data to match our frontend interface
    const tracks = data.tracks.items.map(item => ({
      id: item.track.id,
      name: item.track.name,
      spotifyUrl: item.track.external_urls.spotify,
      albumCover: item.track.album.images[0]?.url || 'https://via.placeholder.com/640x640/333/fff?text=No+Image',
      artists: item.track.artists.map(artist => artist.name)
    }));

    res.json({ tracks });

  } catch (error) {
    console.error('Error fetching Spotify playlist:', error);
    res.status(500).json({ 
      error: 'Failed to fetch playlist',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
