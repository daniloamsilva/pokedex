import { Switch, Route } from 'react-router-dom';

import { Dashboard } from '../pages/Dashboard';
import { PokemonDetails } from '../pages/PokemonDetails';

export function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/details/:id" component={PokemonDetails} />
    </Switch>
  );
}
