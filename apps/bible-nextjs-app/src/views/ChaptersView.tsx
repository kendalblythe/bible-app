import { BsInfoCircle } from 'react-icons/bs';

import { useRouter } from 'next/router';

import { ErrorView } from '.';
import { useBibleQuery, useBookQuery } from '../api/queries';
import { Bible, ChapterSummary } from '../api/types';
import { PageHeader, PageHeading, PageMain, PageSpinner } from '../components';
import { useGlobalStore, usePageLoading, useScrollTop, useTranslation } from '../hooks';

export const ChaptersView = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isPageLoading } = usePageLoading();
  useScrollTop();

  // state
  const { bibleId, bookId, setBookId } = useGlobalStore();

  // queries
  const bibleQueryResult = useBibleQuery(bibleId);
  const bookQueryResult = useBookQuery(bibleId, bookId, { includeChapters: true });

  const bible = bibleQueryResult.data;
  const book = bookQueryResult.data;
  const isLoading = isPageLoading || bibleQueryResult.isLoading || bookQueryResult.isLoading;
  const isError = bibleQueryResult.isError || bookQueryResult.isError;

  // handle chapter click
  const onChapterClick = (bible: Bible, chapter: ChapterSummary) =>
    router.replace(`/passage/${bible.abbreviation}/${chapter.bookId}/${chapter.number}`);

  // handle query error
  if (isError) return <ErrorView />;

  return (
    <>
      <PageHeader>
        <div className="flex-1">
          <PageHeading onBackClick={() => setBookId(undefined)}>
            {t('ChaptersView.page.title')}
          </PageHeading>
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
                    onClick={() => onChapterClick(bible, chapter)}
                  >
                    <BsInfoCircle className="inline-block mx-auto mb-0.5" />
                  </button>
                ) : (
                  <button
                    key={chapter.id}
                    className="btn-ghost btn-sm w-24 mx-0 my-2"
                    onClick={() => onChapterClick(bible, chapter)}
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
