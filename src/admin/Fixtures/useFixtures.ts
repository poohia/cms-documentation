import { useState, useCallback } from "react";
import { useConnection, useSeo, useNav, usePages, usePage } from "../../joazco";
import { MenuWithoutPage, Page, SEO } from "../../types";

const seo: SEO = {
  title: "CMS Documentation Joazco",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse libero neque, luctus id eros at, fermentum facilisis purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Fusce tortor tellus, faucibus quis sem et, dictum elementum lorem.",
  keywords: "cms,documentation",
  links: {
    website: "https://cms-documentation.joazco.com",
    git: "https://github.com/poohia/cms-documentation",
  },
  favIcon:
    "https://firebasestorage.googleapis.com/v0/b/cms-documentation-83c06.appspot.com/o/favicon.ico?alt=media&token=1f8cf946-bbe8-41ed-b3f5-eef88c89a03a",
};
const content =
  // eslint-disable-next-line
  '<h1 style="text-align: center;">Header 1<br></h1><h2>​​Header 2<br></h2><p>Mauris sed elit vitae nulla bibendum aliquet at nec augue. Curabitur sodales dui a orci vehicula lacinia. Fusce tincidunt diam ut massa interdum, eu tempus tellus finibus. Aenean viverra ex egestas leo ullamcorper commodo. Duis aliquet mauris at nisi semper, vel congue ligula ornare. Nulla dictum libero at nisl tristique, rutrum elementum eros sodales. Pellentesque aliquet consequat lacinia. Nulla eget nibh eleifend, auctor ipsum ut, pulvinar odio. Vestibulum ullamcorper interdum metus placerat tincidunt. Etiam finibus augue non suscipit dignissim.<br></p><p><br></p><pre>&lt;html&gt;<br>&lt;body&gt;<br>  &lt;h1&gt;Hello World&lt;/h1&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;<br></pre>';
const caption =
  "Nulla facilisi. Proin id urna tellus. In pulvinar hendrerit nisl";
const pages: Page[] = [
  {
    id: "0",
    title: "Getting Started",
    slug: "getting-started",
    content,
  },
  {
    id: "1",
    title: "Custom configuration",
    slug: "custom-configuration",
    content,
  },
  {
    id: "2",
    title: "Theming",
    slug: "theming",
    content,
  },
  {
    id: "3",
    title: "Grid",
    slug: "grid",
    content,
  },
  {
    id: "4",
    title: "Button",
    slug: "component-button",
    content,
  },
  {
    id: "5",
    title: "Form",
    slug: "component-form",
    content,
  },
  {
    id: "6",
    title: "Icon",
    slug: "component-icon",
    content,
  },
];
const menus: MenuWithoutPage[] = [
  {
    id: "0",
    title: "Getting Started",
    caption,
    pages: ["0"],
  },
  {
    id: "1",
    title: "Theming",
    caption,
    pages: ["1", "2"],
  },
  {
    id: "2",
    title: "Components",
    caption,
    pages: ["3", "4", "5", "6"],
  },
];

const useFixtures = () => {
  const { loading: loadingConnection, data: user } = useConnection();
  const { insertSeo } = useSeo();
  const { data: menusJoazco, createMenu, addPageToMenu, removeMenu } = useNav();
  const { data: pagesJoazco, createPage, removePage } = usePages();
  const { updatePage } = usePage({});
  const [loading, setLoading] = useState<boolean>(false);

  const resetDatabase = useCallback(() => {
    setLoading(true);
    insertSeo({
      title: "",
      description: "",
      keywords: "",
      links: {
        website: "",
        git: "",
      },
    });
    menusJoazco.forEach((m, k) => {
      setTimeout(() => removeMenu(m.id), k * 200);
    });
    pagesJoazco.forEach((p, k) => {
      setTimeout(() => removePage(p.id), k * 200);
    });
    setTimeout(() => {
      setLoading(false);
      window.location.reload();
    }, 2000);
  }, []);

  const loadFixutres = useCallback(() => {
    setLoading(true);
    insertSeo(seo);
    pages.forEach((page, key) => {
      setTimeout(
        () =>
          createPage(page.title, page.slug, page.id).then(() => {
            updatePage(page, page.id);
          }),
        key * 200
      );
    });
    setTimeout(() => {
      menus.forEach((menu, key) => {
        setTimeout(() => {
          createMenu(menu.title, menu.caption, menu.id);
        }, key * 200);
      });
    }, pages.length * 200 + 200);
    setTimeout(
      () => window.location.reload(),
      pages.length * 200 + menus.length * 200 + 200
    );
  }, []);

  const configMenus = useCallback(() => {
    setLoading(true);
    menus.forEach((menu, key) => {
      setTimeout(() => {
        menu.pages.forEach((pageId) => {
          addPageToMenu(menu.id, pageId);
        });
      }, key * 200);
    });
    setTimeout(() => window.location.reload(), menus.length * 200 + 200);
  }, [menusJoazco]);

  return {
    loadingConnection,
    user,
    menusJoazco,
    loading,
    loadFixutres,
    configMenus,
    resetDatabase,
  };
};

export default useFixtures;
