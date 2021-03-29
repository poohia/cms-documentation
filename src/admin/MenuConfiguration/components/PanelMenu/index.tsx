import React from "react";
import { Form, Icon, Input } from "semantic-ui-react";
import { Panel, Label, Button } from "../../../../styled-components";
import { PanelMenuProps } from "../../types";
import useMenuConfiguration from "../../useMenuConfiguration";
import PanelMenuContainer from "../PanelMenuContainer";

const PanelMenu = (props: PanelMenuProps) => {
  const { menu, removeMenu, handleUpdateSubmit } = props;
  const {
    menuTitle,
    menuCaption,
    editMode,
    appendPageMode,
    setMenuTitle,
    setMenuCaption,
    setEditMode,
    setAppendPageMode,
  } = useMenuConfiguration(menu);

  return (
    <Panel.PanelContainer>
      <Panel.PanelHeader>
        <Panel.PanelTitle>
          {editMode ? (
            <Form
              onSubmit={() => {
                handleUpdateSubmit(menu.id, menuTitle, menuCaption);
                setEditMode(false);
              }}
            >
              <Form.Field>
                <Label htmlFor="menuTitle" required>
                  <span>Menu name</span>
                  <Input
                    type="text"
                    id="menuTitle"
                    value={menuTitle}
                    placeholder="Getting Started"
                    onChange={(e) => setMenuTitle(e.target.value)}
                  />
                </Label>
              </Form.Field>
              <Form.Field>
                <Label htmlFor="menuCaption">
                  <span>Caption</span>
                  <Input
                    type="text"
                    id="menuCaption"
                    value={menuCaption}
                    placeholder="Set up your environment and start building."
                    onChange={(e) => setMenuCaption(e.target.value)}
                  />
                </Label>
              </Form.Field>
            </Form>
          ) : (
            <>
              {menu.title}
              <Panel.PanelTitleCaption>{menu.caption}</Panel.PanelTitleCaption>
            </>
          )}
        </Panel.PanelTitle>
        <Panel.PanelIcons>
          <Icon
            bordered
            size="small"
            color="red"
            name="remove"
            link
            onClick={() => {
              if (editMode) {
                setEditMode(false);
              } else {
                const result = window.confirm("Are you sure remove menu");
                if (result) {
                  removeMenu(menu.id);
                }
              }
            }}
          />

          {editMode ? (
            <Icon
              name="check"
              color="green"
              bordered
              size="small"
              link
              onClick={() => {
                handleUpdateSubmit(menu.id, menuTitle, menuCaption);
                setEditMode(false);
              }}
            />
          ) : (
            <Icon
              name="pencil"
              color="blue"
              bordered
              size="small"
              link
              onClick={() => setEditMode(true)}
            />
          )}
        </Panel.PanelIcons>
      </Panel.PanelHeader>
      <Panel.PanelContent>
        <div>
          {appendPageMode ? (
            <Button
              onClick={() => setAppendPageMode(false)}
              fluid
              size="small"
              basic
            >
              Modify list pages
            </Button>
          ) : (
            <Button
              onClick={() => setAppendPageMode(true)}
              fluid
              size="small"
              basic
            >
              Add pages
            </Button>
          )}
        </div>
        <PanelMenuContainer appendPageMode={appendPageMode} {...props} />
      </Panel.PanelContent>
    </Panel.PanelContainer>
  );
};

export default PanelMenu;
