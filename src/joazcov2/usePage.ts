import { useState, useMemo, useCallback, useEffect } from "react";
import { DriverPages, Page } from "../types";
import useQueryUrl from "../useQueryUrl";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";

const usePage = ({ id, slug }: { id?: string; slug?: string }) => {
  const [data, setData] = useState<Page | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { getPage, getPageBySlug, listenPageBySlug } = (
      await import(`../drivers/${driver}/usePages`)
    ).default() as DriverPages;
    if (id) {
      await getPage(id).then((value) => {
        setData(value);
        setLoading(false);
      });
    } else if (slug) {
      await getPageBySlug(slug).then((value) => {
        setData(value);
        setLoading(false);
      });
    }

    if (liveShare && slug) {
      listenPageBySlug(slug, (value) => value && setData(value));
    }
  }, [id, slug]);

  useEffect(() => {
    loadData();
  }, [id, slug]);

  return {
    data,
    loading,
    loadData,
  };
};

export default usePage;
