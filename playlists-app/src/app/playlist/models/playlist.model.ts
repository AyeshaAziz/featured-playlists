import { PlaylistContentModel } from "./playlist-content.model";

export interface PlaylistModel {
    featuredPlaylists: {
      name: string;
      content: PlaylistContentModel[];
    };
  }