import { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { capitalizeHelper } from '../../helpers/capitalize';
import { PokemonType } from '../PokemonType';

import { Container, Index, Header, Section } from './styles';

interface PokemonItemProps {
  pokemon: Pokemon;
  sprite: string;
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
  types: Type[];
}

interface Type {
  slot: number;
  type: {
    name: string;
  };
}

export function PokemonItem({ pokemon, sprite }: PokemonItemProps) {
  const capitalize = useCallback(capitalizeHelper, []);

  return (
    <Link to={`/details/${pokemon.id}`} style={{ textDecoration: 'none' }}>
      <Container type={`${pokemon.types[0].type.name}`}>
        <Header nameLength={pokemon.name.length}>
          <h3>{capitalize(pokemon.name)}</h3>
          <Index>#{`000${pokemon.id}`.slice(-3)}</Index>
        </Header>
        <Section sprite={sprite}>
          <ul>
            {pokemon.types.map(type => (
              <PokemonType key={type.slot} type={type.type.name} />
            ))}
          </ul>
          <div id="pokemon_image" />
        </Section>
      </Container>
    </Link>
  );
}
