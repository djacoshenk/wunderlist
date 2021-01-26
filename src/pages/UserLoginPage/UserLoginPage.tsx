import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Header from './Header/Header';
import UserLoginForm from './UserLoginForm/UserLoginForm';

export default function UserLoginPage() {
  return (
    <Fragment>
      <Helmet>
        <title>wunderlist - User Login</title>
      </Helmet>
      <Header />
      <UserLoginForm />
    </Fragment>
  );
}
