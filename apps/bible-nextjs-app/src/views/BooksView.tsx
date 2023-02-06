import clsx from 'clsx';

import { ErrorView } from '.';
import { useBibleQuery, useBooksQuery } from '../api/queries';
import { BookSummary } from '../api/types';
import {
  BookList,
  FooterSection,
  PageHeader,
  PageFooter,
  PageHeading,
  PageMain,
  PageSpinner,
} from '../components';
import { useGlobalStore, useScrollTop, useTranslation } from '../hooks';

export const BooksView = () => {
  const { t } = useTranslation();
  useScrollTop();

  // state
  const { bibleId, setBibleId, setBookId } = useGlobalStore();

  // queries
  const bibleQueryResult = useBibleQuery(bibleId);
  const booksQueryResult = useBooksQuery(bibleId);

  const bible = bibleQueryResult.data;
  const oldTestamentBooks = booksQueryResult.data?.oldTestamentBooks;
  const newTestamentBooks = booksQueryResult.data?.newTestamentBooks;
  const apocryphaBooks = booksQueryResult.data?.apocryphaBooks;
  const isLoading = bibleQueryResult.isLoading || booksQueryResult.isLoading;
  const isError = bibleQueryResult.isError || booksQueryResult.isError;
  const bookGroupCount =
    getBookGroupCount(oldTestamentBooks) +
    getBookGroupCount(newTestamentBooks) +
    getBookGroupCount(apocryphaBooks);

  // handle query error
  if (isError) return <ErrorView />;

  return (
    <>
      <PageHeader>
        <div className="flex-1">
          <PageHeading onBackClick={() => setBibleId(undefined)}>
            {t('BooksView.page.title')}
          </PageHeading>
        </div>
        {bible ? (
          <div className="flex-none gap-2 ml-4">
            <span className="badge badge-lg" title={bible.nameLocal}>
              {bible.abbreviationLocal}
            </span>
          </div>
        ) : null}
      </PageHeader>

      {bible && oldTestamentBooks && newTestamentBooks && apocryphaBooks ? (
        <>
          <PageMain dir={bible.language.scriptDirection}>
            <div className={clsx('grid grid-cols-1 gap-4', bookGroupCount > 1 && 'sm:grid-cols-2')}>
              {oldTestamentBooks.length ? (
                <BookList
                  title={t('BooksView.oldTestament.section.title')}
                  books={oldTestamentBooks}
                  setBookId={(bookId) => setBookId(bookId)}
                />
              ) : null}
              <div>
                {apocryphaBooks.length ? (
                  <BookList
                    className="mb-4"
                    title={t('BooksView.apocrypha.section.title')}
                    books={apocryphaBooks}
                    setBookId={(bookId) => setBookId(bookId)}
                  />
                ) : null}
                {newTestamentBooks.length ? (
                  <BookList
                    title={t('BooksView.newTestament.section.title')}
                    books={newTestamentBooks}
                    setBookId={(bookId) => setBookId(bookId)}
                  />
                ) : null}
              </div>
            </div>
          </PageMain>

          <PageFooter>
            {bible.info ? (
              <FooterSection
                title={t('PageFooter.about.section.title', {
                  name: bible.nameLocal,
                })}
                text={bible.info}
              />
            ) : null}
            <FooterSection title={t('PageFooter.copyright.section.title')} text={bible.copyright} />
          </PageFooter>
        </>
      ) : null}

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};

export default BooksView;

const hasBooks = (books: BookSummary[] | undefined) => !!books && books.length > 0;

const getBookGroupCount = (books: BookSummary[] | undefined) => (hasBooks(books) ? 1 : 0);
