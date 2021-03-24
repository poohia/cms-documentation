import { renderHook } from "@testing-library/react-hooks";
import { useConfig, useLanguages } from "../joazco/";
import {
  getDefaultLanguage,
  getNavigatorLanguage,
} from "../joazco/useLanguages";

test("test getNavigatorLanguage", () => {
  const locale = getNavigatorLanguage();
  expect(locale).toStrictEqual("en");
});

test("test getDefaultLanguage", () => {
  const locale = getDefaultLanguage(["en"]);
  expect(locale).toStrictEqual("en");
});

test("test getDefaultLanguage if navigator langage no match with languages env", () => {
  const locale = getDefaultLanguage(["es", "fr"]);
  // if navigator langage dosn't have spanish or french he will take first language
  expect(locale).toStrictEqual("es");
});

test("test load config", () => {
  const { result } = renderHook(() => useConfig());
  const { result: resultLanguges } = renderHook(() => useLanguages());
  const { driver, icon, env } = result.current;
  const { languages, locale } = resultLanguges.current;

  expect(driver).toStrictEqual(process.env.REACT_APP_JOAZCO_CMS_DRIVER);
  expect(languages).toStrictEqual(["en", "fr"]);
  expect(icon).toStrictEqual("logo.png");
  expect(locale).toStrictEqual("en");
  expect(env).toStrictEqual("test");
});
