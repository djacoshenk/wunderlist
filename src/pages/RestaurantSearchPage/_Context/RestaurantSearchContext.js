import React, { createContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

RestaurantSearchProvider.propTypes = {
  children: PropTypes.object,
};

// create context
export const RestaurantSearchContext = createContext();

// create actions store
const ACTIONS = {
  TOGGLE_MAIN_LOADER: 'TOGGLE_MAIN_LOADER',
  FETCH_PLACES: 'FETCH_PLACES',
  FETCH_MORE_PLACES: 'FETCH_MORE_PLACES',
  SET_ERROR: 'SET_ERROR',
};

// reducer function
export function reducer(state, action) {
  if (action.type === ACTIONS.TOGGLE_MAIN_LOADER) {
    return { ...state, showMainLoader: true };
  } else if (action.type === ACTIONS.FETCH_PLACES) {
    return { ...state, places: action.payload, showMainLoader: false };
  } else if (action.type === ACTIONS.FETCH_MORE_PLACES) {
    return {
      ...state,
      places: [...state.places, ...action.payload],
      mapKey: state.mapKey + 1,
    };
  } else if (action.type === ACTIONS.SET_ERROR) {
    return { ...state, errors: action.payload };
  } else {
    return state;
  }
}

// initial state
const initialState = {
  places: [],
  showMainLoader: true,
  mapKey: 0,
  errors: null,
};

let offset = 10;

// provider function
export function RestaurantSearchProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function toggleMainLoader() {
    offset = 10;

    dispatch({
      type: ACTIONS.TOGGLE_MAIN_LOADER,
    });
  }

  async function fetchPlaces({ term, location }) {
    try {
      const res = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
          params: {
            limit: 10,
          },
        }
      );

      dispatch({
        type: ACTIONS.FETCH_PLACES,
        payload: res.data.businesses,
      });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err });
    }
  }

  async function fetchMorePlaces({ term, location }) {
    try {
      const res = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/businesses/search?location=${location}&term=${term}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
          params: {
            sort_by: 'best_match',
            limit: 10,
            offset: offset,
          },
        }
      );

      offset += 10;

      dispatch({
        type: ACTIONS.FETCH_MORE_PLACES,
        payload: res.data.businesses,
      });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err });
    }
  }

  const value = { state, toggleMainLoader, fetchPlaces, fetchMorePlaces };

  return (
    <RestaurantSearchContext.Provider value={value}>
      {children}
    </RestaurantSearchContext.Provider>
  );
}
