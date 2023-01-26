import { create } from 'zustand';

export interface GlobalState {
  languageId: string;
  bibleId?: string;
  bookId?: string;
  setLanguageId: (languageId: string) => void;
  setBibleId: (bibleId: string | undefined) => void;
  setBookId: (bookId: string | undefined) => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  languageId: 'eng',
  bibleId: undefined,
  bookId: undefined,
  setLanguageId: (languageId: string) => set((state) => ({ ...state, languageId })),
  setBibleId: (bibleId: string | undefined) => set((state) => ({ ...state, bibleId })),
  setBookId: (bookId: string | undefined) => set((state) => ({ ...state, bookId })),
}));
