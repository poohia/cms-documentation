import React, { useState } from "react";
import { Grid, Icon, Input } from "semantic-ui-react";
import { ListPageProps } from "../../types";
import {
  ListPagesContent,
  ListPagesContentRow,
  ListPagesContentRowColumn,
} from "../../styles";

const ListPages = ({ menu, menus, pages, addPageToMenu }: ListPageProps) => {
  const [filter, setFilter] = useState<string>("");
  return (
    <ListPagesContent>
      <ListPagesContentRow columns={1}>
        <Grid.Column>
          <Input
            placeholder="Filter"
            size="mini"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fluid
          />
        </Grid.Column>
      </ListPagesContentRow>
      <ListPagesContentRow columns={1}>
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
          .filter(
            (p) =>
              p.title.toLowerCase().includes(filter.toLowerCase()) ||
              p.slug.toLowerCase().includes(filter.toLowerCase())
          )
          .map((page) => (
            <ListPagesContentRowColumn key={page.id}>
              <ListPagesContentRow columns={2}>
                <Grid.Column>
                  <span>
                    {page.title}
                    <br />
                    <i>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {page.slug}
                    </i>
                  </span>
                </Grid.Column>
                <Grid.Column>
                  <Icon
                    link
                    name="add"
                    onClick={() => addPageToMenu(menu.id, page.id)}
                  />
                </Grid.Column>
              </ListPagesContentRow>
            </ListPagesContentRowColumn>
          ))}
      </ListPagesContentRow>
    </ListPagesContent>
  );
};

export default ListPages;
