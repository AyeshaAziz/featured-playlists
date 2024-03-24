import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistContentModel } from '../playlist/models/playlist-content.model';

/**
 * Component for displaying a list of items.
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  /**
   * Input property for the list of items
   */
  @Input() list: Observable<PlaylistContentModel[]> = new Observable();
  /**
   * Output event emitter for item click events
   */
  @Output() itemClickedEvent = new EventEmitter<string>();

  constructor() {}

  /**
   * Event handler for when an item is clicked.
   * Emits the URL of the clicked item.
   * @param url The URL of the clicked item
   */
  onItemClicked(url: string): void {
    this.itemClickedEvent.emit(url);
  }
}
