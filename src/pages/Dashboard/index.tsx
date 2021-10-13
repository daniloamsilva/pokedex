import React, { useEffect } from 'react';

import { Header, Title, PokemonList } from './styles';

import PokemonItem from '../../components/PokemonItem';

import { usePokemon } from '../../hooks/usePokemon';

const Dashboard: React.FC = () => {
  const { getPokemonList } = usePokemon();

  useEffect(() => {
    getPokemonList();
  }, [getPokemonList]);

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
        </PokemonList>
      </section>
    </>
  );
};

export default Dashboard;
