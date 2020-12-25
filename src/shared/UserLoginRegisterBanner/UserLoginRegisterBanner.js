import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { CurrentUserContext } from 'context/CurrentUserContext';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner() {
  const { setCurrentUser, toggleLoader } = useContext(CurrentUserContext);

  function setUserLogout() {
    setCurrentUser(null);

    localStorage.removeItem('currentUser');
  }

  const history = useHistory();

  const currentUserLocalStorage = JSON.parse(
    localStorage.getItem('currentUser')
  );

  function handleUserLogin() {
    history.push('/login');
  }

  function handleUserRegister() {
    history.push('/register');
  }

  function handleUserLogout() {
    toggleLoader();

    setUserLogout();

    history.push('/');

    setTimeout(() => {
      toggleLoader();
    }, 2000);
  }

  return (
    <div className={styles['banner-container']}>
      {currentUserLocalStorage ? (
        <div className={styles['logout-btn-container']}>
          <p>{`Hello, ${currentUserLocalStorage[0].first_name}`}</p>
          <button name='logout-btn' type='button' onClick={handleUserLogout}>
            LOGOUT
          </button>
        </div>
      ) : (
        <div className={styles['login-register-btn-container']}>
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
        </div>
      )}
    </div>
  );
}
