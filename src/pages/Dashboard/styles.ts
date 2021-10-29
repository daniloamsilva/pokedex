import styled from 'styled-components';
import { shade } from 'polished';

import pokeball from '../../assets/pokeball.png';

export const Header = styled.header`
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #000000;
`;

export const PokemonList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
  margin-bottom: 10px;
`;

export const MorePokemonArea = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 23px 0;

  button {
    padding: 16px 20px;
    font-weight: bold;
    color: white;
    background-color: #30a7d7;
    border-radius: 5px;
    border: none;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${shade(0.2, '#30a7d7')};
    }
  }
`;

export const Loader = styled.div`
  margin: 30px auto;
  background: url(${pokeball}) no-repeat;
  background-size: contain;
  background-position: center;
  width: 50px;
  height: 50px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
