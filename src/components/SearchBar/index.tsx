import React, { useCallback, FormEvent } from 'react';
import { FaSearch } from 'react-icons/fa';

import { Form } from './styles';

export function SearchBar() {
  const handleSubmitSearch = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log('Pesquisa enviada...');
    },
    [],
  );

  return (
    <Form onSubmit={handleSubmitSearch}>
      <input type="text" placeholder="Pesquisar..." name="search" />
      <button type="submit">
        <FaSearch
          style={{ marginRight: '5px', transform: 'translateY(2px)' }}
        />
      </button>
    </Form>
  );
}
