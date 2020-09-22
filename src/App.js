import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RestaurantSearchPage from './pages/RestaurantSearchPage/index';

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/search' component={RestaurantSearchPage} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
