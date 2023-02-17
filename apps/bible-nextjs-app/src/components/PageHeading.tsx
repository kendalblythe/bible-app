import { ReactNode } from 'react';
import { FaBible } from 'react-icons/fa';

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
          className="btn btn-square btn-outline btn-sm w-12 mr-4"
          title={t('PageHeading.back.button.label')}
          onClick={() => onGoBack()}
        >
          <FaBible />
        </button>
      ) : null}
      <h1 className="text-2xl font-bold pb-1">{children}</h1>
    </>
  );
};
