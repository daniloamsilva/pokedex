import { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { api } from '../../services/api';

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

      {pokemon && <h1>Pokemon: {pokemon.name}</h1>}
    </>
  );
}
