import { ButtonListItem, List } from '.';
import { BookSummary } from '../api/types';

export interface BookListProps {
  className?: string;
  title: string;
  books: BookSummary[];
  onBookSelected: (book: BookSummary) => void;
}

export const BookList = ({ className, title, books, onBookSelected }: BookListProps) => (
  <List className={className}>
    <li>
      <h1 className="text-sm font-bold p-1">{title}</h1>
    </li>
    {books.map((book) => (
      <ButtonListItem key={book.id} className="btn-sm" onClick={() => onBookSelected(book)}>
        <span className="truncate">{book.name}</span>
      </ButtonListItem>
    ))}
  </List>
);
