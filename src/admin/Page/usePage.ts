import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePages from "../Pages/usePages";
import { useJoazco } from "../../joazco";
import { Page } from "../../types";

const usePage = () => {
  const {
    driver,
    locale,
    logged,
    loadingPages,
    pages,
    getPage,
    updatePage,
  } = useJoazco();
  const { id } = useParams<{ id: string }>();
  const [page, setPage] = useState<Page | undefined>(getPage(id));
  const { createSlug } = usePages();

  useEffect(() => {
    setPage(getPage(id));
  }, [id, pages]);

  return {
    driver,
    locale,
    logged,
    loadingPages,
    pages,
    id,
    page,
    getPage,
    updatePage,
    setPage,
    createSlug,
  };
};

export default usePage;
