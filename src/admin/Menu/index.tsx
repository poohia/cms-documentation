import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import {
  MenuContent,
  MenuContainer,
  MenuImg,
  MenuList,
  MenuListItem,
  MenuBtnSignOut,
  MenuFooter,
  MenuBrandTitle,
} from "./styles";
import useMenu from "./useMenu";
import Props from "./types";
import DropdownLanguages from "./components/DropdownLanguages";

const Menu = ({ activeItem }: Props) => {
  const {
    driver,
    icon,
    seo: { title },
    enableFixtures,
    signOut,
  } = useMenu();
  return (
    <>
      <MenuContent>
        <MenuContainer>
          <MenuList>
            <MenuListItem>
              <Link to="/joazco-admin">
                <MenuImg src={icon} alt={`Logo of ${title}`} />
              </Link>
            </MenuListItem>
            <MenuListItem center>
              <MenuBrandTitle>{title}</MenuBrandTitle>
            </MenuListItem>
            <DropdownLanguages />
            <MenuListItem center>
              <MenuBtnSignOut onClick={() => signOut()} type="button">
                <Icon name="sign-out" />
                Deconnection
              </MenuBtnSignOut>
            </MenuListItem>
            <MenuListItem active={activeItem === "home"}>
              <Link to="/joazco-admin">
                <Icon name="home" />
                SEO
              </Link>
            </MenuListItem>
            <MenuListItem active={activeItem === "pages"}>
              <Link to="/joazco-admin/pages">
                <Icon name="copy" />
                Pages
              </Link>
            </MenuListItem>
            <MenuListItem active={activeItem === "menus"}>
              <Link to="/joazco-admin/menu-configuration">
                <Icon name="sitemap" />
                Menu
              </Link>
            </MenuListItem>
            <MenuListItem active={activeItem === "stylesheet"}>
              <Link to="/joazco-admin/stylesheet">
                <Icon name="css3" />
                Stylesheet
              </Link>
            </MenuListItem>
            {enableFixtures && (
              <MenuListItem active={activeItem === "fixtures"}>
                <Link to="/joazco-admin/fixtures">
                  <Icon name="database" />
                  Fixtures
                </Link>
              </MenuListItem>
            )}
          </MenuList>
          <MenuFooter>
            <p>
              Driver:&nbsp;
              <b>{driver}</b>
            </p>
            <a
              href="https://cms-documentation.joazco.com"
              target="_blank"
              rel="noreferrer"
            >
              Build with Joazco CMS Documentation ©
            </a>
          </MenuFooter>
        </MenuContainer>
      </MenuContent>
    </>
  );
};

export default Menu;
