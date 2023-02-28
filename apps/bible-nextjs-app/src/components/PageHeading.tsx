import { ReactNode } from 'react';
import { RiArrowGoBackLine } from 'react-icons/ri';

import { useTranslation } from '../hooks';
import { IconButton } from './IconButton';

export interface PageHeadingProps {
  children: ReactNode;
  onGoBack?: () => void;
}

export const PageHeading = ({ children, onGoBack }: PageHeadingProps) => {
  const { t } = useTranslation();

  return (
    <>
      {onGoBack ? (
        <IconButton
          icon={<RiArrowGoBackLine size="1.25rem" />}
          title={t('PageHeading.back.button.label')}
          onClick={onGoBack}
        />
      ) : null}
      <h1 className="text-xl font-bold">{children}</h1>
    </>
  );
};
