import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getSelectedUrl } from './playlist/store/playlist.selectors';

@Injectable({
  providedIn: 'root',
})
export class ExternalLinkGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(getSelectedUrl).pipe(
      map((externalLink) => {
        if (externalLink) {
          window.location.href = externalLink;
        }
        return false;
      })
    );
  }
}
