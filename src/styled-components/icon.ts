import { Icon } from "semantic-ui-react";
import styled from "styled-components";

export const IconActionRemove = styled(Icon)`
  cursor: pointer;
  color: ${({ theme }) => theme.danger};
  &:hover {
    background-color: ${({ theme }) => theme.danger};
    color: white;
  }
`;
export const IconActionEdit = styled(Icon)`
  cursor: pointer;
  color: ${({ theme }) => theme.primary};
  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: white;
  }
`;
