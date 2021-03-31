import { Grid, Icon } from "semantic-ui-react";
import styled from "styled-components";
import { AdminContainer } from "../../styles";

export const MenuConfigurationContent = styled(AdminContainer)``;
export const div = styled.div``;
export const ListPagesContent = styled(Grid)``;
export const ListPagesContentRow = styled(Grid.Row)`
  &.column.row {
    padding-top: 10px;
  }
  div:first-child {
    margin-top: 0px;
  }
`;
export const ListPagesContentRowColumn = styled(Grid.Column)`
  &.column {
    margin-top: 10px !important;
    position: relative;
    &::after {
      content: "";
      width: 81%;
      height: 1px;
      background-color: rgba(34, 36, 38, 0.15);
      position: absolute;
      left: 9%;
      bottom: 0%;
    }
  }
`;
export const SortableListContent = styled.div`
  div {
    width: 100%;
  }
`;
export const SortableItemContent = styled.div`
  position: relative;
  &::after {
    content: "";
    width: 90%;
    height: 1px;
    background-color: rgba(34, 36, 38, 0.15);
    position: absolute;
    left: 5%;
    bottom: 18%;
  }
  i.icon:last-child {
    position: absolute;
    right: 0;
  }
`;
export const DragHandleContent = styled(Icon)`
  cursor: move;
`;
