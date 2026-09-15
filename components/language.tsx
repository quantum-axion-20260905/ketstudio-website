"use client";

import { createContext, useContext, useMemo, useState } from "react";

export type Language = "uz" | "en";

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [language, setLanguageState] = useState<Language>("uz");

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    document.documentElement.lang = nextLanguage;
  };

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export const copy = {
  uz: {
    nav: { projects: "Loyiha", docs: "Hujjatlar", tutorials: "Tutoriallar", downloads: "Yuklab olish", grants: "Grantlar" },
    actions: { explore: "Loyihalarni ko‘rish", docs: "Hujjatlarni ochish", github: "GitHub’da ko‘rish", learn: "Batafsil", back: "Bosh sahifaga qaytish" },
  },
  en: {
    nav: { projects: "Product", docs: "Docs", tutorials: "Tutorials", downloads: "Downloads", grants: "Grants" },
    actions: { explore: "Explore projects", docs: "Open documentation", github: "View on GitHub", learn: "Learn more", back: "Back to home" },
  },
} as const;
