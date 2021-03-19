import React from "react";
import { Grid } from "semantic-ui-react";
import { LoaderContent } from "./styles";

const Loader = () => (
  <LoaderContent className="joazco-home-loader">
    <Grid className="joazco-home-loader-grid">
      <Grid.Row className="joazco-home-loader-grid-row">&nbsp;</Grid.Row>
    </Grid>
  </LoaderContent>
);

export default Loader;
