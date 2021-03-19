import { Form as FormSemantic } from "semantic-ui-react";
import styled from "styled-components";

const Form = FormSemantic;

type LabelProps = {
  required?: boolean;
};
const Label = styled.label<LabelProps>`
  ${({ required, theme }) =>
    required &&
    theme &&
    `
    > span{
        &::after {
            margin: -0.2em 0 0 0.2em;
            content: "*";
            color: ${theme.danger};
          }
    }
  `};
`;
const FormInput = styled(Form.Input)`
  &.error {
    .prompt.label {
      color: ${({ theme }) => theme.danger} !important;
    }
  }
`;

export { Form, FormInput, Label };
