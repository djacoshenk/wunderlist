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

export default function UserLoginForm() {
  const [userRegister, setUserRegister] = useState(defaultUserRegister);

  function onInputChange(e) {
    const { name, value } = e.target;

    setUserRegister((prevState) => {
      return { ...prevState, [name]: value };
    });
  }

  return (
    <div className={styles['user-register-form-container']}>
      <h3>Register User</h3>
      <form className={styles['user-register-form']} aria-label='form'>
        <input
          type='text'
          name='first_name'
          placeholder='First Name'
          value={userRegister.first_name}
          onChange={onInputChange}
        />
        <input
          type='text'
          name='last_name'
          placeholder='Last Name'
          value={userRegister.last_name}
          onChange={onInputChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={userRegister.email}
          onChange={onInputChange}
        />
        <input
          type='text'
          name='username'
          placeholder='Username'
          value={userRegister.username}
          onChange={onInputChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={userRegister.password}
          onChange={onInputChange}
        />
        <input
          type='password'
          name='confirm_password'
          placeholder='Confirm Password'
          value={userRegister.confirm_password}
          onChange={onInputChange}
        />
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}
