// This could be also part of application itself.
// Keeping this under libs, would help to share same interface between application and libs and may be also with Backend like NodeJS/NESTJS
// Because of Monorepo we can have all apps in one space.

export enum ContentState {
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
  EMPTY = 'empty',
  PROFANITY = 'profanity'
}

export interface IGiffySearch {
  data: IGiffyData[];
  pagination: IPagination;
}

export interface IGiffyData {
  images: IOriginalImage;
  type: string;
  title: string;
  id: string;
  rating: string;
}

export interface IOriginalImage {
  original: {
    url: string;
    width: string;
    height: string;
  };
}

export interface IPagination {
  total_count: number;
  offset: number;
  count: number;
}

export interface IPaginator {
  offset: number;
  endIndex: number;
}

export interface IContentState {
  state: ContentState;
  error?: boolean;
}
