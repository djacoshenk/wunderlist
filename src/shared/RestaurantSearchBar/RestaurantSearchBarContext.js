import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

RestaurantSearchBarProvider.propTypes = {
  children: PropTypes.object,
};

export const RestaurantSearchBarContext = createContext();

export const ACTIONS = {
  FETCH_SEARCH_SUGGESTIONS: 'FETCH_SEARCH_SUGGESTIONS',
  SET_ERROR: 'SET_ERROR',
};

export function reducer(state, action) {
  if (action.type === ACTIONS.FETCH_SEARCH_SUGGESTIONS) {
    const suggestions = action.payload.map((categ) => {
      return categ.title;
    });

    return { ...state, searchSuggestions: suggestions };
  } else if (action.type === ACTIONS.SET_ERROR) {
    return { ...state, error: action.payload };
  } else {
    return state;
  }
}

const initialState = {
  searchSuggestions: [],
  error: null,
};

export function RestaurantSearchBarProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchSearchSuggestions = useCallback(async (text) => {
    try {
      const res = await axios.get(
        `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/autocomplete?text=${text}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
          },
        }
      );

      dispatch({
        type: ACTIONS.FETCH_SEARCH_SUGGESTIONS,
        payload: res.data.categories,
      });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err });
    }
  }, []);

  const value = { state, fetchSearchSuggestions };

  return (
    <RestaurantSearchBarContext.Provider value={value}>
      {children}
    </RestaurantSearchBarContext.Provider>
  );
}
