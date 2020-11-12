import React from 'react';
import { render, screen } from '@testing-library/react';

import RestaurantSearchBar from './RestaurantSearchBar';
import { RestaurantSearchBarProvider } from './RestaurantSearchBarContext';

describe('<RestaurantSearchBar />', () => {
  beforeEach(() => {
    render(
      <RestaurantSearchBarProvider>
        <RestaurantSearchBar />
      </RestaurantSearchBarProvider>
    );
  });

  test('when the component initially renders', () => {
    expect(document.querySelector('label').getAttribute('for')).toBe('term');
    expect(screen.getByText(/Find/)).toBeTruthy();
    expect(
      screen.getByPlaceholderText(/pizza, sushi, cocktail bar.../)
    ).toBeTruthy();
    expect(document.querySelector('input').getAttribute('input')).toBeNull();
  });
});
