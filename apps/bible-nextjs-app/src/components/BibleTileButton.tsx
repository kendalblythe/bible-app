import { useEffect, useRef } from 'react';

import { clsx } from 'clsx';

import { BibleSummary } from '../api/types';

export interface BibleTileButtonProps {
  bible: BibleSummary;
  isSelected?: boolean;
  className?: string;
  onClick: () => void;
}

export const BibleTileButton = ({
  bible,
  isSelected = false,
  className,
  onClick,
}: BibleTileButtonProps) => {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSelected) {
      setTimeout(() => ref.current?.focus(), 0);
    }
  }, [bible, isSelected]);

  return (
    <button
      ref={ref}
      className={clsx(
        'group tile-button w-full h-full flex flex-col text-start',
        isSelected && 'tile-button-selected',
        className
      )}
      onClick={onClick}
    >
      <p className="tile-button-title group-hover:underline group-focus:underline">
        {bible.abbreviationLocal}
      </p>
      <p className="tile-button-text">{bible.nameLocal}</p>
    </button>
  );
};
