import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { cold, hot } from 'jasmine-marbles';
import { provideMockStore } from '@ngrx/store/testing';
import { PlaylistEffects } from './playlist.effects';
import { PlaylistService } from '../services/playlist-service.service';
import { PlaylistContentModel } from '../models/playlist-content.model';
import {
  loadPlaylists,
  loadSuccess,
  navigateToPlaylist,
  setSelectedUrl,
} from './playlist.actions';
import { Router } from '@angular/router';
import { PlaylistModel } from '../models/playlist.model';

class MockPlaylistService {
  getPlaylists(): Observable<PlaylistModel> {
    return of();
  }
}

class MockRouter {
  navigate() {}
}

describe('PlaylistEffects', () => {
  let actions$: Observable<any>;
  let effects: PlaylistEffects;
  let service: PlaylistService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlaylistEffects,
        provideMockStore(),
        {
          provide: Router,
          useClass: MockRouter,
        },
        {
          provide: PlaylistService,
          useClass: MockPlaylistService,
        },
        provideMockActions(() => actions$),
      ],
    });
    effects = TestBed.inject(PlaylistEffects);
    service = TestBed.inject(PlaylistService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    // Arrange & Act & Assert
    expect(effects).toBeTruthy();
  });

  it('should return loadSuccess action on loadPlaylists action', () => {
    // Arrange
    const playlist = generateMockList();
    const loadAction = loadPlaylists();
    const loadSuccessAction = loadSuccess({
      playlist: generateMockListContent(),
    });
    spyOn(service, 'getPlaylists').and.returnValue(of(playlist));
    const expected = cold('-b', { b: loadSuccessAction });
    actions$ = hot('-a', { a: loadAction });

    // Act
    const effect = new PlaylistEffects(actions$, service, router);

    // Assert
    expect(effect.loadPlaylists$).toBeObservable(expected);
    expect(service.getPlaylists).toHaveBeenCalled();
  });

  it('should return setSelectedUrl action on navigateToPlaylist action', () => {
    // Arrange
    const url = 'mock-url';
    const action = navigateToPlaylist({ url });
    const setSelectedUrlAction = setSelectedUrl({ url });
    const expected = cold('b', { b: setSelectedUrlAction });
    actions$ = hot('a', { a: action });

    // Act
    const effect = new PlaylistEffects(actions$, service, router);

    // Assert
    expect(effect.navigateToPlaylist$).toBeObservable(expected);
  });

  it('should clear resizew indow mode memory on delete window success action', () => {
    // Arrange
    const action = setSelectedUrl;
    spyOn(router, 'navigate');

    actions$ = hot('a', { a: action });
    const expected = cold('b', { b: undefined });

    // Act
    const result = effects.navigateToExternal$;

    // Assert
    expect(result).toBeObservable(expected);
    expect(router.navigate).toHaveBeenCalled();
  });

  const generateMockListContent = (): PlaylistContentModel[] => {
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

  const generateMockList = (): PlaylistModel => {
    const model = {
      featuredPlaylists: {
        content: generateMockListContent(),
        name: 'playlist',
      },
    } as PlaylistModel;
    return model;
  };
});
