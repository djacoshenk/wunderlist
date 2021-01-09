import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner(): JSX.Element {
  const dispatch = useDispatch();
  const history = useHistory();

  // check if there is a current user saved in local storage
  const currentUserLocalStorage = JSON.parse(
    localStorage.getItem('currentUser')
  );

  function handleUserLogout() {
    // remove current user from local storage
    localStorage.removeItem('currentUser');

    // set the user loading status
    dispatch(setCurrentLoadingStatus(true, 'Logging Out...'));

    // route to the home page
    history.push('/');

    // change the user loading status
    setTimeout(() => {
      dispatch(setCurrentLoadingStatus(false, ''));
    }, 2000);
  }

  return (
    <div className={styles['banner-container']}>
      {currentUserLocalStorage ? (
        <div className={styles['logout-btn-container']}>
          <button name='logout-btn' type='button' onClick={handleUserLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className={styles['login-register-btn-container']}>
          <button
            name='login-btn'
            type='button'
            onClick={() => history.push('/login')}
          >
            Login
          </button>
          <button
            name='register-btn'
            type='button'
            onClick={() => history.push('/register')}
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}