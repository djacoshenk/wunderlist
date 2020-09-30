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
          <Route exact path='/' component={HomePage} />
          <Route
            path='/search/:term/:location'
            component={RestaurantSearchPage}
          />
          <Route path='/business/:alias' component={RestaurantProfilePage} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
