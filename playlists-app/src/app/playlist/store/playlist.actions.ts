import { createAction, props } from '@ngrx/store';
import { PlaylistContentModel } from '../models/playlist-content.model';

export enum PlaylistActionTypes {
  LoadPlaylists = '[PlaylistComponet] Load Playlists',
  LoadSuccess = '[Playlist Effects] Load Success',
  NavigateToPlaylist = '[PlaylistComponet] Navigate to Playlist',
  SetSelectedUrl = '[Playlist Effects] Set Selected URL',
}

export const loadPlaylists = createAction(PlaylistActionTypes.LoadPlaylists);

export const loadSuccess = createAction(
  PlaylistActionTypes.LoadSuccess,
  props<{ playlist: PlaylistContentModel[] }>()
);

export const navigateToPlaylist = createAction(
  PlaylistActionTypes.NavigateToPlaylist,
  props<{ url: string }>()
);

export const setSelectedUrl = createAction(
  PlaylistActionTypes.SetSelectedUrl,
  props<{ url: string }>()
);
