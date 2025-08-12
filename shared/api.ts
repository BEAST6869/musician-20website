export interface DemoResponse {
  message: string;
  timestamp: string;
}

export interface PlaylistTrack {
  id: string;
  name: string;
  spotifyUrl: string;
  albumCover: string;
  artists: string[];
}

export interface SpotifyPlaylistResponse {
  tracks: PlaylistTrack[];
}
