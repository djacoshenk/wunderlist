import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import Header from './Header/Header';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from './RestaurantTypeCards/RestaurantTypeCards';

export default function HomePage() {
  return (
    <Fragment>
      <Helmet>
        <title>wunderlist - find and save your new favorite place</title>
      </Helmet>
      <UserLoginRegisterBanner />
      <Header />
      <RestaurantSearchBar />
      <RestaurantTypeCards />
    </Fragment>
  );
}
