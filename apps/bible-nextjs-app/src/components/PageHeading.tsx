import { ReactNode } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

import { useTranslation } from '../hooks';

export interface PageHeadingProps {
  children: ReactNode;
  onGoBack?: () => void;
}

export const PageHeading = ({ children, onGoBack }: PageHeadingProps) => {
  const { t } = useTranslation();

  return (
    <>
      {onGoBack ? (
        <button
          className="btn btn-sm btn-ghost w-12 mr-2"
          title={t('PageHeading.back.button.label')}
          onClick={() => onGoBack()}
        >
          <RiArrowGoBackLine size="1.25rem" />
        </button>
      ) : null}
      <h1 className="text-2xl font-bold pb-1">{children}</h1>
    </>
  );
};
