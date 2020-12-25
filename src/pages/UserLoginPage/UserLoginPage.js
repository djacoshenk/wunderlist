import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';

import UserLoginLoader from './UserLoginLoader/UserLoginLoader';
import Header from './Header/Header';
import UserLoginForm from './UserLoginForm/UserLoginForm';

import { CurrentUserContext } from 'context/CurrentUserContext';

export default function UserLoginPage() {
  const { isLoading } = useContext(CurrentUserContext);

  return (
    <Fragment>
      <Helmet>
        <title>wunderlist - User Login</title>
      </Helmet>
      {isLoading ? (
        <Fragment>
          <UserLoginLoader />
        </Fragment>
      ) : (
        <Fragment>
          <UserLoginForm />
          <Header />
        </Fragment>
      )}
    </Fragment>
  );
}
