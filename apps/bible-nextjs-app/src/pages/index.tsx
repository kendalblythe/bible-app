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
  const [currentBible, setCurrentBible] = useState<BibleSummary | undefined>();
  const [currentBook, setCurrentBook] = useState<BookSummary | undefined>();

  useEffect(() => {
    if (state) {
      router.replace(`/passage/${state.bibleAbbreviation}/${state.bookId}/${state.chapterNumber}`);
    }
  }, [router, state]);

  const getView = () => {
    if (viewType === 'chapters' && currentBible && currentBook) {
      return (
        <ChaptersView
          currentBibleId={currentBible.id}
          currentBookId={currentBook.id}
          onChapterSelected={(chapter) => {
            router.replace(
              `/passage/${currentBible.abbreviation}/${currentBook.id}/${chapter.number}`
            );
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
    if (viewType === 'books' && currentBible) {
      return (
        <BooksView
          currentBibleId={currentBible.id}
          currentBookId={currentBook?.id}
          onBookSelected={(book) => {
            setCurrentBook(book);
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
        currentBible={currentBible}
        onBibleSelected={(bible) => {
          setCurrentBible(bible);
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
        <link rel="icon" href="/currentBible.png" />
      </Head>

      {isLoaded && !state ? getView() : null}

      {!isLoaded || isPageLoading ? <PageSpinner /> : null}
    </>
  );
}
