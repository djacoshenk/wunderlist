import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';

test('when the component initially renders', () => {
  render(<Header />);

  expect(screen.getByAltText(/blue-green-globe/)).toBeInTheDocument();
  expect(screen.getByText(/wunderlist/)).toBeInTheDocument();
  expect(
    screen.getByText(/find, save, and share your new favorite place/)
  ).toBeInTheDocument();
});
