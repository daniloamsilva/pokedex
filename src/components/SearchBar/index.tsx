import { useCallback, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Form } from './styles';

import { api } from '../../services/api';
import { usePokemon } from '../../hooks/usePokemon';
import { useSearch } from '../../hooks/useSearch';

interface PokemonName {
  name: string;
}

/**
 * [x] Guarda informação do input utilizando o onChange
 * [x] Pega o evento de submit
 * [x] Limpa a lista de Pokémon para disparar o loader
 * [x] Faz a busca pelos primeiros 52 matchs na lista geral
 * [x] Faz busca na API dos que ainda não tem informações completas
 * [x] Adiciona na listagem
 *
 * Atenção:
 * [ ] Se a busca não trazer resultados
 * [ ] Tamanho dos cards com menos de 4 Pokémon
 * [ ] Botão de carregar mais Pokémon continuar a lista do filtro
 * [ ] Botão de carregar mais Pokémon sem remanescentes
 * [x] Botão de carregar mais Pokémon não aparecer com lista pequena
 */

export function SearchBar() {
  const { setPokemonList, getPokemonSearch } = usePokemon();
  const { search, setSearch } = useSearch();

  const handleSubmitSearch = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setPokemonList([]);

      const { data } = await Promise.resolve(api.get('pokemon?limit=898'));
      const listPokemonNames: PokemonName[] = data.results;

      const matchSearchList = listPokemonNames.filter(pokemon => {
        return pokemon.name.includes(search.toLowerCase());
      });

      getPokemonSearch(matchSearchList);
    },
    [search, setPokemonList, getPokemonSearch],
  );

  return (
    <Form onSubmit={handleSubmitSearch}>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <button type="submit">
        <FaSearch
          style={{ marginRight: '5px', transform: 'translateY(2px)' }}
        />
      </button>
    </Form>
  );
}
