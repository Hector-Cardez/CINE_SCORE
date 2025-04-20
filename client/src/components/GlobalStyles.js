import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    color: rgb(201, 201, 201); 
    font-family: "Reddit Sans Condensed", sans-serif;
    width: 100%;
    overflow-x: hidden;
    margin: 0;
    position: relative; /* Ensure that pseudo-elements are positioned relative to the body */
    background-color: rgb(41, 81, 89); 
  }

  a {
    color: rgb(201, 201, 201); 
    text-decoration: none;
  }
`;

export default GlobalStyles;
