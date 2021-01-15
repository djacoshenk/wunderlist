import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserLoginRegisterBanner.module.scss';

interface CurrentUser {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export default function UserLoginRegisterBanner() {
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState<CurrentUser>();
  const dispatch = useDispatch();
  const history = useHistory();

  // check if there is a current user saved in local storage - returns a string or null
  const currentUserLocalStorage = localStorage.getItem('currentUser');

  // check if there is a current user saved in local storage - returns a string or null
  useEffect(() => {
    if (currentUserLocalStorage) {
      setCurrentUserLoggedIn(JSON.parse(currentUserLocalStorage));
    }
  }, [currentUserLocalStorage]);

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
      {currentUserLoggedIn ? (
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
