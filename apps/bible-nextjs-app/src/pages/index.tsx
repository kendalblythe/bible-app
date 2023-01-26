import Head from 'next/head';

import { useBibleStore } from '../hooks';
import { BiblesView, BooksView } from '../views';

export default function Home() {
  const { bibleId } = useBibleStore();

  return (
    <>
      <Head>
        <title>Bible Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      {bibleId ? <BooksView /> : <BiblesView />}
    </>
  );
}
