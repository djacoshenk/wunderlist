import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';

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
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState<
    CurrentUserLoggedInState[] | null
  >(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
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

  function onUserLogout() {
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
              pathname: `/user/${currentUserLoggedIn[0].username}`,
              state: {
                place: currentUserLoggedIn[0].username,
              },
            }}
            className={styles['user-avatar-username-link']}
          >
            <p>{currentUserLoggedIn[0].first_name}</p>
          </Link>

          <button
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
