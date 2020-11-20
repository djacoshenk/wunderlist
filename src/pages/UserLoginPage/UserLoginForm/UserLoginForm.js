import React, { useState } from 'react';

import styles from './UserLoginForm.module.scss';

const defaultUserLogin = {
  username: '',
  password: '',
};

export default function UserLoginForm() {
  const [userLogin, setUserLogin] = useState(defaultUserLogin);

  function onInputChange(e) {
    const { name, value } = e.target;

    setUserLogin((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  return (
    <div className={styles['user-login-form-container']}>
      <h3>User Login</h3>
      <form className={styles['user-login-form']} aria-label='form'>
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
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
