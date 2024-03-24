import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAllPlaylists } from './store/playlist.selectors';
import { loadPlaylists, navigateToPlaylist } from './store/playlist.actions';
import { PlaylistContentModel } from './models/playlist-content.model';

/**
 * Component for displaying playlists.
 * Loads playlists data from the store and dispatches action to load playlists on initialization.
 */
@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  /**
   * Observable containing the list of playlists.
   */
  playlistObs$: Observable<PlaylistContentModel[]>;
  constructor(private store: Store) {
    this.playlistObs$ = this.store.select(selectAllPlaylists);
  }

  /**
   * Lifecycle hook called after component initialization.
   * Dispatches action to load playlists from the store.
   */
  ngOnInit(): void {
    this.store.dispatch(loadPlaylists());
  }

  /**
   * Event handler for when an item in the playlist is clicked.
   * Dispatches action to navigate to the clicked playlist.
   * @param url The URL of the clicked playlist
   */
  onItemClicked(url: string): void {
    this.store.dispatch(navigateToPlaylist({ url }));
  }
}
