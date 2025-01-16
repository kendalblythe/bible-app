import { useState } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { useMutation } from '@tanstack/react-query';
import { ParsedUrlQuery } from 'querystring';

import { getChapter } from '../../../../api/apis';
import { getBible, getBook } from '../../../../api/cache';
import { BibleSummary, Book, BookSummary, Chapter } from '../../../../api/types';
import { PageSpinner } from '../../../../components';
import { usePageLoading } from '../../../../hooks';
import { ViewType } from '../../../../types/ui';
import { getChapterId } from '../../../../utils/bible';
import { BiblesView, BooksView, ChaptersView, ChapterView, ErrorView } from '../../../../views';

export interface ChapterPageProps {
  bible?: BibleSummary;
  book?: Book;
  chapter?: Chapter;
}

export default function ChapterPage(props: ChapterPageProps) {
  const { bible, book, chapter } = props;
  const router = useRouter();
  const { isPageLoading } = usePageLoading();

  // state
  const [viewType, setViewType] = useState<ViewType | undefined>();
  const [updatedBible, setUpdatedBible] = useState<BibleSummary | undefined>();
  const [updatedBook, setUpdatedBook] = useState<BookSummary | undefined>();

  // mutations
  const chapterExistsMutation = useMutation(async (bible: BibleSummary) => {
    if (book && chapter) {
      const chapterId = getChapterId(book.id, chapter.number);
      const bibleChapter = await getChapter(bible.id, chapterId);
      return !!bibleChapter;
    }
    return false;
  });

  // handle query error
  if (!bible || !book || !chapter) return <ErrorView />;

  const resetView = () => {
    setViewType(undefined);
    setUpdatedBible(undefined);
    setUpdatedBook(undefined);
  };

  const getView = () => {
    switch (viewType) {
      case 'bibles':
        return (
          <BiblesView
            currentBible={updatedBible ?? bible}
            onBibleSelected={async (bible) => {
              // check to determine if the chapter exists in the selected bible
              if (await chapterExistsMutation.mutateAsync(bible)) {
                // chapter exists - go to chapter in selected bible
                router.push(`/passage/${bible.abbreviation}/${book.id}/${chapter.number}`);
                resetView();
              } else {
                // chapter does not exist - user must select a book
                setUpdatedBible(bible);
                setViewType('books');
              }
            }}
            onGoBack={resetView}
          />
        );
      case 'books':
        return (
          <BooksView
            currentBibleId={updatedBible?.id ?? bible.id}
            currentBookId={updatedBook?.id ?? book.id}
            onBookSelected={(book) => {
              setUpdatedBook(book);
              setViewType('chapters');
            }}
            onGoBack={resetView}
            onGoBibles={() => {
              setViewType('bibles');
            }}
          />
        );
      case 'chapters':
        return (
          <ChaptersView
            currentBibleId={updatedBible?.id ?? bible.id}
            currentBookId={updatedBook?.id ?? book.id}
            currentChapterId={chapter.id}
            onChapterSelected={(chapter, book, bible) => {
              router.push(`/passage/${bible.abbreviation}/${book.id}/${chapter.number}`);
              resetView();
            }}
            onGoBack={resetView}
            onGoBibles={() => {
              setViewType('bibles');
            }}
            onGoBooks={() => {
              setViewType('books');
            }}
          />
        );
    }
    return (
      <ChapterView bible={bible} book={book} chapter={chapter} onViewTypeChange={setViewType} />
    );
  };

  return (
    <>
      <Head>
        <title>
          {`Bible Next.js App - ${book.name} ${chapter.number} ${bible.abbreviationLocal}`}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      {getView()}

      {isPageLoading || chapterExistsMutation.isLoading ? <PageSpinner /> : null}
    </>
  );
}

interface QParams extends ParsedUrlQuery {
  bibleAbbreviation: string;
  bookId: string;
  chapterNumber: string;
}

export const getServerSideProps: GetServerSideProps<ChapterPageProps, QParams> = async ({
  params,
}) => {
  if (params) {
    try {
      const { bibleAbbreviation, bookId, chapterNumber } = params;
      const chapterId = getChapterId(bookId, chapterNumber);
      const bible = await getBible(bibleAbbreviation);
      const book = bible ? await getBook(bible.id, bookId) : null;
      const chapter = bible ? await getChapter(bible.id, chapterId) : null;
      if (bible && book && chapter) {
        return {
          props: {
            bible,
            book,
            chapter,
          },
        };
      }
    } catch (err: unknown) {
      console.error(err);
      return {
        props: {},
      };
    }
  }
  return {
    notFound: true,
  };
};
