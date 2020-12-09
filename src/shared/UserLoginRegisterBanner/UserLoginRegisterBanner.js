import React, { Fragment, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { UserLoginRegisterBannerContext } from './UserLoginRegisterBannerContext';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner() {
  const { state, setUserLogout, toggleLoader } = useContext(
    UserLoginRegisterBannerContext
  );
  const history = useHistory();

  const currentUserLocalStorage = JSON.parse(
    localStorage.getItem('currentUser')
  );
  const registeredUsersLocalStorage = JSON.parse(
    localStorage.getItem('registeredUsers')
  );

  useEffect(() => {
    // check if there is data in state - if there's no data, then we don't want to store it in local storage
    if (state.registeredUser.length > 0) {
      // check if there is already data in local storage, if so we want to append to the registered users list
      if (registeredUsersLocalStorage) {
        const combinedRegisteredUsersData = registeredUsersLocalStorage.concat(
          state.registeredUser
        );

        localStorage.setItem(
          'registeredUsers',
          JSON.stringify(combinedRegisteredUsersData)
        );
        // if there's no data in local storage then we want to add the data
      } else {
        localStorage.setItem(
          'registeredUsers',
          JSON.stringify(state.registeredUser)
        );
      }
    }
  }, [
    state.registeredUser,
    currentUserLocalStorage,
    registeredUsersLocalStorage,
  ]);

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
        <Fragment>
          <p>{`Hello, ${currentUserLocalStorage[0].first_name}`}</p>
          <button name='logout-btn' type='button' onClick={handleUserLogout}>
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
