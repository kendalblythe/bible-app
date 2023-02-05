import { Head, Html, Main, NextScript } from 'next/document';

import { isRtlLang } from 'rtl-detect';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Document(props: any) {
  const { locale } = props.__NEXT_DATA__;
  return (
    <Html dir={isRtlLang(locale) ? 'rtl' : 'ltr'}>
      <Head>
        <link rel="stylesheet" href="https://assets.api.bible/css/scripture-styles.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
