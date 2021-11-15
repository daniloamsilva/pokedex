import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import { Routes } from './routes';

import { PokemonProvider } from './hooks/usePokemon';
import { SearchProvider } from './hooks/useSearch';

const App: React.FC = () => (
  <>
    <SearchProvider>
      <PokemonProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PokemonProvider>
    </SearchProvider>

    <GlobalStyle />
  </>
);

export default App;
