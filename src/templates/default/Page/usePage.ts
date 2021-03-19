import { useState, useEffect, useMemo } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useJoazco } from "../../../joazco";
import { Page } from "../../../types";
import useQueryUrl from "../../../useQueryUrl";

const usePage = () => {
  const [page, setPage] = useState<Page | null>(null);
  const {
    loadingPages,
    menus,
    getPageBySlugFromDatabase,
    listenPageBySlug,
  } = useJoazco();

  const { slug } = useParams<{ slug: string }>();
  const { push } = useHistory();
  const { getQueryUrlVar } = useQueryUrl();
  const liveShare = useMemo(() => getQueryUrlVar("liveChange"), []);

  const links: {
    previousPage: Page | null;
    nextPage: Page | null;
  } = useMemo(() => {
    if (menus.length === 0 || page === null) {
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
    if (liveShare) {
      listenPageBySlug(slug, (value) => {
        if (value) {
          setPage(value);
        } else {
          push("/");
        }
      });
    } else {
      getPageBySlugFromDatabase(slug)
        .then((value) => {
          setPage(value);
        })
        .catch(() => push("/"));
    }
  }, [slug]);

  return {
    loadingPages,
    page,
    previousPage,
    nextPage,
  };
};

export default usePage;
