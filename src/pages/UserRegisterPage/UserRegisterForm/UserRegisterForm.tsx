import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import validator from 'validator';
import { useDispatch } from 'react-redux';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserRegisterForm.module.scss';

type UserRegisterFormState = {
  [name: string]: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

const userRegisterFormErrorValues: UserRegisterFormState = {
  first_name: 'Please provide a first name',
  last_name: 'Please provide a last name',
  email: 'Please provide an email',
  username: 'Please provide a username',
  password: 'Please provide a password',
  confirm_password: 'Please confirm your password',
};

export default function UserRegisterForm(): JSX.Element {
  const [
    userRegisterForm,
    setUserRegisterForm,
  ] = useState<UserRegisterFormState>({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  const [userRegisterFormErrors, setUserRegisterFormErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  const [registeredUsers, setRegisteredUsers] = useState<
    UserRegisterFormState[]
  >([]);
  const dispatch = useDispatch();
  const history = useHistory();

  // check if there is registeredUsers data in local storage - returns a JSON string or null
  const registeredUsersLocalStorage = localStorage.getItem('registeredUsers');

  // if a JSON string is returned, parse the string to a JS object
  if (registeredUsersLocalStorage) {
    const registeredUsersLocalStorageParse = JSON.parse(
      registeredUsersLocalStorage
    );

    setRegisteredUsers(registeredUsersLocalStorageParse);
  }

  // check if there is a user already registered with the email
  const newRegisteredUserEmail = userRegisterForm.email;

  // check if there is a user already registered with the username
  const newRegisteredUserUsername = userRegisterForm.username;

  // check if the provided passwords are the same
  const newRegisteredUserPassword = userRegisterForm.password;
  const newRegisteredUserConfirmPassword = userRegisterForm.confirm_password;

  function setRegisteredUser(user: UserRegisterFormState) {
    const registeredUser = { userID: uuid(), ...user };

    // if there's data in local storage, then append the new data with the existing data
    if (registeredUsersLocalStorage) {
      setRegisteredUsers((prevState) => {
        return [...prevState, { ...registeredUser }];
      });

      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      // if there's no data in local storage then we want to add the data
    } else {
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUser));
    }

    // regardless, we want to set the registered user data in local storage as the current user
    localStorage.setItem('currentUser', JSON.stringify(registeredUser));
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let errors = 0;

    // if the form fields are empty, then show the error value
    for (const name in userRegisterForm) {
      if (!userRegisterForm[name]) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          [name]: userRegisterFormErrorValues[name],
        }));
      } else {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          [name]: '',
        }));
      }
    }

    // check if the email provided is in fact an email
    if (newRegisteredUserEmail) {
      if (validator.isEmail(newRegisteredUserEmail)) {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: '',
        }));
      } else {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: 'The email provided is not a valid email',
        }));
      }
    }

    // check if the user email already exists
    if (registeredUsersLocalStorage) {
      const checkEmailRegistration = registeredUsers.find(
        (val) => val.email === newRegisteredUserEmail
      );

      if (checkEmailRegistration) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: 'A user has already been registered with this email',
        }));
      }
    }

    // check if the username already exists in local storage
    if (registeredUsersLocalStorage) {
      const checkUsernameRegistration = registeredUsers.find(
        (val) => val.username === newRegisteredUserUsername
      );

      if (checkUsernameRegistration) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          username: 'This username has already been taken by another user',
        }));
      }
    }

    // check if the two passwords are the same
    if (newRegisteredUserPassword === newRegisteredUserConfirmPassword) {
      setUserRegisterFormErrors((prevState) => ({
        ...prevState,
      }));
    } else {
      errors++;

      setUserRegisterFormErrors((prevState) => ({
        ...prevState,
        password: 'The passwords provided do not match',
        confirm_password: 'The passwords provided do not match',
      }));
    }

    // check if the password matches the password constraints
    if (newRegisteredUserPassword) {
      if (
        validator.isStrongPassword(newRegisteredUserPassword, {
          minLength: 10,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
        }));
      } else {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          password: 'The password must be a minimum of 10 characters.',
        }));
      }
    }

    // if there are no errors, then register the user
    if (errors === 0) {
      // register the user
      setRegisteredUser(userRegisterForm);

      // route to the home page
      history.push('/');

      // set the loading status
      dispatch(setCurrentLoadingStatus(true, 'Registering New User...'));

      // change the loading status
      setTimeout(() => {
        dispatch(setCurrentLoadingStatus(false, ''));
      }, 2000);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserRegisterForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div className={styles['user-register-form-container']}>
      <h3>User Registration</h3>
      <form
        className={styles['user-register-form']}
        onSubmit={onFormSubmit}
        aria-label='form'
      >
        <input
          type='text'
          name='first_name'
          placeholder='First Name'
          value={userRegisterForm.first_name}
          onChange={onInputChange}
        />
        <div className={styles['user-register-first-name-error']}>
          <p>{userRegisterFormErrors.first_name}</p>
        </div>
        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          value={userRegisterForm.last_name}
          onChange={onInputChange}
        />
        <div className={styles['user-register-last-name-error']}>
          <p>{userRegisterFormErrors.last_name}</p>
        </div>
        <input
          type='text'
          name='email'
          placeholder='Email'
          value={userRegisterForm.email}
          onChange={onInputChange}
        />
        <div className={styles['user-register-email-error']}>
          <p>{userRegisterFormErrors.email}</p>
        </div>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={userRegisterForm.username}
          onChange={onInputChange}
        />
        <div className={styles['user-register-username-error']}>
          <p>{userRegisterFormErrors.username}</p>
        </div>
        <input
          type='password'
          name='password'
          placeholder='Password (min. 10 characters)'
          value={userRegisterForm.password}
          onChange={onInputChange}
        />
        <div className={styles['user-register-password-error']}>
          <p>{userRegisterFormErrors.password}</p>
        </div>
        <input
          type='password'
          name='confirm_password'
          placeholder='Confirm Password'
          value={userRegisterForm.confirm_password}
          onChange={onInputChange}
        />
        <div className={styles['user-register-confirm-password-error']}>
          <p>{userRegisterFormErrors.confirm_password}</p>
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
