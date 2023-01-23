import { ResourceSummary } from '../api/types';

export const sortByName = (array: ResourceSummary[]): void => {
  array.sort((a, b) => {
    const name1 = a.name.toLowerCase();
    const name2 = b.name.toLowerCase();
    if (name1 < name2) return -1;
    if (name1 > name2) return 1;
    return 0;
  });
};
