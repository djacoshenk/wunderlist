import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserLoginForm.module.scss';

interface UserLoginFormState {
  [name: string]: string;
  username: string;
  password: string;
}

interface RegisteredUserState {
  userID: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
}

const userLoginFormErrorValues: UserLoginFormState = {
  username: 'Please provide a valid username',
  password: 'Please provide a valid password',
};

export default function UserLoginForm() {
  const dispatch = useDispatch();
  const [userLoginForm, setUserLoginForm] = useState<UserLoginFormState>({
    username: '',
    password: '',
  });
  const [
    userLoginFormErrors,
    setUserLoginFormErrors,
  ] = useState<UserLoginFormState>({
    username: '',
    password: '',
  });
  const [registeredUsers, setRegisteredUsers] = useState<RegisteredUserState[]>(
    []
  );
  const history = useHistory();

  const currentUserLoginUsername = userLoginForm.username;
  const currentUserLoginPassword = userLoginForm.password;

  // check if there is registeredUsers data in local storage - returns a JSON string or null
  const registeredUsersLocalStorage = localStorage.getItem('registeredUsers');

  // if a JSON string is returned, parse the string to a JS object
  useEffect(() => {
    if (registeredUsersLocalStorage) {
      setRegisteredUsers(JSON.parse(registeredUsersLocalStorage));
    }
  }, [registeredUsersLocalStorage]);

  function setCurrentUserLogin(user: RegisteredUserState) {
    localStorage.setItem('currentUser', JSON.stringify([{ ...user }]));
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let errors = 0;

    if (registeredUsersLocalStorage) {
      const checkUsernameRegistration = registeredUsers.find(
        (val) => val.username === currentUserLoginUsername
      );
      const checkPasswordRegistration = registeredUsers.find(
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
          username: 'The provided username does not match a registered user',
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
          password: 'Incorrect password - Please try again',
        }));
      }
    } else {
      errors++;

      setUserLoginFormErrors((prevState) => ({
        ...prevState,
        username: 'The provided username does not match a registered user',
        password: 'Incorrect password - Please try again',
      }));
    }

    // loop through the input fields, if the field is empty set the login form error value
    for (const name in userLoginForm) {
      if (!userLoginForm[name]) {
        errors++;

        setUserLoginFormErrors((prevState) => ({
          ...prevState,
          [name]: userLoginFormErrorValues[name],
        }));
      }
    }

    // if there are no errors, then find the user's data in local storage
    if (errors === 0) {
      const registeredUserData = registeredUsers.find(
        (val) =>
          val.username === currentUserLoginUsername &&
          val.password === currentUserLoginPassword
      );

      // set the current user to the existing registered data
      if (registeredUserData) {
        setCurrentUserLogin(registeredUserData);
      }

      // set the loading status
      dispatch(setCurrentLoadingStatus(true, 'Logging In...'));

      // route to the home page
      history.push('/');

      // turn loader off and route to the home page
      setTimeout(() => {
        dispatch(setCurrentLoadingStatus(false, ''));
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
        <button className={styles['login-btn']} type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
