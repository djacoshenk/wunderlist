import React, { useState } from 'react';

import styles from './UserRegisterForm.module.scss';

const defaultUserRegister = {
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  confirm_password: '',
};

const defaultUserRegisterErrors = {
  first_name: '',
  last_name: '',
  email: '',
  username: '',
  password: '',
  confirm_password: '',
};

const userRegisterErrorValues = {
  first_name: 'Please provide a first name.',
  last_name: 'Please provide a last name.',
  email: 'Please provide an email.',
  username: 'Please provide a username.',
  password: 'Please provide a password.',
  confirm_password: 'Please confirm your password.',
};

export default function UserLoginForm() {
  const [userRegister, setUserRegister] = useState(defaultUserRegister);
  const [userRegisterErrors, setUserRegisterErrors] = useState(
    defaultUserRegisterErrors
  );

  function onFormSubmit(e) {
    let errors = 0;

    for (const name in userRegister) {
      if (userRegister[name] === '') {
        errors++;

        setUserRegisterErrors((prevState) => ({
          ...prevState,
          [name]: userRegisterErrorValues[name],
        }));
      }
    }

    if (errors === 0) {
      setUserRegister((prevState) => ({
        ...prevState,
        ...defaultUserRegister,
      }));
    } else {
      e.preventDefault();
    }
  }

  function onInputChange(e) {
    const { name, value } = e.target;

    setUserRegister((prevState) => {
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
          value={userRegister.first_name}
          onChange={onInputChange}
        />
        <div className={styles['user-register-first-name-error']}>
          <p>{userRegisterErrors.first_name}</p>
        </div>
        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          value={userRegister.last_name}
          onChange={onInputChange}
        />
        <div className={styles['user-register-last-name-error']}>
          <p>{userRegisterErrors.last_name}</p>
        </div>
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={userRegister.email}
          onChange={onInputChange}
        />
        <div className={styles['user-register-email-error']}>
          <p>{userRegisterErrors.email}</p>
        </div>
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={userRegister.username}
          onChange={onInputChange}
        />
        <div className={styles['user-register-username-error']}>
          <p>{userRegisterErrors.username}</p>
        </div>
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={userRegister.password}
          onChange={onInputChange}
        />
        <div className={styles['user-register-password-error']}>
          <p>{userRegisterErrors.password}</p>
        </div>
        <input
          type='password'
          name='confirm_password'
          placeholder='Confirm Password'
          value={userRegister.confirm_password}
          onChange={onInputChange}
        />
        <div className={styles['user-register-confirm-password-error']}>
          <p>{userRegisterErrors.confirm_password}</p>
        </div>
        <button type='submit'>REGISTER</button>
      </form>
    </div>
  );
}
