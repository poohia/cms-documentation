import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import * as H from "history";

export type QUERYVARIABLES = string;
export interface QuestionnaireContextQueryUrlProps extends H.History {
  readonly getQueryUrlVar: (key: QUERYVARIABLES) => string | null;
  readonly addQueryUrlVar: (key: QUERYVARIABLES, value: string) => void;
  readonly removeQueryUrlVar: (key: QUERYVARIABLES) => void;
  readonly getQueryUrlVars: (
    keys: QUERYVARIABLES[]
  ) => { [key in QUERYVARIABLES]: string | null };
  readonly addQueryUrlVars: (
    keys: { key: QUERYVARIABLES; value: string }[]
  ) => void;
  readonly removeQueryUrlVars: (keys: QUERYVARIABLES[]) => void;
}

const useQueryUrl = (): QuestionnaireContextQueryUrlProps => {
  const { push, location, ...rest } = useHistory();
  const { search, pathname } = location;

  const searchParams = new URLSearchParams(search);

  const getQueryUrlVar = useCallback(
    (key: string): string | null => searchParams.get(key),
    []
  );

  const addQueryUrlVar = useCallback((key: string, value: string): void => {
    searchParams.set(key, value);
    push({
      pathname,
      search: searchParams.toString(),
    });
  }, []);

  const removeQueryUrlVar = useCallback((key: string): void => {
    searchParams.delete(key);

    push({
      pathname,
      search: searchParams.toString(),
    });
  }, []);

  const getQueryUrlVars = useCallback((keys: QUERYVARIABLES[]): {
    [key in QUERYVARIABLES]: string | null;
  } => {
    const results: { [key in QUERYVARIABLES]: string | null } = {} as {
      [key in QUERYVARIABLES]: string;
    };
    keys.forEach((key) => {
      const result = getQueryUrlVar(key);
      results[key] = result;
    });
    return results;
  }, []);

  const addQueryUrlVars = useCallback(
    (keys: { key: string; value: string }[]): void => {
      keys.forEach(({ key, value }) => {
        searchParams.set(key, value);
      });

      push({
        pathname,
        search: searchParams.toString(),
      });
    },
    []
  );

  const removeQueryUrlVars = useCallback((keys: string[]): void => {
    keys.forEach((key) => {
      searchParams.delete(key);
    });

    push({
      pathname,
      search: searchParams.toString(),
    });
  }, []);

  return {
    getQueryUrlVar,
    addQueryUrlVar,
    removeQueryUrlVar,
    addQueryUrlVars,
    removeQueryUrlVars,
    getQueryUrlVars,
    /** returns all useHistory */
    location,
    push,
    ...rest,
  };
};

export default useQueryUrl;
