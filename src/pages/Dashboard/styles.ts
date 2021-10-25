import styled from 'styled-components';

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
`;

export const MorePokemonArea = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
`;
