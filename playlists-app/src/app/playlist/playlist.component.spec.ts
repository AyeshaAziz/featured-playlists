import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistComponent } from './playlist.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { PlaylistContentModel } from './models/playlist-content.model';
import { MemoizedSelector } from '@ngrx/store';
import { selectAllPlaylists } from './store/playlist.selectors';
import { PlaylistState } from './store/playlist.reducers';
import { PlaylistActionTypes } from './store/playlist.actions';
import { ListComponent } from '../list/list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MockModule } from 'ng-mocks';

describe('PlaylistComponent', () => {
  let component: PlaylistComponent;
  let fixture: ComponentFixture<PlaylistComponent>;
  let store: MockStore;
  let selectAllPlaylistsSelector: MemoizedSelector<
    PlaylistState,
    PlaylistContentModel[]
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaylistComponent, ListComponent],
      imports: [MockModule(MatGridListModule), MockModule(MatDividerModule)],
      providers: [provideMockStore()],
    }).compileComponents();
    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');
    setupSelectors();

    fixture = TestBed.createComponent(PlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // Arrange, Act & Assert
    expect(component).toBeTruthy();
  });

  it('should dispatch loadPlaylists action ', () => {
    // Arrange & Act
    const expectedAction = { type: PlaylistActionTypes.LoadPlaylists };

    // Assert
    expect(store.dispatch).toHaveBeenCalledOnceWith(expectedAction);
  });

  it('should dispatch to store when item clicked', () => {
    // Arrange
    const twice = 2;
    const url = 'test';

    // Act
    component.onItemClicked(url);

    // Assert
    expect(store.dispatch).toHaveBeenCalledTimes(twice);
  });

  const setupSelectors = () => {
    selectAllPlaylistsSelector = store.overrideSelector(
      selectAllPlaylists,
      generateMockList()
    );
  };

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
