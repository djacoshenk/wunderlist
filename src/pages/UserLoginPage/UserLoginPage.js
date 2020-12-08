import React, { Fragment, useContext } from 'react';

import UserLoginLoader from './UserLoginLoader/UserLoginLoader';
import Header from './Header/Header';
import UserLoginForm from './UserLoginForm/UserLoginForm';

import { UserLoginRegisterBannerContext } from 'shared/UserLoginRegisterBanner/UserLoginRegisterBannerContext';

export default function UserLoginPage() {
  const { state } = useContext(UserLoginRegisterBannerContext);

  return state.isLoading ? (
    <UserLoginLoader />
  ) : (
    <Fragment>
      <Header />
      <UserLoginForm />
    </Fragment>
  );
}
