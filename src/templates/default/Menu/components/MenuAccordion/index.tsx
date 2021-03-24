import React from "react";
import { Link } from "react-router-dom";
import { Accordion, Icon } from "semantic-ui-react";
import { MenuAccordionContent } from "../../styles";
import useMenu from "../../useMenu";

const MenuAccordion = () => {
  const { menus, activeIndex, slug, handleClick } = useMenu();
  return (
    <MenuAccordionContent className="joazco--menu-container-menu-list-item joazco--menu-container-menu-accordion">
      {menus.map((menu, key) => (
        <React.Fragment key={menu.id}>
          <Accordion.Title
            className={`joazco--menu-container-menu-accordion-title joazco--menu-container-menu-accordion-title-${key}`}
            active={activeIndex === key}
            index={key}
            onClick={handleClick}
          >
            <span className="joazco--menu-container-menu-accordion-title-title">
              {menu.title}
            </span>
            <Icon
              className="joazco--menu-container-menu-accordion-title-icon"
              name={activeIndex === key ? "angle down" : "angle right"}
            />
          </Accordion.Title>
          <Accordion.Content
            active={activeIndex === key}
            className="expand joazco--menu-container-menu-accordion-content"
          >
            <ul className="joazco--menu-container-menu-accordion-content-list">
              {menu.pages &&
                menu.pages.map((page) => (
                  <li
                    key={page.id}
                    className="joazco--menu-container-menu-accordion-content-list-li"
                  >
                    <Link
                      to={`/page/${page.slug}`}
                      className={`joazco--menu-container-menu-accordion-content-list-li-link ${
                        page.slug === slug ? "active" : ""
                      }`}
                    >
                      <Icon
                        name="caret right"
                        className="joazco--menu-container-menu-accordion-content-list-li-icon"
                      />
                      &nbsp;
                      <span className="joazco--menu-container-menu-accordion-content-list-title">
                        {page.title}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </Accordion.Content>
        </React.Fragment>
      ))}
    </MenuAccordionContent>
  );
};

export default MenuAccordion;
