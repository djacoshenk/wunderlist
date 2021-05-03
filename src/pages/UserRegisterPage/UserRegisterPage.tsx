import { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import Header from 'pages/UserRegisterPage/Header/Header';
import UserRegisterForm from 'pages/UserRegisterPage/UserRegisterForm/UserRegisterForm';

export default function UserRegisterPage() {
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
