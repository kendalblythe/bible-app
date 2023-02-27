import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { BibleSummary, BookSummary, Chapter } from '../api/types';
import {
  FooterSection,
  MarkdownText,
  PageFooter,
  PageHeader,
  PageMain,
  PageSpinner,
} from '../components';
import { NextIcon } from '../components/NextIcon';
import { PreviousIcon } from '../components/PreviousIcon';
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
      <PageHeader dir={bible.language.scriptDirection}>
        <div className="flex-1 gap-2">
          {chapter.previous ? (
            <button
              className="btn-ghost p-1 mr-2"
              title={t('ChapterView.previous.button.label')}
              onClick={onPreviousChapterClick}
            >
              <PreviousIcon dir={bible.language.scriptDirection} />
            </button>
          ) : null}
          <div className="btn-group">
            <button className="btn btn-sm text-base" onClick={() => onViewTypeChange('bibles')}>
              {bible.abbreviationLocal}
            </button>
            <button
              className="btn btn-sm text-base mx-px"
              onClick={() => onViewTypeChange('books')}
            >
              {book.name}
            </button>
            <button className="btn btn-sm text-base" onClick={() => onViewTypeChange('chapters')}>
              {chapter.number === 'intro' ? t('ChaptersView.intro.button.label') : chapter.number}
            </button>
          </div>
        </div>
        <div className="flex-none gap-2 ml-4">
          {chapter.next ? (
            <button
              className="btn-ghost p-1 mr-2"
              title={t('ChapterView.next.button.label')}
              onClick={onNextChapterClick}
            >
              <NextIcon dir={bible.language.scriptDirection} />
            </button>
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
