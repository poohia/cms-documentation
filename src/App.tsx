import React, { Suspense, lazy, useMemo } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { SuspenseContent } from "./styles";
import { useLanguages, useStylesheet, useConfig, useSeo } from "./joazco";
import { defaultTheme } from "./styled-components/theme";

const template: string = process.env.REACT_APP_JOAZCO_TEMPLATE || "default";

const Connection = lazy(() => import("./admin/Connection"));
const HomeAdmin = lazy(() => import("./admin/Seo"));
const MenuAdmin = lazy(() => import("./admin/Menu"));
const PagesAdmin = lazy(() => import("./admin/Pages"));
const PageAdmin = lazy(() => import("./admin/Page"));
const MenuConfiguration = lazy(() => import("./admin/MenuConfiguration"));
const FixturesAdmin = lazy(() => import("./admin/Fixtures"));
const Stylesheet = lazy(() => import("./admin/Stylesheet"));
const Home = lazy(() => import(`./templates/${template}/Home`));
const Menu = lazy(() => import(`./templates/${template}/Menu`));
const Page = lazy(() => import(`./templates/${template}/Page`));
const NotFound = lazy(() => import(`./templates/${template}/NotFound`));

function App() {
  const { data: stylesheet } = useStylesheet();

  const { enableFixtures } = useConfig();
  const { locale } = useLanguages();
  const { data: seo } = useSeo();

  const title = useMemo(() => seo?.title, [seo]);
  const description = useMemo(() => seo?.description, [seo]);
  const keywords = useMemo(() => seo?.keywords, [seo]);
  const favIcon = useMemo(() => seo?.favIcon, [seo]);

  return (
    <>
      <Helmet htmlAttributes={{ lang: locale }}>
        <meta charSet="utf-8" />
        {title && <title>{title}</title>}
        <base href="/" />
        <meta property="og:site_name" content={title} />
        <meta name="og:title" property="og:title" content={title} />
        <meta property="al:ios:app_name" content={title} />
        <meta property="al:android:app_name" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta property="og:locale" content={locale} />
        <meta name="theme-color" content={defaultTheme.primary} />
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        {favIcon && <link rel="icon" href={favIcon} />}
        {favIcon && <link rel="icon" href={favIcon} />}
        <style>{stylesheet}</style>
      </Helmet>
      <Router>
        <Suspense fallback={<SuspenseContent />}>
          <Switch>
            <Route path="/" exact>
              <Menu />
              <Home />
            </Route>
            <Route path="/page/:slug" exact>
              <Menu />
              <Page />
            </Route>
            <Route path="/joazco-admin" exact>
              <MenuAdmin activeItem="home" />
              <HomeAdmin />
            </Route>
            <Route path="/joazco-admin/pages" exact>
              <MenuAdmin activeItem="pages" />
              <PagesAdmin />
            </Route>
            <Route path="/joazco-admin/pages/page/:id" exact>
              <MenuAdmin activeItem="pages" />
              <PageAdmin />
            </Route>
            <Route path="/joazco-admin/menu-configuration" exact>
              <MenuAdmin activeItem="menus" />
              <MenuConfiguration />
            </Route>
            <Route path="/joazco-admin/stylesheet" exact>
              <MenuAdmin activeItem="stylesheet" />
              <Stylesheet />
            </Route>
            {enableFixtures && (
              <Route path="/joazco-admin/fixtures" exact>
                <MenuAdmin activeItem="fixtures" />
                <FixturesAdmin />
              </Route>
            )}
            <Route path="/joazco-connection" exact>
              <Connection />
            </Route>
            <Route path="*">
              <Menu />
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
