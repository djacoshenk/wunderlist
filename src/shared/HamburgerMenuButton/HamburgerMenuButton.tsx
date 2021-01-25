import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import './HamburgerMenuButton.css';

type CurrentUserLoggedInState = {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

export default function HamburgerMenuButton() {
  const [currentUserLoggedIn, setCurrentUserLoggedIn] = useState<
    CurrentUserLoggedInState[] | null
  >(null);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // check if there is a current user saved in local storage - returns a string or null
  const currentUserLocalStorage = localStorage.getItem('currentUser');

  // check if there is a current user saved in local storage
  useEffect(() => {
    if (typeof currentUserLocalStorage === 'string') {
      setCurrentUserLoggedIn(JSON.parse(currentUserLocalStorage));
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
    <div className='menu-button-container'>
      <Menu right width={200}>
        {currentUserLoggedIn ? (
          <div className='user-avatar-main-container'>
            <div className='user-avatar-container'>
              <i className='fas fa-user-circle'></i>
              <Link
                to={{
                  pathname: `/user/${currentUserLoggedIn[0].username}`,
                  state: {
                    place: currentUserLoggedIn[0].username,
                  },
                }}
                className='user-avatar-username-link'
              >
                <p>{currentUserLoggedIn[0].first_name}</p>
              </Link>
              <button
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
