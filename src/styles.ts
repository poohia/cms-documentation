import styled from "styled-components";

export const SuspenseContent = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.backgroundBody};
`;
export const AdminContainer = styled.div`
  font-size: 16px;
  height: 100%;
  margin-left: 250px;
  padding: 10px 10px 10px 20px;
`;
export const UserContainer = styled.div`
  > div.grid {
    position: absolute;
    top: 2%;
    left: 50%;
    transform: translate(-50%, 0);
    margin-left: 125px;
    @media screen and (max-width: 885px) {
      position: static;
      margin-top: 2%;
      margin-left: 0;
      transform: inherit;
    }
  }
`;
