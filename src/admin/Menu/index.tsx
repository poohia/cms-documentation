import React, { useEffect } from "react";
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
  MenuResponsive,
} from "./styles";
import useMenu from "./useMenu";
import Props from "./types";
import DropdownLanguages from "./components/DropdownLanguages";

const Menu = ({ activeItem }: Props) => {
  const {
    driver,
    icon,
    title,
    enableFixtures,
    enableCache,
    openMenuResponsive,
    template,
    signOut,
    push,
    setOpenMenuResponsive,
  } = useMenu();
  useEffect(() => setOpenMenuResponsive(false), [activeItem]);
  return (
    <>
      <MenuContent className={openMenuResponsive ? "active" : ""}>
        <MenuContainer>
          <MenuList>
            <MenuListItem>
              {icon && (
                <Link to="/">
                  <MenuImg src={icon} alt={`Logo of ${title}`} />
                </Link>
              )}
            </MenuListItem>
            <MenuListItem center>
              <MenuBrandTitle>{title}</MenuBrandTitle>
            </MenuListItem>
            <DropdownLanguages />
            {driver !== "localstorage" && (
              <MenuListItem center>
                <MenuBtnSignOut
                  onClick={() => {
                    signOut().then(() => push("/joazco-connection"));
                  }}
                  type="button"
                >
                  <Icon name="sign-out" />
                  Deconnection
                </MenuBtnSignOut>
              </MenuListItem>
            )}
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
              Template:&nbsp;
              <b>{template}</b>
            </p>
            <p>
              Enable cache:&nbsp;
              <b>{String(enableCache)}</b>
            </p>
            <p>
              Enable fixutres:&nbsp;
              <b>{String(enableFixtures)}</b>
            </p>
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
      <MenuResponsive>
        <div>
          <Icon
            onClick={() => setOpenMenuResponsive(!openMenuResponsive)}
            size="large"
            name={!openMenuResponsive ? "bars" : "remove"}
          />
        </div>
      </MenuResponsive>
    </>
  );
};

export default Menu;
