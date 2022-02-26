import { useCallback, useEffect, useState } from 'react';

import { capitalizeHelper } from '../../helpers/capitalize';

import { Container, StatBar } from './styles';

interface PokemonStatsProps {
  base_stats: Stat[];
  type: string;
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

export function PokemonStats({ base_stats, type }: PokemonStatsProps) {
  const capitalize = useCallback(capitalizeHelper, []);
  const [stats, setStats] = useState(base_stats);

  useEffect(() => {
    setStats(
      base_stats.map(stat => {
        switch (stat.stat.name) {
          case 'special-attack':
            stat.stat.name = 'Sp. Atk';
            break;
          case 'special-defense':
            stat.stat.name = 'Sp. Def';
            break;
          default:
            break;
        }

        return stat;
      }),
    );
  }, [base_stats]);

  return (
    <Container>
      <h2>Base Stats</h2>
      <table>
        <tbody>
          {stats.map(stat => (
            <tr key={stat.stat.name}>
              <td className="stat_name">{capitalize(stat.stat.name)}</td>
              <td className="stat_value">{stat.base_stat}</td>
              <td className="stat_bar">
                <div className="stat_bar_background">
                  <StatBar
                    percentage={(stat.base_stat / 250) * 100}
                    type={type}
                  >
                    .
                  </StatBar>
                </div>
              </td>
            </tr>
          ))}
          <tr>
            <td className="stat_name">Total</td>
            <td className="stat_value">
              {stats.reduce((previous, stat) => previous + stat.base_stat, 0)}
            </td>
            <td className="stat_bar">
              <div className="stat_bar_background">
                <StatBar
                  percentage={
                    (stats.reduce(
                      (previous, stat) => previous + stat.base_stat,
                      0,
                    ) *
                      100) /
                    1500
                  }
                  type={type}
                >
                  .
                </StatBar>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
