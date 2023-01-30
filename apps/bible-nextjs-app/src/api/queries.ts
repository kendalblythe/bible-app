/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery, UseQueryOptions } from 'react-query';

import { AxiosError } from 'axios';

import { getBookGroupings, getLanguages, getLatestBibleVersions } from '../utils/bible';
import axios from './axios';
import { Bible, BiblesAndLanguages, Book, BooksAndGroupings, BookSummary } from './types';

type QueryOptions<T> = Omit<UseQueryOptions<T, AxiosError, T, string[]>, 'queryFn' | 'queryKey'>;

const defaultOptions = {
  cacheTime: Infinity,
  staleTime: Infinity,
  retry: false,
};

export const useBiblesQuery = (options?: QueryOptions<BiblesAndLanguages>) =>
  useQuery(
    ['bibles'],
    async () => {
      const response = await axios.get('/bibles');
      const bibles = getLatestBibleVersions(response.data.data);
      const languages = getLanguages(bibles);
      return { bibles, languages };
    },
    {
      ...defaultOptions,
      ...options,
    }
  );

export const useBibleQuery = (bibleId: string | undefined, options?: QueryOptions<Bible>) =>
  useQuery(
    ['bibles', bibleId!],
    async () => {
      const response = await axios.get(`/bibles/${bibleId}`);
      return response.data.data as Bible;
    },
    {
      ...defaultOptions,
      ...options,
      enabled: !!bibleId,
    }
  );

export const useBooksQuery = (
  bibleId: string | undefined,
  options?: QueryOptions<BooksAndGroupings>
) =>
  useQuery(
    ['bibles', bibleId!, 'books'],
    async () => {
      const response = await axios.get(`/bibles/${bibleId!}/books`);
      const books = response.data.data as BookSummary[];
      return getBookGroupings(books);
    },
    {
      ...defaultOptions,
      ...options,
      enabled: !!bibleId,
    }
  );

export const useBookQuery = (
  bibleId: string | undefined,
  bookId: string | undefined,
  options?: QueryOptions<Book>
) =>
  useQuery(
    ['bibles', bibleId!, 'books', bookId!],
    async () => {
      const response = await axios.get(`/bibles/${bibleId}/books/${bookId}?include-chapters=true`);
      return response.data.data as Book;
    },
    {
      ...defaultOptions,
      ...options,
      enabled: !!bibleId && !!bookId,
    }
  );
