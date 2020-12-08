import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserLoginRegisterBannerContext } from '../../../shared/UserLoginRegisterBanner/UserLoginRegisterBannerContext';

import styles from './UserRegisterForm.module.scss';

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

export default function UserRegisterForm() {
  const { setRegisteredUser, toggleLoader } = useContext(
    UserLoginRegisterBannerContext
  );
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

  // regex for email
  const emailRequirements = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  // minimum eight characters and contain at least one letter and one number
  const passwordRequirements = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  // check if the provided passwords are the same
  const newRegisteredUserPassword = userRegisterForm.password;
  const newRegisteredUserConfirmPassword = userRegisterForm.confirm_password;
  const checkRegisteredUserPasswords =
    newRegisteredUserPassword !== newRegisteredUserConfirmPassword;

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
      if (newRegisteredUserEmail.match(emailRequirements)) {
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
      if (newRegisteredUserPassword.match(passwordRequirements)) {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          password: '',
        }));
      } else {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          password:
            'The password must be a minimum of 8 characters and contain at least one letter and one number.',
          confirm_password: '',
        }));
      }
    }

    // if there are no errors, then register the user
    if (errors === 0) {
      // toggle loader on
      toggleLoader();

      // register the user
      setRegisteredUser(userRegisterForm);

      // turn loader off and route to the home page
      setTimeout(() => {
        toggleLoader();
        history.push('/');
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
      <h3>Register User</h3>
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
