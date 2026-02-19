export const queryKeys = {
  bibles: () => ['bibles'],
  bible: (bibleId: string) => [...queryKeys.bibles(), bibleId],
  books: (bibleId: string) => [...queryKeys.bible(bibleId), 'books'],
  book: (bibleId: string, bookId: string) => [...queryKeys.books(bibleId), bookId],
};
