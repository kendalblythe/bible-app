import { BsInfoCircle } from 'react-icons/bs';

import clsx from 'clsx';

import { ErrorView } from '.';
import { useBibleQuery, useBookQuery } from '../api/queries';
import { BibleSummary, BookSummary, ChapterSummary } from '../api/types';
import { PageHeader, PageHeading, PageMain, PageSpinner } from '../components';
import { useScrollTop, useTranslation } from '../hooks';

export interface ChaptersViewProps {
  currentBibleId: string;
  currentBookId: string;
  currentChapterId?: string;
  onChapterSelected: (chapter: ChapterSummary, book: BookSummary, bible: BibleSummary) => void;
  onGoBack?: () => void;
  onGoBibles: () => void;
  onGoBooks: () => void;
}
export const ChaptersView = ({
  currentBibleId,
  currentBookId,
  currentChapterId,
  onChapterSelected,
  onGoBack,
  onGoBibles,
  onGoBooks,
}: ChaptersViewProps) => {
  const { t } = useTranslation();
  useScrollTop();

  // queries
  const bibleQueryResult = useBibleQuery(currentBibleId);
  const bookQueryResult = useBookQuery(currentBibleId, currentBookId, { includeChapters: true });

  const bible = bibleQueryResult.data;
  const book = bookQueryResult.data;
  const isLoading = bibleQueryResult.isLoading || bookQueryResult.isLoading;
  const isError = bibleQueryResult.isError || bookQueryResult.isError;

  // handle query error
  if (isError) return <ErrorView />;

  return (
    <>
      <PageHeader>
        <div className="flex-1">
          <PageHeading onGoBack={onGoBack}>{t('ChaptersView.page.title')}</PageHeading>
        </div>
        {bible && book ? (
          <div className="flex-none gap-2 ml-4">
            <div className="btn-group">
              <button className="btn btn-sm text-base" onClick={onGoBibles}>
                {bible.abbreviationLocal}
              </button>{' '}
              <button className="btn btn-sm text-base ml-px" onClick={onGoBooks}>
                {book.name}
              </button>
            </div>
          </div>
        ) : null}
      </PageHeader>

      {bible && book ? (
        <>
          <PageMain>
            <div>
              {book.chapters.map((chapter) =>
                chapter.number === 'intro' ? (
                  <button
                    key={chapter.id}
                    className={getButtonClassName(chapter, currentChapterId)}
                    title={t('ChaptersView.intro.button.label')}
                    onClick={() => onChapterSelected(chapter, book, bible)}
                  >
                    <BsInfoCircle className="inline-block mx-auto mb-0.5" />
                  </button>
                ) : (
                  <button
                    key={chapter.id}
                    className={getButtonClassName(chapter, currentChapterId)}
                    onClick={() => onChapterSelected(chapter, book, bible)}
                  >
                    {chapter.number}
                  </button>
                )
              )}
            </div>
          </PageMain>
        </>
      ) : null}

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};

const getButtonClassName = (
  chapter: ChapterSummary,
  currentChapterId: string | undefined
): string =>
  clsx(
    'btn-ghost btn-md text-base w-20 mr-1 mb-1 border',
    chapter.id === currentChapterId ? 'border-black' : 'border-transparent'
  );
