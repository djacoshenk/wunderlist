import React, { Fragment, useContext } from 'react';
import { Helmet } from 'react-helmet';

import UserRegistrationLoader from './UserRegistrationLoader/UserRegistrationLoader';
import Header from './Header/Header';
import UserRegisterForm from './UserRegisterForm/UserRegisterForm';

import { CurrentUserContext } from 'context/CurrentUserContext';

export default function UserRegisterPage() {
  const { isLoading } = useContext(CurrentUserContext);

  // if loading, show the registration loader, if not then show the registration form
  return (
    <Fragment>
      <Helmet>
        <title>wunderlist - User Registration</title>
      </Helmet>
      {isLoading ? (
        <Fragment>
          <UserRegistrationLoader />
        </Fragment>
      ) : (
        <Fragment>
          <Header />
          <UserRegisterForm />
        </Fragment>
      )}
    </Fragment>
  );
}
