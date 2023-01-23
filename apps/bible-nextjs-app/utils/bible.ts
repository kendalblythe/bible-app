import { BibleSummary, Language } from '../api/types';
import { sortByName } from './sort';

export const getLatestBibleVersions = (bibles: BibleSummary[]): BibleSummary[] => {
  const bibleMap = new Map<string, BibleSummary>();
  const dblIds: string[] = [];
  for (const bible of bibles) {
    const bible2 = bibleMap.get(bible.dblId);
    if (bible2) {
      // keep latest bible version
      if (bible.id > bible2.id) bibleMap.set(bible.dblId, bible);
    } else {
      bibleMap.set(bible.dblId, bible);
      dblIds.push(bible.dblId);
    }
  }
  return dblIds.map((dblId) => bibleMap.get(dblId) as BibleSummary);
};

export const getLanguages = (bibles: BibleSummary[]): Language[] => {
  const languageMap = new Map<string, Language>();
  for (const bible of bibles) {
    languageMap.set(bible.language.id, bible.language);
  }
  const languages = Array.from(languageMap.values());
  sortByName(languages);
  return languages;
};
