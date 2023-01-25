import { useState } from 'react';
import Head from 'next/head';
import { useBiblesAndLanguagesQuery } from '../api/queries';
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
import { useTranslation } from '../hooks';
import { getLanguageDisplayName } from '../utils/bible';

export default function Home() {
  const { t } = useTranslation();

  // queries
  const { data, isLoading } = useBiblesAndLanguagesQuery();
  const bibles = data?.bibles ?? [];
  const languages = data?.languages ?? [];

  // state
  const [languageId, setLanguageId] = useState<string>('eng');

  return (
    <>
      <Head>
        <title>Bible Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>

      <PageHeader>
        <div className="flex-1">
          <PageHeading>{t('page.home.versions.title')}</PageHeading>
        </div>
        <div className="flex-none gap-2 ml-4">
          <Label htmlFor="languageSelect" className="hidden sm:flex">
            {t('page.home.language.label')}
          </Label>
          <Select
            id="languageSelect"
            value={languageId}
            ariaLabel={t('page.home.language.aria.label')}
            title={t('page.home.language.tooltip')}
            className="max-w-[12rem] sm:max-w-xs"
            onChange={(e) => setLanguageId(e.target.value)}
          >
            {languages.map((language) => (
              <option key={language.id} value={language.id}>
                {getLanguageDisplayName(language)}
              </option>
            ))}
          </Select>
        </div>
      </PageHeader>

      <PageMain>
        <List>
          {bibles
            ?.filter((bible) => bible.language.id === languageId)
            .map((bible) => (
              <ButtonListItem key={bible.id} onClick={() => console.info(bible.name)}>
                <div className="font-medium">{bible.abbreviationLocal}</div>
                <div className="block label label-text p-0">{bible.nameLocal}</div>
              </ButtonListItem>
            ))}
        </List>
      </PageMain>

      {isLoading ? <PageSpinner /> : null}
    </>
  );
}
