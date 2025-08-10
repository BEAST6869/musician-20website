// Test function to verify Spotify API access
// Run this in browser console to test your access token

export async function testSpotifyPlaylist(
  accessToken: string,
  playlistId: string,
) {
  console.log("🎵 Testing Spotify playlist access...");
  console.log("Playlist ID:", playlistId);
  console.log(
    "Access Token (first 20 chars):",
    accessToken.substring(0, 20) + "...",
  );

  try {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}?fields=name,tracks.items(track(id,name,external_urls,album(images),artists(name)))`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("❌ API Error:", response.status, response.statusText);
      console.error("Error details:", errorData);
      return false;
    }

    const data = await response.json();
    console.log("✅ Success! Playlist name:", data.name);
    console.log("✅ Found", data.tracks?.items?.length || 0, "tracks");

    // Show first few tracks
    if (data.tracks?.items?.length > 0) {
      console.log("📀 First few tracks:");
      data.tracks.items.slice(0, 3).forEach((item: any, index: number) => {
        console.log(
          `${index + 1}. ${item.track?.name} by ${item.track?.artists?.[0]?.name}`,
        );
      });
    }

    return true;
  } catch (error) {
    console.error("❌ Network error:", error);
    return false;
  }
}

// Quick test function you can run in console
// Usage: testPlaylist('YOUR_FULL_ACCESS_TOKEN_HERE')
export function testPlaylist(accessToken: string) {
  return testSpotifyPlaylist(accessToken, "1ghDr8QsDH7aeP7Jd8OLT9");
}

// Instructions to get full access token
console.log(`
🔧 To get your full Spotify access token:

1. Go to: https://developer.spotify.com/console/get-playlist/
2. Click "GET TOKEN" 
3. Select scopes if needed (playlist-read-public should be sufficient)
4. Copy the full token (usually starts with "BQC" or similar)
5. Run this in console: testPlaylist('YOUR_FULL_TOKEN_HERE')

Current playlist ID: 1ghDr8QsDH7aeP7Jd8OLT9
`);
