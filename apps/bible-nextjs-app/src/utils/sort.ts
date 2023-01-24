import { BibleSummary, ResourceSummary } from '../api/types';

export const sortBibles = (bibles: BibleSummary[]): void => {
  bibles.sort((a, b) => {
    const aa = a.abbreviationLocal.toLowerCase();
    const bb = b.abbreviationLocal.toLowerCase();
    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return a.id < b.id ? 1 : a.id > b.id ? -1 : 0; // sort latest bible version first
  });
};

export const sortByName = (resources: ResourceSummary[]): void => {
  resources.sort((a, b) => {
    const aa = a.name.toLowerCase();
    const bb = b.name.toLowerCase();
    if (aa < bb) return -1;
    if (aa > bb) return 1;
    return 0;
  });
};
