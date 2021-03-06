import { Fragment, useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { slide as Menu } from 'react-burger-menu';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';
import 'shared/HamburgerMenuButton/HamburgerMenuButton.css';
import { auth, firestore } from 'setupFirebase';

type CurrentUser = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  savedPlaces: any[];
};

type CurrentUserLoggedInState = CurrentUser | firebase.firestore.DocumentData;

export default function HamburgerMenuButton() {
  const [
    currentUserLoggedIn,
    setCurrentUserLoggedIn,
  ] = useState<CurrentUserLoggedInState | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    try {
      auth.onAuthStateChanged(async (user) => {
        try {
          if (user) {
            const snapshot = await firestore
              .collection('users')
              .doc(user.uid)
              .get();

            const data = snapshot.data();

            if (data) {
              setCurrentUserLoggedIn(data);
            }
          }
        } catch (error) {
          Sentry.captureException(error);
        }
      });
    } catch (error) {
      Sentry.captureException(error);
    }
  }, []);

  async function onUserLogout() {
    // remove current user from local storage
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
      dispatch(setCurrentLoadingStatus(false, ''));
    }, 2000);
  }

  function onOutsideClick() {
    setTimeout(() => {
      setMenuIsOpen(false);
    }, 0);
  }

  return (
    <div className='menu-button-container'>
      <Menu right width={200}>
        {currentUserLoggedIn ? (
          <div className='user-avatar-main-container'>
            <div className='user-avatar-container'>
              <i className='fas fa-user-circle'></i>
              <Link
                to={{
                  pathname: `/user/${currentUserLoggedIn.uid}`,
                  state: currentUserLoggedIn,
                }}
                className='user-avatar-username-link'
              >
                <p>{currentUserLoggedIn.firstName}</p>
              </Link>
              <button
                aria-label='toggle menu'
                className='chevron-down-btn'
                onClick={() => setMenuIsOpen(!menuIsOpen)}
              >
                <i className='fas fa-chevron-down'></i>
              </button>
            </div>
            {menuIsOpen && (
              <OutsideClickHandler onOutsideClick={onOutsideClick}>
                <div className='chevron-down-btn-menu'>
                  <button
                    className='logout-btn'
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
          <Fragment>
            <button
              className='login-btn'
              name='login-btn'
              type='button'
              onClick={() => history.push('/login')}
            >
              Login
            </button>
            <button
              className='register-btn'
              name='register-btn'
              type='button'
              onClick={() => history.push('/register')}
            >
              Register
            </button>
          </Fragment>
        )}
      </Menu>
    </div>
  );
}
