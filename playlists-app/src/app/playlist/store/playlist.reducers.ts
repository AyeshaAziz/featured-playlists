import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { loadSuccess, setSelectedUrl } from './playlist.actions';
import { PlaylistContentModel } from '../models/playlist-content.model';

export const playlistFeatureKey = 'playlist';

export interface PlaylistState extends EntityState<PlaylistContentModel> {
  selectedUrl: string | null;
}

export const playlistAdapter = createEntityAdapter<PlaylistContentModel>();

export const initialState: PlaylistState = playlistAdapter.getInitialState({
  selectedUrl: null,
});

export const playlistReducer = createReducer(
  initialState,
  on(loadSuccess, (state, action) => {
    return playlistAdapter.setAll(action.playlist, state);
  }),
  on(setSelectedUrl, (state, action) => {    
    return { ...state, selectedUrl: action.url };
  }),
);

export const { selectAll } = playlistAdapter.getSelectors();
