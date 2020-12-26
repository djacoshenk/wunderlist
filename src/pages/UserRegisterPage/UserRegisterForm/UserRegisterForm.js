import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { isEmail, isStrongPassword } from 'validator';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserRegisterForm.module.scss';

UserRegisterForm.propTypes = {
  setCurrentLoadingStatus: PropTypes.func,
};

const mapDispatchToProps = {
  setCurrentLoadingStatus,
};

const defaultUserRegisterForm = {
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  confirm_password: '',
};

const defaultUserRegisterFormErrors = {
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  confirm_password: '',
};

const userRegisterFormErrorValues = {
  first_name: 'Please provide a first name.',
  last_name: 'Please provide a last name.',
  email: 'Please provide an email.',
  username: 'Please provide a username.',
  password: 'Please provide a password.',
  confirm_password: 'Please confirm your password.',
};

export function UserRegisterForm({ setCurrentLoadingStatus }) {
  const [userRegisterForm, setUserRegisterForm] = useState(
    defaultUserRegisterForm
  );
  const [userRegisterFormErrors, setUserRegisterFormErrors] = useState(
    defaultUserRegisterFormErrors
  );
  const history = useHistory();

  // check if there is a user already registered with the email
  const newRegisteredUserEmail = userRegisterForm.email;
  const currentRegisteredUsersEmails = JSON.parse(
    localStorage.getItem('registeredUsers')
  );

  // check if there is a user already registered with the username
  const newRegisteredUserUsername = userRegisterForm.username;
  const currentRegisteredUsersUsernames = JSON.parse(
    localStorage.getItem('registeredUsers')
  );

  // check if the provided passwords are the same
  const newRegisteredUserPassword = userRegisterForm.password;
  const newRegisteredUserConfirmPassword = userRegisterForm.confirm_password;
  const checkRegisteredUserPasswords =
    newRegisteredUserPassword !== newRegisteredUserConfirmPassword;

  // check if there is registeredUsers data in local storage
  const registeredUsersLocalStorage = JSON.parse(
    localStorage.getItem('registeredUsers')
  );

  function setRegisteredUser(user) {
    const registeredUser = [{ userID: uuid(), ...user }];

    // if there's data in local storage, then append the new data with the existing data
    if (registeredUsersLocalStorage) {
      const combinedRegisteredUsersData = registeredUsersLocalStorage.concat(
        registeredUser
      );

      localStorage.setItem(
        'registeredUsers',
        JSON.stringify(combinedRegisteredUsersData)
      );
      // if there's no data in local storage then we want to add the data
    } else {
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUser));
    }

    // regardless, we want to set the registered user data in local storage as the current user
    localStorage.setItem('currentUser', JSON.stringify(registeredUser));
  }

  function onFormSubmit(e) {
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
          [name]: defaultUserRegisterFormErrors[name],
        }));
      }
    }

    // check if the email provided is in fact an email
    if (newRegisteredUserEmail) {
      if (isEmail(newRegisteredUserEmail)) {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: '',
        }));
      } else {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: 'The email provided is not a valid email.',
        }));
      }
    }

    // check if the user email already exists
    if (currentRegisteredUsersEmails) {
      let checkEmailRegistration = currentRegisteredUsersEmails.find(
        (val) => val.email === newRegisteredUserEmail
      );

      if (checkEmailRegistration) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: 'A user has already been registered with this email.',
        }));
      }
    }

    // check if the username already exists
    if (currentRegisteredUsersUsernames) {
      let checkUsernameRegistration = currentRegisteredUsersUsernames.find(
        (val) => val.username === newRegisteredUserUsername
      );

      if (checkUsernameRegistration) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          username: 'This username has already been taken by another user.',
        }));
      }
    }

    // check if the two passwords are the same
    if (checkRegisteredUserPasswords) {
      errors++;

      setUserRegisterFormErrors((prevState) => ({
        ...prevState,
        password: 'The passwords provided do not match.',
        confirm_password: 'The passwords provided do not match.',
      }));
    }

    // check if the password matches the password constraints
    if (newRegisteredUserPassword) {
      if (
        isStrongPassword(newRegisteredUserPassword, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0,
        })
      ) {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          password: '',
        }));
      } else {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          password:
            'The password must be a minimum of 8 characters and contain at least one number, one uppercase letter, and one lowercase letter.',
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
      setCurrentLoadingStatus(true, 'Registering New User...');

      // change the loading status
      setTimeout(() => {
        setCurrentLoadingStatus(false, '');
      }, 2000);
    }
  }

  function onInputChange(e) {
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
          placeholder='Password'
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
        <button type='submit'>REGISTER</button>
      </form>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(UserRegisterForm);
