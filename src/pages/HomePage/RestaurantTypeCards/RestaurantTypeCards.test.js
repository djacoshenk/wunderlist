import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Route } from 'react-router-dom';

import RestaurantTypeCards from './RestaurantTypeCards';
import { RestaurantSearchBarProvider } from '../../../shared/RestaurantSearchBar/RestaurantSearchBarContext';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Route exact path='/'>
        <RestaurantSearchBarProvider>
          <RestaurantTypeCards />
        </RestaurantSearchBarProvider>
      </Route>
    </BrowserRouter>
  );
});

test('the component images are rendering', () => {
  expect(screen.getByRole('img', { name: /cheeseburger/i }));
  expect(screen.getByRole('img', { name: /sushi/i }));
  expect(screen.getByRole('img', { name: /pizza/i }));
  expect(screen.getByRole('img', { name: /rice/i }));
  expect(screen.getByRole('img', { name: /taco/i }));
  expect(screen.getByRole('img', { name: /chili/i }));
});

test('the component text is rendering', () => {
  expect(screen.getByText(/burgers/i)).toBeInTheDocument();
  expect(screen.getByText(/japanese/i)).toBeInTheDocument();
  expect(screen.getByText(/italian/i)).toBeInTheDocument();
  expect(screen.getByText(/chinese/i)).toBeInTheDocument();
  expect(screen.getByText(/mexican/i)).toBeInTheDocument();
  expect(screen.getByText(/thai/i)).toBeInTheDocument();
});

test('the component links are rendering', () => {
  expect(screen.getByRole('link', { name: /cheeseburger/i }));
  expect(screen.getByRole('link', { name: /sushi/i }));
  expect(screen.getByRole('link', { name: /pizza/i }));
  expect(screen.getByRole('link', { name: /rice/i }));
  expect(screen.getByRole('link', { name: /taco/i }));
  expect(screen.getByRole('link', { name: /chili/i }));
});

// test that by clicking on a link the history will be pushed
