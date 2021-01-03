import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';
import { useHistory } from 'react-router-dom';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import './HamburgerMenuButton.css';

export default function HamburgerMenuButton() {
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
    <div className='menu-button-container'>
      <Menu right width={200}>
        {currentUserLocalStorage ? (
          <button name='logout-btn' type='button' onClick={handleUserLogout}>
            LOGOUT
          </button>
        ) : (
          <Fragment>
            <button
              name='login-btn'
              type='button'
              onClick={() => history.push('/login')}
            >
              LOGIN
            </button>
            <button
              name='register-btn'
              type='button'
              onClick={() => history.push('/register')}
            >
              REGISTER
            </button>
          </Fragment>
        )}
      </Menu>
    </div>
  );
}
