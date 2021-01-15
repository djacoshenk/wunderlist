import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { useHistory } from 'react-router-dom';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import './HamburgerMenuButton.css';

interface CurrentUserState {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

export default function HamburgerMenuButton() {
  const [
    currentUserLoggedIn,
    setCurrentUserLoggedIn,
  ] = useState<CurrentUserState>();
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
    <div className='menu-button-container'>
      <Menu right width={200}>
        {currentUserLoggedIn ? (
          <button name='logout-btn' type='button' onClick={handleUserLogout}>
            Logout
          </button>
        ) : (
          <Fragment>
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
          </Fragment>
        )}
      </Menu>
    </div>
  );
}
