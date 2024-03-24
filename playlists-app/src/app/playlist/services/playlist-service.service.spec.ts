import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PlaylistService } from './playlist-service.service';
import { PlaylistModel } from '../models/playlist.model';
import { PlaylistContentModel } from '../models/playlist-content.model';
import { Subscription } from 'rxjs';

const URL =
'https://portal.organicfruitapps.com/programming-guides/v2/us_en-us/featured-playlists.json';

describe('PlaylistService', () => {
  let service: PlaylistService;
  let httpTestingController: HttpTestingController;
  let sub = new Subscription();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PlaylistService],
    });
    service = TestBed.inject(PlaylistService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that there are no outstanding requests
    httpTestingController.verify();
    sub.unsubscribe();
  });

  it('should be created', () => {
    //Arrange, Act & Assert
    expect(service).toBeTruthy();
  });

  it('should fetch playlists data from the API', () => {
    // Arrange
   const mockData: PlaylistModel = {
      featuredPlaylists: {
        name: 'featured playlists',
        content: generateMockListContent(),
      },
    };

    // Act & Assert
    sub = service.getPlaylists().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(URL);
    expect(req.request.method).toEqual('GET');

    // Respond to the request with the mock data
    req.flush(mockData);
  });

  const generateMockListContent = (): PlaylistContentModel[] => {
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
