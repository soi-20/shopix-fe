import { create } from "zustand";

interface SearchState {
  results: any[];
  setResults: (results: any[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  results: [],
  setResults: (results) => set({ results }),
}));

