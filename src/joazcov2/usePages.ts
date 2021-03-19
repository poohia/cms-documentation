import { useState, useMemo, useCallback, useEffect } from "react";
import { DriverPages, Page } from "../types";
import useQueryUrl from "../useQueryUrl";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";

const usePages = () => {
  const [data, setData] = useState<Page[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { getPages, listenPages } = (
      await import(`../drivers/${driver}/usePages`)
    ).default() as DriverPages;
    await getPages().then((value) => {
      setData(value);
      setLoading(false);
    });
    if (liveShare) {
      listenPages((value) => value && setData(value));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return {
    data,
    loading,
    loadData,
  };
};

export default usePages;
