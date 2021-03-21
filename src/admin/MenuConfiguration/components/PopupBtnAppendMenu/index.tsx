import React from "react";
import { Icon, Input, Form } from "semantic-ui-react";
import {
  Popup,
  PopupRow,
  Label,
  ButtonSuccess,
  Button,
} from "../../../../styled-components";
import useMenuConfiguration from "../../useMenuConfiguration";

const PopupBtnAppendMenu = ({
  loadingMenus,
  handleSubmit,
}: {
  loadingMenus: boolean;
  handleSubmit: (title: string, caption: string) => void;
}) => {
  const {
    menuTitle,
    menuCaption,
    setMenuTitle,
    setMenuCaption,
  } = useMenuConfiguration();

  return (
    <Popup
      on="click"
      position="right center"
      pinned
      onClose={() => {
        setMenuTitle("");
        setMenuCaption("");
      }}
      trigger={
        <Button basic>
          <Icon name="add" />
          &nbsp;Add menu
        </Button>
      }
    >
      <Popup.Content>
        <Form onSubmit={() => handleSubmit(menuTitle, menuCaption)}>
          <PopupRow>
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
          </PopupRow>
          <PopupRow>
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
          </PopupRow>
          <PopupRow>
            <ButtonSuccess
              fluid
              size="small"
              loading={loadingMenus}
              type="submit"
            >
              <Icon name="add" />
              &nbsp;Add Menu
            </ButtonSuccess>
          </PopupRow>
        </Form>
      </Popup.Content>
    </Popup>
  );
};

export default PopupBtnAppendMenu;
