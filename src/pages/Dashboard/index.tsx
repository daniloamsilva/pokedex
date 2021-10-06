import React from 'react';

import { Header, Title, PokemonList } from './styles';

import PokemonItem from '../../components/PokemonItem';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header>
        <Title>Pokedex</Title>
      </Header>
      <section>
        <PokemonList>
          <PokemonItem />
          <PokemonItem />
          <PokemonItem />
          <PokemonItem />
          <PokemonItem />
          <PokemonItem />
        </PokemonList>
      </section>
    </>
  );
};

export default Dashboard;
