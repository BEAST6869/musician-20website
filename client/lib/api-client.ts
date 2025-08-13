// Optimized API client for Netlify Functions
export class ApiClient {
  private static readonly BASE_URL = "/api";
  private static readonly REQUEST_TIMEOUT = 20000; // 20 seconds max

  private static async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      this.REQUEST_TIMEOUT,
    );

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `HTTP ${response.status}: ${response.statusText}`,
        );
      }

      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if ((error as Error).name === "AbortError") {
        throw new Error("Request timeout - please try again");
      }
      throw error;
    }
  }

  static async ping() {
    const response = await this.fetchWithTimeout(`${this.BASE_URL}/ping`);
    return await response.json();
  }

  static async getDemo() {
    const response = await this.fetchWithTimeout(`${this.BASE_URL}/demo`);
    return await response.json();
  }

  static async getSpotifyPlaylist(playlistId: string) {
    const response = await this.fetchWithTimeout(
      `${this.BASE_URL}/spotify/playlist/${playlistId}`,
    );
    return await response.json();
  }
}
