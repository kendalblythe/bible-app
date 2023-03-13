import { ErrorView } from '.';
import { useBibleQuery, useBookQuery } from '../api/queries';
import { BibleSummary, BookSummary, ChapterSummary } from '../api/types';
import {
  ButtonGroup,
  ChapterTileButton,
  PageHeader,
  PageHeading,
  PageMain,
  PageSpinner,
} from '../components';
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
        <div className="flex-1 gap-2">
          <PageHeading onGoBack={onGoBack}>{t('ChaptersView.page.title')}</PageHeading>
        </div>
        {bible && book ? (
          <div className="flex-none gap-2">
            <ButtonGroup
              buttons={[
                {
                  text: bible.abbreviationLocal,
                  tooltipKey: 'PageHeading.version.button.label',
                  onClick: onGoBibles,
                },
                {
                  text: book.name,
                  tooltipKey: 'PageHeading.book.button.label',
                  onClick: onGoBooks,
                },
              ]}
            />
          </div>
        ) : null}
      </PageHeader>

      {bible && book ? (
        <>
          <PageMain>
            <div>
              {book.chapters.map((chapter) => (
                <ChapterTileButton
                  key={chapter.id}
                  chapter={chapter}
                  isSelected={chapter.id === currentChapterId}
                  onClick={() => onChapterSelected(chapter, book, bible)}
                />
              ))}
            </div>
          </PageMain>
        </>
      ) : null}

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};
