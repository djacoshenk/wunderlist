import React, { useState } from 'react';

import styles from './UserLoginForm.module.scss';

const defaultUserLogin = {
  username: '',
  password: '',
};

const defaultUserLoginErrors = {
  username: '',
  password: '',
};

const userLoginErrorValues = {
  username: 'Please provide a valid username.',
  password: 'Please provide a valid password.',
};

export default function UserLoginForm() {
  const [userLogin, setUserLogin] = useState(defaultUserLogin);
  const [userLoginErrors, setUserLoginErrors] = useState(
    defaultUserLoginErrors
  );

  function onInputChange(e) {
    const { name, value } = e.target;

    setUserLogin((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  function onFormSubmit(e) {
    e.preventDefault();

    let errors = 0;

    for (const name in userLogin) {
      if (!userLogin[name]) {
        errors++;

        setUserLoginErrors((prevState) => ({
          ...prevState,
          [name]: userLoginErrorValues[name],
        }));
      }
    }

    if (errors === 0) {
      setUserLogin((prevState) => ({ ...prevState, ...defaultUserLogin }));
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
            value={userLogin.username}
            onChange={onInputChange}
          />
        </div>
        <div className={styles['user-login-username-error']}>
          <p>{userLoginErrors.username}</p>
        </div>
        <div className={styles['user-login-password-container']}>
          <i className='fas fa-lock'></i>
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={userLogin.password}
            onChange={onInputChange}
          />
        </div>
        <div className={styles['user-login-password-error']}>
          <p>{userLoginErrors.password}</p>
        </div>
        <button type='submit'>LOGIN</button>
      </form>
    </div>
  );
}
