import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { IntlProvider } from 'react-intl';
import { isRtlLang } from 'rtl-detect';

import en from '../lang/en.json';
import es from '../lang/es.json';

import '../styles/globals.css';

const queryClient = new QueryClient();

const messages = {
  en,
  es,
};

const getDirection = (locale: string) => (isRtlLang(locale) ? 'rtl' : 'ltr');

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  console.info(`locale = ${router.locale}`);
  const locale = router.locale ?? 'en';
  return (
    <QueryClientProvider client={queryClient}>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <IntlProvider locale={locale} messages={(messages as any)[locale]}>
        <Component {...pageProps} dir={getDirection(locale)} />
      </IntlProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
