import { create } from 'zustand';

export interface BibleState {
  languageId: string;
  bibleId: string;
  bookId: string;
  setLanguageId: (languageId: string) => void;
  setBibleId: (bibleId: string) => void;
  setBookId: (bookId: string) => void;
}

export const useBibleStore = create<BibleState>((set) => ({
  languageId: 'eng',
  bibleId: '',
  bookId: '',
  setLanguageId: (languageId: string) => set((state) => ({ ...state, languageId })),
  setBibleId: (bibleId: string) => set((state) => ({ ...state, bibleId })),
  setBookId: (bookId: string) => set((state) => ({ ...state, bookId })),
}));
