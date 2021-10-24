import React, { useCallback, useEffect, useState } from 'react';

import { Header, Title, PokemonList } from './styles';

import { PokemonItem } from '../../components/PokemonItem';
import { api } from '../../services/api';

interface Pokemon {
  order: number;
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
  const [pokedex, setPokedex] = useState<Pokemon[]>([] as Pokemon[]);

  const getPokemonList = useCallback(async (startId: number, endId: number) => {
    for (let index = startId; index <= endId; index++) {
      const pokemonSearch = localStorage.getItem(
        `@daniloamsilva:pokemon:${index}`,
      );

      if (pokemonSearch)
        setPokedex(oldPokedex => [...oldPokedex, JSON.parse(pokemonSearch)]);
      else {
        const { data } = await Promise.resolve(api.get(`pokemon/${index}`));

        localStorage.setItem(
          `@daniloamsilva:pokemon:${index}`,
          JSON.stringify(data),
        );

        setPokedex(oldPokedex => [...oldPokedex, data]);
      }
    }
  }, []);

  useEffect(() => {
    getPokemonList(1, 20);
  }, [getPokemonList]);

  return (
    <>
      <Header>
        <Title>Pokedex</Title>
      </Header>
      <section>
        <PokemonList>
          {pokedex.map(pokemon => (
            <PokemonItem
              key={pokemon.order}
              pokemon={pokemon}
              sprite={pokemon.sprites.other['official-artwork'].front_default}
            />
          ))}
        </PokemonList>
      </section>
    </>
  );
}
