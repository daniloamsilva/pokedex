import React from 'react';

import { Container, Index, Header, Section } from './styles';

const PokemonItem: React.FC = () => {
  return (
    <Container>
      <Index>#001</Index>
      <Header>
        <h3>Bulbasaur</h3>
      </Header>
      <Section>
        <ul>
          <li>Grass</li>
          <li>Poison</li>
        </ul>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
          alt="Bulbasaur"
        />
      </Section>
    </Container>
  );
};

export default PokemonItem;
