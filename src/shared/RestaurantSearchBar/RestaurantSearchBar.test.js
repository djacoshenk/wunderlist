import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import RestaurantSearchBar from './RestaurantSearchBar';
import { RestaurantSearchBarProvider } from './RestaurantSearchBarContext';
import userEvent from '@testing-library/user-event';

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
  const termInput = screen.getByPlaceholderText(/pizza/);
  const locationInput = screen.getByPlaceholderText(/Los Angeles/);

  expect(screen.getByText(/Find/)).toBeInTheDocument();
  expect(termInput).toBeInTheDocument();
  expect(termInput.value).toBeFalsy();
  expect(screen.getByText(/Near/)).toBeInTheDocument();
  expect(locationInput).toBeInTheDocument();
  expect(locationInput.value).toBeFalsy();
});

test('when user types into the input field', () => {
  const termInput = screen.getByPlaceholderText(/pizza/);
  const locationInput = screen.getByPlaceholderText(/Los Angeles/);

  userEvent.type(termInput, 'Breakfast & Brunch');
  expect(termInput.value).toBe('Breakfast & Brunch');
  userEvent.type(locationInput, 'Los Angeles, CA');
  expect(locationInput.value).toBe('Los Angeles, CA');
});

test('when user type into the input and submits the search bar form', () => {
  const form = screen.getByRole('form');
  const button = screen.getByRole('button');

  const termInput = screen.getByPlaceholderText(/pizza/);
  const locationInput = screen.getByPlaceholderText(/Los Angeles/);

  userEvent.type(termInput, 'Breakfast & Brunch');
  userEvent.type(locationInput, 'Los Angeles, CA');

  fireEvent.submit(form);
  userEvent.click(button);
});
