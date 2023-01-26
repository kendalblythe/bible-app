import ReactMarkdown from 'react-markdown';

import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

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
            <hr className="m-4" />
            <div className="mx-8 text-center markdown text-sm">
              <div className="font-medium mt-4 mb-1">About</div>
              <div>
                <ReactMarkdown rehypePlugins={[rehypeRaw]} linkTarget="_blank">
                  {bible.info}
                </ReactMarkdown>
              </div>
              <div className="font-medium mt-4 mb-1">Copyright</div>
              <div>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw]}
                  linkTarget="_blank"
                >
                  {bible.copyright}
                </ReactMarkdown>
              </div>
            </div>
          </PageMain>
        </>
      ) : null}

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};

export default BooksView;
