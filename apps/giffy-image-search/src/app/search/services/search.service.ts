import { Injectable } from '@angular/core';
import { tap, take, share, shareReplay, publishReplay } from 'rxjs/operators';

import { HttpClient, HttpParams } from '@angular/common/http';

import { SearchDataStore } from '../store/search.store';
import { IGiffySearch } from '@fedex/data';
import { EnvironmentService } from '../../environment.service';

/**
 * Service that is responsible for Handling/loading data.
 * After loading store the data to store.
 */
@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(
    private http: HttpClient,
    private searchStore: SearchDataStore,
    private environmentService: EnvironmentService
  ) {}

  loadAndGetObservableGifsData(text: string, offset: number) {
    this.loadGifsData(text, offset);

    return this.getGifsData();
  }

  /**
   * Returns latest state of observable.
   *
   * This holds current search results performed for entered text.
   *
   * @returns an observable of IGiffySearch
   */
  getGifsData() {
    return this.searchStore.getSearchTextResults();
  }

  private loadGifsData(text: string, offset: number) {
    this.http
      .get<IGiffySearch>(`${this.environmentService.baseUrl}/search`, {
        params: this.getQueryParams(text, offset),
      })
      .pipe(
        shareReplay(),
        take(1),
        tap((value) => this.searchStore.setSearchTextResults(value))
      )
      .subscribe();
  }

  getQueryParams(text, offset) {
    return new HttpParams()
      .set('q', text)
      .set('offset', String(offset))
      .set('limit', String(this.environmentService.limit));
  }
}
