import { ButtonListItem, List } from '.';
import { BookSummary } from '../api/types';

export interface BookListProps {
  title: string;
  books: BookSummary[];
  setBookId: (bookId: string) => void;
}

export const BookList = ({ title, books, setBookId }: BookListProps) => (
  <List>
    <h1 className="text-base font-medium p-1">{title}</h1>
    {books.map((book) => (
      <ButtonListItem key={book.id} className="btn-sm" onClick={() => setBookId(book.id)}>
        {book.name}
      </ButtonListItem>
    ))}
  </List>
);
