import { PlaylistContentModel } from '../models/playlist-content.model';
import { loadSuccess, setSelectedUrl } from './playlist.actions';
import { PlaylistState, playlistReducer } from './playlist.reducers';

describe('Playlist Reducer', () => {
  const initialState: PlaylistState = {
    ids: [],
    entities: {},
    selectedUrl: null,
  };

  it('should handle loadSuccess action correctly', () => {
    // Arrange
    const mocklist = generateMockList();
    const EXPECTED = {
      1: mocklist[0],
      2: mocklist[1],
    };

    // Act
    const action = loadSuccess({ playlist: mocklist });
    const newState = playlistReducer(initialState, action);

    // Assert
    expect(newState.ids.length).toEqual(2);
    expect(newState.entities).toEqual(EXPECTED);
  });

  it('should handle setSelectedUrl action correctly', () => {
    // Arrange
    const mocklist = generateMockList();
    const mockUrl = 'mock-url';
    const initialState: PlaylistState = {
      ids: ['1', '2'],
      entities: {
        1: mocklist[0],
        2: mocklist[1],
      },
      selectedUrl: null,
    };

    // Act
    const action = setSelectedUrl({ url: mockUrl });
    const newState = playlistReducer(initialState, action);

    // Assert
    expect(newState.selectedUrl).toBe(mockUrl);
  });

  const generateMockList = (): PlaylistContentModel[] => {
    const mockList: PlaylistContentModel[] = [];
    const item1 = {
      id: '1',
      name: 'Item 1',
      curator_name: 'Curator 1',
      kind: 'Type 1',
      artwork: 'url1',
    } as PlaylistContentModel;
    const item2 = {
      id: '2',
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
