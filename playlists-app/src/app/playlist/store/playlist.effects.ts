import { Injectable } from '@angular/core';
import { mergeMap, map, filter, mapTo, takeLast, tap } from 'rxjs';
import {
  loadPlaylists,
  loadSuccess,
  navigateToPlaylist,
  setSelectedUrl,
} from './playlist.actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PlaylistService } from '../services/playlist-service.service';
import { PlaylistModel } from '../models/playlist.model';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes.enum';

@Injectable()
export class PlaylistEffects {
  loadPlaylists$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPlaylists),
      mergeMap(() =>
        this.playlistService.getPlaylists().pipe(
          filter((data) => this.isResponseValid(data)),
          map((data) => {
            return loadSuccess({ playlist: data.featuredPlaylists.content });
          })
        )
      )
    );
  });

  navigateToPlaylist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(navigateToPlaylist),
      map((action) => {
        return setSelectedUrl({ url: action.url });
      })
    );
  });

  navigateToExternal$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(setSelectedUrl),
        map((_) => {
          this.router.navigate([AppRoutes.ExternalRedirect]);
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private playlistService: PlaylistService,
    private router: Router
  ) {}

  private isResponseValid(data: PlaylistModel): boolean {
    return data?.featuredPlaylists?.content ? true : false;
  }
}
