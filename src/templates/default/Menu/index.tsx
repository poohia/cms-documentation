import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import DropdownLanguages from "../../../admin/Menu/components/DropdownLanguages";
import MenuAccordion from "./components/MenuAccordion";
import {
  MenuContent,
  MenuResponsive,
  MenuContainer,
  MenuImg,
  MenuList,
  MenuListItem,
  MenuFooter,
  MenuBrandTitle,
} from "./styles";
import useMenu from "./useMenu";

const Menu = () => {
  const {
    icon,
    seo: { title },
    loadingMenus,
    openMenuResponsive,
    setOpenMenuResponsive,
  } = useMenu();

  return (
    <>
      <MenuContent
        className={`joazco--menu ${openMenuResponsive ? "active" : ""}`}
      >
        <MenuContainer className="joazco--menu-container">
          <MenuList className="joazco--menu-container-menu-list">
            <MenuListItem className="joazco--menu-container-menu-list-item">
              <Link
                to="/"
                className="joazco--menu-container-menu-list-item-link-home"
              >
                <MenuImg
                  className="joazco--menu-container-menu-list-item-img-home"
                  src={icon}
                  alt={`Logo of ${title}`}
                />
              </Link>
            </MenuListItem>
            <MenuListItem
              center
              className="joazco--menu-container-menu-list-item"
            >
              <MenuBrandTitle className="joazco--menu-container-menu-list-item-brand-title">
                {title}
              </MenuBrandTitle>
            </MenuListItem>
            <DropdownLanguages />

            {loadingMenus === false && <MenuAccordion />}
          </MenuList>
          <MenuFooter className="joazco--menu-footer">
            <a
              className="joazco--menu-footer-link"
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
