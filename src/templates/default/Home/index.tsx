import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import Loader from "../Loader";
import useHome from "./useHome";
import { Links, About, MenusCardGroup } from "./components";
import {
  HomeContent,
  ButtonStartConfiguration,
  HeaderTextCenter,
} from "./styles";

const Home = () => {
  const { loading, title, description, links } = useHome();

  if (loading) {
    return <Loader />;
  }
  if (title === "") {
    return (
      <HomeContent className="joazco--home">
        <Link to="/joazco-connection">
          <ButtonStartConfiguration
            content="Start configuration"
            icon="external"
            labelPosition="right"
            className="joazco--home-btn-start-config"
          />
        </Link>
      </HomeContent>
    );
  }
  return (
    <HomeContent className="joazco--home">
      <Grid className="joazco--home-grid">
        <Grid.Row
          columns={1}
          className="joazco--home-grid-row joazco--home-grid-row-title"
        >
          <Grid.Column className="joazco--home-grid-column joazco--home-grid-row-title-column">
            <HeaderTextCenter
              as="h1"
              className="joazco--home-grid-row-column-title"
            >
              {title}
            </HeaderTextCenter>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={1}>
          <Grid.Column>
            <MenusCardGroup />
          </Grid.Column>
        </Grid.Row>
        {description && <About description={description} />}
        {links && <Links links={links} />}
      </Grid>
    </HomeContent>
  );
};

export default Home;
