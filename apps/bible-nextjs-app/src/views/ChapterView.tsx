import { useEffect } from 'react';
import { BsChevronDown, BsChevronLeft, BsChevronRight } from 'react-icons/bs';

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
import { useLocalStorageState, usePageLoading, useTranslation } from '../hooks';
import { localStorageKey, LocalStorageState } from '../types/ui';

export interface ChapterViewProps {
  bible: BibleSummary;
  book: BookSummary;
  chapter: Chapter;
}

export const ChapterView = ({ bible, book, chapter }: ChapterViewProps) => {
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
              {bible.language.scriptDirection === 'rtl' ? (
                <BsChevronRight size="1.25rem" />
              ) : (
                <BsChevronLeft size="1.25rem" />
              )}
            </button>
          ) : null}
          <button className="btn btn-sm">
            {bible.abbreviationLocal}
            <ButtonDownIcon />
          </button>
          <button className="btn btn-sm">
            {book.name}
            <ButtonDownIcon />
          </button>
          <button className="btn btn-sm">
            {chapter.number === 'intro' ? t('ChaptersView.intro.button.label') : chapter.number}
            <ButtonDownIcon />
          </button>
        </div>
        <div className="flex-none gap-2 ml-4">
          {chapter.next ? (
            <button
              className="btn-ghost p-1 mr-2"
              title={t('ChapterView.next.button.label')}
              onClick={onNextChapterClick}
            >
              {bible.language.scriptDirection === 'rtl' ? (
                <BsChevronLeft size="1.25rem" />
              ) : (
                <BsChevronRight size="1.25rem" />
              )}
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

const ButtonDownIcon = () => <BsChevronDown size="0.75rem" className="ml-2" />;
