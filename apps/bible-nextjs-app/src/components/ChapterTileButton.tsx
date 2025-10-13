import { useEffect, useRef } from 'react';
import { BsInfoCircle } from 'react-icons/bs';

import { clsx } from 'clsx';

import { ChapterSummary } from '../api/types';
import { useTranslation } from '../hooks';

export interface ChapterTileButtonProps {
  chapter: ChapterSummary;
  isSelected?: boolean;
  className?: string;
  onClick: () => void;
}

export const ChapterTileButton = ({
  chapter,
  isSelected = false,
  className,
  onClick,
}: ChapterTileButtonProps) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isSelected) {
      setTimeout(() => ref.current?.focus(), 0);
    }
  }, [chapter, isSelected]);

  return (
    <button
      ref={ref}
      className={clsx(
        'tile-button w-20 m-2',
        'tile-button-text hover:underline focus:underline',
        isSelected && 'tile-button-selected',
        className
      )}
      title={chapter.number === 'intro' ? t('ChaptersView.intro.button.label') : undefined}
      onClick={onClick}
    >
      {chapter.number === 'intro' ? (
        <BsInfoCircle className="inline-block mx-auto mb-0.5" />
      ) : (
        chapter.number
      )}
    </button>
  );
};
