import { AxiosError, isAxiosError } from 'axios';
import qs from 'qs';

import { getLatestBibleVersions } from '../utils/bible';
import axios from './axios';
import {
  Bible,
  BibleSummary,
  Book,
  BookQueryParams,
  BookSummary,
  Chapter,
  ChapterQueryParams,
} from './types';

export const getBibles = async (): Promise<BibleSummary[]> => {
  const response = await axios.get('/bibles');
  return getLatestBibleVersions(response.data.data);
};

export const getBible = async (bibleId: string): Promise<Bible> => {
  const response = await axios.get(`/bibles/${bibleId}`);
  return response.data.data as Bible;
};

export const getBooks = async (bibleId: string): Promise<BookSummary[]> => {
  const query = qs.stringify({
    'include-chapters': true,
  });
  const response = await axios.get(`/bibles/${bibleId!}/books?${query}`);
  const books = response.data.data as Book[];
  return books
    .filter((book) => book.chapters.length > 0)
    .map((book) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { chapters, ...bookSummary } = book;
      return bookSummary as BookSummary;
    });
};

export const getBook = async (
  bibleId: string,
  bookId: string,
  params?: BookQueryParams
): Promise<Book | null> => {
  const query = qs.stringify({
    'include-chapters': params?.includeChapters ?? false,
  });
  try {
    const response = await axios.get(`/bibles/${bibleId}/books/${bookId}?${query}`);
    return response.data.data as Book;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const e = err as AxiosError;
      if (e.response?.status === 404) return null; // not found
    }
    throw err;
  }
};

export const getChapter = async (
  bibleId: string,
  chapterId: string,
  params?: ChapterQueryParams
): Promise<Chapter | null> => {
  try {
    const query = qs.stringify({
      'include-notes': params?.includeNotes ?? false,
    });
    const response = await axios.get(`/bibles/${bibleId}/chapters/${chapterId}?${query}`);
    return response.data.data as Chapter;
  } catch (err: unknown) {
    if (isAxiosError(err)) {
      const e = err as AxiosError;
      if (e.response?.status === 404) return null; // not found
    }
    throw err;
  }
};
