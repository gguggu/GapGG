import React from 'react';
import * as Pages from '../pages';
import { Switch, Route, Redirect } from 'react-router-dom';

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
        path='/compare/:summoner'
        render={() => <Pages.ComparePage/>}
      />
      <Route
        path='/search/:summoner'
        render={() => <Pages.SearchPage/>}
      />
      <Route
        path='/notfound'
        render={() => <Pages.NotFoundPage/>}
      />
      <Redirect to='/notfound'/>
    </Switch>
  );
};

export default App;