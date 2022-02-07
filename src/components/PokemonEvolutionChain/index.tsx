import { ReactElement, useCallback } from 'react';
import { FaChevronRight } from 'react-icons/fa';

import { capitalizeHelper } from '../../helpers/capitalize';
import { Container, EvoluationsWrap, Stage, Evolution } from './styles';

interface EvolutionChainProps {
  evolutionChain: EvolutionChain;
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

export function PokemonEvoluationChain({
  evolutionChain,
}: EvolutionChainProps) {
  const handleEvolves = useCallback((chains: Array<Chain>): ReactElement => {
    if (chains.length) {
      return (
        <>
          <Stage className={`evolves${chains.length}`}>
            {chains.map(evolve => (
              <Evolution>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evolve.species.url.slice(
                    42,
                    -1,
                  )}.png`}
                  alt={evolve.species.name}
                />
                <p>{capitalizeHelper(evolve.species.name)}</p>
              </Evolution>
            ))}
          </Stage>
          {!!chains[0].evolves_to.length && (
            <FaChevronRight className="arrow_left_icon" />
          )}
          {chains.map(evolve => handleEvolves(evolve.evolves_to))}
        </>
      );
    }
    return <></>;
  }, []);

  const handleFirstStage = useCallback(
    (chain: Chain) => {
      return (
        <Container>
          <h2>Evolution</h2>
          <EvoluationsWrap>
            <Stage id="firstStage">
              <Evolution>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${chain.species.url.slice(
                    42,
                    -1,
                  )}.png`}
                  alt={chain.species.name}
                />
                <p>{capitalizeHelper(chain.species.name)}</p>
              </Evolution>
            </Stage>
            {!!chain.evolves_to.length && (
              <FaChevronRight className="arrow_left_icon" />
            )}
            {handleEvolves(chain.evolves_to)}
          </EvoluationsWrap>
        </Container>
      );
    },
    [handleEvolves],
  );

  return handleFirstStage(evolutionChain.chain);
}
