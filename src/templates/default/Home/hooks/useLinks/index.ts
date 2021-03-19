import { useMemo } from "react";
import { Props } from "../../types";

const useLinks = ({ links: { website, git } }: Pick<Props, "links">) => {
  const isLink = (link: string): boolean => {
    let url;
    try {
      url = new URL(link);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  };
  const showLinks = useMemo(() => isLink(website) || isLink(git), [
    website,
    git,
  ]);

  return { website, git, showLinks, isLink };
};

export default useLinks;
