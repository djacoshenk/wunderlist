import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { UserLoginRegisterBannerContext } from './UserLoginRegisterBannerContext';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner() {
  const { state, setUserLogout } = useContext(UserLoginRegisterBannerContext);
  const history = useHistory();

  useEffect(() => {
    // set the registered users in storage
    localStorage.setItem(
      'registeredUsers',
      JSON.stringify(state.registeredUsers)
    );
  }, [state.registeredUsers]);

  function handleUserLogin() {
    history.push('/login');
  }

  function handleUserRegister() {
    history.push('/register');
  }

  return (
    <div className={styles['banner-container']}>
      {state.currentUser.length > 0 ? (
        <Fragment>
          <p>{`Welcome Back, ${state.currentUser[0].first_name}`}</p>
          <button
            name='logout-btn'
            type='button'
            onClick={() => setUserLogout()}
          >
            LOGOUT
          </button>
        </Fragment>
      ) : (
        <Fragment>
          <button name='login-btn' type='button' onClick={handleUserLogin}>
            LOGIN
          </button>
          <button
            name='register-btn'
            type='button'
            onClick={handleUserRegister}
          >
            REGISTER
          </button>
        </Fragment>
      )}
    </div>
  );
}
