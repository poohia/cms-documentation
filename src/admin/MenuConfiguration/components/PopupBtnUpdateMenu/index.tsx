import React from "react";
import { Icon, Input, Form, Grid } from "semantic-ui-react";
import {
  Popup,
  PopupRow,
  Label,
  ButtonSuccess,
  PopupPagesContent,
  PopupPageList,
} from "../../../../styled-components";
import { PopupBtnUpdateMenuProps } from "../../types";
import useMenuConfiguration from "../../useMenuConfiguration";

const PopupBtnUpdateMenu = ({
  loading,
  menu,
  menus,
  pages,
  handleUpdateSubmit,
  addPageToMenu,
}: PopupBtnUpdateMenuProps) => {
  const {
    menuTitle,
    menuCaption,
    filter,
    setMenuTitle,
    setMenuCaption,
    setFilter,
  } = useMenuConfiguration(menu);

  return (
    <Popup
      trigger={<Icon name="pencil" color="blue" bordered size="small" link />}
      on="click"
      flowing
      position="bottom left"
    >
      <Popup.Content>
        <Form
          onSubmit={() => handleUpdateSubmit(menu.id, menuTitle, menuCaption)}
        >
          <PopupRow>
            <Grid>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Label htmlFor="menuTitle" required>
                    <span>Menu name</span>
                    <Input
                      type="text"
                      id="menuTitle"
                      value={menuTitle}
                      placeholder="Getting Started"
                      onChange={(e) => setMenuTitle(e.target.value)}
                      fluid
                    />
                  </Label>
                </Grid.Column>
                <Grid.Column>
                  <Label htmlFor="menuCaption">
                    <span>Caption</span>
                    <Input
                      type="text"
                      id="menuCaption"
                      value={menuCaption}
                      placeholder="Set up your environment and start building."
                      onChange={(e) => setMenuCaption(e.target.value)}
                      fluid
                    />
                  </Label>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </PopupRow>
          <PopupRow>
            <ButtonSuccess fluid size="small" loading={loading} type="submit">
              <Icon name="pencil" />
              &nbsp;Update Menu
            </ButtonSuccess>
          </PopupRow>
        </Form>
        <PopupPagesContent>
          <PopupRow>
            <h3>Add page</h3>
          </PopupRow>
          <PopupRow>
            <Input
              placeholder="Filter"
              size="mini"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </PopupRow>
          <PopupRow>
            <PopupPageList>
              {pages
                .filter((p) => !menu.pages.includes(p))
                .filter(
                  (p) =>
                    !menus
                      .map((m) => m.pages.map((pa) => pa.id))
                      .reduce<string[]>((previousValue, currentValue) => {
                        let newValue = [];
                        newValue = previousValue.concat(currentValue);
                        return newValue;
                      }, [])
                      .includes(p.id)
                )
                .filter((p) =>
                  p.title.toLowerCase().includes(filter.toLowerCase())
                )
                .map((page) => (
                  <div key={page.id}>
                    <p>
                      {page.title}
                      <br />
                      &nbsp;&nbsp;
                      <span>
                        <i>{page.slug}</i>
                      </span>
                    </p>
                    <Icon
                      link
                      name="add"
                      onClick={() => addPageToMenu(menu.id, page.id)}
                    />
                  </div>
                ))}
            </PopupPageList>
          </PopupRow>
        </PopupPagesContent>
      </Popup.Content>
    </Popup>
  );
};

export default PopupBtnUpdateMenu;
