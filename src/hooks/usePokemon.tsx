import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { api } from '../services/api';
import { useSearch } from './useSearch';

interface PokemonContextData {
  pokemonList: Pokemon[];
  setPokemonList: Dispatch<SetStateAction<Pokemon[]>>;
  getPokemon(id: number): Promise<Pokemon>;
  getPokemonInterval(startId: number, endId: number): Promise<void>;
  getPokemonSearch(matchSearchPokemon: PokemonName[]): Promise<void>;
  getContinueSearchList(): Promise<void>;
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
  stats: Stat[];
  types: Type[];
  abilities: Ability[];
  height: number;
  weight: number;
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

interface Type {
  slot: number;
  type: {
    name: string;
  };
}

interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

interface PokemonName {
  name: string;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData,
);

const PokemonProvider: React.FC = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([] as Pokemon[]);
  const { search } = useSearch();

  const getPokemon = useCallback(async (id: number) => {
    const { data } = await Promise.resolve(api.get(`pokemon/${id}`));
    return data;
  }, []);

  const getPokemonInterval = useCallback(
    async (startId: number, endId: number) => {
      for (let index = startId; index <= endId; index++) {
        const newPokemon = await getPokemon(index);
        setPokemonList(oldPokemonList => [...oldPokemonList, newPokemon]);
      }
    },
    [getPokemon],
  );

  const getPokemonSearch = useCallback(
    async (matchSearchPokemon: PokemonName[]) => {
      const matchPokemonInfos: Pokemon[] = [];

      for (
        let index = 0;
        index < matchSearchPokemon.length && index <= 51;
        index++
      ) {
        const { data } = await Promise.resolve(
          api.get(`pokemon/${matchSearchPokemon[index].name}`),
        );
        matchPokemonInfos.push(data);
      }

      setPokemonList(matchPokemonInfos);
    },
    [],
  );

  const getContinueSearchList = useCallback(async (): Promise<void> => {
    const matchPokemonInfos: Pokemon[] = [];

    const { data } = await Promise.resolve(api.get('pokemon?limit=898'));
    const listPokemonNames: PokemonName[] = data.results;

    const matchSearchList = listPokemonNames.filter(pokemon => {
      return pokemon.name.includes(search.toLowerCase());
    });

    for (
      let index = pokemonList.length;
      index < matchSearchList.length && matchPokemonInfos.length <= 51;
      index++
    ) {
      const result = await Promise.resolve(
        api.get(`pokemon/${matchSearchList[index].name}`),
      );
      matchPokemonInfos.push(result.data);
    }

    setPokemonList(oldPokemonList => [...oldPokemonList, ...matchPokemonInfos]);
  }, [search, pokemonList]);

  const getInitialPokemonList = useCallback(async () => {
    await getPokemonInterval(1, 52);
  }, [getPokemonInterval]);

  useEffect(() => {
    getInitialPokemonList();
  }, [getInitialPokemonList]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        getPokemon,
        getPokemonInterval,
        getPokemonSearch,
        getContinueSearchList,
      }}
    >
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
