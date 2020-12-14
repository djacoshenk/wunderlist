import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import RestaurantSearchBar from './RestaurantSearchBar';
import { RestaurantSearchBarProvider } from './RestaurantSearchBarContext';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Route exact path='/'>
        <RestaurantSearchBarProvider>
          <RestaurantSearchBar />
        </RestaurantSearchBarProvider>
      </Route>
    </BrowserRouter>
  );
});

test('when the <RestaurantSearchBar /> component initially renders', () => {
  expect(screen.getByRole('form', { name: /form/i })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: /find/i })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: /near/i })).toBeInTheDocument();
  expect(screen.getByRole('button')).toBeInTheDocument();
});

// test when the user types into the input fields

// test when the user types into the input fields and clicks the button

// test that when clicking the button pushes the history to the correct path

// test that autocomplete results are returned from the user input
