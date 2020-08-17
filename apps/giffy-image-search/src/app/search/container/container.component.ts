import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import {
  Observable,
  combineLatest,
  BehaviorSubject,
  of,
} from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  catchError,
  startWith,
  tap,
} from 'rxjs/operators';

import {
  IPaginator,
  IContentState,
  ContentState,
  IGiffySearch,
} from '@fedex/data';

import { SearchService } from '../services/search.service';
import { ProfanityService } from '../services/profanity.service';

const DEBOUNCE_TIME = 500;

/**
 * Container that wraps the search feature.
 *
 * This combines searchbox and its corresponding results.
 * The results are represented in table format along with pagination.
 *
 * Based on Comments -> Compodoc can generate readable static site.
 */
@Component({
  selector: 'fedex-search-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit, AfterViewInit, OnDestroy {
  // Options for Table component
  columns = ['image', 'type', 'title', 'id', 'rating'];
  datasource$: Observable<IGiffySearch>;

  // Observable for search text
  searchText$ = new BehaviorSubject<string>('');
  // Observable for paginator change
  paginatorChange$ = new BehaviorSubject<IPaginator>({
    endIndex: 0,
    offset: 0,
  });
  // Internal observable for view to represent loading state
  loadingState$: Observable<IContentState>;

  /**
   * @ignore
   */
  constructor(
    private searchService: SearchService,
    private profanityService: ProfanityService
  ) {}

  /**
   * Initialization
   * Datasource gets binded async from search service -> search store
   *
   * Emit default puppies text so user can some results to see on page load.
   */
  ngOnInit() {
    this.datasource$ = this.searchService.getGifsData();
    this.searchText$.next('puppies');
  }

  /**
   * Responsible for couple of activities after view is loaded
   *
   * 1. Listen for changes in textbox
   * 2. Listen for changes in paginator
   * 3. combines both observables and reacts when either of gets triggered
   * 4. Check for profanity for the entered text
   * 5. If not, then load the gifss data
   * 6. switchMap cancels the previous subscription when new value passes through after debounce time.
   *
   *  No need of unsubscription coz of binding in template directly
   *
   *  Returns loading state based on the activity happened
   */
  ngAfterViewInit() {
    this.loadingState$ = combineLatest([
      this.searchText$,
      this.paginatorChange$,
    ]).pipe(
      debounceTime(DEBOUNCE_TIME),
      distinctUntilChanged(),
      switchMap(([text, paginator]) =>
        this.containsProfanity(text).pipe(
          switchMap((isProfanity) =>
            isProfanity
              ? of({ state: ContentState.PROFANITY })
              : this.loadGifsData(text, paginator.offset).pipe(
                  map(({ data }) => {
                    if (data.length) {
                      return { state: ContentState.LOADED };
                    } else {
                      return { state: ContentState.EMPTY };
                    }
                  })
                )
          ),
          startWith({
            state: ContentState.LOADING,
          })
        )
      ),
      catchError(() =>
        of({
          state: ContentState.ERROR,
          error: true,
        })
      )
    );
  }

  /**
   *
   * @param event Emitted from Paginator component
   */
  onPageChange(event: IPaginator) {
    this.paginatorChange$.next(event);
  }

  /**
   *
   * @param text to process for profanity check
   *
   * @returns observable of boolean value
   */
  containsProfanity(text) {
    return this.profanityService.containsProfanity(text);
  }

  /**
   *
   * @param text Entered text by ser
   * @param offset offset to load gifs data for the entered text
   *
   * @returns observable of IGiffySearch
   */
  loadGifsData(text: string, offset: number) {
    return this.searchService.loadAndGetObservableGifsData(text, offset);
  }

  ngOnDestroy() {
    this.searchText$.unsubscribe();
    this.paginatorChange$.unsubscribe();
  }
}
