import { createFeatureSelector, createSelector } from '@ngrx/store';
import { playlistAdapter, playlistFeatureKey, PlaylistState } from './playlist.reducers';

export const selectPlaylistFeatureState = createFeatureSelector<PlaylistState>(playlistFeatureKey);

export const selectAllPlaylists = createSelector(
  selectPlaylistFeatureState,
  playlistAdapter.getSelectors().selectAll
);

export const getSelectedUrl = createSelector(
  selectPlaylistFeatureState,
  (state) => {
    return state.selectedUrl;
  }
);
