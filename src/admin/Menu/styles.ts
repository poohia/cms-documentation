import styled from "styled-components";

export const MenuContent = styled.nav`
  margin: 0;
  padding: 0;
  width: 250px;
  background-color: ${({ theme }) => theme.backgroundColorMenu};
  position: fixed;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 4px 1px 5px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  z-index: 9;
`;
export const MenuContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  padding: 5px;
  height: 100%;
`;
export const MenuList = styled.ul`
  padding-left: 5px;
  list-style: none;
  flex-grow: 1;
`;
export const MenuFooter = styled.p`
  padding: 5px;
  font-size: 0.5rem;
  flex-grow: 0;
`;
export const MenuListItem = styled.li<{ center?: boolean; active?: boolean }>`
  margin-top: 15px;
  margin-bottom: 15px;
  ${({ center }) => center && "text-align: center;"}
  a {
    color: ${({ theme }) => theme.black};
    font-weight: bold;
    font-size: 0.8em;
    i {
      font-size: 1.3rem;
      margin-right: 10%;
    }
    &:hover {
      color: ${({ theme }) => theme.black};
    }
  }
  &:first-child {
    margin-top: 0px;
  }
`;
export const MenuBrandTitle = styled.span`
  font-size: 0.6rem;
`;
export const MenuBtnSignOut = styled.button`
  margin-bottom: 20px;
  font-size: 0.8em;
  border: none;
  color: ${({ theme }) => theme.danger};
  cursor: pointer;
  background-color: transparent;
`;
export const MenuImg = styled.img`
  width: 100%;
  padding: 3px 10px;
`;
