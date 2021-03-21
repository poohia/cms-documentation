import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Grid, Header, Table, Input } from "semantic-ui-react";
import { IconActionRemove } from "../../styled-components";
import Loader from "../Loader";
import PopupCreatePage from "./components/PopupCreatePage";
import { PagesContent } from "./styles";
import usePages from "./usePages";

const Pages = () => {
  const {
    loadingConnection,
    user,
    pages,
    loadingPages,
    filter,
    removePage,
    setFilter,
  } = usePages();

  if (loadingConnection || loadingPages === null) {
    return <Loader />;
  }
  if (!user) {
    return <Redirect to="/joazco-connection" />;
  }
  return (
    <PagesContent>
      <Header as="h1">
        Pages
        <Header.Subheader>
          Manage your pages&nbsp;
          {`(${pages.length})`}
        </Header.Subheader>
      </Header>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <PopupCreatePage />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Input
              type="text"
              placeholder="Filter"
              onChange={(e) => setFilter(e.target.value)}
            />
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine>Page name</Table.HeaderCell>
                  <Table.HeaderCell>Page slug</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {pages
                  .filter((p) =>
                    p.title.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((page) => (
                    <Table.Row key={page.id}>
                      <Table.Cell>
                        <Link to={`/joazco-admin/pages/page/${page.id}`}>
                          {page.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{page.slug}</Table.Cell>
                      <Table.Cell>
                        <div>
                          <IconActionRemove
                            bordered
                            size="large"
                            name="remove"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Are you sure you want to delete the page  ${page.title}`
                                )
                              ) {
                                removePage(page.id);
                              }
                            }}
                          />
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </PagesContent>
  );
};

export default Pages;
