import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Header from 'pages/UserLoginPage/Header/Header';
import UserLoginForm from 'pages/UserLoginPage/UserLoginForm/UserLoginForm';

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
