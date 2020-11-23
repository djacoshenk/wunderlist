import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner() {
  const [userAuthed, setUserAuthed] = useState(false);
  const history = useHistory();

  function handleUserLogin() {
    history.push('/login');
  }

  function handleUserRegister() {
    history.push('/register');
  }

  return (
    <div className={styles['banner-container']}>
      {userAuthed ? (
        <>
          <p>Welcome Back</p>
          <button
            name='logout-btn'
            type='button'
            onClick={() => setUserAuthed(false)}
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <button name='login-btn' type='button' onClick={handleUserLogin}>
            LOGIN
          </button>
          <button
            name='register-btn'
            type='button'
            onClick={handleUserRegister}
          >
            REGISTER
          </button>
        </>
      )}
    </div>
  );
}
