import React from "react";
import { Icon } from "semantic-ui-react";
import { Panel } from "../../../../styled-components";
import { PanelMenuProps } from "../../types";
import PopupBtnUpdateMenu from "../PopupBtnUpdateMenu";

const PanelMenu = ({
  loading,
  menu,
  removeMenu,
  handleUpdateSubmit,
  addPageToMenu,
  removePageFromMenu,
  ...rest
}: PanelMenuProps) => (
  <Panel.PanelContainer>
    <Panel.PanelHeader>
      <Panel.PanelTitle>
        {menu.title}
        <Panel.PanelTitleCaption>{menu.caption}</Panel.PanelTitleCaption>
      </Panel.PanelTitle>
      <Panel.PanelIcons>
        <Icon
          bordered
          size="small"
          color="red"
          name="remove"
          link
          onClick={() => {
            const result = window.confirm("Are you sure remove menu");
            if (result) {
              removeMenu(menu.id);
            }
          }}
        />
        <PopupBtnUpdateMenu
          loading={loading}
          menu={menu}
          handleUpdateSubmit={handleUpdateSubmit}
          addPageToMenu={addPageToMenu}
          {...rest}
        />
      </Panel.PanelIcons>
    </Panel.PanelHeader>
    <Panel.PanelContent>
      {menu.pages.map((page) => (
        <div key={page.id}>
          <p>
            <Icon name="caret right" />
            {page.title}
            <br />
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <i>{page.slug}</i>
            </span>
          </p>
          <Icon
            link
            name="remove"
            onClick={() => removePageFromMenu(menu.id, page.id)}
          />
        </div>
      ))}
    </Panel.PanelContent>
  </Panel.PanelContainer>
);

export default PanelMenu;
