import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { IGiffySearch } from '@fedex/data';

// Initial model that holds data
const InitialData: IGiffySearch = {
  data: [],
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0,
  },
};

/**
 * A store that holds results for entered text.
 *
 * In future we could always move this part to any state management depending on situations.
 */
@Injectable({ providedIn: 'root' })
export class SearchDataStore implements OnDestroy {
  private _searchTextResults$ = new BehaviorSubject<IGiffySearch>(InitialData);

  setSearchTextResults(results: IGiffySearch) {
    this._searchTextResults$.next(results);
  }
  getSearchTextResults() {
    return this._searchTextResults$.asObservable();
  }

  ngOnDestroy() {
    this._searchTextResults$.unsubscribe();
  }
}
