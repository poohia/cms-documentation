import { useMemo, useCallback } from "react";

export type UseLanguagesRest = {
  languages: string[];
  locale: string;
  setLocale: (locale: string) => void;
};

export function getNavigatorLanguage(): string {
  const { language } = navigator;
  return language.split("-")[0];
}

export function getLocalStorageLanguage(): string | null {
  const language = localStorage.getItem("locale");
  return language;
}

export function getDefaultLanguage(languages: string[]): string {
  const languageNavigator = getNavigatorLanguage();
  const languageLocalStorage = getLocalStorageLanguage();
  const locale =
    languages.length === 1
      ? languages[0]
      : languageLocalStorage || languageNavigator;
  if (languageLocalStorage === null) {
    localStorage.setItem("locale", locale);
  }
  return languages.find((l) => l === locale) || languages[0];
}

const useLanguages = (): UseLanguagesRest => {
  const languages: string[] = useMemo(
    () =>
      process.env.REACT_APP_JAZZI_CMS_LANGUAGES
        ? process.env.REACT_APP_JAZZI_CMS_LANGUAGES.split(",")
        : ["en"],
    []
  );
  const locale = useMemo(() => getDefaultLanguage(languages), []);

  const setLocale = useCallback(async (l: string) => {
    await localStorage.setItem("locale", l);
    window.location.reload();
  }, []);

  return { languages, locale, setLocale };
};

export default useLanguages;
