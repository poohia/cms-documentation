import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Grid, Header, Icon } from "semantic-ui-react";
import Loader from "../Loader";
import { PopupBtnAppendMenu, PanelMenu } from "./components";
import { MenuConfigurationContent } from "./styles";
import useMenuConfiguration from "./useMenuConfiguration";

const MenuConfiguration = () => {
  const {
    loadingMenus,
    loadingConnection,
    user,
    driver,
    menus,
    handleSubmit,
    handleUpdateSubmit,
    removeMenu,
  } = useMenuConfiguration();

  if (loadingConnection) {
    return <Loader />;
  }

  if (!user) {
    return <Redirect to="/joazco-connection" />;
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
            <PopupBtnAppendMenu
              loadingMenus={loadingMenus}
              handleSubmit={handleSubmit}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          {menus.map((menu) => (
            <Grid.Column mobile={16} tablet={8} computer={5} key={menu.id}>
              <PanelMenu
                loading={loadingMenus}
                menu={menu}
                removeMenu={removeMenu}
                handleUpdateSubmit={handleUpdateSubmit}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
    </MenuConfigurationContent>
  );
};

export default MenuConfiguration;
