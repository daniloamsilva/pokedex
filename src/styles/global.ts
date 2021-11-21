import { createGlobalStyle } from 'styled-components';

import imgPokeball from '../assets/pokeball.svg';

export default createGlobalStyle`
  :root {
    --color-bug-type-dark: #66bb6a;
    --color-bug-type-light: #81c784;

    --color-dark-type-dark: #757575;
    --color-dark-type-light: #9e9e9e;

    --color-dragon-type-dark: #ff7043;
    --color-dragon-type-light: #ff8a65;

    --color-electric-type-dark: #ffce4b;
    --color-electric-type-light: #fbe068;

    --color-fairy-type-dark: #ffab91;
    --color-fairy-type-light: #ffccbc;

    --color-fighting-type-dark: #ff7043;
    --color-fighting-type-light: #ff8a65;

    --color-fire-type-dark: #fc6c6d;
    --color-fire-type-light: #fc7e7e;

    --color-flying-type-dark: #448aff;
    --color-flying-type-light: #82b1ff;

    --color-ghost-type-dark: #9575cd;
    --color-ghost-type-light: #b39ddb;

    --color-grass-type-dark: #48d0b0;
    --color-grass-type-light: #61e0c9;

    --color-ground-type-dark: #ffa726;
    --color-ground-type-light: #ffb74d;

    --color-ice-type-dark: #64b5f6;
    --color-ice-type-light: #90caf9;

    --color-normal-type-dark: #90a4ae;
    --color-normal-type-light: #b0bec5;

    --color-poison-type-dark: #ba68c8;
    --color-poison-type-light: #ce93d8;

    --color-psychic-type-dark: #f06292;
    --color-psychic-type-light: #f48fb1;

    --color-rock-type-dark: #a1887f;
    --color-rock-type-light: #bcaaa4;

    --color-steel-type-dark: #9e9e9e;
    --color-steel-type-light: #bdbdbd;

    --color-water-type-dark: #76befe;
    --color-water-type-light: #8fd1fd;
  }

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

  button {
    cursor: pointer;
  }
`;
