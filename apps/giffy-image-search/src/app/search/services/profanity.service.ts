import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

// Free API that returns profanity check.
const PROFANITY_CHECK_URL =
  'https://www.purgomalum.com/service/containsprofanity';

  /**
   * A Service that is responsible for finding profanity check.
   *
   * @returns a boolean observable indicating the text is profanity or not.
   */
@Injectable({ providedIn: 'root' })
export class ProfanityService {
  constructor(private http: HttpClient) {}

  containsProfanity(searchInput: string): Observable<boolean> {
    if(searchInput === '')
      return of(false);
    return this.http.get(`${PROFANITY_CHECK_URL}?text=${searchInput}`).pipe(
      take(1),
      map((value: boolean) => value)
    );
  }
}
