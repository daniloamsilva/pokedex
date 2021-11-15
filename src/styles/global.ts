import { createGlobalStyle } from 'styled-components';

import imgPokeball from '../assets/pokeball.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #FFFFFF;
    background-image: url(${imgPokeball});
    background-repeat: no-repeat;
    background-size: 70vw;
    background-position-x: 60vw;
    background-position-y: -30vw;
    background-attachment: fixed;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 16px Roboto, sans-serif;
  }

  #root {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  button {
    cursor: pointer;
  }
`;
