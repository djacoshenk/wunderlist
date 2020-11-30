import React, { createContext, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

export const UserLoginRegisterBannerContext = createContext();

export const ACTIONS = {
  SET_USER_LOGIN: 'SET_USER_LOGIN',
  SET_USER_REGISTER: 'SET_USER_REGISTER',
  SET_USER_LOGOUT: 'SET_USER_LOGOUT',
};

export function reducer(state, action) {
  if (action.type === ACTIONS.SET_USER_LOGIN) {
    return { ...state, currentUser: { ...action.payload } };
  } else if (action.type === ACTIONS.SET_USER_REGISTER) {
    return {
      ...state,
      registeredUsers: [...state.registeredUsers, ...action.payload],
    };
  } else if (action.type === ACTIONS.SET_USER_LOGOUT) {
    return { ...state, currentUser: {} };
  } else {
    return state;
  }
}

const initialState = {
  currentUser: {},
  registeredUsers: [],
};

export function UserLoginRegisterBannerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function setRegisteredUser(user) {
    dispatch({
      type: ACTIONS.SET_USER_REGISTER,
      payload: {
        userID: uuid(),
        ...user,
      },
    });
  }

  const value = { state, setRegisteredUser };

  return (
    <UserLoginRegisterBannerContext.Provider value={value}>
      {children}
    </UserLoginRegisterBannerContext.Provider>
  );
}
