import { newTestamentBookIdSet, oldTestamentBookIdSet } from '../api/constants';
import { BibleSummary, BookSummary, BooksAndGroupings, Language } from '../api/types';
import { sortBibles, sortByName } from './sort';

export const getLatestBibleVersions = (bibles: BibleSummary[]): BibleSummary[] => {
  sortBibles(bibles);
  const dblIdSet = new Set<string>();
  const latestBibles: BibleSummary[] = [];
  for (const bible of bibles) {
    if (!dblIdSet.has(bible.dblId)) {
      dblIdSet.add(bible.dblId);
      latestBibles.push(bible);
    }
  }
  return latestBibles;
};

export const getLanguages = (bibles: BibleSummary[]): Language[] => {
  const languageMap = new Map<string, Language>();
  for (const bible of bibles) {
    languageMap.set(bible.language.id, bible.language);
  }
  const languages = Array.from(languageMap.values());
  sortByName(languages);
  return languages;
};

export const getLanguageDisplayName = (language: Language): string => {
  return language.name === language.nameLocal
    ? language.name
    : `${language.name} (${language.nameLocal})`;
};

export const getBookGroupings = (books: BookSummary[]): BooksAndGroupings => {
  const oldTestamentBooks: BookSummary[] = [];
  const newTestamentBooks: BookSummary[] = [];
  const apocryphaBooks: BookSummary[] = [];
  for (const book of books) {
    if (oldTestamentBookIdSet.has(book.id)) {
      oldTestamentBooks.push(book);
    } else if (newTestamentBookIdSet.has(book.id)) {
      newTestamentBooks.push(book);
    } else {
      apocryphaBooks.push(book);
    }
  }
  return { books, oldTestamentBooks, newTestamentBooks, apocryphaBooks };
};
