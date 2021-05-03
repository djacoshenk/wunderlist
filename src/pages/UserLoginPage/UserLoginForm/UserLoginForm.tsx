import { useState } from 'react';
import * as Sentry from '@sentry/react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { auth, firestore } from 'setupFirebase';
import styles from 'pages/UserLoginPage/UserLoginForm/UserLoginForm.module.scss';
import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

type UserLoginFormState = {
  [name: string]: string;
  email: string;
  password: string;
};

const userLoginFormErrorValues: UserLoginFormState = {
  email: 'Please provide a valid email',
  password: 'Please provide a valid password',
};

export default function UserLoginForm() {
  const [userLoginForm, setUserLoginForm] = useState<UserLoginFormState>({
    email: '',
    password: '',
  });
  const [
    userLoginFormErrors,
    setUserLoginFormErrors,
  ] = useState<UserLoginFormState>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setUserLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let errors = 0;

    try {
      // if the email and password are both valid, then try to sign in and return the user info
      const { user } = await auth.signInWithEmailAndPassword(
        userLoginForm.email,
        userLoginForm.password
      );

      // if a user is signed in successfully, grab the user info from the database and store in local storage
      if (user) {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const snapshot = await firestore
              .collection('users')
              .doc(user.uid)
              .get();

            const data = snapshot.data();

            if (data) {
              localStorage.setItem('currentUser', JSON.stringify(data));
            }
          }
        });
      }
    } catch (error) {
      errors++;

      if (error.code === 'auth/invalid-email') {
        setUserLoginFormErrors({
          email: userLoginFormErrorValues.email,
          password: '',
        });
      } else if (error.code === 'auth/wrong-password') {
        setUserLoginFormErrors({
          email: '',
          password: 'Incorrect password. Please try again.',
        });
      } else if (error.code === 'auth/user-not-found') {
        setUserLoginFormErrors({
          email: 'An account does not exist with the provided email',
          password: '',
        });
      }

      Sentry.captureException(error);
    }

    // if a user is able to sign in successfully, then reset the form errors, route to the Home Page and show the loader
    if (errors === 0) {
      setUserLoginFormErrors({
        email: '',
        password: '',
      });

      // set the loading status
      dispatch(setCurrentLoadingStatus(true, 'Logging In...'));

      // route to the home page
      history.push('/');

      // turn loader off and route to the home page
      setTimeout(() => {
        dispatch(setCurrentLoadingStatus(false));
      }, 4000);
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
        <div className={styles['user-login-email-container']}>
          <label htmlFor='email'>
            <i className='fas fa-user'></i>
          </label>
          <input
            aria-label='email'
            type='text'
            id='email'
            name='email'
            placeholder='Email'
            value={userLoginForm.email}
            onChange={onInputChange}
          />
        </div>
        <div className={styles['user-login-email-error']}>
          {userLoginFormErrors.email && (
            <p aria-label='email error' role='alert'>
              {userLoginFormErrors.email}
            </p>
          )}
        </div>
        <div className={styles['user-login-password-container']}>
          <label htmlFor='password'>
            <i className='fas fa-lock'></i>
          </label>
          <input
            aria-label='password'
            type='password'
            id='password'
            name='password'
            placeholder='Password'
            value={userLoginForm.password}
            onChange={onInputChange}
          />
        </div>
        <div className={styles['user-login-password-error']}>
          {userLoginFormErrors.password && (
            <p aria-label='password error' role='alert'>
              {userLoginFormErrors.password}
            </p>
          )}
        </div>
        <button className={styles['login-btn']} type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
