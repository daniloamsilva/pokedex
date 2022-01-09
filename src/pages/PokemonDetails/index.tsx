import { useCallback, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { usePokemon } from '../../hooks/usePokemon';
import { capitalizeHelper } from '../../helpers/capitalize';

import { Container, Nav, Header, Title, PokemonImage, Main } from './styles';

import { PokemonAbout } from '../../components/PokemonAbout';
import { PokemonStats } from '../../components/PokemonStats';

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
}

interface FlavorTextEntrie {
  flavor_text: string;
  language: {
    name: string;
  };
}

export function PokemonDetails() {
  const { params } = useRouteMatch<PokemonDetailsParams>();
  const { getPokemon, getPokemonSpecie } = usePokemon();

  const [pokemon, setPokemon] = useState<Pokemon | null>();
  const [pokemonSpecie, setPokemonSpecie] = useState<PokemonSpecie | null>();

  const capitalize = useCallback(capitalizeHelper, []);

  const handleGetPokemon = useCallback(async () => {
    const pokemonTarget = await getPokemon(parseInt(params.id));
    setPokemon(pokemonTarget);

    const targetDetails = await getPokemonSpecie(parseInt(params.id));
    setPokemonSpecie(targetDetails);
  }, [params, getPokemon, getPokemonSpecie]);

  useEffect(() => {
    handleGetPokemon();
  }, [handleGetPokemon]);

  return (
    <>
      {!pokemon && <h1>Carregando...</h1>}

      {pokemon && (
        <>
          <Container type={pokemon.types[0].type.name}>
            <Nav className="width_limit">
              <Link id="back_button" to="/">
                <FaArrowLeft id="arrow_left_icon" />
              </Link>
            </Nav>
            <Header className="width_limit">
              <div id="infos">
                <Title>
                  <h1>{capitalize(pokemon.name)}</h1>
                  <span>#{`000${pokemon.id}`.slice(-3)}</span>
                </Title>
                <ul>
                  {pokemon.types.map(type => (
                    <li key={type.slot}>{capitalize(type.type.name)}</li>
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
            <PokemonAbout
              description={
                pokemonSpecie?.flavor_text_entries.find(
                  text => text.language.name === 'en',
                )?.flavor_text
              }
              height={pokemon.height}
              weight={pokemon.weight}
              abilities={pokemon.abilities}
            />
            <PokemonStats
              base_stats={pokemon.stats}
              type={pokemon.types[0].type.name}
            />
          </Main>
        </>
      )}
    </>
  );
}
