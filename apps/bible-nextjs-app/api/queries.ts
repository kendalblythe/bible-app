import { AxiosError } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import axios from './axios';
import { BibleSummary } from './types';
import { getLatestBibleVersions } from '../utils/bible';

type QueryOptions<T> = Omit<UseQueryOptions<T, AxiosError, T, string[]>, 'queryFn' | 'queryKey'>;

export const useBiblesQuery = (options?: QueryOptions<BibleSummary[]>) =>
  useQuery(
    ['bibles'],
    async () => {
      const response = await axios.get('/bibles');
      const bibles: BibleSummary[] = response.data.data;
      return getLatestBibleVersions(bibles);
    },
    {
      cacheTime: Infinity,
      retry: false,
      staleTime: Infinity,
      ...options,
    }
  );
