import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import UserLoginPage from './pages/UserLoginPage/UserLoginPage';
import UserRegisterPage from './pages/UserRegisterPage/UserRegisterPage';
import RestaurantSearchPage from './pages/RestaurantSearchPage/RestaurantSearchPage';
import RestaurantProfilePage from './pages/RestaurantProfilePage/RestaurantProfilePage';

import { RestaurantSearchProvider } from './pages/RestaurantSearchPage/_Context/RestaurantSearchContext';
import { RestaurantProfileProvider } from './pages/RestaurantProfilePage/_Context/RestaurantProfileContext';
import { RestaurantSearchBarProvider } from './shared/RestaurantSearchBar/RestaurantSearchBarContext';

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path='/'>
            <RestaurantSearchBarProvider>
              <HomePage />
            </RestaurantSearchBarProvider>
          </Route>
          <Route exact path='/login'>
            <UserLoginPage />
          </Route>
          <Route exact path='/register'>
            <UserRegisterPage />
          </Route>
          <Route path='/search/:term/:location'>
            <RestaurantSearchProvider>
              <RestaurantSearchBarProvider>
                <RestaurantSearchPage />
              </RestaurantSearchBarProvider>
            </RestaurantSearchProvider>
          </Route>
          <Route path='/business/:alias'>
            <RestaurantProfileProvider>
              <RestaurantSearchBarProvider>
                <RestaurantProfilePage />
              </RestaurantSearchBarProvider>
            </RestaurantProfileProvider>
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
