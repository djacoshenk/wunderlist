import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserLoginRegisterBannerContext } from './UserLoginRegisterBannerContext';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner() {
  const { state, setUserLogout } = useContext(UserLoginRegisterBannerContext);
  const history = useHistory();

  function handleUserLogin() {
    history.push('/login');
  }

  function handleUserRegister() {
    history.push('/register');
  }

  return (
    <div className={styles['banner-container']}>
      {state.currentUser ? (
        <>
          <p>Welcome Back</p>
          <button
            name='logout-btn'
            type='button'
            onClick={() => setUserLogout()}
          >
            Logout
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
