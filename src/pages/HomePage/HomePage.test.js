import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Route } from 'react-router-dom';

import HomePage from './HomePage';
import {
  RestaurantSearchBarContext,
  RestaurantSearchBarProvider,
} from '../../shared/RestaurantSearchBar/RestaurantSearchBarContext';

test('link changes when user types', () => {
  const state = {
    termSuggestions: [],
    locationSuggestions: [],
    locationParam: '',
    error: null,
  };

  const fetchTermSuggestions = jest.fn();
  const clearSearchSuggestions = jest.fn();
  const fetchLocationSuggestions = jest.fn();

  const value = {
    state,
    fetchTermSuggestions,
    clearSearchSuggestions,
    fetchLocationSuggestions,
  };

  render(
    <BrowserRouter>
      <Route exact path='/'>
        <RestaurantSearchBarProvider>
          <RestaurantSearchBarContext.Provider value={value}>
            <HomePage />
          </RestaurantSearchBarContext.Provider>
        </RestaurantSearchBarProvider>
      </Route>
    </BrowserRouter>
  );

  const locationInput = screen.getByPlaceholderText(/Los Angeles/);
  userEvent.type(locationInput, 'L');
});
