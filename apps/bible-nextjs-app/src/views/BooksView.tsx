import { useBibleQuery, useBooksQuery } from '../api/queries';
import {
  ButtonListItem,
  List,
  PageHeader,
  PageHeading,
  PageMain,
  PageSpinner,
} from '../components';
import { useGlobalStore, useTranslation } from '../hooks';

export const BooksView = () => {
  const { t } = useTranslation();

  // state
  const { bibleId, setBibleId, setBookId } = useGlobalStore();

  // queries
  const { data: bible, isLoading: isBibleLoading } = useBibleQuery(bibleId);
  const { data: books, isLoading: isBooksLoading } = useBooksQuery(bibleId);
  const isLoading = isBibleLoading || isBooksLoading;

  return (
    <>
      <PageHeader>
        <div className="flex-1">
          <PageHeading onBackClick={() => setBibleId(undefined)}>
            {t('BooksView.page.title', {
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
