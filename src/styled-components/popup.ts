import { Popup as PopupSemantic } from "semantic-ui-react";
import styled from "styled-components";

const PopupRow = styled.div`
  margin-bottom: 5px;
`;
const PopupPagesContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-top: 10px;
  border-top: 1px solid #e3e3e3;
  padding: 5px;
  div {
    flex-basis: 100%;
    &:first-child {
      margin-top: 15px;
    }
    &.input {
      width: 100%;
      margin-top: 0;
      margin-bottom 5px;
    }
  }
  h3 {
    color: black;
  }
`;
const PopupPageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0 !important;
  max-height: 200px;
  overflow-y: auto;
  div {
    flex-basis: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e3e3e3;
    &first-child {
      margin-top: 0;
    }
    p {
      margin-bottom: 5px;
    }
  }
`;
const Popup = PopupSemantic;

export { Popup, PopupRow, PopupPagesContent, PopupPageList };
