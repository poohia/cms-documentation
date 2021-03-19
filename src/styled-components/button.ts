import { Button as ButtonSemantic } from "semantic-ui-react";
import styled from "styled-components";

const ButtonSuccess = styled(ButtonSemantic)`
  &.ui.button {
    background-color: ${({ theme }) => theme.success};
    color: #fff;
    &:hover {
      background-color: ${({ theme }) => theme.success};
      color: #fff;
    }
  }
`;
const ButtonPrimary = styled(ButtonSemantic)`
  &.ui.button {
    background-color: ${({ theme }) => theme.primary};
    color: #fff;
    &:hover {
      background-color: ${({ theme }) => theme.primary};
      color: #fff;
    }
  }
`;
const ButtonDanger = styled(ButtonSemantic)`
  &.ui.button {
    background-color: ${({ theme }) => theme.danger};
    color: #fff;
    &:hover {
      background-color: ${({ theme }) => theme.danger};
      color: #fff;
    }
  }
`;
const Button = ButtonSemantic;

export { Button, ButtonSuccess, ButtonPrimary, ButtonDanger };
