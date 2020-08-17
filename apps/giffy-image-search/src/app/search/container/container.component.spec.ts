import { render, waitFor } from '@testing-library/angular';
import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { TableModule } from '@fedex/table';
import { TextboxModule } from '@fedex/textbox';
import { PaginatorModule } from '@fedex/paginator';
import { LoaderModule } from '@fedex/loader';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { ContainerComponent } from './container.component';
import { MessageComponent } from './message/message.component';

import { SearchService } from '../services/search.service';
import { ProfanityService } from '../services/profanity.service';

import { IGiffySearch } from '@fedex/data';

let mockProfanityService: ProfanityService;
let mockSearchService: SearchService;

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

@Injectable()
class MockSearchService {
  getGifsData() {
    return of(mockGifsData);
  }
  loadAndGetObservableGifsData() {
    return of(mockGifsData);
  }
}

@Injectable()
class MockProfanityService {
  containsProfanity() {
    return of(false);
  }
}

jest.useFakeTimers();

describe('Search feature Container - Valid Text', () => {
  function setup() {
    return render(ContainerComponent, {
      componentProperties: {},
      declarations: [ContainerComponent, MessageComponent],
      providers: [
        ContainerComponent,
        { provide: SearchService, useClass: MockSearchService },
        { provide: ProfanityService, useClass: MockProfanityService },
      ],
      imports: [
        FormsModule,
        TableModule,
        TextboxModule,
        PaginatorModule,
        LoaderModule,
        ScrollingModule,
      ],
    });
  }

  it('should capture the initial state of search feature', async () => {
    const { fixture } = await setup();
    expect(fixture).toMatchSnapshot();
  });

  it('should display records for valid search text', async (done) => {
    const { fixture, getByText } = await setup();

    // Arrange
    const text = 'cars';
    mockProfanityService = TestBed.inject(ProfanityService);
    mockSearchService = TestBed.inject(SearchService);

    // Enter cars as text
    fixture.componentInstance.searchText$.next('');
    fixture.componentInstance.paginatorChange$.next({ offset: 0, endIndex: 0 });
    fixture.detectChanges();
    fixture.autoDetectChanges();

    // Advance becasue of DEBOUNCE TIME
    jest.advanceTimersByTime(600);

    fixture.componentInstance.searchText$.next(text);
    fixture.detectChanges();
    fixture.autoDetectChanges();

    waitFor(() => {
      expect(getByText('Car-1')).toBeDefined();
      done();
    });
  });
});

@Injectable()
class StubProfanityService {
  containsProfanity() {
    return of(true);
  }
}

@Injectable()
class StubSearchService {
  getGifsData() {
    return of(mockGifsData);
  }
  loadAndGetObservableGifsData() {
    return of(mockGifsData);
  }
}
describe('Search feature Container - Profanity Text', () => {
  function setup() {
    return render(ContainerComponent, {
      componentProperties: {},
      declarations: [ContainerComponent, MessageComponent],
      providers: [
        ContainerComponent,
        { provide: SearchService, useClass: StubSearchService },
        { provide: ProfanityService, useClass: StubProfanityService },
      ],
      imports: [
        FormsModule,
        TableModule,
        TextboxModule,
        PaginatorModule,
        LoaderModule,
        ScrollingModule,
      ],
    });
  }

  it('should display validation message for profanity word', async () => {
    const { fixture, getByText } = await setup();

    // Arrange
    const text = 'fuck';
    mockProfanityService = TestBed.inject(ProfanityService);
    mockSearchService = TestBed.inject(SearchService);

    // Enter cars as text
    fixture.componentInstance.searchText$.next('');
    fixture.componentInstance.paginatorChange$.next({ offset: 0, endIndex: 0 });
    fixture.detectChanges();

    // Advance becasue of DEBOUNCE TIME
    jest.advanceTimersByTime(600);

    fixture.componentInstance.searchText$.next(text);
    fixture.detectChanges();

    const expectation = `Please enter valid text. We are not obliged to diplay results for profanity word...`;

    // Assert
    expect(getByText(expectation)).toBeDefined();
  });
});
