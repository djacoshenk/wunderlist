import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';

import RestaurantTypeCards from './RestaurantTypeCards';
import { RestaurantSearchBarProvider } from '../../../shared/RestaurantSearchBar/RestaurantSearchBarContext';

describe('<RestaurantTypeCards />', () => {
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

  test('when the component initially renders', () => {
    expect(document.querySelector('a').getAttribute('href')).toBe(
      '/search/burgers/'
    );
    expect(screen.getByAltText(/black-white-cheeseburger/)).toBeTruthy();
    expect(screen.getByText(/Burgers/)).toBeTruthy();
  });
});
