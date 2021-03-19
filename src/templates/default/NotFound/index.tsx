import React from "react";
import { Grid, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { NotFoundContent } from "./styles";

const NotFound = () => (
  <NotFoundContent className="joazco--notFound">
    <Grid className="joazco--notFound-grid">
      <Grid.Row className="joazco--notFound-grid-row">
        <Header as="h1" className="joazco--notFound-grid-row-header">
          404 - Not Found!
          <Header.Subheader className="joazco--notFound-grid-header-subheader">
            <Link
              to="/"
              className="joazco--notFound-grid-header-subheader-link"
            >
              Go Home
            </Link>
          </Header.Subheader>
        </Header>
      </Grid.Row>
    </Grid>
  </NotFoundContent>
);

export default NotFound;
