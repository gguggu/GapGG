import React from 'react';
import * as Pages from '../pages';
import { Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={() => <Pages.HomePage/>}
      />
      <Route
        exact
        path='/compare'
        render={() => <Pages.ComparePage/>}
      />
      <Route
        path='/search/:summoner'
        render={() => <Pages.SearchPage/>}
      />
    </Switch>
  );
};

export default App;