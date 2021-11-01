import React, { useCallback, useEffect, useState } from 'react';

import { Header, Title, PokemonList, MorePokemonArea, Loader } from './styles';

import { PokemonItem } from '../../components/PokemonItem';
import { api } from '../../services/api';

interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export function Dashboard() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([] as Pokemon[]);
  const [loading, setLoading] = useState(false);

  const getPokemonInterval = useCallback(
    async (startId: number, endId: number) => {
      const newPokemons: Pokemon[] = [];

      for (let index = startId; index <= endId; index++) {
        const { data } = await Promise.resolve(api.get(`pokemon/${index}`));
        newPokemons.push(data);
      }

      setPokemonList(oldPokemonList => [...oldPokemonList, ...newPokemons]);
      setLoading(false);
    },
    [],
  );

  const handleGetMorePokemon = useCallback(() => {
    setLoading(true);
    getPokemonInterval(pokemonList.length + 1, pokemonList.length + 20);
  }, [getPokemonInterval, pokemonList]);

  useEffect(() => {
    getPokemonInterval(1, 52);
  }, [getPokemonInterval]);

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
