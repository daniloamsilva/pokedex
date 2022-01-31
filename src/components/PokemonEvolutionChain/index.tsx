import { ReactElement, useCallback } from 'react';

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
  };
}

export function PokemonEvoluationChain({
  evolutionChain,
}: EvolutionChainProps) {
  const handleEvolves = useCallback((chains: Array<Chain>): ReactElement => {
    if (chains.length) {
      return (
        <>
          <div>
            {chains.map(evolve => (
              <p>{evolve.species.name}</p>
            ))}
          </div>
          {chains.map(evolve => handleEvolves(evolve.evolves_to))}
        </>
      );
    }
    return <></>;
  }, []);

  const handleFirstStage = useCallback(
    (chain: Chain) => {
      return (
        <>
          <div>
            <p>{chain.species.name}</p>
          </div>
          {handleEvolves(chain.evolves_to)}
        </>
      );
    },
    [handleEvolves],
  );

  return handleFirstStage(evolutionChain.chain);
}
