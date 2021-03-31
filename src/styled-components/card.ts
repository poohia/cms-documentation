import { Card as CardSemantic } from "semantic-ui-react";
import styled from "styled-components";

const Card = styled(CardSemantic)`
  &.ui.card {
    cursor: pointer;
    animation-name: fadeIn;
    animation-duration: 1.3s;
    animation-fill-mode: both;
    font-size: 0.8em;
    flex-grow: 1;
    & > .content > .header {
      color: ${({ theme }) => theme.linkColor};
    }
  }
`;

export default Card;
