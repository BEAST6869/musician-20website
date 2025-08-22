// Spotify API Configuration
// Backend API integration - credentials are securely stored server-side

export const SPOTIFY_CONFIG = {
<<<<<<< HEAD
  // All Spotify API calls now go through our backend endpoints
  // No credentials exposed on the frontend
  API_BASE: "/api/spotify",
};

// Security: All Spotify credentials are now handled server-side
// Frontend makes requests to our backend API instead of directly to Spotify
=======
  CLIENT_ID: "4867425ccf554368bcc7274926d45738",
  // CLIENT_SECRET removed for security - handled server-side only

  // Your Spotify Artist ID - found in your Spotify artist URL
  // Example: https://open.spotify.com/artist/5p71wpajbzO90AEiPBej94 -> Artist ID is "5p71wpajbzO90AEiPBej94"
  ARTIST_ID: "31lyqvgaccgiuua2s2kdoxr6bsoy",
};

// 🔒 SECURITY WARNING:
// ==================
// In a production environment, NEVER expose client_secret in frontend code!
//
// Recommended approach:
// 1. Create a backend API endpoint (e.g., /api/spotify/releases)
// 2. Move client_secret to backend environment variables
// 3. Handle token generation server-side
// 4. Frontend calls your backend API instead of Spotify directly
//
// Example backend route (Node.js/Express):
// app.get('/api/spotify/releases/:artistId', async (req, res) => {
//   const token = await getSpotifyToken(CLIENT_ID, CLIENT_SECRET);
//   const releases = await fetchArtistReleases(token, req.params.artistId);
//   res.json(releases);
// });
>>>>>>> 19d9491b5e7b76d4e4db88fed63bfd06aa65f5fc
