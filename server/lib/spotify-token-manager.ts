interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface TokenCache {
  token: string;
  expiresAt: number;
}

class SpotifyTokenManager {
  private tokenCache: TokenCache | null = null;
  private refreshPromise: Promise<string> | null = null;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor() {
    this.clientId = process.env.SPOTIFY_CLIENT_ID || "";
    this.clientSecret = process.env.SPOTIFY_CLIENT_SECRET || "";

    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        "Spotify credentials not configured. Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET environment variables.",
      );
    }
  }

  /**
   * Get a valid access token, refreshing if necessary
   */
  async getAccessToken(): Promise<string> {
    // Check if we have a valid cached token
    if (this.tokenCache && this.tokenCache.expiresAt > Date.now() + 60000) {
      // 1 minute buffer
      return this.tokenCache.token;
    }

    // If we're already refreshing, wait for that request
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    // Start refresh process
    this.refreshPromise = this.refreshToken();

    try {
      const token = await this.refreshPromise;
      return token;
    } finally {
      this.refreshPromise = null;
    }
  }

  /**
   * Refresh the access token using Client Credentials flow
   */
  private async refreshToken(): Promise<string> {
    try {
      console.log("🔄 Refreshing Spotify access token...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64")}`,
        },
        body: "grant_type=client_credentials",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Spotify token refresh failed: ${response.status} - ${errorText}`,
        );
      }

      const data: SpotifyTokenResponse = await response.json();

      // Cache the token with expiration time (minus 5 minutes for safety)
      this.tokenCache = {
        token: data.access_token,
        expiresAt: Date.now() + (data.expires_in - 300) * 1000, // Convert to milliseconds, subtract 5 minutes
      };

      console.log(
        `✅ Spotify token refreshed, expires in ${data.expires_in} seconds`,
      );
      return data.access_token;
    } catch (error) {
      console.error("❌ Failed to refresh Spotify token:", error);

      if ((error as Error).name === "AbortError") {
        throw new Error("Spotify token request timeout");
      }

      throw new Error(
        `Failed to refresh Spotify access token: ${(error as Error).message}`,
      );
    }
  }

  /**
   * Clear the token cache (useful for testing or forcing refresh)
   */
  clearCache(): void {
    this.tokenCache = null;
    console.log("🗑️ Spotify token cache cleared");
  }

  /**
   * Get token info for debugging
   */
  getTokenInfo(): { hasToken: boolean; expiresIn?: number } {
    if (!this.tokenCache) {
      return { hasToken: false };
    }

    const expiresIn = Math.max(
      0,
      Math.floor((this.tokenCache.expiresAt - Date.now()) / 1000),
    );
    return {
      hasToken: true,
      expiresIn,
    };
  }
}

// Export singleton instance
export const spotifyTokenManager = new SpotifyTokenManager();
