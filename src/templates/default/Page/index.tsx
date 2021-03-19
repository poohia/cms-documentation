import React from "react";
import { Link } from "react-router-dom";
import { Grid, Icon } from "semantic-ui-react";
import DOMPurify from "dompurify";
import Loader from "../Loader";
import usePage from "./usePage";
import {
  PageContent,
  PageContentGrid,
  HeaderTextCenter,
  FooterLinkContent,
} from "./styles";

const Page = () => {
  const { loadingPages, page, previousPage, nextPage } = usePage();

  if (loadingPages || page === null) {
    return <Loader />;
  }
  /* eslint-disable react/no-danger */
  return (
    <PageContent className="joazco--page-content">
      <PageContentGrid className="joazco--page-content-grid">
        <Grid.Row
          columns={1}
          className="joazco--page-content-row joazco-page-content-row-title"
        >
          <Grid.Column className="joazco-page-content-row-title-col">
            <HeaderTextCenter
              as="h1"
              className="joazco-page-content-col-title-header"
            >
              {page.title}
            </HeaderTextCenter>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          columns={1}
          className="joazco--page-content-row joazco-page-content-row-html-content"
        >
          <Grid.Column className="joazco--page-content-row joazco-page-content-html-content-col">
            {page.content !== "" && (
              <div
                className="joazco--page-content-row joazco-page-content-html-content-col-html"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(page.content),
                }}
              />
            )}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row
          columns={2}
          className="joazco--page-content-row joazco-page-content-row-links"
        >
          <Grid.Column className="joazco-page-content-row-links-col-previous">
            {previousPage && (
              <FooterLinkContent className="joazco-page-content-row-links-col-previous-content">
                <Link
                  to={`/page/${previousPage.slug}`}
                  className="joazco-page-content-row-links-col-previous-content-link"
                >
                  <Icon
                    name="arrow left"
                    className="joazco-page-content-row-links-col-previous-content-link-icon"
                  />
                  <span className="joazco-page-content-row-links-col-previous-content-link-text">
                    {previousPage.title}
                  </span>
                </Link>
              </FooterLinkContent>
            )}
          </Grid.Column>
          <Grid.Column className="joazco-page-content-row-links-col-next">
            {nextPage && (
              <FooterLinkContent className="joazco-page-content-row-links-col-next-content nextPage">
                <Link
                  to={`/page/${nextPage.slug}`}
                  className="joazco-page-content-row-links-col-next-content-link"
                >
                  <span className="joazco-page-content-row-links-col-previous-content-link-text">
                    {nextPage.title}
                  </span>
                  <Icon
                    name="arrow right"
                    className="joazco-page-content-row-links-col-next-content-link-icon"
                  />
                </Link>
              </FooterLinkContent>
            )}
          </Grid.Column>
        </Grid.Row>
      </PageContentGrid>
    </PageContent>
  );
};

export default Page;
