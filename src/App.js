import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage/index';
import RestaurantSearchPage from './pages/RestaurantSearchPage/index';
import RestaurantProfilePage from './pages/RestaurantProfilePage/index';

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/search'>
            <RestaurantSearchPage />
          </Route>
          <Route path='/search/:slug'>
            <RestaurantProfilePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
