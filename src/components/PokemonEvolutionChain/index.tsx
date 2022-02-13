import { ReactElement, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

import { capitalizeHelper } from '../../helpers/capitalize';
import { Container, EvoluationsWrap, Stage, Evolution, Name } from './styles';

import { usePokemon } from '../../hooks/usePokemon';

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
  const { getPokemonImage } = usePokemon();

  const handleEvolves = useCallback(
    (chains: Array<Chain>): ReactElement => {
      if (chains.length) {
        return (
          <>
            <Stage className={`evolves${chains.length}`}>
              {chains.map(evolve => (
                <Link to={`/details/${evolve.species.url.slice(42, -1)}`}>
                  <Evolution>
                    <img
                      src={getPokemonImage(evolve.species.url.slice(42, -1))}
                      alt={evolve.species.name}
                    />
                    <Name>
                      <h3>{capitalizeHelper(evolve.species.name)}</h3>
                      <span>
                        #{`000${evolve.species.url.slice(42, -1)}`.slice(-3)}
                      </span>
                    </Name>
                  </Evolution>
                </Link>
              ))}
            </Stage>
            {!!chains[0].evolves_to.length && (
              <FaChevronRight className="arrow_right_icon" />
            )}
            {chains.map(evolve => handleEvolves(evolve.evolves_to))}
          </>
        );
      }
      return <></>;
    },
    [getPokemonImage],
  );

  const handleFirstStage = useCallback(
    (chain: Chain) => {
      return (
        <Container>
          <h2>Evolution</h2>
          <EvoluationsWrap>
            <Stage id="firstStage">
              <Link to={`/details/${chain.species.url.slice(42, -1)}`}>
                <Evolution>
                  <img
                    src={getPokemonImage(chain.species.url.slice(42, -1))}
                    alt={chain.species.name}
                  />
                  <Name>
                    <h3>{capitalizeHelper(chain.species.name)}</h3>
                    <span>
                      #{`000${chain.species.url.slice(42, -1)}`.slice(-3)}
                    </span>
                  </Name>
                </Evolution>
              </Link>
            </Stage>
            {!!chain.evolves_to.length && (
              <FaChevronRight className="arrow_right_icon" />
            )}
            {handleEvolves(chain.evolves_to)}
          </EvoluationsWrap>
        </Container>
      );
    },
    [handleEvolves, getPokemonImage],
  );

  return handleFirstStage(evolutionChain.chain);
}
