import { TestBed } from '@angular/core/testing';
import { MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ExternalLinkGuard } from './link.gaurd';
import { PlaylistState } from './playlist/store/playlist.reducers';
import { getSelectedUrl } from './playlist/store/playlist.selectors';

describe('ExternalLinkGuard Tests', () => {
  let guard: ExternalLinkGuard;
  let store: MockStore;
  let getSelectedUrlSelector: MemoizedSelector<PlaylistState, string | null>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExternalLinkGuard, provideMockStore()],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    setupSelectors();
    guard = TestBed.inject(ExternalLinkGuard);
  });

  it('should create', () => {
    // Arrange, Act & Assert
    expect(guard).toBeTruthy();
  });

  const setupSelectors = () => {
    getSelectedUrlSelector = store.overrideSelector(getSelectedUrl, null);
  };
});
