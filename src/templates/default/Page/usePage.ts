import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../../../types";
import { useNav, usePage as usePageJoazco } from "../../../joazco";
import useQueryUrl from "../../../useQueryUrl";

const usePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { push, getQueryUrlVar } = useQueryUrl();
  const liveChange = useMemo(() => getQueryUrlVar("liveChange"), []);
  const { data: menus } = useNav(liveChange);
  const { loading, data: page } = usePageJoazco({ slug }, liveChange);

  const links: {
    previousPage: Page | null;
    nextPage: Page | null;
  } = useMemo(() => {
    if (menus.length === 0 || page === undefined) {
      return { previousPage: null, nextPage: null };
    }
    let previousPage: Page | null = null;
    let nextPage: Page | null = null;
    let isCurrentPage: boolean = false;
    let stopFor: boolean = false;
    menus.forEach((menu) => {
      menu.pages.forEach((p) => {
        if (stopFor) {
          return;
        }
        if (isCurrentPage) {
          nextPage = p;
          stopFor = true;
        }
        if (p.id === page.id) {
          isCurrentPage = true;
        }
        if (!isCurrentPage) {
          previousPage = p;
        }
      });
    });

    return { previousPage, nextPage };
  }, [menus, page, slug]);

  const { previousPage, nextPage } = links;

  useEffect(() => {
    if (!loading && page === undefined) {
      push("/");
    }
  }, [slug]);

  return {
    loading,
    page,
    previousPage,
    nextPage,
  };
};

export default usePage;
