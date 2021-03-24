import { useState, useCallback } from "react";
import { useConnection, usePages as usePagesJoazco } from "../../joazco";

const usePages = () => {
  const [openModalCreate, setOpenCreateModal] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const { loading: loadingConnection, data: user } = useConnection();
  const {
    loading: loadingPages,
    data: pages,
    createPage,
    removePage,
  } = usePagesJoazco();

  const createSlug = useCallback((text: string): string => {
    let finalText = text;
    finalText = finalText.replace(/^\s+|\s+$/g, ""); // trim
    finalText = finalText.toLowerCase();

    // remove accents, swap ñ for n, etc
    const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    const to = "aaaaeeeeiiiioooouuuunc------";
    for (let i = 0, l = from.length; i < l; i += 1) {
      finalText = finalText.replace(
        new RegExp(from.charAt(i), "g"),
        to.charAt(i)
      );
    }

    finalText = finalText
      .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
      .replace(/\s+/g, "-") // collapse whitespace and replace by -
      .replace(/-+/g, "-"); // collapse dashes

    return finalText;
  }, []);

  const isSlug = useCallback((text: string): boolean => {
    const to = createSlug(text);
    return to === text;
  }, []);

  const handleSubmit = useCallback(
    (t: string, s: string) => {
      if (t !== "" && s !== "" && isSlug(s)) {
        createPage(t, s)
          .then(() => {
            setTitle("");
            setSlug("");
          })
          .catch((reason) => window.alert(reason));
      }
    },
    [pages]
  );

  return {
    loadingConnection,
    user,
    pages,
    openModalCreate,
    loadingPages,
    filter,
    title,
    slug,
    handleSubmit,
    setOpenCreateModal,
    createPage,
    removePage,
    setFilter,
    createSlug,
    isSlug,
    setTitle,
    setSlug,
  };
};

export default usePages;
