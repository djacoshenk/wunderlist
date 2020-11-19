import React, { useState } from 'react';

import styles from './UserLoginRegisterBanner.module.scss';

export default function UserLoginRegisterBanner() {
  const [userAuthed, setUserAuthed] = useState(false);

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
          <button
            name='login-btn'
            type='button'
            onClick={() => setUserAuthed(true)}
          >
            Login
          </button>
          <button name='register-btn' type='button'>
            Register
          </button>
        </>
      )}
    </div>
  );
}
