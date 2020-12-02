import React, { Fragment } from 'react';

import Header from './Header/Header';
import UserRegisterForm from './UserRegisterForm/UserRegisterForm';

export default function UserRegisterPage() {
  return (
    <Fragment>
      <Header />
      <UserRegisterForm />
    </Fragment>
  );
}
