import { useCallback, useEffect, useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { usePokemon } from '../../hooks/usePokemon';
import { capitalizeHelper } from '../../helpers/capitalize';

import { Container, Nav, Header, Title, PokemonImage, Main } from './styles';

import { PokemonAbout } from '../../components/PokemonAbout';
import { PokemonEvoluationChain } from '../../components/PokemonEvolutionChain';
import { PokemonStats } from '../../components/PokemonStats';
import { PokemonType } from '../../components/PokemonType';

interface PokemonDetailsParams {
  id: string;
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

interface PokemonSpecie {
  flavor_text_entries: FlavorTextEntrie[];
  evolution_chain: {
    url: string;
  };
}

interface EvolutionChain {
  chain: Chain;
}

interface Chain {
  evolves_to: Array<Chain>;
  species: {
    name: string;
  };
}

interface FlavorTextEntrie {
  flavor_text: string;
  language: {
    name: string;
  };
}

export function PokemonDetails() {
  const history = useHistory();
  const { params } = useRouteMatch<PokemonDetailsParams>();
  const {
    getPokemon,
    getPokemonSpecie,
    getWeaknessesAndResistances,
    getEvolutionChain,
  } = usePokemon();

  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [pokemonSpecie, setPokemonSpecie] = useState<PokemonSpecie | null>();
  const [pokemonWeaknesses, setPokemonWeaknesses] = useState<Array<string>>();
  const [pokemonResistances, setPokemonResistances] = useState<Array<string>>();
  const [pokemonEvolutionChain, setPokemonEvolutionChain] =
    useState<EvolutionChain | null>();

  const capitalize = useCallback(capitalizeHelper, []);

  const handleGetPokemon = useCallback(async () => {
    const pokemonTarget = await getPokemon(parseInt(params.id));
    setPokemon(pokemonTarget);

    const targetDetails = await getPokemonSpecie(parseInt(params.id));
    setPokemonSpecie(targetDetails);

    const evolutionChain = await getEvolutionChain(targetDetails);
    setPokemonEvolutionChain(evolutionChain);
  }, [params, getPokemon, getPokemonSpecie, getEvolutionChain]);

  const handleGetPokemonWeaknessesAndResistances = useCallback(async () => {
    if (pokemon) {
      const pokemonWeaknessesAndResistances = await getWeaknessesAndResistances(
        pokemon.types,
      );

      setPokemonWeaknesses(pokemonWeaknessesAndResistances.weaknesses);
      setPokemonResistances(pokemonWeaknessesAndResistances.resistances);
    }
  }, [pokemon, getWeaknessesAndResistances]);

  useEffect(() => {
    handleGetPokemon();
  }, [handleGetPokemon]);

  useEffect(() => {
    handleGetPokemonWeaknessesAndResistances();
  }, [pokemon, handleGetPokemonWeaknessesAndResistances]);

  return (
    <>
      {!pokemon && <h1>Carregando...</h1>}

      {pokemon && (
        <>
          <Container type={pokemon.types[0].type.name}>
            <Nav className="width_limit">
              <button type="button" id="back_button" onClick={history.goBack}>
                <FaArrowLeft id="arrow_left_icon" />
              </button>
            </Nav>
            <Header className="width_limit">
              <div id="infos">
                <Title>
                  <h1>{capitalize(pokemon.name)}</h1>
                  <span>#{`000${pokemon.id}`.slice(-3)}</span>
                </Title>
                <ul>
                  {pokemon.types.map(type => (
                    <PokemonType key={type.slot} type={type.type.name} />
                  ))}
                </ul>
              </div>
              <PokemonImage>
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt="Pokemon art"
                />
              </PokemonImage>
            </Header>
          </Container>
          <Main>
            <div id="firstLine">
              <PokemonAbout
                description={
                  pokemonSpecie?.flavor_text_entries.find(
                    text => text.language.name === 'en',
                  )?.flavor_text
                }
                height={pokemon.height}
                weight={pokemon.weight}
                abilities={pokemon.abilities}
                weaknesses={pokemonWeaknesses}
                resistances={pokemonResistances}
              />
              <PokemonStats
                base_stats={pokemon.stats}
                type={pokemon.types[0].type.name}
              />
            </div>
            <div>
              {pokemonEvolutionChain && (
                <PokemonEvoluationChain
                  evolutionChain={pokemonEvolutionChain}
                />
              )}
            </div>
          </Main>
        </>
      )}
    </>
  );
}
