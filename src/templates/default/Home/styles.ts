import { Header } from "semantic-ui-react";
import styled from "styled-components";
import { ButtonPrimary, Card } from "../../../styled-components";
import { UserContainer } from "../../../styles";

export const HomeContent = styled(UserContainer)`
  > div.ui.grid {
    @media screen and (min-width: 885px) {
      width: 655px;
    }
    @media screen and (min-width: 1225px) {
      margin-left: 0px;
    }
    @media screen and (max-width: 627px) {
      margin-left: 2%;
    }
  }
  h2.ui.header {
    color: ${({ theme }) => theme.black};
  }
`;
export const HeaderTextCenter = styled(Header)`
  text-align: center;
`;
export const ButtonStartConfiguration = styled(ButtonPrimary)`
  &.ui.icon.button {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;
export const CardGroupLinks = styled(Card.Group)`
  justify-content: space-evenly;
  @media screen and (max-width: 627px) {
    justify-content: left;
  }
`;
export const LetterByLetterContent = styled.p`
  line-height: 2em;
`;
