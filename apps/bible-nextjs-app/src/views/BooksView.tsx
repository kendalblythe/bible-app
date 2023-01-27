import { useBibleQuery, useBooksQuery } from '../api/queries';
import {
  ButtonListItem,
  List,
  PageHeader,
  PageHeading,
  PageMain,
  PageSpinner,
} from '../components';
import { FooterSection } from '../components/FooterSection';
import { PageFooter } from '../components/PageFooter';
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
      {bible ? (
        <>
          <PageHeader>
            <div className="flex-1">
              <PageHeading onBackClick={() => setBibleId(undefined)}>
                {t('BooksView.page.title')}
              </PageHeading>
            </div>
            <div className="flex-none gap-2 ml-4">
              <span className="badge badge-lg hidden sm:inline-flex">{bible.nameLocal}</span>
              <span className="badge badge-lg inline-flex sm:hidden">
                {bible.abbreviationLocal}
              </span>
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
          <PageFooter>
            {bible.info ? <FooterSection title={'About'} text={bible.info} /> : null}
            <FooterSection title={'Copyright'} text={bible.copyright} />
          </PageFooter>{' '}
        </>
      ) : null}

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};

export default BooksView;
