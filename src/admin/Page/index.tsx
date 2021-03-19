import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Header, Icon } from "semantic-ui-react";
import SunEditor from "suneditor-react";
import Lang from "suneditor-react/types/Lang";
import { ButtonSuccess, Form, Label } from "../../styled-components";
import Loader from "../Loader";
import { PageContent } from "./styles";
import usePage from "./usePage";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const Page = () => {
  const {
    driver,
    locale,
    logged,
    loadingPages,
    id,
    page,
    updatePage,
    setPage,
    createSlug,
  } = usePage();

  if (logged === null || loadingPages === null) {
    return <Loader />;
  }
  if (!logged) {
    return <Redirect to="/joazco-connection" />;
  }

  if (!loadingPages && page === undefined) {
    return <Redirect to="/joazco-admin/pages" />;
  }

  return (
    <PageContent>
      <Header as="h1">
        Page
        <Header.Subheader>
          Modify page&nbsp;
          {id}
        </Header.Subheader>
      </Header>

      {page && (
        <>
          <p>
            <Link
              to={
                driver !== "localstorage"
                  ? `/page/${page.slug}?liveChange=true`
                  : `/page/${page.slug}`
              }
              target="_blank"
            >
              Live change&nbsp;
              <Icon name="external" />
            </Link>
          </p>
          <Form
            onSubmit={() => {
              updatePage(page)
                .then((value) => setPage(value))
                .catch((reason) => window.alert(reason));
            }}
          >
            <Form.Field>
              <Label htmlFor="pageName" required>
                <span>Page name</span>
                <Form.Input
                  id="pageName"
                  value={page.title}
                  onBlur={() => {
                    setPage({ ...page, slug: createSlug(page.title) });
                  }}
                  onChange={(e) => setPage({ ...page, title: e.target.value })}
                />
              </Label>
            </Form.Field>
            <Form.Field>
              <Label htmlFor="pageSlug" required>
                <span>Page slug</span>
                <Form.Input
                  id="pageSlug"
                  value={page.slug}
                  onBlur={() => {
                    setPage({ ...page, slug: createSlug(page.slug) });
                  }}
                  onChange={(e) => setPage({ ...page, slug: e.target.value })}
                />
              </Label>
            </Form.Field>
            <Form.Field>
              <Label htmlFor="pageContent" required>
                <span>Page content</span>
                <SunEditor
                  lang={locale as Lang}
                  defaultValue={page.content}
                  onChange={(content) => setPage({ ...page, content })}
                  height="400"
                  setOptions={{
                    imageFileInput: false,
                    imageUrlInput: true,
                    buttonList: [
                      ["undo", "redo", "formatBlock", "font", "fontSize"],
                      ["bold", "underline", "italic", "strike", "removeFormat"],
                      [
                        "fontColor",
                        "hiliteColor",
                        "outdent",
                        "indent",
                        "align",
                        "horizontalRule",
                        "list",
                        "table",
                      ],
                      [
                        "link",
                        "image",
                        "video",
                        "fullScreen",
                        "showBlocks",
                        "codeView",
                      ],
                    ],
                  }}
                />
              </Label>
            </Form.Field>
            <ButtonSuccess type="submit" loading={loadingPages} fluid>
              Submit
            </ButtonSuccess>
          </Form>
        </>
      )}
    </PageContent>
  );
};

export default Page;
