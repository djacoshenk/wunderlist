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
  const images = screen.getAllByRole('img');

  expect(images.length).toBe(6);

  expect(screen.getByAltText(/cheeseburger/)).toBeInTheDocument();
  expect(screen.getByAltText(/sushi/)).toBeInTheDocument();
  expect(screen.getByAltText(/pizza/)).toBeInTheDocument();
  expect(screen.getByAltText(/rice/)).toBeInTheDocument();
  expect(screen.getByAltText(/taco/)).toBeInTheDocument();
  expect(screen.getByAltText(/chili/)).toBeInTheDocument();
});

test('the component text is rendering', () => {
  expect(screen.getByText(/Burgers/)).toBeInTheDocument();
  expect(screen.getByText(/Japanese/)).toBeInTheDocument();
  expect(screen.getByText(/Italian/)).toBeInTheDocument();
  expect(screen.getByText(/Chinese/)).toBeInTheDocument();
  expect(screen.getByText(/Mexican/)).toBeInTheDocument();
  expect(screen.getByText(/Thai/)).toBeInTheDocument();
});

test('the component links are rendering', () => {
  const links = screen.getAllByRole('link');

  expect(links.length).toBe(6);

  expect(screen.getByRole('link', { name: /cheeseburger/ }));
  expect(screen.getByRole('link', { name: /sushi/ }));
  expect(screen.getByRole('link', { name: /pizza/ }));
  expect(screen.getByRole('link', { name: /rice/ }));
  expect(screen.getByRole('link', { name: /taco/ }));
  expect(screen.getByRole('link', { name: /chili/ }));
});
