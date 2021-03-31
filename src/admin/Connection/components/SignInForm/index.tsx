import React from "react";
import { Link } from "react-router-dom";
import { Form, Label, ButtonSuccess } from "../../../../styled-components";
import useConnection from "../../useConnection";
import {
  SignInFormContent,
  SignInFormContainer,
  SignInFormImg,
} from "../../styles";
import { Props } from "../../types";

const SignInForm = ({ submit }: Pick<Props, "submit">) => {
  const { email, password, icon, setEmail, setPassword } = useConnection();

  return (
    <SignInFormContent className="joazco--signin-form-content">
      <SignInFormContainer className="joazco--signin-form-content-container">
        {icon && (
          <Link to="/">
            <SignInFormImg
              className="joazco--signin-form-content-container-img"
              src={icon}
              alt="logo"
            />
          </Link>
        )}
        <Form
          className="joazco--signin-form-content-container-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            submit(email, password);
          }}
        >
          <Form.Field className="joazco--signin-form-content-container-form-field-email">
            <Label
              required
              htmlFor="email"
              className="joazco--signin-form-content-container-form-field-email-label"
            >
              <span className="joazco--signin-form-content-container-form-field-email-label-span">
                Email address
              </span>
              <input
                type="email"
                id="email"
                className="joazco--signin-form-content-container-form-field-email-label-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Label>
          </Form.Field>

          <Form.Field className="joazco--signin-form-content-container-form-field-password">
            <Label
              required
              htmlFor="password"
              className="joazco--signin-form-content-container-form-field-password-label"
            >
              <span className="joazco--signin-form-content-container-form-field-password-label-span">
                Password
              </span>
              <input
                type="password"
                id="password"
                className="joazco--signin-form-content-container-form-field-password-label-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Label>
          </Form.Field>
          <ButtonSuccess
            className="joazco--signin-form-content-container-form-submit"
            type="submit"
            fluid
          >
            Submit
          </ButtonSuccess>
        </Form>
      </SignInFormContainer>
    </SignInFormContent>
  );
};

export default SignInForm;
