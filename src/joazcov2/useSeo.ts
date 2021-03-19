import { useState, useCallback, useMemo, useEffect } from "react";
import { DriverSeo, Links, SEO } from "../types";
import useQueryUrl from "../useQueryUrl";

const driver = process.env.REACT_APP_JOAZCO_CMS_DRIVER || "error";

function serializeSeo(value: Partial<SEO>): SEO {
  const { title, description, keywords, links, favIcon } = value;
  const s: SEO = {} as SEO;
  s.title = title || "";
  s.description = description || "";
  s.keywords = keywords || "";
  s.links = {} as Links;
  s.links.website = links?.website || "";
  s.links.git = links?.git || "";
  s.favIcon = favIcon;
  return s;
}

export const useSeoWithoutHistory = () => {
  const [data, setData] = useState<SEO | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { getSeo } = (
      await import(`../drivers/${driver}/useSeo`)
    ).default() as DriverSeo;
    await getSeo().then((value) => {
      setData(serializeSeo(value));
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, loadData };
};

const useSeo = () => {
  const [data, setData] = useState<SEO | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  const loadData = useCallback(async () => {
    setLoading(true);
    const { getSeo, listenSeo } = (
      await import(`../drivers/${driver}/useSeo`)
    ).default() as DriverSeo;
    await getSeo().then((value) => {
      setData(serializeSeo(value));
      setLoading(false);
    });
    if (liveShare) {
      listenSeo((value) => setData(serializeSeo(value)));
    }
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  return { data, loading, loadData };
};

export default useSeo;
