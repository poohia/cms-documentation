import { createGlobalStyle, DefaultTheme } from "styled-components";

type Theme = DefaultTheme & {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  black: string;
  backgroundBody: string;
  fontSize: string;
  backgroundColorMenu: string;
};

export const defaultTheme: Theme = {
  primary: process.env.REACT_APP_JAZZI_PRIMARY_COLOR || "#3867d6",
  secondary: process.env.REACT_APP_JAZZI_SECONDARY_COLOR || "#f8c471",
  success: process.env.REACT_APP_JAZZI_SUCCESS_COLOR || "#2dd36f",
  warning: process.env.REACT_APP_JAZZI_WARNING_COLOR || "#ffc409",
  danger: process.env.REACT_APP_JAZZI_DANGER_COLOR || "#eb445a",
  black: process.env.REACT_APP_JAZZI_BLACK_COLOR || "#34495e",
  backgroundBody: process.env.REACT_APP_JAZZI_BACKGROUND_COLOR || "#f2f3f4",
  backgroundColorMenu:
    process.env.REACT_APP_JAZZI_BACKGROUND_COLOR_MENU || "#f8c471",
  fontSize: process.env.REACT_APP_JAZZI_FONT_SIZE || "18px",
};

export const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  html{
      --primary: ${({ theme }) => theme.primary};
      --secondary: ${({ theme }) => theme.secondary};
      --success: ${({ theme }) => theme.success};
      --warning: ${({ theme }) => theme.warning};
      --danger: ${({ theme }) => theme.danger};
      --black: ${({ theme }) => theme.black};
      --background-body: ${({ theme }) => theme.backgroundBody};
      --background-color-menu: ${({ theme }) => theme.backgroundColorMenu};
      --font-size: ${({ theme }) => theme.fontSize};
      height: 100vh;
      font-size: var(--font-size);
  }
  body{
    height: 100vh;   
    background-color: ${defaultTheme.backgroundBody};
    color: ${defaultTheme.black};
  }
  pre {
    display: block;
    unicode-bidi: embed;
    font-family: monospace;
    white-space: pre;
  }
  pre::-webkit-scrollbar {
    background-color: #DED7E6;
    height: 10px;
  }
  pre::-webkit-scrollbar-thumb {
    background: #9684A3;
    border-top-right-radius: 10px;
  }
  pre {
    background: #eee;
    border-left: 10px solid ${defaultTheme.primary};
    border-radius: 10px;
    padding: 10px;
    letter-spacing: .5px;
    font-size: 10pt;
    color: #000;
  }
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }	
  }
  
  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .ui.accordion:not(.styled) .title~.content:not(.ui) {
    padding: 0;
  }
  .ui.accordion .title~.content {
    display: block;
  }
  .expand {
    transition: .5s max-height ease-out, .5s opacity ease-out;
    max-height: 0;
    opacity: 0;
    overflow: hidden; 
  }
  .active.expand {
    max-height: 1000px;
    opacity: 1;
  }

  .ui.accordion {
    .title:not(.ui){
      font-size: 1.3rem;
      color: ${defaultTheme.black}; 
      i.icon{
        float: right;
      }
    }
    ul{
      list-style: none;
      padding-left: 20px;
      li{
        margin: 10px 0;
        a{
          
          text-transform: uppercase;
          color: ${defaultTheme.black};
          font-weight: 500; 
          &:hover{
            color: black;
          }
          &.active{
            color: black; 
          }
        }
      }
    }
  }
  `;
