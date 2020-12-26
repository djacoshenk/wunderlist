import React from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserLoginRegisterBanner.module.scss';

UserLoginRegisterBanner.propTypes = {
  setCurrentLoadingStatus: PropTypes.func,
};

const mapDispatchToProps = {
  setCurrentLoadingStatus,
};

export function UserLoginRegisterBanner({ setCurrentLoadingStatus }) {
  const history = useHistory();

  // check if there is a current user saved in local storage
  const currentUserLocalStorage = JSON.parse(
    localStorage.getItem('currentUser')
  );

  function handleUserLogin() {
    history.push('/login');
  }

  function handleUserRegister() {
    history.push('/register');
  }

  function handleUserLogout() {
    // remove current user from local storage
    localStorage.removeItem('currentUser');

    // set the user loading status
    setCurrentLoadingStatus(true, 'Logging Out...');

    // route to the home page
    history.push('/');

    // change the user loading status
    setTimeout(() => {
      setCurrentLoadingStatus(false, '');
    }, 2000);
  }

  return (
    <div className={styles['banner-container']}>
      {currentUserLocalStorage ? (
        <div className={styles['logout-btn-container']}>
          <p>{`Hello, ${currentUserLocalStorage[0].first_name}`}</p>
          <button name='logout-btn' type='button' onClick={handleUserLogout}>
            LOGOUT
          </button>
        </div>
      ) : (
        <div className={styles['login-register-btn-container']}>
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
        </div>
      )}
    </div>
  );
}

export default connect(null, mapDispatchToProps)(UserLoginRegisterBanner);
