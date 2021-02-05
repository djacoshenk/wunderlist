import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import validator from 'validator';
import { useDispatch } from 'react-redux';

import { setCurrentLoadingStatus } from 'reducers/currentLoadingStatusReducer';

import styles from './UserRegisterForm.module.scss';

type UserRegisterFormState = {
  [name: string]: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  confirm_password: string;
};

const userRegisterFormErrorValues: UserRegisterFormState = {
  first_name: 'Please provide a first name',
  last_name: 'Please provide a last name',
  email: 'Please provide an email',
  username: 'Please provide a username',
  password: 'Please provide a password',
  confirm_password: 'Please confirm your password',
};

export default function UserRegisterForm() {
  const [
    userRegisterForm,
    setUserRegisterForm,
  ] = useState<UserRegisterFormState>({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  const [
    userRegisterFormErrors,
    setUserRegisterFormErrors,
  ] = useState<UserRegisterFormState>({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    confirm_password: '',
  });
  const [registeredUsersData, setRegisteredUsersData] = useState<
    UserRegisterFormState[]
  >([]);
  const dispatch = useDispatch();
  const history = useHistory();

  // check if there is registeredUsers data in local storage - returns a JSON string or null
  const registeredUsersLocalStorage = localStorage.getItem('registeredUsers');

  // if a JSON string is returned, parse the string to a JS object
  useEffect(() => {
    if (registeredUsersLocalStorage) {
      setRegisteredUsersData(JSON.parse(registeredUsersLocalStorage));
    }
  }, [registeredUsersLocalStorage]);

  function setRegisteredUserInStorage(user: UserRegisterFormState) {
    const newRegisteredUser = [{ userID: uuid(), ...user, savedPlaces: [] }];

    // if there's data in local storage, then append the new data with the existing data
    if (registeredUsersLocalStorage) {
      localStorage.setItem(
        'registeredUsers',
        JSON.stringify([...registeredUsersData, ...newRegisteredUser])
      );
      // if there's no data in local storage then we want to add the data
    } else {
      localStorage.setItem(
        'registeredUsers',
        JSON.stringify(newRegisteredUser)
      );
    }

    // regardless, we want to set the registered user data in local storage as the current user
    localStorage.setItem('currentUser', JSON.stringify(newRegisteredUser));
  }

  function onFormSubmit(e: React.FormEvent<HTMLFormElement>) {
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

    // check if the email provided is in fact an email
    if (userRegisterForm.email) {
      if (validator.isEmail(userRegisterForm.email)) {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: '',
        }));
      } else {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: 'The email provided is not a valid email',
        }));
      }
    }

    // check if the user email already exists
    if (registeredUsersLocalStorage) {
      const checkEmailRegistration = registeredUsersData.find(
        (val) => val.email === userRegisterForm.email
      );

      if (checkEmailRegistration) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          email: 'A user has already been registered with this email',
        }));
      }
    }

    // check if the username already exists in local storage
    if (registeredUsersLocalStorage) {
      const checkUsernameRegistration = registeredUsersData.find(
        (val) => val.username === userRegisterForm.username
      );

      if (checkUsernameRegistration) {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          username: 'This username has already been taken by another user',
        }));
      }
    }

    // check if the two passwords are the same
    if (userRegisterForm.password === userRegisterForm.confirm_password) {
      setUserRegisterFormErrors((prevState) => ({
        ...prevState,
      }));
    } else {
      errors++;

      setUserRegisterFormErrors((prevState) => ({
        ...prevState,
        password: 'The passwords provided do not match',
        confirm_password: 'The passwords provided do not match',
      }));
    }

    // check if the password matches the password constraints
    if (userRegisterForm.password) {
      if (
        validator.isStrongPassword(userRegisterForm.password, {
          minLength: 10,
          minLowercase: 0,
          minUppercase: 0,
          minNumbers: 0,
          minSymbols: 0,
        })
      ) {
        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
        }));
      } else {
        errors++;

        setUserRegisterFormErrors((prevState) => ({
          ...prevState,
          password: 'The password must be a minimum of 10 characters.',
        }));
      }
    }

    // if there are no errors, then register the user
    if (errors === 0) {
      // register the user
      setRegisteredUserInStorage(userRegisterForm);

      // route to the home page
      history.push('/');

      // set the loading status
      dispatch(setCurrentLoadingStatus(true, 'Registering New User...'));

      // change the loading status
      setTimeout(() => {
        dispatch(setCurrentLoadingStatus(false));
      }, 2000);
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
          name='first_name'
          placeholder='First Name'
          value={userRegisterForm.first_name}
          onChange={onInputChange}
        />
        <div className={styles['user-register-first-name-error']}>
          {userRegisterFormErrors.first_name && (
            <p aria-label='first name error' role='alert'>
              {userRegisterFormErrors.first_name}
            </p>
          )}
        </div>
        <input
          aria-label='last name'
          type='text'
          name='last_name'
          placeholder='Last Name'
          value={userRegisterForm.last_name}
          onChange={onInputChange}
        />
        <div className={styles['user-register-last-name-error']}>
          {userRegisterFormErrors.last_name && (
            <p aria-label='last name error' role='alert'>
              {userRegisterFormErrors.last_name}
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
          aria-label='username'
          type='text'
          name='username'
          placeholder='Username'
          value={userRegisterForm.username}
          onChange={onInputChange}
        />
        <div className={styles['user-register-username-error']}>
          {userRegisterFormErrors.username && (
            <p aria-label='username error' role='alert'>
              {userRegisterFormErrors.username}
            </p>
          )}
        </div>
        <input
          aria-label='password'
          type='password'
          name='password'
          placeholder='Password (min. 10 characters)'
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
          name='confirm_password'
          placeholder='Confirm Password'
          value={userRegisterForm.confirm_password}
          onChange={onInputChange}
        />
        <div className={styles['user-register-confirm-password-error']}>
          {userRegisterFormErrors.confirm_password && (
            <p aria-label='confirm password error' role='alert'>
              {userRegisterFormErrors.confirm_password}
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
