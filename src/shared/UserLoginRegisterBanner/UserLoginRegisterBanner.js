import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { UserLoginRegisterBannerContext } from './UserLoginRegisterBannerContext';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner() {
  const { state, setUserLogout } = useContext(UserLoginRegisterBannerContext);
  const history = useHistory();

  useEffect(() => {
    if (state.registeredUsers.length > 0 && state.currentUser.length > 0) {
      // set the registered users in storage
      localStorage.setItem(
        'registeredUsers',
        JSON.stringify(state.registeredUsers)
      );

      // set the current user in storage
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    } else {
      return;
    }
  }, [state.registeredUsers, state.currentUser]);

  function handleUserLogin() {
    history.push('/login');
  }

  function handleUserRegister() {
    history.push('/register');
  }

  return (
    <div className={styles['banner-container']}>
      {state.currentUser.length > 0 ? (
        <>
          <p>Welcome Back</p>
          <button
            name='logout-btn'
            type='button'
            onClick={() => setUserLogout()}
          >
            LOGOUT
          </button>
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
