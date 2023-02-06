import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ParsedUrlQuery } from 'querystring';

import { getChapter } from '../../../../api/apis';
import { getBible, getBook } from '../../../../api/cache';
import { BibleSummary, Book, Chapter } from '../../../../api/types';
import { ErrorView } from '../../../../views';
import ChapterView from '../../../../views/ChapterView';

export interface ChapterPageProps {
  bible?: BibleSummary;
  book?: Book;
  chapter?: Chapter;
}

export default function ChapterPage(props: ChapterPageProps) {
  const { bible, book, chapter } = props;

  // handle query error
  if (!bible || !book || !chapter) return <ErrorView />;

  return (
    <>
      <Head>
        <title>
          BibleSummary Next.js App - {book.name} {chapter.number} {bible.abbreviationLocal}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      <ChapterView bible={bible} book={book} chapter={chapter} />
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
      const chapterId = `${bookId}.${chapterNumber}`;
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
