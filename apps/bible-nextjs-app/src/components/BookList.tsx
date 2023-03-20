import clsx from 'clsx';

import { BookTileButton } from '.';
import { BookSummary } from '../api/types';

export interface BookListProps {
  className?: string;
  title: string;
  books: BookSummary[];
  currentBookId?: string;
  onBookSelected: (book: BookSummary) => void;
}

export const BookList = ({
  className,
  title,
  books,
  currentBookId,
  onBookSelected,
}: BookListProps) => (
  <div className={clsx('flex flex-col gap-3', className)}>
    <h1 className="text-base leading-10 font-bold">{title}</h1>
    {books.map((book) => (
      <BookTileButton
        key={book.id}
        book={book}
        isSelected={book.id === currentBookId}
        onClick={() => onBookSelected(book)}
      />
    ))}
  </div>
);
