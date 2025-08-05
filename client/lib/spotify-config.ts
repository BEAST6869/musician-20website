// Spotify API Configuration
// 🔧 REPLACE THESE WITH YOUR ACTUAL SPOTIFY CREDENTIALS

export const SPOTIFY_CONFIG = {
  CLIENT_ID: 4867425ccf554368bcc7274926d45738,
  CLIENT_SECRET: 78007a2fbdad4fa9a1e46e7dc5ac19a7,
  
  // Your Spotify Artist ID - found in your Spotify artist URL
  // Example: https://open.spotify.com/artist/5p71wpajbzO90AEiPBej94 -> Artist ID is "5p71wpajbzO90AEiPBej94"
  ARTIST_ID: 31lyqvgaccgiuua2s2kdoxr6bsoy
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
