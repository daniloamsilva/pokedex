import React from 'react';

import { Dashboard } from './pages/Dashboard';
import GlobalStyle from './styles/global';

import { PokemonProvider } from './hooks/usePokemon';

const App: React.FC = () => (
  <>
    <PokemonProvider>
      <Dashboard />
    </PokemonProvider>

    <GlobalStyle />
  </>
);

export default App;
