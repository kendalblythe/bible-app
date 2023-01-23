import Head from 'next/head';
import { useMemo, useState } from 'react';
import { useBiblesQuery } from '../api/queries';
import { getLanguages } from '../utils/bible';

export default function Home() {
  const { data: bibles } = useBiblesQuery();
  const languages = useMemo(() => getLanguages(bibles ?? []), [bibles]);
  const [languageId, setLanguageId] = useState<string>('eng');
  return (
    <>
      <Head>
        <title>Bible Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/bible.png" />
      </Head>
      <header className="sticky top-0 px-2 border-b-2 border-blue-900">
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Versions</h1>
          </div>
          <div className="flex-none gap-2">
            <label className="label" htmlFor="languageSelect">
              Language:
            </label>
            <select
              id="languageSelect"
              className="select select-bordered select-primary max-w-xs"
              onChange={(e) => setLanguageId(e.target.value)}
            >
              {languages.map((language) => (
                <option key={language.id} value={language.id} selected={languageId === language.id}>
                  {language.name === language.nameLocal
                    ? language.name
                    : `${language.name} (${language.nameLocal})`}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>
      <main className="p-4">
        <ul className="menu bg-base-100">
          {bibles
            ?.filter((bible) => bible.language.id === languageId)
            .map((bible) => (
              <li key={bible.id}>
                <a>
                  <div className="font-medium">{bible.abbreviation}</div>
                  <div className="text-sm label-text">{bible.nameLocal}</div>
                </a>
              </li>
            ))}
        </ul>
      </main>
    </>
  );
}
