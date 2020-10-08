import React, { createContext, useReducer } from 'react';
import axios from 'axios';

// create context
export const RestaurantProfileContext = createContext();

// create an actions store
const ACTIONS = {
  SHOW_MAIN_LOADER: 'TOGGLE_MAIN_LOADER',
  HANDLE_FETCH_DATA: 'HANDLE_FETCH_DATA',
  SET_ERROR: 'SET_ERROR',
};

// create a reducer function
export function reducer(state, action) {
  if (action.type === ACTIONS.SHOW_MAIN_LOADER) {
    return { ...state, ...action.payload };
  } else if (action.type === ACTIONS.HANDLE_FETCH_DATA) {
    return { ...state, ...action.payload };
  } else if (action.typee === ACTIONS.SET_ERROR) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
}

// initial state
const initialState = {
  showMainLoader: true,
  place: {},
  reviews: {},
  error: null,
};

// create a provider function
export function RestaurantProfileProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // function to show the main loader
  function showMainLoader() {
    dispatch({
      type: ACTIONS.SHOW_MAIN_LOADER,
      payload: {
        showMainLoader: true,
      },
    });
  }

  async function fetchData(alias) {
    try {
      // fetch data on place
      const placeRes = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
        }
      );

      // fetch data on reviews
      const reviewsRes = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/${alias}/reviews`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
        }
      );

      dispatch({
        type: ACTIONS.HANDLE_FETCH_DATA,
        payload: {
          place: placeRes.data,
          reviews: reviewsRes.data,
          showMainLoader: false,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: {
          error: err,
        },
      });
    }
  }

  const value = { state, showMainLoader, fetchData };

  return (
    <RestaurantProfileContext.Provider value={value}>
      {children}
    </RestaurantProfileContext.Provider>
  );
}
