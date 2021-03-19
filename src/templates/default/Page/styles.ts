import { Grid, Header } from "semantic-ui-react";
import styled from "styled-components";
import { UserContainer } from "../../../styles";

export const PageContent = styled(UserContainer)`
  margin-left: 0px;
`;
export const PageContentGrid = styled(Grid)`
  &.ui.grid {
    flex-direction: column;
    div.row {
      flex-grow: 1;
      &:nth-child(1) {
        flex-grow: 0;
      }
      &:nth-child(2) {
        flex-grow: 2;
      }
    }
    @media screen and (min-width: 885px) {
      min-width: 60%;
    }
  }
`;
export const HeaderTextCenter = styled(Header)`
  text-align: center;
`;
export const FooterLinkContent = styled.div`
  a {
    cursor: pointer;
    color: ${({ theme }) => theme.primary};
    font-size: 1.1rem;
  }
  &.nextPage {
    a {
      float: right;
    }
  }
`;
