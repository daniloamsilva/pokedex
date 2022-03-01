import { useCallback, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { usePokemon } from '../../hooks/usePokemon';
import { capitalizeHelper } from '../../helpers/capitalize';

import {
  Container,
  Nav,
  Header,
  Title,
  PokemonImage,
  Main,
  VarietySection,
} from './styles';

import { PokemonAbout } from '../../components/PokemonAbout';
import { PokemonEvoluationChain } from '../../components/PokemonEvolutionChain';
import { PokemonStats } from '../../components/PokemonStats';
import { PokemonType } from '../../components/PokemonType';
import { PokemonVarieties } from '../../components/PokemonVarieties';

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

interface Variety {
  pokemon: {
    name: string;
    url: string;
  };
}

export function PokemonDetails() {
  const { params } = useRouteMatch<PokemonDetailsParams>();
  const { getPokemon, getWeaknessesAndResistances, getEvolutionChain } =
    usePokemon();

  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [pokemonSpecie, setPokemonSpecie] = useState<PokemonSpecie | null>();
  const [pokemonVarieties, setPokemonVarieties] = useState<Variety[]>([]);
  const [pokemonWeaknesses, setPokemonWeaknesses] = useState<Array<string>>();
  const [pokemonResistances, setPokemonResistances] = useState<Array<string>>();
  const [pokemonEvolutionChain, setPokemonEvolutionChain] =
    useState<EvolutionChain | null>();

  const capitalize = useCallback(capitalizeHelper, []);

  const handleGetPokemon = useCallback(async () => {
    const { pokemonTarget, pokemonSpecies } = await getPokemon(params.id);

    setPokemon(pokemonTarget);
    setPokemonSpecie(pokemonSpecies);
    setPokemonVarieties(pokemonSpecies.varieties);

    const evolutionChain = await getEvolutionChain(pokemonSpecies);
    setPokemonEvolutionChain(evolutionChain);
  }, [params, getEvolutionChain, getPokemon]);

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
    window.scrollTo(0, 0);
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
              <Link className="icon_button" to="/">
                <FaArrowLeft id="arrow_left_icon" />
              </Link>
            </Nav>
            <Header className="width_limit">
              {pokemon.id > 1 ? (
                <Link className="icon_button" to={`/details/${pokemon.id - 1}`}>
                  <FaChevronLeft id="chevron_left_icon" />
                </Link>
              ) : (
                <div />
              )}
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
                {pokemon.id > 1 ? (
                  <Link
                    className="icon_button"
                    to={`/details/${pokemon.id - 1}`}
                  >
                    <FaChevronLeft id="chevron_left_icon" />
                  </Link>
                ) : (
                  <div />
                )}
                <img
                  src={pokemon.sprites.other['official-artwork'].front_default}
                  alt="Pokemon art"
                />
                {pokemon.id < 898 ? (
                  <Link
                    className="icon_button"
                    to={`/details/${pokemon.id + 1}`}
                  >
                    <FaChevronRight id="chevron_left_icon" />
                  </Link>
                ) : (
                  <div />
                )}
              </PokemonImage>
              {pokemon.id < 898 ? (
                <Link className="icon_button" to={`/details/${pokemon.id + 1}`}>
                  <FaChevronRight id="chevron_left_icon" />
                </Link>
              ) : (
                <div />
              )}
            </Header>
          </Container>
          <Main>
            {pokemonVarieties.length > 1 && (
              <VarietySection>
                <PokemonVarieties
                  varieties={pokemonVarieties}
                  selected={pokemon.name}
                />
              </VarietySection>
            )}
            <section id="firstLine">
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
            </section>
            <section>
              {pokemonEvolutionChain && (
                <PokemonEvoluationChain
                  evolutionChain={pokemonEvolutionChain}
                />
              )}
            </section>
          </Main>
        </>
      )}
    </>
  );
}
