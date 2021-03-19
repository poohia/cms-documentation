import styled from "styled-components";

export const PanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 10px;
  background-color: white;
  box-shadow: 0 0 0 1px rgb(34 36 38 / 15%) inset;
  margin: 10px;
`;
export const PanelHeader = styled.div`
  display: flex;
  flex-basis: 100%;
  flex-shrink: 1;
  justify-content: space-between;
  border-bottom: 1px solid rgb(34 36 38 / 15%);
  color: black;
  padding: 5px;
`;
export const PanelTitle = styled.div`
  flex-shrink: 2;
  font-weight: bold;
  font-size: 1rem;
`;
export const PanelTitleCaption = styled.p`
  font-size: 0.8rem;
  font-weight: 100;
`;
export const PanelIcons = styled.div`
  flex-shrink: 1;
`;
export const PanelContent = styled.div`
  div {
    &:first-child {
      margin-top: 20px;
    }
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    p {
      flex-shrink: 2;
    }
    i {
      flex-shrink: 1;
    }
  }
`;
