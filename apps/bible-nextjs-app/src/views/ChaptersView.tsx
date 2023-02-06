import { BsInfoCircle } from 'react-icons/bs';

import { ErrorView } from '.';
import { useBibleQuery, useBookQuery } from '../api/queries';
import { ChapterSummary } from '../api/types';
import { PageHeader, PageHeading, PageMain, PageSpinner } from '../components';
import { usePageLoading, useScrollTop, useTranslation } from '../hooks';

export interface ChaptersViewProps {
  bibleId: string;
  bookId: string;
  chapterId?: string;
  onChapterSelected: (chapter: ChapterSummary) => void;
  onBackClick: () => void;
}
export const ChaptersView = ({
  bibleId,
  bookId,
  onChapterSelected,
  onBackClick,
}: ChaptersViewProps) => {
  const { t } = useTranslation();
  const { isPageLoading } = usePageLoading();
  useScrollTop();

  // queries
  const bibleQueryResult = useBibleQuery(bibleId);
  const bookQueryResult = useBookQuery(bibleId, bookId, { includeChapters: true });

  const bible = bibleQueryResult.data;
  const book = bookQueryResult.data;
  const isLoading = isPageLoading || bibleQueryResult.isLoading || bookQueryResult.isLoading;
  const isError = bibleQueryResult.isError || bookQueryResult.isError;

  // handle query error
  if (isError) return <ErrorView />;

  return (
    <>
      <PageHeader>
        <div className="flex-1">
          <PageHeading onBackClick={onBackClick}>{t('ChaptersView.page.title')}</PageHeading>
        </div>
        {bible && book ? (
          <div className="flex-none gap-2 ml-4">
            <span className="badge badge-lg" title={bible.nameLocal}>
              {bible.abbreviationLocal}
            </span>
            <span className="badge badge-lg">{book.name}</span>
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
                    className="btn-ghost btn-sm w-24 mx-0 my-2"
                    title={t('ChaptersView.intro.button.label')}
                    onClick={() => onChapterSelected(chapter)}
                  >
                    <BsInfoCircle className="inline-block mx-auto mb-0.5" />
                  </button>
                ) : (
                  <button
                    key={chapter.id}
                    className="btn-ghost btn-sm w-24 mx-0 my-2"
                    onClick={() => onChapterSelected(chapter)}
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
