import React, { createContext, useCallback, useContext, useState } from 'react';
import { api } from '../services/api';

interface PokemonContextData {
  getPokemonList(): Pokemon[];
  getPokemonInterval(startId: number, endId: number): Promise<Pokemon[]>;
}

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

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData,
);

const PokemonProvider: React.FC = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([] as Pokemon[]);

  const getPokemonList = useCallback(() => {
    return pokemonList;
  }, [pokemonList]);

  const getPokemonInterval = useCallback(
    async (startId: number, endId: number) => {
      const newPokemons: Pokemon[] = [];

      for (let index = startId; index <= endId; index++) {
        const { data } = await Promise.resolve(api.get(`pokemon/${index}`));
        newPokemons.push(data);
      }

      setPokemonList(oldPokemonList => [...oldPokemonList, ...newPokemons]);

      return newPokemons;
    },
    [],
  );

  return (
    <PokemonContext.Provider value={{ getPokemonList, getPokemonInterval }}>
      {children}
    </PokemonContext.Provider>
  );
};

function usePokemon(): PokemonContextData {
  const context = useContext(PokemonContext);

  if (!context) {
    throw new Error('usePokemon must be used within a PokemonProvider');
  }

  return context;
}

export { PokemonProvider, usePokemon };
