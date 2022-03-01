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
import { removeDuplicates } from '../helpers/removeDuplicates';

interface PokemonContextData {
  pokemonList: Pokemon[];
  setPokemonList: Dispatch<SetStateAction<Pokemon[]>>;
  getPokemon(id: string): Promise<GetPokemonReturn>;
  getEvolutionChain(pokemonDetails: PokemonDetails): Promise<EvolutionChain>;
  getPokemonInterval(startId: number, endId: number): Promise<void>;
  getPokemonSearch(matchSearchPokemon: PokemonName[]): Promise<void>;
  getContinueSearchList(): Promise<void>;
  getWeaknessesAndResistances(types: Type[]): Promise<WeaknessesAndResistances>;
  getPokemonImage(id: string): string;
  getIdVariantDefault(species: PokemonDetails): number;
}

interface Pokemon {
  id: number;
  name: string;
  species: {
    url: string;
  };
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

interface PokemonDetails {
  flavor_text_entries: FlavorTextEntrie[];
  evolution_chain: {
    url: string;
  };
  varieties: Variety[];
}

interface EvolutionChain {
  chain: Chain;
}

interface Chain {
  evolves_to: Array<Chain>;
  species: {
    name: string;
    url: string;
  };
}

interface FlavorTextEntrie {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface WeaknessesAndResistances {
  weaknesses: string[];
  resistances: string[];
}

interface TypeDetailsProps {
  damage_relations: {
    double_damage_from: Array<{
      name: string;
    }>;
    half_damage_from: Array<{
      name: string;
    }>;
    no_damage_from: Array<{
      name: string;
    }>;
  };
}

interface Variety {
  is_default: boolean;
  pokemon: {
    name: string;
    url: string;
  };
}

interface GetPokemonReturn {
  pokemonTarget: Pokemon;
  pokemonSpecies: PokemonDetails;
}

const PokemonContext = createContext<PokemonContextData>(
  {} as PokemonContextData,
);

const PokemonProvider: React.FC = ({ children }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([] as Pokemon[]);
  const { search } = useSearch();

  const getPokemon = useCallback(async (id: string) => {
    const { data: pokemonData } = await Promise.resolve(
      api.get(`pokemon/${id}`),
    );

    const { data: speciesData } = await Promise.resolve(
      api.get(pokemonData.species.url.substring(26)),
    );

    return { pokemonTarget: pokemonData, pokemonSpecies: speciesData };
  }, []);

  const getEvolutionChain = useCallback(
    async (pokemonDetails: PokemonDetails) => {
      const chainId = pokemonDetails.evolution_chain.url.slice(42, -1);
      const { data } = await Promise.resolve(
        api.get(`evolution-chain/${chainId}`),
      );

      return data;
    },
    [],
  );

  const getPokemonInterval = useCallback(
    async (startId: number, endId: number) => {
      for (let index = startId; index <= endId; index++) {
        const newPokemon = await getPokemon(index.toString());
        setPokemonList(oldPokemonList => [
          ...oldPokemonList,
          newPokemon.pokemonTarget,
        ]);
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

  const getWeaknessesAndResistances = useCallback(
    async (types: Type[]): Promise<WeaknessesAndResistances> => {
      const allWeaknesses: Array<string> = [];
      const allResistances: Array<string> = [];
      const allNoDamages: Array<string> = [];

      for (let index = 0; index < types.length; index++) {
        const { data } = await Promise.resolve(
          api.get(`type/${types[index].type.name}`),
        );

        const typeDetails = data as TypeDetailsProps;

        allWeaknesses.push(
          ...typeDetails.damage_relations.double_damage_from.map(
            doubleDamageType => doubleDamageType.name,
          ),
        );

        allResistances.push(
          ...typeDetails.damage_relations.half_damage_from.map(
            halfDamageType => halfDamageType.name,
          ),
        );

        allNoDamages.push(
          ...typeDetails.damage_relations.no_damage_from.map(
            noDamageType => noDamageType.name,
          ),
        );
      }

      const weaknesses = removeDuplicates(
        allWeaknesses
          .filter(weakness => !allResistances.includes(weakness))
          .filter(weakness => !allNoDamages.includes(weakness)),
      ).sort();

      const resistances = removeDuplicates(
        allResistances.filter(
          resistance => !allWeaknesses.includes(resistance),
        ),
      ).sort();

      return { weaknesses, resistances };
    },
    [],
  );

  const getPokemonImage = useCallback((id: string) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }, []);

  const getIdVariantDefault = useCallback((species: PokemonDetails) => {
    const variantDefault = species.varieties.find(
      variety => variety.is_default,
    );

    return variantDefault
      ? parseInt(
          variantDefault?.pokemon.url.substring(
            34,
            variantDefault?.pokemon.url.length - 1,
          ),
        )
      : 0;
  }, []);

  useEffect(() => {
    getInitialPokemonList();
  }, [getInitialPokemonList]);

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        getPokemon,
        getEvolutionChain,
        getPokemonInterval,
        getPokemonSearch,
        getContinueSearchList,
        getWeaknessesAndResistances,
        getPokemonImage,
        getIdVariantDefault,
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
