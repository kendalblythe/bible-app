import { IntlProvider } from 'react-intl';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import en from '../locales/en.json';
import es from '../locales/es.json';

import '../styles/globals.css';
import '../styles/scripture-styles.css';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages = { en, es } as any;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const locale = router.locale ?? 'en';
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <Component {...pageProps} />
      </IntlProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
