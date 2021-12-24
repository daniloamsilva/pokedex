import { useCallback } from 'react';

import { Container } from './styles';

import { capitalizeHelper } from '../../helpers/capitalize';

interface PokemonAboutProps {
  description: string | undefined;
  height: number;
  weight: number;
  abilities: Ability[];
}

interface Ability {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export function PokemonAbout({
  description,
  height,
  weight,
  abilities,
}: PokemonAboutProps) {
  const capitalize = useCallback(capitalizeHelper, []);

  return (
    <Container>
      <h2>About</h2>
      <table>
        <tbody>
          <tr>
            <td className="feature_name">Description</td>
            <td className="feature_value">
              {description?.replace(/(\r\n|\n|\r|\f)/gm, ' ')}
            </td>
          </tr>
          <tr>
            <td className="feature_name">Height</td>
            <td className="feature_value">
              {height / 10} m ({((height * 39.37) / 10).toFixed(1)} in)
            </td>
          </tr>
          <tr>
            <td className="feature_name">Weight</td>
            <td className="feature_value">
              {weight / 10} kg ({((weight * 2.2046) / 10).toFixed(1)} lbs)
            </td>
          </tr>
          <tr>
            <td className="feature_name">Abilities</td>
            <td className="feature_value">
              {abilities
                .filter(ability => !ability.is_hidden)
                .map(ability =>
                  capitalize(ability.ability.name).replace('-', ' '),
                )
                .join(', ')}
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
