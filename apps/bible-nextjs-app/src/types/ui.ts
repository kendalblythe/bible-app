export const localStorageKey = 'bible-nextjs-app-passage';

export interface LocalStorageState {
  bibleAbbreviation: string;
  bookId: string;
  chapterNumber: string;
}

export type ViewType = 'bibles' | 'books' | 'chapters';
