import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { IntlProvider } from 'react-intl';

import en from '../lang/en.json';
import es from '../lang/es.json';
import he from '../lang/he.json';

import '../styles/globals.css';

const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages = { en, es, he } as any;

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
