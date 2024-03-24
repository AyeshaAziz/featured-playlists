import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './playlist.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ListComponent } from '../list/list.component';
import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [PlaylistComponent, ListComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule
  ],
})
export class PlaylistModule {}
