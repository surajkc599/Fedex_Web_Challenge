import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchService } from './search.service';
import { SearchDataStore } from '../store/search.store';
import { EnvironmentService } from '../../environment.service';

import { IGiffySearch } from '@fedex/data';
import { of } from 'rxjs';

const mockGifsData: IGiffySearch = {
  pagination: {
    total_count: 2,
    count: 2,
    offset: 0,
  },
  data: [
    {
      images: {
        original: {
          url: 'http://somedomain/test/gif/car1.gif',
          width: '200',
          height: '200',
        },
      },
      type: 'gif',
      title: 'Car-1',
      id: '1',
      rating: 'A',
    },
    {
      images: {
        original: {
          url: 'http://somedomain/test/gif/car2.gif',
          width: '200',
          height: '200',
        },
      },
      type: 'gif',
      title: 'Car-2',
      id: '2',
      rating: 'B',
    },
  ],
};

let searchService: SearchService;
const http = {
  get: jest.fn(() => of(mockGifsData)),
};

jest.mock('@angular/common/http');

describe('Search Service', () => {
  beforeEach(() => {
    searchService = new SearchService(
      http as any,
      new SearchDataStore(),
      new EnvironmentService()
    );
  });

  it('should get the Gifs data for the text entered', (done) => {
    // Arrange
    const q = 'car';
    const offset = 0;
    const limit = 25;

    // Mock Query Params Required
    const mockGetQueryParams = jest.fn();
    searchService.getQueryParams = mockGetQueryParams;
    mockGetQueryParams.mockReturnValue({
      q,
      offset,
      limit
    });

    // Act
    searchService
      .loadAndGetObservableGifsData(q, offset)
      .subscribe((gifsData: IGiffySearch) => {
        //Assert
        expect(gifsData.data.length).toBe(2);
        expect(gifsData.data[0].title).toBe('Car-1');
        expect(gifsData.data[1].title).toBe('Car-2');
        done();

      });
  });
});
