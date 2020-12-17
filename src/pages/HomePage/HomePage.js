import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';

import UserLogoutLoader from './UserLogoutLoader/UserLogoutLoader';
import UserLoginRegisterBanner from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner';
import Header from './Header/Header';
import RestaurantSearchBar from 'shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from './RestaurantTypeCards/RestaurantTypeCards';

import { UserLoginRegisterBannerContext } from 'shared/UserLoginRegisterBanner/UserLoginRegisterBannerContext';

export default function HomePage() {
  const { state } = useContext(UserLoginRegisterBannerContext);

  return state.isLoading ? (
    <Fragment>
      <Helmet>
        <title>wunderlist - User Logout</title>
      </Helmet>
      <UserLogoutLoader />
    </Fragment>
  ) : (
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
