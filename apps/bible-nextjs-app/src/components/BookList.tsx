import clsx from 'clsx';

import { ButtonListItem } from '.';
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
  <ul className={clsx('flex flex-col gap-1', className)}>
    <li>
      <h1 className="text-base leading-10 font-bold">{title}</h1>
    </li>
    {books.map((book) => (
      <ButtonListItem
        key={book.id}
        className={clsx(
          'btn-md text-base border w-full',
          book.id === currentBookId ? 'border-black' : 'border-transparent'
        )}
        onClick={() => onBookSelected(book)}
      >
        <span className="truncate">{book.name}</span>
      </ButtonListItem>
    ))}
  </ul>
);
