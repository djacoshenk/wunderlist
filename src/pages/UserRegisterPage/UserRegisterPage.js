import React from 'react';
import { useContext } from 'react';

import UserRegistrationLoader from './UserRegistrationLoader/UserRegistrationLoader';
import Header from './Header/Header';
import UserRegisterForm from './UserRegisterForm/UserRegisterForm';

import { UserLoginRegisterBannerContext } from 'shared/UserLoginRegisterBanner/UserLoginRegisterBannerContext';

export default function UserRegisterPage() {
  const { state } = useContext(UserLoginRegisterBannerContext);

  // if loading, show the registration loader, if not then show the registration form
  return state.isLoading ? (
    <UserRegistrationLoader />
  ) : (
    <>
      <Header />
      <UserRegisterForm />
    </>
  );
}
