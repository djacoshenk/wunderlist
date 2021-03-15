import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Sentry from '@sentry/react';
import { useDispatch } from 'react-redux';

import { firestore, auth } from 'setupFirebase';
import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserRegisterForm.module.scss';

type UserRegisterFormState = {
  [name: string]: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const userRegisterFormErrorValues: UserRegisterFormState = {
  firstName: 'Please provide a first name',
  lastName: 'Please provide a last name',
  email: 'Please provide an email',
  password: 'Please provide a password',
  confirmPassword: 'Please confirm your password',
};

export default function UserRegisterForm() {
  const [
    userRegisterForm,
    setUserRegisterForm,
  ] = useState<UserRegisterFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [
    userRegisterFormErrors,
    setUserRegisterFormErrors,
  ] = useState<UserRegisterFormState>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const history = useHistory();

  async function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          [name]: '',
        }));
      }
    }

    // check if the two passwords are the same
    if (userRegisterForm.password === userRegisterForm.confirmPassword) {
      setUserRegisterFormErrors((prevState) => ({
        ...prevState,
      }));
    } else {
      errors++;

      setUserRegisterFormErrors((prevState) => ({
        ...prevState,
        password: 'The passwords provided do not match',
        confirmPassword: 'The passwords provided do not match',
      }));
    }

    if (errors === 0 && userRegisterForm.email && userRegisterForm.password) {
      try {
        // if there are no errors and the email and password are both valid, then try to create a user and return the user data
        const { user } = await auth.createUserWithEmailAndPassword(
          userRegisterForm.email,
          userRegisterForm.password
        );

        // if a user is created, grab the user data and set the user info in the database
        if (user) {
          const { firstName, lastName, email } = userRegisterForm;

          firestore.collection('users').doc(user.uid).set({
            uid: user.uid,
            firstName,
            lastName,
            email,
          });

          // if the user is stored and authenticated, get the user data and save it to local storage
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

        if (error.code === 'auth/email-already-in-use') {
          setUserRegisterFormErrors((prevState) => ({
            ...prevState,
            email: 'A user already exists with this email',
          }));
        } else if (error.code === 'auth/invalid-email') {
          setUserRegisterFormErrors((prevState) => ({
            ...prevState,
            email: 'Please provide a valid email',
          }));
        } else if (error.code === 'auth/weak-password') {
          setUserRegisterFormErrors((prevState) => ({
            ...prevState,
            password: 'The password must be a minimum of 6 characters',
            confirmPassword: 'The password must be a minimum of 6 characters',
          }));
        }

        Sentry.captureException(error);
      }
    }

    // if there are no errors, then register the user and reset the form errors
    if (errors === 0) {
      setUserRegisterFormErrors({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });

      // route to the home page
      history.push('/');

      // set the loading status
      dispatch(setCurrentLoadingStatus(true, 'Registering New User...'));

      // change the loading status
      setTimeout(() => {
        dispatch(setCurrentLoadingStatus(false));
      }, 3000);
    }
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
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
          aria-label='first name'
          type='text'
          name='firstName'
          placeholder='First Name'
          value={userRegisterForm.firstName}
          onChange={onInputChange}
        />
        <div className={styles['user-register-first-name-error']}>
          {userRegisterFormErrors.firstName && (
            <p aria-label='first name error' role='alert'>
              {userRegisterFormErrors.firstName}
            </p>
          )}
        </div>
        <input
          aria-label='last name'
          type='text'
          name='lastName'
          placeholder='Last Name'
          value={userRegisterForm.lastName}
          onChange={onInputChange}
        />
        <div className={styles['user-register-last-name-error']}>
          {userRegisterFormErrors.lastName && (
            <p aria-label='last name error' role='alert'>
              {userRegisterFormErrors.lastName}
            </p>
          )}
        </div>
        <input
          aria-label='email'
          type='text'
          name='email'
          placeholder='Email'
          value={userRegisterForm.email}
          onChange={onInputChange}
        />
        <div className={styles['user-register-email-error']}>
          {userRegisterFormErrors.email && (
            <p aria-label='email error' role='alert'>
              {userRegisterFormErrors.email}
            </p>
          )}
        </div>
        <input
          aria-label='password'
          type='password'
          name='password'
          placeholder='Password (min. 6 characters)'
          value={userRegisterForm.password}
          onChange={onInputChange}
        />
        <div className={styles['user-register-password-error']}>
          {userRegisterFormErrors.password && (
            <p aria-label='password error' role='alert'>
              {userRegisterFormErrors.password}
            </p>
          )}
        </div>
        <input
          aria-label='confirm password'
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={userRegisterForm.confirmPassword}
          onChange={onInputChange}
        />
        <div className={styles['user-register-confirm-password-error']}>
          {userRegisterFormErrors.confirmPassword && (
            <p aria-label='confirm password error' role='alert'>
              {userRegisterFormErrors.confirmPassword}
            </p>
          )}
        </div>
        <button className={styles['register-btn']} type='submit'>
          Register
        </button>
      </form>
    </div>
  );
}
