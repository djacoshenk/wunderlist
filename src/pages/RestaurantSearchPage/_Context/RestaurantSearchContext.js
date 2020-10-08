import React, { createContext, useReducer } from 'react';

import axios from 'axios';

// create context
export const RestaurantSearchContext = createContext();

// create actions store
const ACTIONS = {
  SHOW_MAIN_LOADER: 'SHOW_MAIN_LOADER',
  FETCH_PLACES: 'FETCH_PLACES',
  FETCH_MORE_PLACES: 'FETCH_MORE_PLACES',
};

// reducer function
function reducer(state, action) {
  if (action.type === ACTIONS.SHOW_MAIN_LOADER) {
    return { ...state, ...action.payload };
  } else if (action.type === ACTIONS.FETCH_PLACES) {
    return { ...state, ...action.payload };
  } else if (action.type === ACTIONS.FETCH_MORE_PLACES) {
    return { ...state, ...action.payload };
  }
}

// initial state
const initialState = {
  places: [],
  showMainLoader: true,
  mapKey: 0,
  errors: null,
};

// provider function
export function RestaurantSearchProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  let offset = 10;

  function showMainLoader() {
    dispatch({
      type: ACTIONS.SHOW_MAIN_LOADER,
      payload: {
        showMainLoader: true,
        offset: 10,
      },
    });
  }

  async function fetchPlaces({ term, location }) {
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
      payload: {
        places: res.data.businesses,
        showMainLoader: false,
      },
    });
  }

  async function fetchMorePlaces({ term, location }) {
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
      payload: {
        places: state.places.concat(res.data.businesses),
        mapKey: state.mapKey + 1,
      },
    });
  }

  const value = { state, showMainLoader, fetchPlaces, fetchMorePlaces };

  return (
    <RestaurantSearchContext.Provider value={value}>
      {children}
    </RestaurantSearchContext.Provider>
  );
}
