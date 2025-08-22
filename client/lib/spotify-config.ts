// Spotify API Configuration
// Backend API integration - credentials are securely stored server-side

export const SPOTIFY_CONFIG = {
  // All Spotify API calls now go through our backend endpoints
  // No credentials exposed on the frontend
  API_BASE: "/api/spotify",
};

// Security: All Spotify credentials are now handled server-side
// Frontend makes requests to our backend API instead of directly to Spotify
