import React from 'react';

import { Container, Index, Header, Section } from './styles';

const PokemonItem: React.FC = () => {
  return (
    <Container>
      <Header>
        <h3>Bulbasaur</h3>
        <Index>#001</Index>
      </Header>
      <Section>
        <ul>
          <li>Grass</li>
          <li>Poison</li>
        </ul>
        <div />
      </Section>
    </Container>
  );
};

export default PokemonItem;
