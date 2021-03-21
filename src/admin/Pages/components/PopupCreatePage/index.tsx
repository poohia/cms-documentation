import React from "react";
import { Icon, Input, Form } from "semantic-ui-react";
import usePages from "../../usePages";
import {
  Popup,
  PopupRow,
  Label,
  ButtonSuccess,
  Button,
} from "../../../../styled-components";

const PopupCreatePage = ({
  loadingPages,
  handleSubmit,
}: {
  loadingPages: boolean;
  handleSubmit: (title: string, slug: string) => void;
}) => {
  const { title, slug, setTitle, setSlug, createSlug } = usePages();

  return (
    <Popup
      on="click"
      position="right center"
      pinned
      onClose={() => {
        setTitle("");
        setSlug("");
      }}
      trigger={
        <Button basic>
          <Icon name="add" />
          &nbsp;Add page
        </Button>
      }
    >
      <Popup.Content>
        <Form onSubmit={() => handleSubmit(title, slug)}>
          <PopupRow>
            <Label required htmlFor="pageName">
              <span>Page name</span>
              <Input
                type="text"
                id="pageName"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => setSlug(createSlug(title))}
                autoComplete="off"
              />
            </Label>
          </PopupRow>
          <PopupRow>
            <Label required htmlFor="pageSlug">
              <span>Page slug</span>
              <Input
                type="text"
                id="pageSlug"
                placeholder="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                onBlur={() => setSlug(createSlug(slug))}
                autoComplete="off"
              />
            </Label>
          </PopupRow>
          <PopupRow>
            <ButtonSuccess
              fluid
              size="small"
              loading={loadingPages}
              type="submit"
            >
              <Icon name="add" />
              &nbsp;Add page
            </ButtonSuccess>
          </PopupRow>
        </Form>
      </Popup.Content>
    </Popup>
  );
};

export default PopupCreatePage;
