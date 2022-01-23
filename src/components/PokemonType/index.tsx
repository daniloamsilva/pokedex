import { useCallback } from 'react';

import { capitalizeHelper } from '../../helpers/capitalize';

import { Type } from './styles';

interface PokemonTypeProps {
  type: string;
}

export function PokemonType({ type }: PokemonTypeProps) {
  const capitalize = useCallback(capitalizeHelper, []);

  return <Type type={type}>{capitalize(type)}</Type>;
}
