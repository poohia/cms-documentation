import React from "react";
import { Link } from "react-router-dom";
import { Grid, Header, Icon } from "semantic-ui-react";
import Loader from "../Loader";
import { PopupBtnAppendMenu, PanelMenu } from "./components";
import { MenuConfigurationContent } from "./styles";
import useMenuConfiguration from "./useMenuConfiguration";

const MenuConfiguration = () => {
  const { driver, logged, loadingPages, menus } = useMenuConfiguration();

  if (logged === null || loadingPages === null) {
    return <Loader />;
  }
  return (
    <MenuConfigurationContent>
      <Header as="h1">
        Menu configurator
        <Header.Subheader>
          Manage your menu&nbsp;
          {`(${menus.length})`}
        </Header.Subheader>
      </Header>
      <p>
        <Link
          to={driver !== "localstorage" ? "/?liveChange=true" : "/"}
          target="_blank"
        >
          Live change&nbsp;
          <Icon name="external" />
        </Link>
      </p>
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <PopupBtnAppendMenu />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {menus.map((menu) => (
            <Grid.Column mobile={16} tablet={8} computer={5} key={menu.id}>
              <PanelMenu menu={menu} />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </MenuConfigurationContent>
  );
};

export default MenuConfiguration;
