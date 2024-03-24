import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app-routes.enum';
import { PlaylistComponent } from './playlist/playlist.component';
import { StoreModule } from '@ngrx/store';
import { PlaylistEffects } from './playlist/store/playlist.effects';
import { EffectsModule } from '@ngrx/effects';
import {
  playlistFeatureKey,
  playlistReducer,
} from './playlist/store/playlist.reducers';
import { rootReducer } from './store/root-reducer';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PlaylistModule } from './playlist/playlist.module';
import { ExternalLinkGuard } from './link.gaurd';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot([PlaylistEffects]),
    StoreModule.forFeature(playlistFeatureKey, playlistReducer),
    MatToolbarModule,
    PlaylistModule,
  ],
  providers: [ExternalLinkGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
