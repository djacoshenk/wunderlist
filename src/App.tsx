import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from 'pages/HomePage/HomePage';
import UserLoginPage from 'pages/UserLoginPage/UserLoginPage';
import UserRegisterPage from 'pages/UserRegisterPage/UserRegisterPage';
import RestaurantSearchPage from 'pages/RestaurantSearchPage/RestaurantSearchPage';
import RestaurantProfilePage from 'pages/RestaurantProfilePage/RestaurantProfilePage';
import UserProfilePage from 'pages/UserProfilePage/UserProfilePage';

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
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
          <Route path='/user/:username'>
            <UserProfilePage />
          </Route>
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}
