import { useState } from 'react';
import { useMutation } from 'react-query';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import { getChapter } from '../../../../api/apis';
import { getBible, getBook } from '../../../../api/cache';
import { BibleSummary, Book, BookSummary, Chapter } from '../../../../api/types';
import { PageSpinner } from '../../../../components';
import { usePageLoading } from '../../../../hooks';
import { ViewType } from '../../../../types/ui';
import { popStack } from '../../../../utils/array';
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
  const [viewTypeStack, setViewTypeStack] = useState<ViewType[]>([]);
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

  const getView = () => {
    if (viewTypeStack.length > 0) {
      const viewType = viewTypeStack[viewTypeStack.length - 1];
      switch (viewType) {
        case 'bibles':
          return (
            <BiblesView
              bible={updatedBible ?? bible}
              onBibleSelected={async (bible) => {
                // check to determine if the chapter exists in the selected bible
                if (await chapterExistsMutation.mutateAsync(bible)) {
                  // chapter exists - go to chapter in selected bible
                  router.push(`/passage/${bible.abbreviation}/${book.id}/${chapter.number}`);
                  setViewTypeStack([]);
                  setUpdatedBible(undefined);
                  setUpdatedBook(undefined);
                } else {
                  // chapter does not exist - user must select a book
                  setUpdatedBible(bible);
                  setViewTypeStack([...viewTypeStack, 'books']);
                }
              }}
              onBackClick={() => {
                setUpdatedBible(undefined);
                setViewTypeStack(popStack(viewTypeStack));
              }}
            />
          );
        case 'books':
          return (
            <BooksView
              bibleId={updatedBible?.id ?? bible.id}
              bookId={updatedBook?.id ?? book.id}
              onBookSelected={(book) => {
                setUpdatedBook(book);
                setViewTypeStack([...viewTypeStack, 'chapters']);
              }}
              onBackClick={() => {
                setUpdatedBook(undefined);
                setViewTypeStack(popStack(viewTypeStack));
              }}
            />
          );
        case 'chapters':
          return (
            <ChaptersView
              bibleId={updatedBible?.id ?? bible.id}
              bookId={updatedBook?.id ?? book.id}
              chapterId={chapter.id}
              onChapterSelected={(chapter, book, bible) => {
                router.push(`/passage/${bible.abbreviation}/${book.id}/${chapter.number}`);
                setViewTypeStack([]);
                setUpdatedBible(undefined);
                setUpdatedBook(undefined);
              }}
              onBackClick={() => {
                setViewTypeStack(popStack(viewTypeStack));
              }}
            />
          );
      }
    }
    return (
      <ChapterView
        bible={bible}
        book={book}
        chapter={chapter}
        onViewTypeChange={(viewType) => setViewTypeStack([viewType])}
      />
    );
  };

  return (
    <>
      <Head>
        <title>
          BibleSummary Next.js App - {book.name} {chapter.number} {bible.abbreviationLocal}
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
      return {
        props: {},
      };
    }
  }
  return {
    notFound: true,
  };
};
