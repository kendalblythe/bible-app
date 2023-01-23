import { BibleSummary, Language } from '../api/types';
import { sortBibles, sortByName } from './sort';

export const getLatestBibleVersions = (bibles: BibleSummary[]): BibleSummary[] => {
  sortBibles(bibles);
  const dblIdSet = new Set<string>();
  const latestBibles: BibleSummary[] = [];
  for (const bible of bibles) {
    if (!dblIdSet.has(bible.dblId)) {
      dblIdSet.add(bible.dblId);
      latestBibles.push(bible);
    }
  }
  return latestBibles;
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
