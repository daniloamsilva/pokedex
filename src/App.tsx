import React from 'react';

import { Dashboard } from './pages/Dashboard';
import GlobalStyle from './styles/global';

import { PokemonProvider } from './hooks/usePokemon';
import { SearchProvider } from './hooks/useSearch';

const App: React.FC = () => (
  <>
    <SearchProvider>
      <PokemonProvider>
        <Dashboard />
      </PokemonProvider>
    </SearchProvider>

    <GlobalStyle />
  </>
);

export default App;
