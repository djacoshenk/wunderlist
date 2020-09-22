import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import RestaurantProfilePage from './pages/RestaurantProfilePage/index';

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path='/search' component={RestaurantProfilePage} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
