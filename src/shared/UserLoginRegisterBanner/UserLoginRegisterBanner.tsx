import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';
import styles from 'shared/UserLoginRegisterBanner/UserLoginRegisterBanner.module.scss';
import { auth } from 'setupFirebase';

type CurrentUser = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
};

type CurrentUserLoggedIn = CurrentUser | firebase.firestore.DocumentData;

export default function UserLoginRegisterBanner() {
  const [
    currentUserLoggedIn,
    setCurrentUserLoggedIn,
  ] = useState<CurrentUserLoggedIn | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    // fetch current user from local storage
    const currentUserLocalStorage = localStorage.getItem('currentUser');

    // if the local storage has data, retrieve it and set it into component state
    if (currentUserLocalStorage) {
      setCurrentUserLoggedIn(JSON.parse(currentUserLocalStorage));
    }
  }, []);

  async function onUserLogout() {
    try {
      await auth.signOut();

      localStorage.removeItem('currentUser');
    } catch (err) {
      Sentry.captureException(err);
    }

    // set the user loading status
    dispatch(setCurrentLoadingStatus(true, 'Logging Out...'));

    // route to the home page
    history.push('/');

    // change the user loading status
    setTimeout(() => {
      dispatch(setCurrentLoadingStatus(false));
    }, 2000);
  }

  function onOutsideClick() {
    setTimeout(() => {
      setMenuIsOpen(false);
    }, 0);
  }

  return (
    <div className={styles['banner-container']}>
      {currentUserLoggedIn ? (
        <div className={styles['user-avatar-container']}>
          <div className={styles['avatar-user-circle-container']}>
            <i className='fas fa-user-circle'></i>
          </div>
          <Link
            to={{
              pathname: `/user/${currentUserLoggedIn.uid}`,
              state: currentUserLoggedIn,
            }}
            className={styles['user-avatar-username-link']}
          >
            <p>{currentUserLoggedIn.firstName}</p>
          </Link>
          <button
            aria-label='toggle menu'
            className={styles['chevron-down-btn']}
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <i className='fas fa-chevron-down'></i>
          </button>
          {menuIsOpen && (
            <OutsideClickHandler onOutsideClick={onOutsideClick}>
              <div className={styles['chevron-down-btn-menu']}>
                <button
                  className={styles['logout-btn']}
                  name='logout-btn'
                  type='button'
                  onClick={onUserLogout}
                >
                  Logout
                </button>
              </div>
            </OutsideClickHandler>
          )}
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
