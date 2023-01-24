import { useState } from 'react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
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
import { getLanguageDisplayName } from '../utils/bible';

export default function Home() {
  const intl = useIntl();

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
          <PageHeading>{intl.formatMessage({ id: 'page.home.versions.title' })}</PageHeading>
        </div>
        <div className="flex-none gap-2">
          <Label htmlFor="languageSelect">
            {intl.formatMessage({ id: 'page.home.language.label' })}
          </Label>
          <Select
            id="languageSelect"
            value={languageId}
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
