import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserLoginRegisterBanner.module.scss';

interface CurrentUserLoggedInState {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export default function UserLoginRegisterBanner() {
  const [
    currentUserLoggedIn,
    setCurrentUserLoggedIn,
  ] = useState<CurrentUserLoggedInState | null>(null);
  const dispatch = useDispatch();
  const history = useHistory();

  // check if there is a current user saved in local storage - returns a string or null
  const currentUserLocalStorage = localStorage.getItem('currentUser');

  useEffect(() => {
    if (typeof currentUserLocalStorage === 'string') {
      setCurrentUserLoggedIn(JSON.parse(currentUserLocalStorage));
    } else {
      setCurrentUserLoggedIn(null);
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
          <button
            className={styles['logout-btn']}
            name='logout-btn'
            type='button'
            onClick={handleUserLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className={styles['login-register-btn-container']}>
          <button
            className={styles['login-btn']}
            name='login-btn'
            type='button'
            onClick={() => history.push('/login')}
          >
            Login
          </button>
          <button
            className={styles['register-btn']}
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
