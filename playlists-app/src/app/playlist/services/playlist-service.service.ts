import { Injectable,  } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { Observable } from 'rxjs';
import { PlaylistModel } from '../models/playlist.model';

/**
 * URL of the API endpoint to fetch playlists data.
 */
const URL = 'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json';

/**
 * Service responsible for fetching playlists data.
 */
@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  constructor(private http: HttpClient) { }

 /**
   * Fetches playlists data from the API endpoint.
   * @returns An observable of type PlaylistModel containing playlists data
   */
  getPlaylists(): Observable<PlaylistModel> {
      return this.http.get<PlaylistModel>(URL);
  }
}
