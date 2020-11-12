import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './Header';

describe('<RestaurantSearchBar />', () => {
  beforeEach(() => {
    render(<Header />);
  });

  test('when the component initially renders', () => {
    expect(screen.getByAltText(/blue-green-globe/)).toBeTruthy();
    expect(screen.getByText(/wunderlist/)).toBeTruthy();
    expect(
      screen.getByText(/find, save, and share your new favorite place/)
    ).toBeTruthy();
  });
});
