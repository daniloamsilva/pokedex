import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

import { api } from '../../services/api';

import { Container, Header } from './styles';

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
          <Header>
            <nav>
              <Link id="back_button" to="/">
                <FaArrowLeft id="arrow_left_icon" />
              </Link>
            </nav>
          </Header>
        </Container>
      )}
    </>
  );
}
