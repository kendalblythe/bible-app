import { useState } from 'react';
import Head from 'next/head';
import { useIntl } from 'react-intl';
import { useBiblesAndLanguagesQuery } from '../api/queries';

export default function Home() {
  const intl = useIntl();

  // queries
  const { data } = useBiblesAndLanguagesQuery();
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

      <header className="sticky top-0 bg-base-100 z-10">
        <div className="navbar min-h-0 px-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {intl.formatMessage({ id: 'page.home.versions.title' })}
            </h1>
          </div>
          <div className="flex-none gap-2">
            <label className="label label-text" htmlFor="languageSelect">
              {intl.formatMessage({ id: 'page.home.language.label' })}
            </label>
            <select
              id="languageSelect"
              className="select select-bordered select-sm max-w-xs"
              value={languageId}
              onChange={(e) => setLanguageId(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language.id} value={language.id}>
                  {language.name === language.nameLocal
                    ? language.name
                    : `${language.name} (${language.nameLocal})`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="divider h-px m-0"></div>
      </header>

      <main className="p-2">
        <ul className="menu bg-base-100">
          {bibles
            ?.filter((bible) => bible.language.id === languageId)
            .map((bible) => (
              <li key={bible.id}>
                <button
                  className="block btn-ghost text-start"
                  onClick={() => console.info(bible.name)}
                >
                  <div className="font-medium">{bible.abbreviationLocal}</div>
                  <div className="block label label-text p-0">{bible.nameLocal}</div>
                </button>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}
