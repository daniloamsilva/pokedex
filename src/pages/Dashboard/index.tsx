import { useCallback, useEffect, useState, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
  Container,
  Header,
  Title,
  PokemonList,
  MorePokemonArea,
  Loader,
  Form,
  NoMatchingAlert,
} from './styles';

import { PokemonItem } from '../../components/PokemonItem';

import { usePokemon } from '../../hooks/usePokemon';
import { useSearch } from '../../hooks/useSearch';
import { api } from '../../services/api';

interface PokemonName {
  name: string;
}

export function Dashboard() {
  const {
    pokemonList,
    setPokemonList,
    getPokemonInterval,
    getPokemonSearch,
    getContinueSearchList,
  } = usePokemon();
  const { search, setSearch } = useSearch();

  const [loading, setLoading] = useState(!pokemonList.length);
  const [hasMorePokemon, setHasMorePokemon] = useState(true);

  const handleGetMorePokemon = useCallback(async () => {
    setLoading(true);

    if (search === '')
      await getPokemonInterval(pokemonList.length + 1, pokemonList.length + 52);
    else await getContinueSearchList();

    setLoading(false);
  }, [getPokemonInterval, getContinueSearchList, pokemonList, search]);

  const handleSubmitSearch = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setPokemonList([]);
      setLoading(true);

      const { data } = await Promise.resolve(api.get('pokemon?limit=898'));
      const listPokemonNames: PokemonName[] = data.results;

      const matchSearchList = listPokemonNames.filter(pokemon => {
        return pokemon.name.includes(search.toLowerCase());
      });

      await getPokemonSearch(matchSearchList);
      setLoading(false);
    },
    [search, setPokemonList, getPokemonSearch],
  );

  useEffect(() => {
    if (pokemonList.length) setLoading(false);
    setHasMorePokemon(!!pokemonList.length && !(pokemonList.length % 52));
  }, [pokemonList]);

  return (
    <Container>
      <Header>
        <Title>Pokédex</Title>
        <Form onSubmit={handleSubmitSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            <FaSearch
              style={{ marginRight: '5px', transform: 'translateY(2px)' }}
            />
          </button>
        </Form>
      </Header>
      <main>
        <section>
          <PokemonList>
            {pokemonList.map(pokemon => (
              <PokemonItem
                key={pokemon.id}
                pokemon={pokemon}
                sprite={pokemon.sprites.other['official-artwork'].front_default}
              />
            ))}
          </PokemonList>
        </section>

        {loading && <Loader />}

        <section>
          {!loading && hasMorePokemon && (
            <MorePokemonArea>
              <button type="button" onClick={handleGetMorePokemon}>
                Load more Pokémon
              </button>
            </MorePokemonArea>
          )}

          {!loading && !pokemonList.length && (
            <NoMatchingAlert>
              <h3>No Pokémon matches your search!</h3>
            </NoMatchingAlert>
          )}
        </section>
      </main>
    </Container>
  );
}
