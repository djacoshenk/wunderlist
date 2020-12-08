import React, { createContext, useReducer, useCallback } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

RestaurantSearchBarProvider.propTypes = {
  children: PropTypes.object,
};

export const RestaurantSearchBarContext = createContext();

export const ACTIONS = {
  FETCH_TERM_SUGGESTIONS: 'FETCH_TERM_SUGGESTIONS',
  FETCH_LOCATION_SUGGESTIONS: 'FETCH_LOCATION_SUGGESTIONS',
  CLEAR_SEARCH_SUGGESTIONS: 'CLEAR_SEARCH_SUGGESTIONS',
  STORE_LOCATION_PARAM: 'STORE_LOCATION_PARAM',
  SET_ERROR: 'SET_ERROR',
};

export function reducer(state, action) {
  if (action.type === ACTIONS.FETCH_TERM_SUGGESTIONS) {
    const suggestions = action.payload.map((categ) => {
      return categ.title;
    });

    return { ...state, termSuggestions: suggestions };
  } else if (action.type === ACTIONS.FETCH_LOCATION_SUGGESTIONS) {
    const suggestions = action.payload.map((place) => {
      return { city: place.city, state: place.regionCode };
    });

    return { ...state, locationSuggestions: suggestions };
  } else if (action.type === ACTIONS.CLEAR_SEARCH_SUGGESTIONS) {
    if (action.payload === 'term') {
      return { ...state, termSuggestions: [] };
    } else if (action.payload === 'location') {
      return { ...state, locationSuggestions: [] };
    }
  } else if (action.type === ACTIONS.STORE_LOCATION_PARAM) {
    return { ...state, locationParam: action.payload };
  } else if (action.type === ACTIONS.SET_ERROR) {
    return { ...state, error: action.payload };
  } else {
    return state;
  }
}

const initialState = {
  termSuggestions: [],
  locationSuggestions: [],
  locationParam: 'Los Angeles, CA',
  error: null,
};

export function RestaurantSearchBarProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchTermSuggestions = useCallback(async (text) => {
    try {
      if (text) {
        const res = await axios.get(
          `${'https://cors-anywhere.herokuapp.com/'}https://api.yelp.com/v3/autocomplete?text=${text}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_YELP_CLIENT_SECRET}`,
            },
          }
        );

        dispatch({
          type: ACTIONS.FETCH_TERM_SUGGESTIONS,
          payload: res.data.categories,
        });
      } else {
        return;
      }
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err });
    }
  }, []);

  const clearSearchSuggestions = useCallback((name) => {
    dispatch({ type: ACTIONS.CLEAR_SEARCH_SUGGESTIONS, payload: name });
  }, []);

  const fetchLocationSuggestions = useCallback(async (text) => {
    try {
      if (text) {
        dispatch({ type: ACTIONS.STORE_LOCATION_PARAM, payload: text });

        const res = await axios.get(
          `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=2&namePrefix=${text}&countryIds=US`,
          {
            headers: {
              'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_GEODB_CITIES,
            },
          }
        );

        dispatch({
          type: ACTIONS.FETCH_LOCATION_SUGGESTIONS,
          payload: res.data.data,
        });
      } else {
        return;
      }
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err });
    }
  }, []);

  const value = {
    state,
    fetchTermSuggestions,
    clearSearchSuggestions,
    fetchLocationSuggestions,
  };

  return (
    <RestaurantSearchBarContext.Provider value={value}>
      {children}
    </RestaurantSearchBarContext.Provider>
  );
}
