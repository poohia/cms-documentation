import React, { useMemo } from "react";
import { useHistory } from "react-router-dom";
import { useNav } from "../../../../../joazco";
import { Card } from "../../../../../styled-components";
import useQueryUrl from "../../../../../useQueryUrl";

const MenusCardGroup = () => {
  const { getQueryUrlVar } = useQueryUrl();
  const liveChange = useMemo(() => getQueryUrlVar("liveChange"), []);
  const { data: menus } = useNav(liveChange);
  const { push } = useHistory();

  return (
    <Card.Group className="joazco--home-row-menus-column-card-group">
      {menus.map((menu) => (
        <Card
          key={menu.id}
          href={menu.pages.length > 0 ? `/page/${menu.pages[0].slug}` : "/"}
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            if (menu.pages.length > 0) {
              push(`/page/${menu.pages[0].slug}`);
            }
          }}
          className="joazco--home-row-menus-column-card-group-card"
        >
          <Card.Content className="joazco--home-row-menus-column-card-group-card-content">
            <Card.Header className="joazco--home-row-menus-column-card-group-card-content-header">
              <span className="joazco--home-row-menus-column-card-group-card-content-span">
                {menu.title}
              </span>
            </Card.Header>
            {menu.caption && (
              <Card.Description className="joazco--home-row-menus-column-card-group-card-content-description">
                {menu.caption}
              </Card.Description>
            )}
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default MenusCardGroup;
