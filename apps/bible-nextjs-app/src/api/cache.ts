import NodeCache from 'node-cache';

import { getBibles, getBook as apiGetBook } from './apis';
import { BibleSummary, Book } from './types';

const cache = new NodeCache();

export const getBible = async (abbreviation: string): Promise<BibleSummary | null> => {
  const key = 'bibles';
  const cachedBibles = cache.get<BibleSummary[]>(key);
  const bibles = cachedBibles ?? (await getBibles());
  cache.set(key, bibles);
  const bible = bibles.find((bible) => bible.abbreviation === abbreviation);
  return bible ?? null;
};

export const getBook = async (bibleId: string, bookId: string): Promise<Book | null> => {
  const key = `${bibleId}.${bookId}`;
  const cachedBook = cache.get<Book>(key);
  const book = cachedBook ?? (await apiGetBook(bibleId, bookId));
  if (book) cache.set(key, book);
  return book;
};
