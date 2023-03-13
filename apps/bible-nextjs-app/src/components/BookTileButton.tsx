import { useEffect, useRef } from 'react';

import { clsx } from 'clsx';

import { BookSummary } from '../api/types';

export interface BookTileButtonProps {
  book: BookSummary;
  isSelected?: boolean;
  className?: string;
  onClick: () => void;
}

export const BookTileButton = ({
  book,
  isSelected = false,
  className,
  onClick,
}: BookTileButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSelected) {
      setTimeout(() => ref.current?.focus(), 0);
    }
  }, [book, isSelected]);

  return (
    <button
      ref={ref}
      className={clsx(
        'tile-button w-full flex flex-col text-start',
        'tile-button-text hover:underline focus:underline',
        isSelected && 'tile-button-selected',
        className
      )}
      onClick={onClick}
    >
      {book.name}
    </button>
  );
};
