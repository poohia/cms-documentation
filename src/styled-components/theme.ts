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
  linkColor: string;
};

export const defaultTheme: Theme = {
  primary: process.env.REACT_APP_JOAZCO_PRIMARY_COLOR || "#34495e",
  secondary: process.env.REACT_APP_JOAZCO_SECONDARY_COLOR || "#f8c471",
  success: process.env.REACT_APP_JOAZCO_SUCCESS_COLOR || "#2dd36f",
  warning: process.env.REACT_APP_JOAZCO_WARNING_COLOR || "#ffc409",
  danger: process.env.REACT_APP_JOAZCO_DANGER_COLOR || "#eb445a",
  black: process.env.REACT_APP_JOAZCO_BLACK_COLOR || "#34495e",
  backgroundBody: process.env.REACT_APP_JOAZCO_BACKGROUND_COLOR || "#f2f3f4",
  backgroundColorMenu:
    process.env.REACT_APP_JOAZCO_BACKGROUND_COLOR_MENU || "#f8c471",
  fontSize: process.env.REACT_APP_JOAZCO_FONT_SIZE || "18px",
  linkColor: process.env.REACT_APP_JOAZCO_LINK_COLOR || "#3867d6",
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
  }
  body{
    height: 100vh;   
    background-color: ${defaultTheme.backgroundBody};
    color: ${defaultTheme.black};
    font-size: var(--font-size);
  }
  a{
    color: ${defaultTheme.linkColor};
  }
  figure{
    padding-bottom: 0 !important;
  }
  blockquote{
    display:block;
    background-color: #eee;
    padding: 15px 20px 15px 45px;
    margin: 0 0 20px;
    position: relative;
    line-height: 1.2;
    font-size: 0.9em;
    text-align: justify;
    border-left: 10px solid ${({ theme }) => theme.primary};
    border-radius: 10px;
    font-style: italic;
  }
  blockquote::before{
    content: "\\201C"; /*Unicode for Left Double Quote*/
    font-size: 60px;
    font-weight: bold;
    color: #999;
    
    /*Positioning*/
    position: absolute;
    left: 10px;
    top:5px;
  }
  blockquote::after{
    /*Reset to make sure*/
    content: "";
  }
  blockquote a{
    text-decoration: none;
    background: #eee;
    cursor: pointer;
    padding: 0 3px;
    color: #c76c0c;
  }
  blockquote a:hover{
   color: #666;
  }
  blockquote em{
    font-style: italic;
  }
  pre {
    display: block;
    unicode-bidi: embed;
    font-family: monospace;
    white-space: pre;
    max-width: 100%;
    overflow-y: auto;
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
      font-size: 1em;
      color: ${defaultTheme.black}; 
      i.icon{
        float: right;
      }
    }
    ul{
      list-style: none;
      padding-left: 20px;
      font-size: 0.8em;
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
