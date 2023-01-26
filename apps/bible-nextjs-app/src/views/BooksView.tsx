import { useBibleQuery, useBooksQuery } from '../api/queries';
import {
  ButtonListItem,
  List,
  PageHeader,
  PageHeading,
  PageMain,
  PageSpinner,
} from '../components';
import { useBibleStore, useTranslation } from '../hooks';

export const BooksView = () => {
  const { t } = useTranslation();

  // state
  const { bibleId, setBookId } = useBibleStore();

  // queries
  const { data: bible, isLoading: isBibleLoading } = useBibleQuery(bibleId, {
    enabled: !!bibleId,
  });
  const { data: books, isLoading: isBooksLoading } = useBooksQuery(bibleId, {
    enabled: !!bibleId,
  });
  const isLoading = isBibleLoading || isBooksLoading;

  return (
    <>
      <PageHeader>
        <div className="flex-1">
          <PageHeading>
            {t('bookspage.books.title', {
              bible: bible?.abbreviationLocal,
            })}
          </PageHeading>
        </div>
      </PageHeader>

      <PageMain>
        <List>
          {books?.map((book) => (
            <ButtonListItem key={book.id} className="btn-sm" onClick={() => setBookId(book.id)}>
              {book.name}
            </ButtonListItem>
          ))}
        </List>
      </PageMain>

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};

export default BooksView;
