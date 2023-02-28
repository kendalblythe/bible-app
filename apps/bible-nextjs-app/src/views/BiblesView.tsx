import { useState } from 'react';

import clsx from 'clsx';

import { ErrorView } from '.';
import { useBiblesQuery } from '../api/queries';
import { BibleSummary } from '../api/types';
import {
  ButtonListItem,
  Label,
  List,
  PageHeader,
  PageHeading,
  PageMain,
  PageSpinner,
  Select,
} from '../components';
import { useScrollTop, useTranslation } from '../hooks';
import { getLanguageDisplayName } from '../utils/bible';

export interface BiblesViewProps {
  currentBible?: BibleSummary;
  onBibleSelected: (bible: BibleSummary) => void;
  onGoBack?: () => void;
}

export const BiblesView = ({ currentBible, onBibleSelected, onGoBack }: BiblesViewProps) => {
  const { t } = useTranslation();
  useScrollTop();

  // state
  const [languageId, setLanguageId] = useState(currentBible?.language.id ?? 'eng');

  // queries
  const biblesQueryResult = useBiblesQuery();

  const bibles = biblesQueryResult.data?.bibles;
  const languages = biblesQueryResult.data?.languages;
  const { isLoading, isError } = biblesQueryResult;

  // handle query error
  if (isError) return <ErrorView />;

  return (
    <>
      <PageHeader>
        <div className="flex-1 gap-2">
          <PageHeading onGoBack={onGoBack}>{t('BiblesView.page.title')}</PageHeading>
        </div>
        {languages ? (
          <div className="flex-none gap-2">
            <Label htmlFor="languageSelect" className="hidden sm:flex text-base">
              {t('BiblesView.language.select.label')}
            </Label>
            <Select
              id="languageSelect"
              value={languageId}
              ariaLabel={t('BiblesView.language.select.aria.label')}
              title={t('BiblesView.language.select.tip.label')}
              className="max-w-[10rem] sm:max-w-[12rem] md:max-w-xs truncate text-base"
              onChange={(e) => setLanguageId(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {getLanguageDisplayName(language)}
                </option>
              ))}
            </Select>
          </div>
        ) : null}
      </PageHeader>

      {bibles ? (
        <PageMain>
          <List className="gap-1">
            {bibles
              .filter((bible) => bible.language.id === languageId)
              .map((bible) => (
                <ButtonListItem
                  key={bible.id}
                  className={clsx(
                    'block border',
                    bible.id === currentBible?.id ? 'border-black' : 'border-transparent'
                  )}
                  onClick={() => onBibleSelected(bible)}
                >
                  <div className="font-medium">{bible.abbreviationLocal}</div>
                  <div className="block label label-text text-base p-0">{bible.nameLocal}</div>
                </ButtonListItem>
              ))}
          </List>
        </PageMain>
      ) : null}

      {isLoading ? <PageSpinner /> : null}
    </>
  );
};
