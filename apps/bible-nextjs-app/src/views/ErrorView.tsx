import { clsx } from 'clsx';

import { PageHeader, PageHeading, PageMain } from '../components';
import { MarkdownText } from '../components/MarkdownText';
import { useTranslation } from '../hooks';

import styles from './ErrorView.module.css';

export const ErrorView = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader>
        <PageHeading>{t('ErrorView.page.title')}</PageHeading>
      </PageHeader>

      <PageMain>
        <div className={clsx(styles.container, 'max-w-prose mx-auto my-4 text-center')}>
          <MarkdownText text={t('ErrorView.page.error.msg')} />
        </div>
      </PageMain>
    </>
  );
};

export default ErrorView;
