import React, { Fragment } from 'react';

import Header from './Header/Header';
import UserLoginForm from './UserLoginForm/UserLoginForm';

export default function UserLoginPage() {
  return (
    <Fragment>
      <Header />
      <UserLoginForm />
    </Fragment>
  );
}
