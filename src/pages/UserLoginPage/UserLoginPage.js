import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';

import UserLoginLoader from './UserLoginLoader/UserLoginLoader';
import Header from './Header/Header';
import UserLoginForm from './UserLoginForm/UserLoginForm';

import { UserLoginRegisterBannerContext } from 'shared/UserLoginRegisterBanner/UserLoginRegisterBannerContext';

export default function UserLoginPage() {
  const { state } = useContext(UserLoginRegisterBannerContext);

  return state.isLoading ? (
    <Fragment>
      <Helmet>
        <title>wunderlist - User Login</title>
      </Helmet>
      <UserLoginLoader />
    </Fragment>
  ) : (
    <Fragment>
      <Helmet>
        <title>wunderlist - User Login</title>
      </Helmet>
      <Header />
      <UserLoginForm />
    </Fragment>
  );
}
