import { createAction } from '@ngrx/store';
import { PlaylistContentModel } from '../models/playlist-content.model';
import * as PlaylistActions from './playlist.actions';

const mockUrl = 'mock-url';

describe('Playlist Actions', () => {
  it('should create the loadPlaylists action', () => {
    // Arrange & Act
    const action = PlaylistActions.loadPlaylists();

    // Assert
    expect(action.type).toEqual(
      PlaylistActions.PlaylistActionTypes.LoadPlaylists
    );
  });

  it('should create the loadSuccess action', () => {
    // Arrange & Act
    const action = PlaylistActions.loadSuccess({
      playlist: generateMockList(),
    });

    // Assert
    expect(action.type).toEqual(
      PlaylistActions.PlaylistActionTypes.LoadSuccess
    );
    expect(action.playlist).toEqual(generateMockList());
  });

  it('should create the navigateToPlaylist action', () => {
    // Arrange & Act
    const action = PlaylistActions.navigateToPlaylist({ url: mockUrl });

    // Assert
    expect(action.type).toEqual(
      PlaylistActions.PlaylistActionTypes.NavigateToPlaylist
    );
    expect(action.url).toEqual(mockUrl);
  });

  it('should create the setSelectedUrl action', () => {
    // Arrange & Act
    const action = PlaylistActions.setSelectedUrl({ url: mockUrl });

    // Assert
    expect(action.type).toEqual(
      PlaylistActions.PlaylistActionTypes.SetSelectedUrl
    );
    expect(action.url).toEqual(mockUrl);
  });

  const generateMockList = (): PlaylistContentModel[] => {
    const mockList: PlaylistContentModel[] = [];
    const item1 = {
      name: 'Item 1',
      curator_name: 'Curator 1',
      kind: 'Type 1',
      artwork: 'url1',
    } as PlaylistContentModel;
    const item2 = {
      name: 'Item 2',
      curator_name: 'Curator 2',
      kind: 'Type 2',
      artwork: 'url2',
    } as PlaylistContentModel;
    mockList.push(item1);
    mockList.push(item2);
    return mockList;
  };
});
