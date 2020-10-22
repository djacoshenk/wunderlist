import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

RestaurantSearchBarProvider.propTypes = {
  children: PropTypes.object,
};

export const RestaurantSearchBarContext = createContext();

export function RestaurantSearchBarProvider({ children }) {
  const [searchParams, setSearchParams] = useState({
    term: '',
    location: '',
  });

  const value = { searchParams, setSearchParams };

  return (
    <RestaurantSearchBarContext.Provider value={value}>
      {children}
    </RestaurantSearchBarContext.Provider>
  );
}
