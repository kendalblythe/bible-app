/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useQuery, UseQueryOptions } from 'react-query';

import { AxiosError } from 'axios';

import { getBookGroupings, getLanguages } from '../utils/bible';
import { getBible, getBibles, getBook, getBooks } from './apis';
import { Bible, BiblesAndLanguages, Book, BooksAndGroupings } from './types';

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
      const bibles = await getBibles();
      const languages = getLanguages(bibles);
      return { bibles, languages };
    },
    {
      ...defaultOptions,
      ...options,
    }
  );

export const useBibleQuery = (bibleId: string | undefined, options?: QueryOptions<Bible>) =>
  useQuery(['bibles', bibleId!], () => getBible(bibleId!), {
    ...defaultOptions,
    ...options,
    enabled: !!bibleId,
  });

export const useBooksQuery = (
  bibleId: string | undefined,
  options?: QueryOptions<BooksAndGroupings>
) =>
  useQuery(
    ['bibles', bibleId!, 'books'],
    async () => {
      const books = await getBooks(bibleId!);
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
  useQuery(['bibles', bibleId!, 'books', bookId!], () => getBook(bibleId!, bookId!), {
    ...defaultOptions,
    ...options,
    enabled: !!bibleId && !!bookId,
  });
