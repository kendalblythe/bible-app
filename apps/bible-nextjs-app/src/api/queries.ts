import { useQuery, UseQueryOptions } from 'react-query';

import { AxiosError } from 'axios';

import { getLanguages, getLatestBibleVersions } from '../utils/bible';
import axios from './axios';
import { Bible, BiblesAndLanguages, Book } from './types';

type QueryOptions<T> = Omit<UseQueryOptions<T, AxiosError, T, string[]>, 'queryFn' | 'queryKey'>;

export const useBiblesAndLanguagesQuery = (options?: QueryOptions<BiblesAndLanguages>) =>
  useQuery(
    ['bibles'],
    async () => {
      const response = await axios.get('/bibles');
      const bibles = getLatestBibleVersions(response.data.data);
      const languages = getLanguages(bibles);
      return { bibles, languages };
    },
    {
      cacheTime: Infinity,
      retry: false,
      staleTime: Infinity,
      ...options,
    }
  );

export const useBibleQuery = (bibleId: string, options?: QueryOptions<Bible>) =>
  useQuery(
    ['bibles', bibleId],
    async () => {
      const response = await axios.get(`/bibles/${bibleId}`);
      return response.data.data as Bible;
    },
    {
      cacheTime: Infinity,
      retry: false,
      staleTime: Infinity,
      ...options,
    }
  );

export const useBooksQuery = (bibleId: string, options?: QueryOptions<Book[]>) =>
  useQuery(
    ['bibles', bibleId, 'books'],
    async () => {
      const response = await axios.get(`/bibles/${bibleId}/books`);
      return response.data.data as Book[];
    },
    {
      cacheTime: Infinity,
      retry: false,
      staleTime: Infinity,
      ...options,
    }
  );
