import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create(
  persist<LanguageState>(
    (set) => ({
      language: "en",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "app-language", // key localStorage
    }
  )
);
