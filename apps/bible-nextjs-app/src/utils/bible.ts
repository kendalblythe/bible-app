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
  makeBibleAbbreviationUnique(latestBibles);
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

const makeBibleAbbreviationUnique = (bibles: BibleSummary[]): void => {
  // get duplicate abbreviations
  const abbreviationSet = new Set<string>();
  const dupAbbreviationSet = new Set<string>();
  for (const bible of bibles) {
    if (abbreviationSet.has(bible.abbreviation)) dupAbbreviationSet.add(bible.abbreviation);
    abbreviationSet.add(bible.abbreviation);
  }

  // get duplicate bibles map
  const dupBibles = bibles.filter((bible) => dupAbbreviationSet.has(bible.abbreviation));
  const dupBiblesMap: Record<string, BibleSummary[]> = {};
  for (const bible of dupBibles) {
    const dupBibles = dupBiblesMap[bible.abbreviation] ?? [];
    dupBibles.push(bible);
    dupBiblesMap[bible.abbreviation] = dupBibles;
  }

  // make bible abbreviation unique for duplicate bibles
  for (const abbr of Object.keys(dupBiblesMap)) {
    // check if adding language make abbreviation unique
    const dupBibles = dupBiblesMap[abbr];
    const languageIdSet = new Set<string>();
    for (const bible of dupBibles) languageIdSet.add(bible.language.id);

    if (dupBibles.length === languageIdSet.size) {
      // prepend language id to abbreviation to make abbreviation unique
      for (const bible of dupBibles)
        bible.abbreviation = `${bible.language.id}${bible.abbreviation}`;
    } else {
      // check if abbreviation local is unique
      const abbreviationLocalSet = new Set<string>();
      for (const bible of dupBibles) abbreviationLocalSet.add(bible.abbreviationLocal);

      if (dupBibles.length === abbreviationLocalSet.size) {
        // set abbreviation = abbrevation local to make abbreviation unique
        for (const bible of dupBibles) bible.abbreviation = bible.abbreviationLocal;
      }
    }
  }
};
