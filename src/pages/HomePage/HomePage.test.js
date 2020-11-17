import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import HomePage from './HomePage';
import Header from '../HomePage/Header/Header';
import RestaurantSearchBar from '../../shared/RestaurantSearchBar/RestaurantSearchBar';
import RestaurantTypeCards from '../HomePage/RestaurantTypeCards/RestaurantTypeCards';
import { RestaurantSearchBarProvider } from '../../shared/RestaurantSearchBar/RestaurantSearchBarContext';

beforeEach(() => {
  render(
    <BrowserRouter>
      <Route exact path='/'>
        <RestaurantSearchBarProvider>
          <HomePage>
            <Header />
            <RestaurantSearchBar />
            <RestaurantTypeCards />
          </HomePage>
        </RestaurantSearchBarProvider>
      </Route>
    </BrowserRouter>
  );
});

test('the card links change with a location input', async () => {
  const locationInput = screen.getByRole('combobox', { name: /Near/ });
  const cardLink = screen.getByRole('link', { name: /Burgers/ });

  userEvent.type(locationInput, 'Los Angeles, CA');
});
