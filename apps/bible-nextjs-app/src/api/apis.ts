/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { getLatestBibleVersions } from '../utils/bible';
import axios from './axios';
import { Bible, BibleSummary, Book, BookSummary } from './types';

export const getBibles = async (): Promise<BibleSummary[]> => {
  const response = await axios.get('/bibles');
  return getLatestBibleVersions(response.data.data);
};

export const getBible = async (bibleId: string): Promise<Bible> => {
  const response = await axios.get(`/bibles/${bibleId}`);
  return response.data.data as Bible;
};

export const getBooks = async (bibleId: string): Promise<BookSummary[]> => {
  const response = await axios.get(`/bibles/${bibleId!}/books`);
  return response.data.data as BookSummary[];
};

export const getBook = async (bibleId: string, bookId: string): Promise<Book> => {
  const response = await axios.get(`/bibles/${bibleId}/books/${bookId}?include-chapters=true`);
  return response.data.data as Book;
};
