import { Accordion } from "semantic-ui-react";
import styled from "styled-components";
import {
  MenuContent as MenuContentAdmin,
  MenuContainer as MenuContainerAdmin,
  MenuList as MenuListAdmin,
  MenuFooter as MenuFooterAdmin,
  MenuListItem as MenuListItemAdmin,
  MenuBrandTitle as MenuBrandTitleAdmin,
  MenuImg as MenuImgAdmin,
} from "../../../admin/Menu/styles";

export const MenuContent = styled(MenuContentAdmin)`
  @media screen and (max-width: 885px) {
    width: 0;
    transition: width 0.3s ease-in-out;
    top: 0;
    &.active {
      width: 250px;
    }
  }
`;
export const MenuResponsive = styled.nav`
  display: none;
  @media screen and (max-width: 885px) {
    display: block;
    font-size: 0.8em;
    width: 50px;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: transparent;
    text-align: center;
    padding: 5px;
    i {
      cursor: pointer;
    }
  }
`;
export const MenuContainer = styled(MenuContainerAdmin)``;
export const MenuList = styled(MenuListAdmin)`
  @media screen and (max-width: 885px) {
    &:first-child {
      margin-top: 15%;
    }
  }
`;
export const MenuFooter = styled(MenuFooterAdmin)``;
export const MenuListItem = styled(MenuListItemAdmin)``;
export const MenuBrandTitle = styled(MenuBrandTitleAdmin)`
  i.icon {
    margin-right: 4px;
  }
`;
export const MenuImg = styled(MenuImgAdmin)``;
export const MenuAccordionContent = styled(Accordion)`
  div.title {
    font-weight: bold;
    
  }
  div.content{
    li{
      a{
        color ${({ theme }) => theme.black};
        &:hover{
          color ${({ theme }) => theme.black};
        }
        &.active {
          color: ${({ theme }) => theme.black};
          font-weight: bold;
        }
      }
    }
  }
`;
