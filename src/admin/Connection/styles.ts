import styled from "styled-components";

export const SignInFormContent = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  font-size: 16px;
`;
export const SignInFormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;
export const SignInFormImg = styled.img`
  margin: 10px 0;
  width: 100%;
  align-self: center;
`;

export const LoadContent = SignInFormContent;
export const LoadContainer = styled(SignInFormContainer)`
  div {
    align-self: center;
  }
`;
