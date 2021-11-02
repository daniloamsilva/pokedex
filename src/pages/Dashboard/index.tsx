import React, { useCallback, useEffect, useState } from 'react';

import { Header, Title, PokemonList, MorePokemonArea, Loader } from './styles';

import { PokemonItem } from '../../components/PokemonItem';
import { usePokemon } from '../../hooks/usePokemon';

export function Dashboard() {
  const { getPokemonList, getPokemonInterval } = usePokemon();

  const [pokemonList, setPokemonList] = useState(getPokemonList());
  const [loading, setLoading] = useState(false);

  const getInitialPokemonList = useCallback(async () => {
    const newPokemonList = await getPokemonInterval(1, 52);
    setPokemonList(oldPokemonList => [...oldPokemonList, ...newPokemonList]);
  }, [getPokemonInterval, setPokemonList]);

  const handleGetMorePokemon = useCallback(async () => {
    setLoading(true);

    const newPokemonList = await getPokemonInterval(
      pokemonList.length + 1,
      pokemonList.length + 20,
    );

    setPokemonList(oldPokemonList => [...oldPokemonList, ...newPokemonList]);

    setLoading(false);
  }, [getPokemonInterval, pokemonList, setPokemonList]);

  useEffect(() => {
    getInitialPokemonList();
  }, [getInitialPokemonList]);

  return (
    <>
      <Header>
        <Title>Pokédex</Title>
      </Header>
      <main>
        {!pokemonList.length && <Loader />}

        {!!pokemonList.length && (
          <section>
            <PokemonList>
              {pokemonList.map(pokemon => (
                <PokemonItem
                  key={pokemon.id}
                  pokemon={pokemon}
                  sprite={
                    pokemon.sprites.other['official-artwork'].front_default
                  }
                />
              ))}
            </PokemonList>

            {loading ? (
              <Loader />
            ) : (
              <MorePokemonArea>
                <button type="button" onClick={handleGetMorePokemon}>
                  Carregar mais Pokémon
                </button>
              </MorePokemonArea>
            )}
          </section>
        )}
      </main>
    </>
  );
}
