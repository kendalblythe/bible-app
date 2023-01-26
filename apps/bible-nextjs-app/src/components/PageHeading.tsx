import { ReactNode } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

import { useLocaleDir, useTranslation } from '../hooks';

export interface PageHeadingProps {
  children: ReactNode;
  onBackClick?: () => void;
}

export const PageHeading = ({ children, onBackClick }: PageHeadingProps) => {
  const { t } = useTranslation();
  const dir = useLocaleDir();
  return (
    <>
      {onBackClick ? (
        <button
          className="btn-ghost p-1 mr-2"
          title={t('PageHeading.back.button.label')}
          onClick={() => onBackClick()}
        >
          {dir === 'rtl' ? <BsChevronRight size="1.25rem" /> : <BsChevronLeft size="1.25rem" />}
        </button>
      ) : null}
      <h1 className="text-2xl font-bold pb-1">{children}</h1>
    </>
  );
};
