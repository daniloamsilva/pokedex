import { useCallback, useEffect, useState } from 'react';

import { Header, Title, PokemonList, MorePokemonArea, Loader } from './styles';

import { PokemonItem } from '../../components/PokemonItem';
import { SearchBar } from '../../components/SearchBar';

import { usePokemon } from '../../hooks/usePokemon';

export function Dashboard() {
  const { pokemonList, getPokemonInterval } = usePokemon();

  const [loading, setLoading] = useState(false);

  const handleGetMorePokemon = useCallback(async () => {
    setLoading(true);
    await getPokemonInterval(pokemonList.length + 1, pokemonList.length + 20);
    setLoading(false);
  }, [getPokemonInterval, pokemonList]);

  useEffect(() => {
    getPokemonInterval(1, 52);
  }, [getPokemonInterval]);

  return (
    <>
      <Header>
        <Title>Pokédex</Title>
        <SearchBar />
      </Header>
      <main>
        {!pokemonList.length && <Loader />}

        {!!pokemonList.length && (
          <section>
            <PokemonList>
              {pokemonList.map(pokemon => (
                <PokemonItem
                  key={pokemon.id}
                  pokemon={pokemon}
                  sprite={
                    pokemon.sprites.other['official-artwork'].front_default
                  }
                />
              ))}
            </PokemonList>

            {loading ? (
              <Loader />
            ) : (
              pokemonList.length >= 52 && (
                <MorePokemonArea>
                  <button type="button" onClick={handleGetMorePokemon}>
                    Carregar mais Pokémon
                  </button>
                </MorePokemonArea>
              )
            )}
          </section>
        )}
      </main>
    </>
  );
}
