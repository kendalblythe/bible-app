import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { BibleSummary, BookSummary } from '../api/types';
import { PageSpinner } from '../components';
import { useLocalStorageState, usePageLoading } from '../hooks';
import { localStorageKey, LocalStorageState, ViewType } from '../types/ui';
import { BiblesView, BooksView, ChaptersView } from '../views';

export default function Home() {
  const router = useRouter();
  const { isPageLoading } = usePageLoading();

  // local storage state
  const [state, , isLoaded] = useLocalStorageState<LocalStorageState | undefined>(
    localStorageKey,
    undefined
  );

  // state
  const [viewType, setViewType] = useState<ViewType>('bibles');
  const [bible, setBible] = useState<BibleSummary | undefined>();
  const [book, setBook] = useState<BookSummary | undefined>();

  useEffect(() => {
    if (state) {
      router.replace(`/passage/${state.bibleAbbreviation}/${state.bookId}/${state.chapterNumber}`);
    }
  }, [router, state]);

  const getView = () => {
    if (viewType === 'chapters' && bible && book) {
      return (
        <ChaptersView
          bibleId={bible.id}
          bookId={book.id}
          onChapterSelected={(chapter) => {
            router.replace(`/passage/${bible.abbreviation}/${book.id}/${chapter.number}`);
          }}
          onGoBibles={() => {
            setViewType('bibles');
          }}
          onGoBooks={() => {
            setViewType('books');
          }}
        />
      );
    }
    if (viewType === 'books' && bible) {
      return (
        <BooksView
          bibleId={bible.id}
          bookId={book?.id}
          onBookSelected={(book) => {
            setBook(book);
            setViewType('chapters');
          }}
          onGoBibles={() => {
            setViewType('bibles');
          }}
        />
      );
    }
    return (
      <BiblesView
        bible={bible}
        onBibleSelected={(bible) => {
          setBible(bible);
          setViewType('books');
        }}
      />
    );
  };

  return (
    <>
      <Head>
        <title>Bible Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      {isLoaded && !state ? getView() : null}

      {!isLoaded || isPageLoading ? <PageSpinner /> : null}
    </>
  );
}
