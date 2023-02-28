import { useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { useRouter } from 'next/router';

import { BibleSummary, BookSummary, Chapter } from '../api/types';
import {
  ButtonGroup,
  FooterSection,
  IconButton,
  MarkdownText,
  PageFooter,
  PageHeader,
  PageMain,
  PageSpinner,
} from '../components';
import { useLocalStorageState, usePageLoading, useTranslation } from '../hooks';
import { localStorageKey, LocalStorageState, ViewType } from '../types/ui';

export interface ChapterViewProps {
  bible: BibleSummary;
  book: BookSummary;
  chapter: Chapter;
  onViewTypeChange: (viewType: ViewType) => void;
}

export const ChapterView = ({ bible, book, chapter, onViewTypeChange }: ChapterViewProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { isPageLoading } = usePageLoading();
  const [, setLocalStorageState] = useLocalStorageState<LocalStorageState | undefined>(
    localStorageKey,
    undefined
  );

  useEffect(
    () =>
      setLocalStorageState({
        bibleAbbreviation: bible.abbreviation,
        bookId: book.id,
        chapterNumber: chapter.number,
      }),
    [bible.abbreviation, book.id, chapter.number, setLocalStorageState]
  );

  // handle previous chapter click
  const onPreviousChapterClick = () =>
    router.push(
      `/passage/${bible.abbreviation}/${chapter.previous.bookId}/${chapter.previous.number}`
    );

  // handle next chapter click
  const onNextChapterClick = () =>
    router.push(`/passage/${bible.abbreviation}/${chapter.next.bookId}/${chapter.next.number}`);

  return (
    <>
      <PageHeader>
        <div className="flex-1 gap-2">
          {chapter.previous ? (
            <IconButton
              icon={<BsChevronLeft size="1.25rem" />}
              title={t('ChapterView.previous.button.label')}
              onClick={onPreviousChapterClick}
            />
          ) : null}
          <ButtonGroup
            buttons={[
              {
                text: bible.abbreviationLocal,
                onClick: () => onViewTypeChange('bibles'),
              },
              {
                text: book.name,
                onClick: () => onViewTypeChange('books'),
              },
              {
                text:
                  chapter.number === 'intro'
                    ? t('ChaptersView.intro.button.label')
                    : chapter.number,
                onClick: () => onViewTypeChange('chapters'),
              },
            ]}
          />
        </div>
        <div className="flex-none gap-2">
          {chapter.next ? (
            <IconButton
              icon={<BsChevronRight size="1.25rem" />}
              title={t('ChapterView.next.button.label')}
              onClick={onNextChapterClick}
            />
          ) : null}
        </div>
      </PageHeader>

      <PageMain dir={bible.language.scriptDirection}>
        <MarkdownText className="scripture-styles" text={chapter.content} />
      </PageMain>

      <PageFooter>
        <FooterSection title={t('PageFooter.copyright.section.title')} text={chapter.copyright} />
      </PageFooter>

      {isPageLoading ? <PageSpinner /> : null}
    </>
  );
};
