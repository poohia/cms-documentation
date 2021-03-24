import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import usePages from "../Pages/usePages";
import {
  useConnection,
  useConfig,
  useLanguages,
  usePage as usePageJoazco,
} from "../../joazco";
import { Page } from "../../types";

const usePage = () => {
  const { driver } = useConfig();
  const { locale } = useLanguages();
  const { loading: loadingConnection, data: user } = useConnection();
  const { id } = useParams<{ id: string }>();
  const { loading: loadingPages, data, updatePage } = usePageJoazco({ id });
  const [page, setPage] = useState<Page | undefined>(data);
  const { createSlug } = usePages();

  useEffect(() => {
    setPage(data);
  }, [data]);

  return {
    user,
    loadingConnection,
    driver,
    locale,
    loadingPages,
    id,
    page,
    setPage,
    createSlug,
    updatePage,
  };
};

export default usePage;
