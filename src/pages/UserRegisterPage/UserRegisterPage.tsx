import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Header from './Header/Header';
import UserRegisterForm from './UserRegisterForm/UserRegisterForm';

export default function UserRegisterPage(): JSX.Element {
  return (
    <Fragment>
      <Helmet>
        <title>wunderlist - User Registration</title>
      </Helmet>
      <Header />
      <UserRegisterForm />
    </Fragment>
  );
}