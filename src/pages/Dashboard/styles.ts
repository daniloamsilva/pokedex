import styled from 'styled-components';
import { shade } from 'polished';

import pokeball from '../../assets/pokeball.png';

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 30px;

  @media (max-width: 700px) {
    display: block;
    margin: 0 15px 30px 15px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #000000;

  @media (max-width: 700px) {
    font-size: 40px;
    text-align: center;
    margin-bottom: 10px;
  }
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

export const Form = styled.form`
  input {
    padding: 10px 20px;
    font-size: 17px;
    border: 1px solid white;
    border-right: none;
    float: left;
    width: 80%;
    background: #f1f1f1;
    border-radius: 20px 0 0 20px;
  }

  button {
    float: left;
    width: 20%;
    padding: 10px;
    color: white;
    font-size: 17px;
    border: 1px solid white;
    border-left: none;
    border-radius: 0 20px 20px 0;
    background-color: #30a7d7;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: ${shade(0.2, '#30a7d7')};
  }

  &::after {
    content: '';
    clear: both;
    display: table;
  }
`;

export const NoMatchingAlert = styled.form`
  width: 100%;
  border: 2px solid red;
  border-radius: 20px;
  padding: 10px;

  h3 {
    color: red;
    font-weight: normal;
    text-align: center;
  }
`;
