import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { getBookGroupings, getLanguages } from '../utils/bible';
import { getBible, getBibles, getBook, getBooks } from './apis';
import { queryKeys } from './queryKeys';
import { Bible, BiblesAndLanguages, Book, BookQueryParams, BooksAndGroupings } from './types';

type QueryOptions<T> = Omit<UseQueryOptions<T, AxiosError, T, string[]>, 'queryFn' | 'queryKey'>;

const defaultOptions = {
  gcTime: Infinity,
  staleTime: Infinity,
  retry: false,
} as const satisfies QueryOptions<unknown>;

export const useBiblesQuery = (options?: QueryOptions<BiblesAndLanguages>) =>
  useQuery({
    queryKey: queryKeys.bibles(),
    queryFn: async () => {
      const bibles = await getBibles();
      const languages = getLanguages(bibles);
      return { bibles, languages };
    },
    ...defaultOptions,
    ...options,
  });

export const useBibleQuery = (bibleId: string | undefined, options?: QueryOptions<Bible>) =>
  useQuery({
    queryKey: queryKeys.bible(bibleId!),
    queryFn: () => getBible(bibleId!),
    ...defaultOptions,
    ...options,
    enabled: !!bibleId,
  });

export const useBooksQuery = (
  bibleId: string | undefined,
  options?: QueryOptions<BooksAndGroupings>
) =>
  useQuery({
    queryKey: queryKeys.books(bibleId!),
    queryFn: async () => {
      const books = await getBooks(bibleId!);
      return getBookGroupings(books);
    },
    ...defaultOptions,
    ...options,
    enabled: !!bibleId,
  });

export const useBookQuery = (
  bibleId: string | undefined,
  bookId: string | undefined,
  params?: BookQueryParams,
  options?: QueryOptions<Book | null>
) =>
  useQuery({
    queryKey: queryKeys.book(bibleId!, bookId!),
    queryFn: () => getBook(bibleId!, bookId!, params),
    ...defaultOptions,
    ...options,
    enabled: !!bibleId && !!bookId,
  });
