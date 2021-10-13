import React, { createContext, useCallback, useContext } from 'react';
import { api } from '../services/api';

// interface PokemonData {
//   id: number;
//   name: string;
// }

interface PokemonContextData {
  getPokemonList(): void;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData,
);

const PokemonProvider: React.FC = ({ children }) => {
  const getPokemonList = useCallback(async () => {
    if (!localStorage.getItem('@daniloamsilva:pokedex')) {
      const { data } = await Promise.resolve(api.get('pokemon?limit=898'));
      const pokemonList = data.results;
      localStorage.setItem(
        '@daniloamsilva:pokedex',
        JSON.stringify(pokemonList),
      );
    }
  }, []);

  return (
    <PokemonContext.Provider value={{ getPokemonList }}>
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
