import { useCallback, useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { api } from '../../services/api';

import { Container, Nav, Header, Title, PokemonImage } from './styles';

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
  types: PokemonType[];
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
  };
}

export function PokemonDetails() {
  const { params } = useRouteMatch<PokemonDetailsParams>();
  const [pokemon, setPokemon] = useState<null | Pokemon>();

  const capitalize = useCallback((name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  useEffect(() => {
    api.get(`pokemon/${params.id}`).then(response => {
      setPokemon(response.data);
    });
  }, [params]);

  return (
    <>
      {!pokemon && <h1>Carregando...</h1>}

      {pokemon && (
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
      )}
    </>
  );
}
