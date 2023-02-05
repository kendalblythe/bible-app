import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ParsedUrlQuery } from 'querystring';

import { getChapter } from '../../../../api/apis';
import { getBible, getBook } from '../../../../api/cache';
import { BibleSummary, Book, Chapter } from '../../../../api/types';
import { PageHeader, PageMain } from '../../../../components';
import { FooterSection } from '../../../../components/FooterSection';
import { MarkdownText } from '../../../../components/MarkdownText';
import { PageFooter } from '../../../../components/PageFooter';
import { useTranslation } from '../../../../hooks';
import { ErrorView } from '../../../../views';

export interface ChapterPageProps {
  bible: BibleSummary;
  book: Book;
  chapter: Chapter;
  isError?: boolean;
}

export default function ChapterPage({ bible, book, chapter, isError = false }: ChapterPageProps) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>BibleSummary Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      {isError ? (
        <ErrorView />
      ) : (
        <>
          <PageHeader dir={bible.language.scriptDirection}>
            <div className="flex gap-2">
              <span className="badge badge-lg" title={bible.nameLocal}>
                {bible.abbreviationLocal}
              </span>
              <span className="badge badge-lg">{book.name}</span>
              <span className="badge badge-lg">{chapter.number}</span>
            </div>
          </PageHeader>

          <PageMain dir={bible.language.scriptDirection}>
            <MarkdownText text={chapter.content} />
          </PageMain>

          <PageFooter>
            <FooterSection
              title={t('PageFooter.copyright.section.title')}
              text={chapter.copyright}
            />
          </PageFooter>
        </>
      )}
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
        props: {
          bible: {} as BibleSummary,
          book: {} as Book,
          chapter: {} as Chapter,
          isError: true,
        },
      };
    }
  }
  return {
    notFound: true,
  };
};
