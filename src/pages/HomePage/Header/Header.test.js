import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import Header from './Header';

test('when the component initially renders', () => {
  render(<Header />);

  expect(screen.getByRole('img', { name: /blue/ })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /wunderlist/ })
  ).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /favorite/ })).toBeInTheDocument();
});
