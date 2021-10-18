/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { useCallback } from 'react';

import { Container, Index, Header, Section } from './styles';

interface PokemonItemProps {
  pokemon: Pokemon;
  sprite: string;
}

interface Pokemon {
  order: number;
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

export function PokemonItem({ pokemon, sprite }: PokemonItemProps) {
  const capitalize = useCallback((name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }, []);

  return (
    <Container className={`${pokemon.types[0].type.name}-type`}>
      <Header>
        <h3>{capitalize(pokemon.name)}</h3>
        <Index>#{`000${pokemon.order}`.slice(-3)}</Index>
      </Header>
      <Section sprite={sprite}>
        <ul>
          {pokemon.types.map(type => (
            <li key={type.slot}>{capitalize(type.type.name)}</li>
          ))}
        </ul>
        <div />
      </Section>
    </Container>
  );
}
