import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from './Header';

test('when the component initially renders', () => {
  render(<Header />);

  expect(screen.getByRole('img', { name: /blue/i })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /wunderlist/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /favorite/i })
  ).toBeInTheDocument();
});
