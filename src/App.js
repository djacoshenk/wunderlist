import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from 'pages/HomePage/HomePage';
import UserLoginPage from 'pages/UserLoginPage/UserLoginPage';
import UserRegisterPage from 'pages/UserRegisterPage/UserRegisterPage';
import RestaurantSearchPage from 'pages/RestaurantSearchPage/RestaurantSearchPage';
import RestaurantProfilePage from 'pages/RestaurantProfilePage/RestaurantProfilePage';

import LocationURLProvider from 'context/LocationURLContext';
import CurrentUserProvider from 'context/CurrentUserContext';

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <CurrentUserProvider>
          <LocationURLProvider>
            <Switch>
              <Route exact path='/'>
                <HomePage />
              </Route>
              <Route exact path='/login'>
                <UserLoginPage />
              </Route>
              <Route exact path='/register'>
                <UserRegisterPage />
              </Route>
              <Route path='/search/:term/:location'>
                <RestaurantSearchPage />
              </Route>
              <Route path='/business/:alias'>
                <RestaurantProfilePage />
              </Route>
            </Switch>
          </LocationURLProvider>
        </CurrentUserProvider>
      </BrowserRouter>
    </Fragment>
  );
}
