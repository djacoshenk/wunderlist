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
  const { setRegisteredUser } = useContext(UserLoginRegisterBannerContext);
  const [userRegisterForm, setUserRegisterForm] = useState(
    defaultUserRegisterForm
  );
  const [userRegisterFormErrors, setUserRegisterFormErrors] = useState(
    defaultUserRegisterFormErrors
  );
  const history = useHistory();

  function onFormSubmit(e) {
    e.preventDefault();

    let errors = 0;

    for (const name in userRegisterForm) {
      // if the form fields are empty, then show the error value
      if (!userRegisterForm[name]) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          [name]: userRegisterFormErrorValues[name],
        }));
        // if the form fields are not empty, then leave the error values empty
      } else {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          ...defaultUserRegisterFormErrors,
        }));
      }

      // if the passwords are not the same, then throw an error
      if (
        userRegisterForm['password'] !== userRegisterForm['confirm_password']
      ) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          password: 'The passwords provided do not match.',
          confirm_password: 'The passwords provided do not match.',
        }));
      }
    }

    // check if the user email already exists

    // if there are no errors, then register the user
    if (errors === 0) {
      // register the user
      setRegisteredUser(userRegisterForm);

      // route to the home page
      history.push('/');
    }
  }

  function onInputChange(e) {
    const { name, value } = e.target;

    setUserRegisterForm((prevState) => {
      return { ...prevState, [name]: value };
    });
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
          type='email'
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