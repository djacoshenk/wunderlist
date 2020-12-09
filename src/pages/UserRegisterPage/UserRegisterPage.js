import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';

import UserRegistrationLoader from './UserRegistrationLoader/UserRegistrationLoader';
import Header from './Header/Header';
import UserRegisterForm from './UserRegisterForm/UserRegisterForm';

import { UserLoginRegisterBannerContext } from 'shared/UserLoginRegisterBanner/UserLoginRegisterBannerContext';

export default function UserRegisterPage() {
  const { state } = useContext(UserLoginRegisterBannerContext);

  // if loading, show the registration loader, if not then show the registration form
  return state.isLoading ? (
    <Fragment>
      <Helmet>
        <title>Wunderlist - User Registration</title>
      </Helmet>
      <UserRegistrationLoader />
    </Fragment>
  ) : (
    <Fragment>
      <Helmet>
        <title>Wunderlist - User Registration</title>
      </Helmet>
      <Header />
      <UserRegisterForm />
    </Fragment>
  );
}
