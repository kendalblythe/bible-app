import { useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { PageSpinner } from '../components';
import { useGlobalStore, useLocalStorageState } from '../hooks';
import { Passage } from '../types';
import { BiblesView, BooksView, ChaptersView } from '../views';

export default function Home() {
  const router = useRouter();
  const { bibleId, bookId } = useGlobalStore();
  const [passage, , isLoaded] = useLocalStorageState<Passage | undefined>(
    'bible-nextjs-app-passage',
    undefined
  );
  console.info(`passage = ${passage}`);

  useEffect(() => {
    if (passage) {
      router.replace(
        `/passage/${passage.bibleAbbreviation}/${passage.bookId}/${passage.chapterNumber}`
      );
    }
  }, [router, passage]);

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

      {isLoaded && !passage ? getView() : <PageSpinner />}
    </>
  );
}
