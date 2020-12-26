import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserLoginForm.module.scss';

UserLoginForm.propTypes = {
  setCurrentLoadingStatus: PropTypes.func,
};

const mapDispatchToProps = {
  setCurrentLoadingStatus,
};

const defaultUserLoginForm = {
  username: '',
  password: '',
};

const defaultUserLoginFormErrors = {
  username: '',
  password: '',
};

const userLoginFormErrorValues = {
  username: 'Please provide a valid username.',
  password: 'Please provide a valid password.',
};

export function UserLoginForm({ setCurrentLoadingStatus }) {
  const [userLoginForm, setUserLoginForm] = useState(defaultUserLoginForm);
  const [userLoginFormErrors, setUserLoginFormErrors] = useState(
    defaultUserLoginFormErrors
  );
  const history = useHistory();

  const currentUserLoginUsername = userLoginForm.username;
  const currentUserLoginPassword = userLoginForm.password;
  const currentRegisteredUsersUsernames = JSON.parse(
    localStorage.getItem('registeredUsers')
  );

  function setCurrentUserLogin(user) {
    localStorage.setItem('currentUser', JSON.stringify([{ ...user }]));
  }

  function onInputChange(e) {
    const { name, value } = e.target;

    setUserLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function onFormSubmit(e) {
    e.preventDefault();

    let errors = 0;

    if (currentRegisteredUsersUsernames) {
      let checkUsernameRegistration = currentRegisteredUsersUsernames.find(
        (val) => val.username === currentUserLoginUsername
      );
      let checkPasswordRegistration = currentRegisteredUsersUsernames.find(
        (val) => val.password === currentUserLoginPassword
      );

      if (checkUsernameRegistration) {
        setUserLoginFormErrors((prevState) => ({
          ...prevState,
          username: '',
        }));
      } else {
        errors++;

        setUserLoginFormErrors((prevState) => ({
          ...prevState,
          username: 'The provided username does not match a registered user.',
        }));
      }

      if (checkPasswordRegistration) {
        setUserLoginFormErrors((prevState) => ({
          ...prevState,
          password: '',
        }));
      } else {
        errors++;

        setUserLoginFormErrors((prevState) => ({
          ...prevState,
          password: 'Incorrect password. Please try again.',
        }));
      }
    } else {
      errors++;

      setUserLoginFormErrors((prevState) => ({
        ...prevState,
        username: 'The provided username does not match a registered user.',
        password: 'Incorrect password. Please try again.',
      }));
    }

    for (const name in userLoginForm) {
      if (!userLoginForm[name]) {
        errors++;

        setUserLoginFormErrors((prevState) => ({
          ...prevState,
          [name]: userLoginFormErrorValues[name],
        }));
      }
    }

    if (errors === 0) {
      const registeredUserData = currentRegisteredUsersUsernames.find(
        (val) =>
          val.username === currentUserLoginUsername &&
          val.password === currentUserLoginPassword
      );

      // register the user
      setCurrentUserLogin(registeredUserData);

      // set the loading status
      setCurrentLoadingStatus(true, 'Logging In...');

      // route to the home page
      history.push('/');

      // turn loader off and route to the home page
      setTimeout(() => {
        setCurrentLoadingStatus(false, '');
      }, 2000);
    }
  }

  return (
    <div className={styles['user-login-form-container']}>
      <h3>User Login</h3>
      <form
        className={styles['user-login-form']}
        onSubmit={onFormSubmit}
        aria-label='form'
      >
        <div className={styles['user-login-username-container']}>
          <i className='fas fa-user'></i>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={userLoginForm.username}
            onChange={onInputChange}
          />
        </div>
        <div className={styles['user-login-username-error']}>
          <p>{userLoginFormErrors.username}</p>
        </div>
        <div className={styles['user-login-password-container']}>
          <i className='fas fa-lock'></i>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={userLoginForm.password}
            onChange={onInputChange}
          />
        </div>
        <div className={styles['user-login-password-error']}>
          <p>{userLoginFormErrors.password}</p>
        </div>
        <button type='submit'>LOGIN</button>
      </form>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(UserLoginForm);
