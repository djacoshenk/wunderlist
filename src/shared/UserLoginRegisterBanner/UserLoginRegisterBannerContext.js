import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

UserLoginRegisterBannerProvider.propTypes = {
  children: PropTypes.object,
};

export const UserLoginRegisterBannerContext = createContext();

export const ACTIONS = {
  SET_USER_LOGIN: 'SET_USER_LOGIN',
  SET_USER_REGISTER: 'SET_USER_REGISTER',
  SET_USER_LOGOUT: 'SET_USER_LOGOUT',
};

export function reducer(state, action) {
  if (action.type === ACTIONS.SET_USER_LOGIN) {
    return { ...state, currentUser: [action.payload] };
  } else if (action.type === ACTIONS.SET_USER_REGISTER) {
    return {
      ...state,
      registeredUsers: [...state.registeredUsers, action.payload],
      currentUser: [
        {
          userID: action.payload.userID,
          username: action.payload.username,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
        },
      ],
    };
  } else if (action.type === ACTIONS.SET_USER_LOGOUT) {
    return { ...state, currentUser: [] };
  } else {
    return state;
  }
}

const initialState = {
  currentUser: [],
  registeredUsers: [],
};

export function UserLoginRegisterBannerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setUserLogin(user) {
    dispatch({
      type: ACTIONS.SET_USER_LOGIN,
      payload: {
        ...user,
      },
    });
  }

  function setRegisteredUser(user) {
    dispatch({
      type: ACTIONS.SET_USER_REGISTER,
      payload: {
        userID: uuid(),
        ...user,
      },
    });
  }

  function setUserLogout() {
    dispatch({ type: ACTIONS.SET_USER_LOGOUT });

    localStorage.removeItem('currentUser');
  }

  const value = { state, setUserLogin, setRegisteredUser, setUserLogout };

  return (
    <UserLoginRegisterBannerContext.Provider value={value}>
      {children}
    </UserLoginRegisterBannerContext.Provider>
  );
}
