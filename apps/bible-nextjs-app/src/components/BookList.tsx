import { ButtonListItem, List } from '.';
import { BookSummary } from '../api/types';

export interface BookListProps {
  className?: string;
  title: string;
  books: BookSummary[];
  setBookId: (bookId: string) => void;
}

export const BookList = ({ className, title, books, setBookId }: BookListProps) => (
  <List className={className}>
    <h1 className="text-sm font-bold p-1">{title}</h1>
    {books.map((book) => (
      <ButtonListItem key={book.id} className="btn-sm" onClick={() => setBookId(book.id)}>
        <span className="truncate">{book.name}</span>
      </ButtonListItem>
    ))}
  </List>
);
