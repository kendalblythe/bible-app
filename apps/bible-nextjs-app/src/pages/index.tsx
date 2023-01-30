import Head from 'next/head';

import { useGlobalStore } from '../hooks';
import { BiblesView, BooksView, ChaptersView } from '../views';

export default function Home() {
  const { bibleId, bookId } = useGlobalStore();

  const getView = () => {
    if (bibleId && bookId) return <ChaptersView />;
    if (bibleId) return <BooksView />;
    return <BiblesView />;
  };

  return (
    <>
      <Head>
        <title>Bible Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      {getView()}
    </>
  );
}
