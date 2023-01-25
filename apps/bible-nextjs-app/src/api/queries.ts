import { useQuery, UseQueryOptions } from 'react-query';

import { AxiosError } from 'axios';

import { getLanguages, getLatestBibleVersions } from '../utils/bible';
import axios from './axios';
import { BiblesAndLanguages } from './types';

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
